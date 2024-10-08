"use client"
import getSearchedCarts from '@/app/actions/getSearchedCarts'
import { subDays } from 'date-fns';

import OrderModel from '@/components/adminComp/OrderModel'
import Spinner from '@/components/global/Spinner'
import debounce from '@/lib/debounce'
import React, { useCallback, useEffect, useState } from 'react'
import AbCartModel from './AbCartModel'
import { toast } from 'react-toastify';
import sendBulkMilWithDuration from '@/app/actions/sendBulkMilWithDuration';

const MainModule = ({ itemsPerPage, pageNo }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState(0);  // Default to 15 days

    // Debounce the API request
    const fetchResults = useCallback(
        debounce(async (query, range) => {
            try {
                setIsLoading(true);

                const response = await getSearchedCarts(
                    query,
                    itemsPerPage,
                    pageNo,
                    subDays(new Date(), range)
                );

                setFilteredOrders(response.carts || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }, 500), [itemsPerPage, pageNo]
    );

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const parsedRange = parseInt(dateRange, 10) || 0;  // Ensure it's a valid number

        fetchResults(lowercasedQuery, parsedRange);
    }, [searchQuery, dateRange, fetchResults]);
    // Why should the search input and date range be debounced together?
    // In your case, both the search input (searchQuery) and the date range (dateRange) trigger the same API request (to fetch carts). If you change both inputs (e.g., type a search term and change the date range), you should only trigger the API call once after both inputs are settled.

    // If you debounce these inputs separately, it might result in multiple API calls being triggered, which is inefficient. To handle this, we need to debounce the entire API request, not just the individual inputs.
    const onSendMail = async () => {
        try {
            setIsLoading(true)
            const res = await sendBulkMilWithDuration(dateRange)
            if (!res.success) {
                throw res

            }
            toast.success(res.message)

        } catch (error) {
            console.log(error)
            toast.warning(error.message)

        }finally{
            setIsLoading(false)
        }
    }
    return (
        <>
         <div style={{display:"flex",justifyContent:"space-between"}}>
        
            <h3>Abandoned Carts</h3>
            <button className={` btn me-2 btn-gradient-primary`} disabled={isLoading} onClick={onSendMail}>
                {isLoading?"please wait...":"send bulk alert"}
            </button>

         </div>
            
            Total- {filteredOrders.length}
            <div className="input-group">
                <span className="input-group-text">Search</span>
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, or mobile"
                />
            </div>

            {/* Date Range Input */}
            <div style={{ marginBottom: "2rem" }} className="input-group">
                <span className="input-group-text">Enter Range (days)</span>
                <input
                    placeholder='days'
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    type="number"  // Ensure it's a number
                    className="form-control"
                />
            </div>

            {/* Render Spinner or Data */}
            {!isLoading ? (
                <div className="hide-scrollbar" style={{ height: "60vh", overflowY: "scroll", width: "100%" }}>
                    {filteredOrders.map((obj, index) => (
                        <AbCartModel
                            key={index}
                            firstName={obj.user.firstName}
                            lastName={obj.user.lastName}
                            mobile={obj.user.mobile}
                            email={obj.user.email}
                            goTo={`/wah-control-center/cartDetails/${obj.id}`}
                        />
                    ))}
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
}

export default MainModule;

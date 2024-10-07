"use client"
import getCompleatedOrders from '@/app/actions/getCompleatedOrders'
import OrderModel from '@/components/adminComp/OrderModel'
import Spinner from '@/components/global/Spinner'
import debounce from '@/lib/debounce'
import React, { useCallback, useEffect, useState } from 'react'
const MainModule = ({ itemsPerPage ,pageNo}) => {


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrder, setFilteredOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchResults = useCallback(
        debounce(async (searchQuery) => {

            try {
                setIsLoading(true)
                const response = await getCompleatedOrders(searchQuery,itemsPerPage,pageNo)
             
               console.log(response)
               
               setFilteredOrder(response.orders)
                


            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false)
            }

        }, 500),
        []
    );



    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const helper = () => {
            fetchResults(lowercasedQuery)
        }
        helper()
       
    }, [searchQuery]);




    return (
        <>
           <h3>Compleated Orders</h3>
            <div style={{ marginBottom: "5rem" }} className="input-group">

                <span className="input-group-text" id="">Search</span>
                <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />

            </div>

            {(!isLoading ? <>

                <div className={"hide-scrollbar"} style={{ height: "60vh", overflow: "scroll", width: "100%" }}>


                    {filteredOrder.map((order,index) => (

                        <OrderModel key={index} goTo={`orderDetails/${order.orderId}`} order ={order}/>
                    ))}</div>

            </> : <Spinner />)
            }




        </>
    )
}

export default MainModule

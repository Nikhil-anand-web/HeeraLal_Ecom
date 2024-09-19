
"use client"

import getSearchedCustomer from '@/app/actions/getSearchedCustomer'


import CustomerModel from '@/components/CustomerModel'
import Spinner from '@/components/global/Spinner'
import debounce from '@/lib/debounce'




import React, { useCallback, useEffect, useState } from 'react'

const MainModule = ({ itemsPerPage ,pageNo}) => {

    //   const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchResults = useCallback(
        debounce(async (searchQuery) => {

            try {
                setIsLoading(true)
                const response = await getSearchedCustomer(searchQuery,itemsPerPage,pageNo)
             
               console.log(response)
               
               setFilteredCustomers(response.customers)
                


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
           <h3>Customers</h3>
            <div style={{ marginBottom: "5rem" }} className="input-group">

                <span className="input-group-text" id="">Search</span>

                <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />

            </div>

            {(!isLoading ? <>

                <div className={"hide-scrollbar"} style={{ height: "72vh", overflow: "scroll", width: "100%" }}>


                    {filteredCustomers.map((customer) => (

                        <CustomerModel status={customer.status} key={customer.id} isEmailVerified={customer.emailVerified} isMobileVerified={customer.mobileVerified} firstName={customer.firstName} lastName={customer.lastName} alt={"alt"} email={customer.email} id={customer.id} mobile={customer.mobile}  {...(customer.googleProfilePic ? { urlImg: customer.googleProfilePic } : {})} />
                    ))}</div>

            </> : <Spinner />)
            }




        </>
    )
}

export default MainModule

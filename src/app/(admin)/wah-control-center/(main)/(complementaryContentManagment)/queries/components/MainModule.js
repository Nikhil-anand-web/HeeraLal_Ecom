
"use client"


import getSearchedPublicQuery from '@/app/actions/getSearchedPublicQuery'
import QueryModel from '@/components/adminComp/QueryModel'



import Spinner from '@/components/global/Spinner'
import debounce from '@/lib/debounce'




import React, { useCallback, useEffect, useState } from 'react'

const MainModule = ({ itemsPerPage ,pageNo}) => {

    //   const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPublicQuery, setFilteredPublicQuery] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchResults = useCallback(
        debounce(async (searchQuery) => {

            try {
                setIsLoading(true)
                const response = await getSearchedPublicQuery(searchQuery,itemsPerPage,pageNo)
             
               console.log(response)
               
               setFilteredPublicQuery(response.queries)
                


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
        
         
            <div style={{ marginBottom: "5rem" }} className="input-group">

                <span className="input-group-text" id="">Search</span>

                <input style={{border:"2px"}} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control border-r-emerald-500" />

            </div>

            {(!isLoading ? <div style={{display:"flex",justifyContent:"center"}}>

                <div className={"hide-scrollbar"} style={{ height: "60vh", overflow: "scroll", width: "50%" }}>


                    {filteredPublicQuery.map((obj,index) => (
                        <>

                        <QueryModel createdAt={obj.createdAt} name={obj.name} message={obj.message} email={obj.email} key={index}/>
                        
                        </>
                    ))}</div>

            </div> : <Spinner />)
            }




        </>
    )
}

export default MainModule

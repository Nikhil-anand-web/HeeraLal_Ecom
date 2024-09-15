
"use client"
import getSearchedUser from '@/app/actions/getSearchedUser'
import UserModal from '@/components/adminComp/UserModal'
import Spinner from '@/components/global/Spinner'
import debounce from '@/lib/debounce'
import axios from 'axios'



import React, { useCallback, useEffect, useState } from 'react'

const MainModule = ({ itemsPerPage ,pageNo}) => {

    //   const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchResults = useCallback(
        debounce(async (searchQuery) => {

            try {
                setIsLoading(true)
                const response = await getSearchedUser(searchQuery,itemsPerPage,pageNo)
             
              
               
                    setFilteredUsers(response.users)
                


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
           <h3>Admins</h3>
            <div style={{ marginBottom: "5rem" }} className="input-group">

                <span className="input-group-text" id="">Full Name or User Name or Email</span>

                <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />

            </div>

            {(!isLoading ? <>

                <div className={"hide-scrollbar"} style={{ height: "72vh", overflow: "scroll", width: "100%" }}>


                    {filteredUsers.map((user) => (

                        <UserModal status={user.status} key={user.id} fullName={user.fullName} alt={user.alt} email={user.email} id={user.id} username={user.userName}  {...(user.profilePic ? { urlImg: user.profilePic?.url } : {})} />
                    ))}</div>

            </> : <Spinner />)
            }




        </>
    )
}

export default MainModule

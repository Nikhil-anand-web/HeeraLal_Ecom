
"use client"
import UserModal from '@/components/adminComp/UserModal'
import Spinner from '@/components/global/Spinner'
import AdminLayout from '@/layouts/AdminLayout'
import axios from 'axios'
import { useSession } from 'next-auth/react'


import React, { useEffect, useState } from 'react'

const page = () => {
  const { data: userSession } = useSession();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/v1/getUsers'); // Replace with your API endpoint
        if (response.data.users.profilePic) {
          response.data.users.profilePic = JSON.parse(response.data.users.profilePic)

        }

        setUsers(response.data.users);
        setFilteredUsers(response.data.users); // Initially, filteredUsers is the same as users

      } catch (error) {

      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(lowercasedQuery) ||
      user.userName.toLowerCase().includes(lowercasedQuery) ||
      user.email.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);




  return (
    <>

      {userSession?.permissions[0].userUpdate ? (!isLoading ? <>
        <div style={{ marginBottom: "5rem" }} className="input-group">

          <span className="input-group-text" id="">Full Name or User Name or Email</span>

          <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control" />

        </div>
        <div className={"hide-scrollbar"} style={{ height: "72vh", overflow: "scroll", width: "100%" }}>


          {filteredUsers.map((user) => (

            <UserModal status={user.status} setUsers={setUsers} key={user.id} fullName={user.fullName} alt={user.alt} email={user.email} id={user.id} username={user.userName}  {...(user.profilePic ? { urlImg: user.profilePic?.url } : {})} />
          ))}</div>

      </> : <Spinner />) : <div>
        <h3>view user</h3>
        <div>Access Denied</div>
      </div>
      }




    </>
  )
}

export default page

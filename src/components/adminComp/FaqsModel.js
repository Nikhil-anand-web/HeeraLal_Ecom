"use client"

import deleteFAQ from '@/app/actions/deleteFAQ'

import toggleFAQStatus from '@/app/actions/toggleFAQStatus'

import React from 'react'
import { toast } from 'react-toastify'

const FaqsModel = ({ faq }) => {

  const onDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete? This action cannot be undone.");
    if (!isConfirmed) return;  // Exit if the user cancels the action
    try {
      const bindedFunction = deleteFAQ.bind(null, faq.id)
      const res = await bindedFunction();
      if (!res.success) {
        throw res

      }
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.warning(res.message)
      }

    } catch (error) {
      console.log(error)
      toast.warning(error?.message || "something went wrong")




    }

  }




  const onToggleStatus = async () => {
    try {
      const bindedFunction = toggleFAQStatus.bind(null, faq.id)
      const res = await bindedFunction();
      if (!res.success) {
        throw res

      }

      toast.success(res.message)


    } catch (error) {
      console.log(error)

    }


  }



  if (!faq) return <div>no faq found</div>

  return (
    <div id={faq.id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
      <div className="row g-0">


        <div className="col-8">
          <div className="card-body py-2 px-3">
            <h6 className="card-title mb-1">Question :- {faq.question}</h6>
            <p className="card-text mb-1"><small className="text-muted">Answer :- {faq.answer}</small></p>
            {/* <p className="card-text mb-1"><small className="text-muted">Author :- {blog.author.userName}</small></p> */}

          </div>

        </div>

        <button onClick={onDelete} type="button" style={{
          margin: "10px",
          background: "red",
          border: "none",
          borderRadius: "inherit",
          color: "#fff",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Delete</button>


        {!faq.status ?
          <button onClick={onToggleStatus} type="button" style={{
            margin: "10px",
            background: "green",
            border: "none",
            borderRadius: "inherit",
            color: "#fff",
            fontSize: "14px",
            padding: "8px 15px"
          }}>Activate</button>
          :

          <button onClick={onToggleStatus} type="button" style={{
            margin: "10px",
            background: "yellow",
            border: "none",
            borderRadius: "inherit",
            color: "black",
            fontSize: "14px",
            padding: "8px 15px"
          }}>Deactivate</button>

        }


      </div>







    </div>
  )
}

export default FaqsModel

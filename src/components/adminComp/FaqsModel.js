"use client"

import deleteFAQ from '@/app/actions/deleteFAQ'

import toggleFAQStatus from '@/app/actions/toggleFAQStatus'

import React from 'react'
import { toast } from 'react-toastify'

const FaqsModel = ({ faq }) => {

  const onDelete = async () => {
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
      toast.warning(res?.message || "something went wrong")




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
      toast.warning(res?.message || "something went wrong")

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

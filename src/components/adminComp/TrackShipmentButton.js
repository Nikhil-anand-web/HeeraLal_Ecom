"use client"
import getAwbStatus from '@/app/actions/getAwbStatus'
import React from 'react'
import { toast } from 'react-toastify'

const TrackShipmentButton = ({style={},className={},awb}) => {

    const oncl = async ()=>{
        try {
            const res =  await getAwbStatus(awb)
            if (!res.success) {
                throw res
                
            }
            console.log(res.data)
            
        } catch (error) {
            console.log(error)
            toast.warning(error.message)
            
        }
    }
  return (
    <button style={style} className={className} onClick={oncl}>
        check
      
    </button>
  )
}

export default TrackShipmentButton

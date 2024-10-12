"use client"
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'

const DangerDiv = ({ htmlEl , className , style }) => {
    const [isMounted,setisMounted] = useState(false)
    useEffect(()=>{
        setisMounted(true)


    },[])

    if (!isMounted) {
        return null
        
    }
    return (


        <div className={className} style={style} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlEl) }} />

    )
}

export default DangerDiv

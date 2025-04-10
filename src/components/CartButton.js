"use client";

import React, { useEffect, useState } from 'react';
import CartCount from './global/CartCount';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CartButton = () => {
   
    const rtr =  useRouter()
    const ses = useSession();
   
    const isAuthenticated =  ses.status === "authenticated";
   
    
    const oncl = ()=>{
        if (isAuthenticated && ses.data && ses.data.role ===3) {
            rtr.push("/cart")
            
           
            
        }else{
            
            const crt = localStorage.getItem("cart");
            
            rtr.push(`/guest-cart/${crt}`)
        }
        
        
    }

 

    return (
        <li className="shopping-cart d-none d-lg-block">
            <button style={{backgroundColor : "transparent" , border : "none"}} onClick={oncl}>
                <span className="number" name={"cntdis"}><CartCount /></span>
                <i className="fa-solid fa-bag-shopping"></i>
            </button>
        </li>
    );
};

export default CartButton;

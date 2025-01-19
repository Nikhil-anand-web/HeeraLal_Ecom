"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import syncLocalCart from '@/app/actions/syncLocalCart';
import { useSWRConfig } from 'swr';

const SyncLocalStorage = () => {
    const { data: session, status } = useSession();
    const { mutate } = useSWRConfig();

    useEffect(() => {
        console.log("Session status:", status); // Debug the status
        const ftch = async () => {
            if (status === 'authenticated') {
                console.log("Inside the authenticated block");
                try {
                    const localCart = JSON.parse(localStorage.getItem("cart"));
                    if (localCart && Object.keys(localCart).length > 0) {
                        const res = await syncLocalCart(localCart);
                        console.log("Sync result:", res); // Debug the result
                       
                        localStorage.removeItem("cart");
                    }
                    mutate('/action/getCartCount');
                } catch (error) {
                    console.error("Error syncing local cart:", error);
                }
            }
        };

        ftch();
    }, [status]);

    return null;
};

export default SyncLocalStorage;

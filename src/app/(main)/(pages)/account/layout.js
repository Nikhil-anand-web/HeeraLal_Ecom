"use client"
import SignOut from "@/components/global/SignOut";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
    const url = usePathname()
    const arr = url.split('/')
    const active = arr[arr.length-1]
    return (

        <section className="login-page">
            <div className="container">
            <div className="row">
                <div className="row"></div>

                <div className="col-md-3">

                    <ul className="w-75 order-history-link">
                        <li className={`mb-2 ${active==='dashboard' && 'order-history-active'} `}><Link href="/account/dashboard"><i className="fa-solid fa-house me-2"></i>
                            Home</Link></li>
                        <li className={`mb-2 ${active==='orderHistory' && 'order-history-active'}`}><Link href="/account/orderHistory"><i className="fa-solid fa-bag-shopping me-2"></i> Order History</Link></li>

                        <li className={`mb-2 ${active==='profile' && 'order-history-active'} `}><Link href="/account/profile"><i className="fa-regular fa-user me-2"></i> Profile</Link></li>
                        <li className={`mb-2 ${active==='changePassword' && 'order-history-active'} `}><Link href="/account/changePassword"><i className="fa-solid fa-shield-halved me-2"></i> Change Password</Link></li>
                        <SignOut/>
                    </ul>
                </div>
                {children}


            </div>
            </div>
        </section>

    );
}

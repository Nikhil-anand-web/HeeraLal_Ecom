import SignOut from "@/components/global/SignOut";
import Link from "next/link";

export default function Layout({ children }) {
    return (

        <section className="login-page">
            <div className="container">
            <div class="row">
                <div className="row"></div>

                <div className="col-md-3">

                    <ul className="w-75 order-history-link">
                        <li className="mb-2  order-history-active"><Link href="/account/dashboard"><i className="fa-solid fa-house me-2"></i>
                            Home</Link></li>
                        <li className="mb-2"><Link href="/account/orderHistory"><i className="fa-solid fa-bag-shopping me-2"></i> Order History</Link></li>

                        <li className="mb-2"><Link href="/account/profile"><i className="fa-regular fa-user me-2"></i> Profile</Link></li>
                        <li className="mb-2"><Link href="/account/changePassword"><i className="fa-solid fa-shield-halved me-2"></i> Change Password</Link></li>
                        <SignOut/>
                    </ul>
                </div>
                {children}


            </div>
            </div>
        </section>

    );
}

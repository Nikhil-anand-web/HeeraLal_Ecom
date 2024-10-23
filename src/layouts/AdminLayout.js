import AdminHeader from "@/components/adminComp/AdminHeader";
import AdminNavbar from "@/components/adminComp/AdminNavbar";

import Image from "next/image";
import { Suspense } from "react";


import logo from '../images/logo1.png'


export default function AdminLayout({ children }) {
    return (
        <>
            <AdminHeader />





            <>

                <div className="container-fluid page-body-wrapper">
                    {/* partial:../../partials/_sidebar.html */}

                    <AdminNavbar />
                    {/* <TestNavBar/> */}
                    {/* partial */}
                    <div className="main-panel">
                        <div style={{


                        }} className="content-wrapper">
                            <Suspense fallback={<div className={"container7"}>
                                <div className={"brandLogo"}>
                                    <Image
                                        width={150}
                                        src={logo}
                                        alt="logo"
                                        className={"heartbeat"} // Apply heartbeat animation
                                    />
                                </div>
                            </div>}>
                                {children}

                            </Suspense>




                        </div>
                    </div>

                    {/* <div className="main-panel"> */}
                    {/* <div className="content-wrapper"></div> */}
                    {/* footer */}

                    {/* </div> */}
                    {/* main-panel ends */}
                </div>
            </>





        </>




    );
}

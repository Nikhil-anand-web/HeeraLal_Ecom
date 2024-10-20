import AdminHeader from "@/components/adminComp/AdminHeader";
import AdminNavbar from "@/components/adminComp/AdminNavbar";
import Spinner from "@/components/global/Spinner";
import TestNavBar from "@/components/TestNavBar";
import { Suspense } from "react";





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
                            <Suspense fallback={<Spinner/>}>
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


import Header from "@/components/Header";


import Footer from "@/components/Footer";
import { Suspense } from "react";

import Image from "next/image";
import logo from '../images/logo1.png'




export default function MainLayout({ children }) {
    return (
        <>


            <Header />


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




            <Footer />
        </>




    );
}

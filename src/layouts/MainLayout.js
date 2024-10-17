
import Header from "@/components/Header";


import Footer from "@/components/Footer";
import { Suspense } from "react";
import Spinner from "@/components/global/Spinner";




export default function MainLayout({ children }) {
    return (
        <>


            <Header />


            <Suspense fallback={<Spinner/>}>
                {children}

            </Suspense>




            <Footer />
        </>




    );
}

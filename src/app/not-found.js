import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";

// app/not-found.js
export default function NotFound() {
    return (
        <MainLayout>
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Image src={'/images/pageNotFound.jpg'} layout='responsive' width={100} height={100} />
            </div>
        </MainLayout>
    );
}

"use client"
import ProductCategories from '@/components/ProductCategories'

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const CatContainer = ({ categories, categorySlug }) => {
    const [swiperRef, setSwiperRef] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={width >= 996 ? 5 : 3}
                centeredSlides={false}
                // spaceBetween={15}
                // navigation={width >= 996}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                {categories.map(cat => <SwiperSlide style={{ margin: "10px" }}> <ProductCategories mode='products' activeCat={categorySlug} imageS={cat.image[0].url} catSlug={cat.slug} categoryName={cat.categoryName} goTo={`/products/${cat.slug}`} /> </SwiperSlide>)}






            </Swiper>



        </>

    )
}

export default CatContainer

"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import getNRecipe from "@/app/actions/getNRecipe";
import getYtThumbnail from "@/lib/getYtThumbnail";
import ModalOverlay from "./global/ModalOverlay";
import Spinner from "./global/Spinner";
import { useRouter } from "next/navigation";


const RecipeSlider = () => {
    const [width, setWidth] = useState(0);
    const [recipes, setRecipes] = useState([])
    const [show, setShow] = useState(false)
    const [ovtitle, setovtitle] = useState("")
    const [videosrc, setvideosrc] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const rtr = useRouter()

    useEffect(() => {
        setWidth(window.innerWidth);

        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        // return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            const res = await getNRecipe(0, 7);
            if (res.success) {
                setRecipes(res.data);
            }
        };
    
        fetchRecipes();
    }, []);
    
    const onReachEnd = async () => {
        setIsLoading(true)
        const res = await getNRecipe(recipes.length, recipes.length + 3);
        if (res.success) {
            setRecipes((e) => [...e, ...res.data])
        }
        setIsLoading(false)

    }

    return (
        <>
            {setShow && <ModalOverlay show={show} setShow={setShow} title={ovtitle}>
                <div style={{ height: "50vh" }}>
                    <iframe width="100%" height="100%" src={videosrc} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>

            </ModalOverlay>}

            <Swiper
                slidesPerView={width >= 996 ? 5 : 3}
                centeredSlides={false}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                onReachEnd={onReachEnd}

            >
                {recipes.map((rec) => <SwiperSlide key={rec.id}><div onClick={()=> rtr.push(`/recipe-details/${rec.id}`) }  className="card relative">
                    <img src={getYtThumbnail(rec.videoLink)} alt="test" className="w-full" />
                    <h3 className="recipe-name">{rec.name}</h3>
                    <button onClick={(event) => { event.stopPropagation();setovtitle(rec.name); setvideosrc(rec.videoLink); setShow(true) }} className="play-button"  >
                        <i class={`fa-brands fa-youtube fa-${width >= 1674 ? 5 : width >= 1282 ? 4 : width >= 570 ? 3 : 2}x`} style={{ color: "red" }}></i>
                    </button>
                </div></SwiperSlide>)}
                {isLoading && <SwiperSlide style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>

                    <Spinner />



                </SwiperSlide>}




            </Swiper>
        </>
    );
};

export default RecipeSlider;

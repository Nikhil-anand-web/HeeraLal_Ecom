
"use client"
import getQueryResult from '@/app/actions/getQueryResult';
import debounce from '@/lib/debounce';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React, { useCallback, useEffect, useState } from 'react'

const CustomSearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [arrayOfProduct, setArrayOfProduct] = useState([])
    const rtr = useRouter()
    const [isDopen, setIsDopen] = useState(false)
    const fetchResults = useCallback(
        debounce(async (searchQuery) => {

            try {
                const response = await getQueryResult(searchQuery)
                console.log(response)
                setArrayOfProduct(response.products)

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }, 500),
        []
    );
    useEffect(() => {
        const helper = () => {
            fetchResults(searchQuery)
        }
        helper()
    }, [searchQuery])
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                setIsDopen(false)

                // Add your escape key functionality here
            }
        };

        const handleClick = () => {
            setIsDopen(false)
            // Add your click functionality here
        };

        // Add event listeners
        window.addEventListener('keyup', handleKeyPress);
        document.addEventListener('click', handleClick);

        // Clean up event listeners on component unmount
        return () => {
            window.removeEventListener('keyup', handleKeyPress);
            document.removeEventListener('click', handleClick);
        };
    }, []);
    const onclk = (slug) => {
        rtr.push(`/product-details/${slug}`)
    }
    return (
        <li className="nav-item me-3 d-none d-lg-block">
            <form className="searchbar" action="product.html">
                <input onChange={(e) => {setSearchQuery(e.target.value)
                  if (e.target.value.length ===0) {
                    setIsDopen(false)
                    
                  }else{
                    setIsDopen(true)

                  }
                    
                }} value={searchQuery} className="form-control" type="search" placeholder="Search Here..." />

                {searchQuery.length > 0 && <button onClick={() => {
                    setSearchQuery('')
                    setIsDopen(false)

                }} className="sarchbtn" type="submit">x</button>}
            </form>
            {isDopen === true && <div style={{ width: "19%", position: "absolute", overflowX: "hidden", overflowY: "scroll", minWidth: "282px", backgroundColor: "white", borderRadius: "17px", marginTop: "5px", padding: "30px", height: "450px" }}>
                {arrayOfProduct && arrayOfProduct.length <= 0 && "No Product Found"}

                {arrayOfProduct.map((pro) => <div onClick={() => onclk(pro.slug)} className="dropdown-item hide-scrollbar">
                    <Image
                        width={200}
                        height={300}
                        src={pro.thumbNail[0].url}
                        alt="Product Thumbnail"
                        className="thumbnail-image"
                    />
                    <span className="product-name">{pro.name}</span>
                </div>)}


            </div>}
        </li>
    )
}

export default CustomSearchBar

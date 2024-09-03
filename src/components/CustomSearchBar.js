
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
    const onclk = (slug)=>{
        rtr.push(`/productDetails/${slug}`)
    }
    return (
        <li className="nav-item me-3 d-none d-lg-block">
            <form className="searchbar" action="product.html">
                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} className="form-control" type="search" placeholder="Search Here..." />

                {searchQuery.length > 0 && <button onClick={() => setSearchQuery('')} className="sarchbtn" type="submit">x</button>}
            </form>
            {arrayOfProduct.length > 0 && <div style={{ width: "19%", position: "absolute", backgroundColor: "white", borderRadius: "17px", marginTop: "5px", padding: "30px" }}>

                {arrayOfProduct.map((pro) => <div onClick={()=>onclk(pro.slug)} className="dropdown-item">
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

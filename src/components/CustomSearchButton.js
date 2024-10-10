"use client"
import getQueryResult from '@/app/actions/getQueryResult';
import debounce from '@/lib/debounce';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CustomSearchButton() {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    const onclk = (slug) => {
        rtr.push(`/product-details/${slug}`)
    }


    if (!isMounted) {
        return null

    }
    return (
        <>
            <li>
                <button onClick={handleShow} style={{backgroundColor:"transparent",border:"none"}}  ><i className="fa-solid fa-magnifying-glass"></i></button>

            </li>



            <Modal show={show} onHide={handleClose}>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                            <Form.Control
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter the keyword"
                                autoFocus
                            />
                        </Form.Group>
                        {arrayOfProduct.length > 0 && <div style={{ width: "94%", position: "absolute", backgroundColor: "white", borderRadius: "17px", marginTop: "29px", padding: "30px" }}>

                            {arrayOfProduct.map((pro) => <div onClick={() => onclk(pro.slug)} className="dropdown-item">
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


                    </Form>


                </Modal.Body>

            </Modal>
        </>
    );
}

export default CustomSearchButton;
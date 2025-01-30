"use client"
import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardTitle, CForm, CFormTextarea, CRating } from '@coreui/react-pro'
import { toast } from 'react-toastify';
import submitReview from '@/app/actions/submitReview';

const RatingComp = ({ productSlug }) => {
    const [currentValue, setCurrentValue] = useState(2);
    const [review, setReview] = useState('')
    const onclk = async () => {
        const obj = {
            productSlug,
            currentValue,
            review
        }

        try {
            const res = await submitReview(obj)
            if (!res.success) {
                throw res

            }
            toast.success(res.message)


        } catch (error) {
            console.log(error)
            toast.warning(error.message)

        }



    }

    return (
        <div>

            <CCard className="mb-3 text-center" style={{ width: '100%' }}>
                <CCardBody>
                    <CCardTitle>Rate this product</CCardTitle>
                    <CForm onSubmit={onclk}>
                        <CFormTextarea
                            id="exampleFormControlTextarea1"
                            label="Write some review"
                            rows={3}
                            value={review}
                            onChange={(e) => { setReview(e.target.value) }}
                        ></CFormTextarea>
                        <p style={{ marginBottom: "0px" }}>Give this product stars</p>
                        <div style={{ marginTop: "5px", marginBottom: "5px", display: "flex", justifyContent: "center" }}>


                            <CRating value={currentValue} onChange={(e) => { setCurrentValue(e) }} />
                        </div>
                    </CForm>


                    <CButton onClick={onclk} color="primary" type='submit' >
                        Submit
                    </CButton>
                </CCardBody>
            </CCard>

        </div>
    )
}

export default RatingComp

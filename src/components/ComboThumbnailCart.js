"use client";
import Image from 'next/image';
import React from 'react';

import calculateFinalPrice from '@/lib/calculateFinalPrice';

const ComboThumbnailCart = ({ combo }) => {
    var totalMrp = 0;
    const percentageDiscount = parseFloat(combo.discountInPercent);
    const thumbnails = combo.productVarients.map((varient) => {
        totalMrp += parseFloat(varient.mrp);
        return varient.product.thumbNail[0].url;
    });
    const actualPrice = calculateFinalPrice(totalMrp, percentageDiscount);

    return (
        <>
            <h4>{combo.name}</h4>
            <div className="col-12 d-flex align-items-center combotext">
                {thumbnails.map((th, index) => (
                    <React.Fragment key={index}>
                        <div>
                            <Image style={{ display: "block" }} src={th} width={75} height={100} alt="" />
                            <p>{combo.productVarients[index].product.name}</p>
                            <p>Weight - {combo.productVarients[index].weight}gm</p>
                            <p>MRP - {combo.productVarients[index].mrp}</p>
                        </div>
                        {index !== thumbnails.length - 1 ? "+" : ""}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

export default ComboThumbnailCart;

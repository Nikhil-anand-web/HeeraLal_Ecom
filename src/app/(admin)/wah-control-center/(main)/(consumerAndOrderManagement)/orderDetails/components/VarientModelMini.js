import calculateFinalPrice from '@/lib/calculateFinalPrice';
import Link from 'next/link';
import React from 'react';

const VarientModelMini = ({ dataArray, shortVarientIds=[] }) => {
    return (
        <div style={{ overflowY: "scroll", maxHeight: "63vh" }}>
            {dataArray.map((data, index) => {

                const result = shortVarientIds.find(item => item.id === data.varient.id);
                const shortComboQty = result?.shortQty ?? 0;

                return <div
                    key={index}
                    style={{
                        display: 'flex', flexWrap: 'wrap', gap: '20px',
                        border: '1px solid #ccc',
                        padding: '10px',
                    }}
                >
                    <h3><Link href={`/product-details/${data.varient.product.slug}`} > Item {index + 1}</Link></h3>
                    <div><strong>Quantity: </strong>{data.qty}</div>
                    <div><strong>MRP: </strong>{data.varient.mrp}</div>
                    <div><strong>Size: </strong>{data.varient.size}</div>
                    <div><strong>Bulk: </strong>{data.varient.isBulk ? 'Yes' : 'No'}</div>
                    <div><strong>Weight: </strong>{data.varient.weight} g</div>
                    <div><strong>Product Name: </strong>{data.varient.product.name}</div>
                    <div><strong>Varient Short: </strong>{shortComboQty===0? <span className="badge badge-success">{" Ideal "}</span> : <span className="badge badge-danger">{shortComboQty}</span>}</div>


                    <div><strong>Discount: </strong>{data.varient.discount}%</div>
                    <div><strong>Price After Discount: </strong>₹{calculateFinalPrice(data.varient.mrp, data.varient.discount)}</div>
                </div>
            })}
        </div>
    );
};

export default VarientModelMini;

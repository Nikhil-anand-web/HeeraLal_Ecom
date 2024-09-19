import calculateFinalPrice from '@/lib/calculateFinalPrice';
import React from 'react';

const VarientModelMini = ({ dataArray }) => {
    return (
        <div style={{ overflowY: "scroll", maxHeight: "63vh" }}>
            {dataArray.map((data, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex', flexWrap: 'wrap', gap: '20px',
                        border: '1px solid #ccc',
                        padding: '10px',
                    }}
                >
                    <h3>Item {index + 1}</h3>
                    <div><strong>Quantity: </strong>{data.qty}</div>
                    <div><strong>MRP: </strong>{data.varient.mrp}</div>
                    <div><strong>Size: </strong>{data.varient.size}</div>
                    <div><strong>Bulk: </strong>{data.varient.isBulk ? 'Yes' : 'No'}</div>
                    <div><strong>Weight: </strong>{data.varient.weight} kg</div>
                    <div><strong>Product Name: </strong>{data.varient.product.name}</div>
                    
                    {/* New Fields */}
                    <div><strong>Discount: </strong>{data.varient.discount}%</div>
                    <div><strong>Price After Discount: </strong>₹{calculateFinalPrice(data.varient.mrp, data.varient.discount)}</div>
                </div>
            ))}
        </div>
    );
};

export default VarientModelMini;

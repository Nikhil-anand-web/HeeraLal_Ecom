import Link from 'next/link';
import React from 'react';

const SingleOrder = ({ order, goTo = "#" }) => {
    return (
        <div style={{
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f1f1f1',
        }}>
            <div style={styles.orderContainer}>
                <div style={styles.orderItem}><strong>Order ID:</strong> {order.orderId}</div>

                <div style={styles.orderItem}><strong>Customer Name:</strong> {order.CustomerMeta.firstName} {order.CustomerMeta.lastName}</div>
                <div style={styles.orderItem}><strong>Final Price:</strong>  ₹{order.finalPrice}</div>
                <div style={styles.orderItem}><strong>Mobile:</strong>  {order.CustomerMeta.mobile}</div>
                <div style={styles.orderItem}><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</div>
                <div style={styles.orderItem}><strong>Payment Status:</strong>  {order.paymentStatus === 1 ? <span className="badge badge-success">{" Paid "}</span> : order.paymentToken?.STATUS?.lenght > 0 ? <span className="badge badge-danger">{" Payment Failed "}</span> : <span className="badge badge-danger">{" Un-Paid "}</span>}</div>
                <div style={styles.orderItem}><strong>Order Status:</strong> {order.orderStatus}</div>
                <div style={styles.orderItem}><strong>Shipping Status:</strong> {order.shipingStatus}</div>
                <div style={styles.orderItem}><strong>AWB:</strong> {order.awb ? order.awb : "not available"}</div>
               

            </div>
            <Link href={goTo}>
                    <button class="btn btn-success">
                        Details

                    </button>

                </Link>


        </div>
    );
};

// Styles for the component
const styles = {
    orderContainer: {
        display: 'flex',
        flexDirection: 'row',   // Arranges items in a row
        flexWrap: 'wrap',       // Wrap if needed on smaller screens
        gap: '15px',            // Gap between fields

    },
    orderItem: {
        minWidth: '150px',      // Ensures fields have some space
        padding: '5px',
    },
};

export default SingleOrder;

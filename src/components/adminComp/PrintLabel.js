"use client";
import React, { useState, useRef } from 'react';

const PrintLabel = ({ orderId, className }) => {
    const [loading, setLoading] = useState(false);
    const iframeRef = useRef(null);

    const handlePrint = async () => {
        setLoading(true); // Set loading state

        try {
            // Fetch the PDF from the server
            const response = await fetch('/api/v1/getLabel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([{ awb: orderId }]), // Send order ID as body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch the PDF');
            }

            const blob = await response.blob(); // Get the blob from response
            const url = URL.createObjectURL(blob); // Create a URL for the blob

            // Set the iframe src to the blob URL
            const iframe = iframeRef.current;
            iframe.src = url;

            // Wait for the iframe to load
            iframe.onload = () => {
                // Trigger the print dialog directly without opening a new window
                iframe.contentWindow.focus();
                iframe.contentWindow.print();

                // Clean up after printing
                URL.revokeObjectURL(url); // Clean up the URL object
            };
        } catch (error) {
            console.error(error);
            alert('Error printing the order: ' + error.message); // Handle error
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <button onClick={handlePrint} disabled={loading} className={className}>
                {loading ? 'Loading...' : 'Print Label'}
            </button>
            {/* Hidden iframe for printing */}
            <iframe ref={iframeRef} style={{ display: 'none' }} />
        </div>
    );
};

export default PrintLabel;

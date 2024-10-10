"use client"

import Image from 'next/image';
import { toast } from 'react-toastify';
import deleteAProduct from '@/app/actions/deleteAProduct';
import Spinner from '../global/Spinner';
import toggleProductStatus from '@/app/actions/toggleProductStatus';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';  // Add Font Awesome icons
import Link from 'next/link';
import DangerDiv from '../DangerDiv';

const ProductModel = ({ product, setRefetchComp }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // Expand/Contract state
    const qty = product.varient.reduce((acc, current) => acc + current.qty, 0);
    const mrpTotalInventory = product.varient.reduce((acc, current) => acc + (current.qty * current.mrp), 0);
    const tagString = product.tags.join(',');
    const router = useRouter();

    const onDelete = async () => {
        try {
            const resObj = await deleteAProduct(product.id);
            if (!resObj.success) throw resObj;

            setRefetchComp((pre) => !pre);
            toast.success(resObj.message);
        } catch (error) {
            console.error(error);
            toast.warning("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onStatusFlip = async () => {
        try {
            const res = await toggleProductStatus(product.id);
            if (!res.success) throw res;

            setRefetchComp((pre) => !pre);
            toast.success(res.message);
        } catch (error) {
            console.error(error);
            toast.warning(error?.message || "Something went wrong");
        }
    };

    if (!product) {
        return <div>No product information available.</div>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    const onClick = () => {
        router.push(`/wah-control-center/varients/${product.id}`);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const styles = {
        container: {
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '16px',
            cursor: 'pointer',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'row',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            transform: isExpanded ? 'scale(1.02)' : 'scale(1)',  // 3D scaling effect
        },
        image: {
            flexShrink: 0,
        },
        body: {
            padding: '12px 16px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'max-height 0.4s ease',
            maxHeight: isExpanded ? '1000px' : '150px',  // Transition for height change
            overflow: 'hidden',
        },
        title: {
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '6px',
            position: 'relative',
        },
        details: {
            fontSize: '14px',
            color: '#666',
            marginBottom: '6px',
        },
        badge: {
            borderRadius: '4px',
            padding: '2px 8px',
            fontSize: '12px',
        },
        successBadge: {
            backgroundColor: '#27ae60',
            color: '#fff',
        },
        dangerBadge: {
            backgroundColor: '#e74c3c',
            color: '#fff',
        },
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
        },
        button: {
            padding: '8px 12px',
            borderRadius: '4px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            flexGrow: 1,
        },
        deleteButton: {
            backgroundColor: '#e74c3c',
            color: '#fff',
            marginRight: '8px',
        },
        activateButton: {
            backgroundColor: '#27ae60',
            color: '#fff',
        },
        deactivateButton: {
            backgroundColor: '#f39c12',
            color: '#fff',
        },
        toggleButton: {
            position: 'absolute',
            top: '0',
            right: '0',
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',  // Smooth animation for the icon rotation
        },
        toggleIcon: {
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',  // Icon rotation animation
        },
        expandedContent: {
            display: isExpanded ? 'block' : 'none',
        },
    };

    return (

        <div id={product.id} style={styles.container}>
            <Link href={`/wah-control-center/varients/${product.id}`}>
                <Image
                    alt="product image"
                    width={100}
                    height={100}
                    style={styles.image}
                    src={product.thumbNail[0]?.url}
                />
            </Link>
            <div style={styles.body}>
                <h6 style={styles.title} onClick={toggleExpand}>
                    Product Name: {product.name}
                    <button style={styles.toggleButton} onClick={toggleExpand}>
                        {isExpanded ? <FaChevronUp style={styles.toggleIcon} /> : <FaChevronDown style={styles.toggleIcon} />}
                    </button>
                </h6>
                <p style={styles.details}><small className="text-muted">HighLights: {product.highLights}</small></p>
                <p style={styles.details}><small className="text-muted">Products in Inventory: {qty}</small></p>

                {/* Expanded Content */}
                <div style={styles.expandedContent}>
                    <p style={styles.details}><small className="text-muted">Product Slug: {product.slug}</small></p>
                    <p style={styles.details}><small className="text-muted">Category Slug: {product.category.slug}</small></p>
                    <p style={styles.details}><small className="text-muted">Cost of Inventory (MRP): ₹{mrpTotalInventory}</small></p>
                    <p style={styles.details}><small className="text-muted"> Description: <DangerDiv htmlEl={product.description}/></small></p>
                    <p style={styles.details}><small className="text-muted">Stars: {product.stars}</small></p>
                    <p style={styles.details}><small className="text-muted">Tags: {tagString}</small></p>
                    <p style={styles.details}><small className="text-muted">Variants: {product._count.varient}</small></p>
                    <p style={styles.details}><small className="text-muted">Recipes: {product._count.recipe}</small></p>
                    <p style={styles.details}>
                        <small className="text-muted">Show on Home: {product.showOnHome ? <span style={{ ...styles.badge, ...styles.successBadge }}>True</span> : <span style={{ ...styles.badge, ...styles.dangerBadge }}>False</span>}</small>
                    </p>
                    <p style={styles.details}><small className="text-muted">Featured: {product.isFeatured ? <span style={{ ...styles.badge, ...styles.successBadge }}>True</span> : <span style={{ ...styles.badge, ...styles.dangerBadge }}>False</span>}</small></p>
                    <p style={styles.details}><small className="text-muted">Best Seller: {product.isBestSeller ? <span style={{ ...styles.badge, ...styles.successBadge }}>True</span> : <span style={{ ...styles.badge, ...styles.dangerBadge }}>False</span>}</small></p>
                    <p style={styles.details}><small className="text-muted">Last Updated: {new Date(product.updatedAt).toLocaleDateString()}</small></p>
                    <p style={styles.details}><small className="text-muted">Created By: {product.createdBy.userName}</small></p>
                </div>

                <div style={styles.buttonsContainer}>
                    <button
                        onClick={onDelete}
                        style={{ ...styles.button, ...styles.deleteButton }}
                    >
                        Delete
                    </button>
                    <button
                        onClick={onStatusFlip}
                        style={{
                            ...styles.button,
                            ...(product.status ? styles.deactivateButton : styles.activateButton),
                        }}
                    >
                        {product.status ? 'Deactivate' : 'Activate'}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProductModel;



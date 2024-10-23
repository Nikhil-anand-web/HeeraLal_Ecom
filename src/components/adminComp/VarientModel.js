"use client"
import Image from 'next/image';
import { toast } from 'react-toastify';
import Spinner from '../global/Spinner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import deleteVarient from '@/app/actions/deleteVarient';
import toggleVarientStatus from '@/app/actions/toggleVarientStatus';
import makeAVarientDefault from '@/app/actions/makeAVarientDefault';
import updateVarient from '@/app/actions/updateVarient'; // Action to update varient
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Importing icons
import CheckBox from './forms/formComponent/CheckBox';

const VarientModel = ({ varient, setvarient, setRefetchComp }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Collapsible state
    const rtr = useRouter();

    // Local state for editing the varient's fields
    const [editData, setEditData] = useState({
        slug: varient.slug,
        weight: varient.weight,
        size: {
            length: JSON.parse(varient.size).length,
            bredth: JSON.parse(varient.size).bredth,
            height: JSON.parse(varient.size).height
        },
        maxQuantityForFewAvailable: varient.maxQuantityForFewAvailable,
        mrp: varient.mrp,
        discount: varient.discount,
        qty: varient.qty,
        wholeSalePrice: varient.wholeSalePrice,
        minQtyForBulkOrder: varient.minQtyForBulkOrder,
    });

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        if (name === 'length' || name === 'bredth' || name === 'height') {
            setEditData((prev) => ({
                ...prev,
                size: {
                    ...prev.size,
                    [name]: value,
                }
            }));
        } else {
            setEditData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const onSave = async () => {
        setIsLoading(true);
        try {
            const res = await updateVarient(varient.id, editData); // Call update action
            if (!res.success) {
                throw res;
            }
            if (setvarient) {
                setvarient((prev) =>
                    prev.map((obj) =>
                        obj.id === varient.id ? { ...obj, ...editData } : obj
                    )
                );
            } else {
                setRefetchComp((e) => !e);
            }
            toast.success(res.message || "Variant updated successfully!");
        } catch (error) {
            console.log(error);
            toast.warning(error.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete? This action cannot be undone.");
        if (!isConfirmed) return;  // Exit if the user cancels the action
        setIsLoading(true);
        try {
            const resObj = await deleteVarient(varient.id);
            if (!resObj.success) {
                throw resObj;
            }
            if (setvarient) {
                setvarient((prev) => prev.filter((obj) => obj.id !== varient.id));
            } else {
                setRefetchComp((e) => !e);
            }
        } catch (error) {
            console.error(error);
            toast.warning(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onStatusFlip = async () => {
        try {
            const res = await toggleVarientStatus(varient.id);
            if (!res.success) {
                throw res;
            }
            if (setvarient) {
                setvarient((prev) => {
                    const updatedVarients = prev.map((obj) =>
                        obj.id === varient.id ? { ...varient, status: !varient.status } : obj
                    );
                    return updatedVarients;
                });
            } else {
                setRefetchComp((e) => !e);
            }
            toast.success(res.message);
        } catch (error) {
            console.log(error);
            toast.warning(error.message);
        }
    };

    const makeVarientDefault = async () => {
        try {
            const res = await makeAVarientDefault(varient.id);
            if (!res.success) {
                throw res;
            }
            if (setvarient) {
                setvarient((prev) => {
                    const updatedVarients = prev.map((obj) =>
                        obj.id === varient.id ? { ...varient, isDefault: true, status: true } :
                            { ...obj, isDefault: false }
                    );
                    return updatedVarients;
                });
            } else {
                setRefetchComp((e) => !e);
            }
            toast.success(res.message);
        } catch (error) {
            console.log(error);
            toast.warning(error.message || "Something went wrong");
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.set("varient", varient.id)
        const resObj = await updateVarient(formData); // Pass formData to createBlog
        if (resObj.success) {
            toast.success(resObj.message);
        } else {
            toast.warning(resObj.message);
        }

    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div id={varient.id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }}>
            <div className="row g-0">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex" }}>
                        <Image alt={"product image"} width={500} height={500} style={{ height: "100px", width: "100px" }} src={varient.product.thumbNail[0]?.url} />
                        <div className="card-body py-2 px-3">
                            <h6 className="card-title mb-1">Slug: <input disabled type="text" name="slug" value={editData.slug} onChange={handleEditChange} /></h6>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="btn btn-link" style={{ textDecoration: 'none' }}>
                        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </button>
                </div>

                {isOpen && (
                    <div className="card-body">
                        {/* <p className="card-text mb-1"><small className="text-muted">Weight: <input type="number" name="weight" value={editData.weight} onChange={handleEditChange} /> gm</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Length: <input type="number" name="length" value={editData.size.length} onChange={handleEditChange} /> cm</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Bredth: <input type="number" name="bredth" value={editData.size.bredth} onChange={handleEditChange} /> cm</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Height: <input type="number" name="height" value={editData.size.height} onChange={handleEditChange} /> cm</small></p> */}
                        <form onSubmit={handleUpdate}>
                            <p className="card-text mb-1"><small className="text-muted">Max Quantity For Few Available: <input type="number" name="maxQuantityForFewAvailable" value={editData.maxQuantityForFewAvailable} onChange={handleEditChange} /></small></p>
                            <p className="card-text mb-1"><small className="text-muted">MRP: <input type="number" name="mrp" value={editData.mrp} onChange={handleEditChange} /></small></p>
                            <p className="card-text mb-1"><small className="text-muted">Discount: <input type="number" name="discount" value={editData.discount} onChange={handleEditChange} />%</small></p>
                            <p className="card-text mb-1"><small className="text-muted">Append</small></p> <input name="append" className="form-check-input" type="checkbox" id={"append"} />
                            <p className="card-text mb-1"><small className="text-muted">Varients in Inventory: <input type="number" name="qty" value={editData.qty} onChange={handleEditChange} /></small></p>
                            <p className="card-text mb-1"><small className="text-muted">Whole Sale Price: <input type="number" name="wholeSalePrice" value={editData.wholeSalePrice} onChange={handleEditChange} /></small></p>
                            <p className="card-text mb-1"><small className="text-muted">Minimum Quantity for Bulk: <input type="number" name="minQtyForBulkOrder" value={editData.minQtyForBulkOrder} onChange={handleEditChange} /></small></p>
                            <p className="card-text mb-1"><small className="text-muted">Created By: {varient.createdBy.userName}</small></p>
                            <button type='submit' className="btn btn-success">Save Changes</button>
                        </form>
                    </div>
                )}

                <div className="d-flex justify-content-end" style={{ margin: '10px 0' }}>
                    {varient.isDefault === false && (
                        <button onClick={makeVarientDefault} type="button" className="btn btn-success" style={{ margin: "5px", borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            Make Default
                        </button>
                    )}
                    {varient.isDefault === false && (
                        <button onClick={onDelete} type="button" className="btn btn-danger" style={{ margin: "5px", borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            Delete
                        </button>
                    )}
                    {varient.isDefault === false && (
                        <button onClick={onStatusFlip} type="button" className="btn" style={{ margin: "5px", background: varient.status ? 'yellow' : 'green', borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            {varient.status ? 'Deactivate' : 'Activate'}
                        </button>
                    )}
                    <button onClick={() => rtr.push(`/wah-control-center/updateVarient/${varient.id}`)} type="button" className="btn btn-primary" style={{ margin: "5px", borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        Edit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default VarientModel;

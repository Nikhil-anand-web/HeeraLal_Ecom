"use client"
import Image from 'next/image';
import { toast } from 'react-toastify';
import Spinner from '../global/Spinner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import deleteVarient from '@/app/actions/deleteVarient';
import toggleVarientStatus from '@/app/actions/toggleVarientStatus';
import makeAVarientDefault from '@/app/actions/makeAVarientDefault';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Importing icons

const VarientModel = ({ varient, setvarient ,setRefetchComp }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Collapsible state
    const rtr = useRouter();

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
            }else{
                setRefetchComp((e)=>!e)

            }
        } catch (error) {
            console.error(error);
            toast.warning(error.message);
        } finally {
            setIsLoading(false);
        }
    }

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
            }else{
                setRefetchComp((e)=>!e)
            }
            toast.success(res.message);
        } catch (error) {
            console.log(error);
            toast.warning(error.message);
        }
    }

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
            }else{
                setRefetchComp((e)=>!e)
            }
            toast.success(res.message);
        } catch (error) {
            console.log(error);
            toast.warning(error.message || "Something went wrong");
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
                            <h6 className="card-title mb-1">Slug: {varient.slug}</h6>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="btn btn-link" style={{ textDecoration: 'none' }}>
                        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </button>
                </div>

                {isOpen && (
                    <div className="card-body">
                        <p className="card-text mb-1"><small className="text-muted">Weight: {varient.weight} gm</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Length: { JSON.parse(varient.size).length} cm</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Bredth: { JSON.parse(varient.size).bredth}cm</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Height: { JSON.parse(varient.size).height}cm</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Category Slug: {varient.product.category.slug}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Max Quantity For Few Available: {varient.maxQuantityForFewAvailable}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">MRP: {varient.mrp}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Discount: {varient.discount}%</small></p>
                        <p className="card-text mb-1"><small className="text-muted">No of Combo Available: {varient._count.combo}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Cost of Inventory (MRP): ₹{varient.mrp * varient.qty}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Bulk Varient: {varient.isBulk ? <span className="badge badge-success">{" True "}</span> : <span className="badge badge-danger">{" False "}</span>}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Varients in Inventory: {varient.qty}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Default: {varient.isDefault ? <span className="badge badge-success">{" True "}</span> : <span className="badge badge-danger">{" False "}</span>}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Whole Sale Price: {varient.wholeSalePrice}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Minimum Quantity for Bulk: {varient.minQtyForBulkOrder}</small></p>
                        <p className="card-text mb-1"><small className="text-muted">Created By: {varient.createdBy.userName}</small></p>
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
}

export default VarientModel;

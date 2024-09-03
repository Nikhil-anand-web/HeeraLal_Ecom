"use client"
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";



export default  function CustomModal({show,onHide,onConform , title="Alert" , subtitle , body}) {
  
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)

    }, [])
    if (!mounted) {
        return null

    }
    return (
        <Modal
            
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="card text-center">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{subtitle}</h5>
                    <p className="card-text">{body}</p>
                    <a onClick={onConform} className="btn btn-success m-1">Conform</a>
                    <a onClick={onHide} className="btn btn-secondary m-1">Cancel</a>
                </div>
               
            </div>


        </Modal>
    );
}

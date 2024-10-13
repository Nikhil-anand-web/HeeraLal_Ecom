"use client"

import updateSetting from '@/app/actions/updateSetting';
import React, { useState } from 'react'
import { toast } from 'react-toastify';


const SettingModal = ({ setting }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        const isConfirmed = window.confirm("Are you sure you want to change the parameters");
        if (!isConfirmed) return;  // Exit if the user cancels the action
        e.preventDefault();
        const formData = new FormData(e.target);
        if (!(formData.get('value') || formData.get('dependency'))) {
            toast.warning("No data detected");
            return

            
        }
        
        setIsLoading(true);
        setError('');

       

        try {
            const resObj = await updateSetting(setting.id,formData);
            if (resObj.success) {
                toast.success(resObj.message);
            } else {
                toast.warning(resObj.message);
            }
        } catch (error) {
            console.error(error);
            toast.warning("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (!setting) return <div>no faq found</div>

    return (
        <div id={setting.id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
            <div className="row g-0 ">


                <div style={{ display: "flex" }}>
                    <div className="card-body py-2 px-3">
                        <h6 className="card-title mb-1">Setting Name :- {setting.settingName}</h6>
                        <h6 className="card-title mb-1">Value :- {setting.value}</h6>
                        <h6 className="card-title mb-1">Dependency :- {setting.dependency}</h6>
                        <p className="card-text mb-1"><small className="text-muted">Updated By :- {setting.updatedBy.userName}</small></p>
                    </div>
                    <form onSubmit={onSubmit} style={{margin:"27px"}}>
                        <div className="form-group" >
                           
                            <input name='value'  type='number'  className="form-control" id="val" placeholder="value" />
                          
                        </div>
                        <div className="form-group" >
                            
                            <input name='dependency'  type='number' className="form-control" id="dep" placeholder="Dependency" />
                          
                        </div>

                        {isLoading ? (
                            <button type="button" className="btn me-2 btn-gradient-primary" disabled>
                                Submitting...
                            </button>
                        ) : (
                            <button type="submit" className="btn me-2 btn-gradient-primary">
                                Submit
                            </button>
                        )}
                    
                    </form>
                    

                </div>
                <p>Warning :- Please insert values carefully</p>







            </div>







        </div>
    )
}

export default SettingModal

import React from 'react'
import img from '../../../../images/baharat-spice_01_470x509_crop_top.webp'
import Image from 'next/image'
const page = () => {
  return (
    <section className="login-page">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-4">
                <h1 className="text-center mb-5">Check Out</h1>
               
            </div>
        </div>

        <div className="row checkoutpage">
            <div className="col-md-6 leftpart border-end">
                <div className="px-4">
                    <div className="checkout-top d-flex justify-content-between">
                     <h5>Contact Info</h5>
                     
                    </div>
                    <form action="">
                     <div className="form-group mt-2 mb-3">
                       
                         <input type="text" placeholder="Email or mobile phone number" className="form-control"/>
                     </div>
                     <div className="form-group mt-2 mb-3">
                       
                         <input type="password" placeholder="Password" className="form-control"/>
                     </div>
                   
     
                     <h5>Delivery</h5>
                     <div className="row">
                         <div className="col-md-6">  <div className="form-group mt-3 mb-1"><input type="text" placeholder="First Name" className="form-control"/></div> </div>
                         <div className="col-md-6">  <div className="form-group mt-3  mb-1"><input type="text" placeholder="Last Name" className="form-control"/></div> </div>
                      
                     </div>
                     <div className="form-group mt-3 mb-3">
                         <textarea name="" rows="4" className="form-control" id="" style={{height:"70px"}}>Address</textarea>
                     </div>
                     <div className="form-group mt-3 mb-3">
                     <select name="" className="select-menu" id="">
                         <option value="1">Select State</option>
                         <option value="AP">Andhra Pradesh</option>
         <option value="AR">Arunachal Pradesh</option>
         <option value="AS">Assam</option>
         <option value="BR">Bihar</option>
         <option value="CT">Chhattisgarh</option>
         <option value="GA">Goa</option>
         <option value="GJ">Gujarat</option>
         <option value="HR">Haryana</option>
         <option value="HP">Himachal Pradesh</option>
         <option value="JH">Jharkhand</option>
         <option value="KA">Karnataka</option>
         <option value="KL">Kerala</option>
         <option value="MP">Madhya Pradesh</option>
         <option value="MH">Maharashtra</option>
         <option value="MN">Manipur</option>
         <option value="ML">Meghalaya</option>
         <option value="MZ">Mizoram</option>
         <option value="NL">Nagaland</option>
         <option value="OR">Odisha</option>
         <option value="PB">Punjab</option>
         <option value="RJ">Rajasthan</option>
         <option value="SK">Sikkim</option>
         <option value="TN">Tamil Nadu</option>
         <option value="TS">Telangana</option>
         <option value="TR">Tripura</option>
         <option value="UK">Uttarakhand</option>
         <option value="UP">Uttar Pradesh</option>
         <option value="WB">West Bengal</option>
         <option value="AN">Andaman and Nicobar Islands</option>
         <option value="CH">Chandigarh</option>
         <option value="DN">Dadra and Nagar Haveli and Daman and Diu</option>
         <option value="DL">Delhi</option>
         <option value="JK">Jammu and Kashmir</option>
         <option value="LA">Ladakh</option>
         <option value="LD">Lakshadweep</option>
         <option value="PY">Puducherry</option>
                     </select>
                     </div>
                     
     
                     
     
     
     
                     
                    
     
             
                     <button type="submit" className="d-none d-md-block  mt-3 pay-now-button btn">Pay now</button>
                    </form>

                </div>
            </div>

           

            <div className="col-md-6">
               <div className="pro-payment px-4">
                <div className="container-fluid">
                    <div className="row mb-5 align-items-center">
                        <div className="col-2 ">
                            <div className="p-1 border">
                               
                                <Image src={img} className="img-fluid" alt="" />
                            </div>
                           
                        </div>
                       
                        <div className="col-6">Black Pepper Whole</div>
                         <div className="col-1 p-0">Qty:  1</div>
                        <div className="col-3  text-end">$2.05</div>
                    </div>
                     <div className="row mb-5 align-items-center">
                        <div className="col-2 ">
                            <div className="p-1 border">
                            <Image src={img} className="img-fluid" alt="" />
                            </div>
                           
                        </div>
                       
                        <div className="col-6">Black Pepper Whole</div>
                         <div className="col-1 p-0">Qty:  1</div>
                        <div className="col-3  text-end">$2.05</div>
                    </div>
                     <div className="row mb-5 align-items-center">
                        <div className="col-2 ">
                            <div className="p-1 border">
                            <Image src={img} className="img-fluid" alt="" />
                            </div>
                           
                        </div>
                       
                        <div className="col-6">Black Pepper Whole</div>
                         <div className="col-1 p-0">Qty:  1</div>
                        <div className="col-3  text-end">$2.05</div>
                    </div>
                     <div className="row mb-5 align-items-center">
                        <div className="col-2 ">
                            <div className="p-1 border">
                            <Image src={img} className="img-fluid" alt="" />
                            </div>
                           
                        </div>
                       
                        <div className="col-6">Black Pepper Whole</div>
                         <div className="col-1 p-0">Qty:  1</div>
                        <div className="col-3  text-end">$2.05</div>
                    </div>
                    
                    <div className="row mb-2">
                        <div className="col-6">Subtotal</div>
                        <div className="col-6  text-end">$286.00</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-6">Shipping</div>
                        <div className="col-6  text-end">$100.00</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <span className="total-heading">Total</span>
                        </div>
                        <div className="col-6 text-end">
                            <div className="total-price">
                
                                <span className="total-heading"> $386.00</span>
                               
                            </div>
                          
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button type="submit" className="d-block d-md-none mt-3 pay-now-button btn">Pay now</button>
                        </div>
                    </div>
                </div>
               </div>

            </div>
          </div>
        </div>

  </section>
  )
}

export default page

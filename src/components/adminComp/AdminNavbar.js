"use client"
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars } from 'react-icons/fa';
import Accordion from 'react-bootstrap/Accordion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const rtr = useRouter()
  const { data: user } = useSession();


  const fullName = user?.fullName
  var role = user?.role


  var url = "/images/faces-clipart/pic-1.png"
  var alt = "alt"

  if (user && user.profilePic) {
    const obj = JSON.parse(user.profilePic)
    url = obj?.url
    alt = obj?.alt


  }

  return (
    <div className="d-flex">
      {/* Toggle Button */}
      <button style={{ borderTopRightRadius: "21px", borderBottomRightRadius: "21px" }} className="btn btn-primary m-2" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar - Conditional rendering based on isOpen */}
      {isOpen && (
        <div style={{ height: "91vh", overflowY: "scroll", marginTop: "8px", borderRadius: "21px" }} className="  sidebar p-3">
          <h2 className="text-center">My App</h2>
          <ul className="nav">
            <li className="nav-item nav-profile">
              <a href="#" className="nav-link">
                <div className="nav-profile-image">
                  {/* <Image src={url} width={500} height={600} alt="profile" /> */}
                  <span className="login-status online" />
                  {/* Change to offline or busy as needed */}
                </div>
                <div className="nav-profile-text d-flex flex-column">
                  <span className="font-weight-bold mb-2">{fullName}</span>
                  <span className="text-secondary text-small">
                    {role === 1 ? "SuperUser" : "Admin"}
                  </span>
                </div>
              </a>
            </li>
            <Accordion.Header onClick={() => { rtr.push("/wah-control-center/") }} className={"no-border-children "} >Dashboard </Accordion.Header>

            <Accordion className={"no-border-children "} defaultActiveKey={['0']} alwaysOpen>

              {user?.permissions[0].productAndInventory ? <Accordion.Item eventKey="0">
                <Accordion.Header >Product & inventory </Accordion.Header>
                <Accordion.Body >
                  <Accordion defaultActiveKey={['0']} >
                    <Accordion.Item eventKey="1">
                      <Accordion.Header >Categories</Accordion.Header>
                      <Accordion.Body >
                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/addCategory">
                            Add Category
                          </Link>

                        </span>
                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/categories">
                            All Categories
                          </Link>


                        </span>
                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/updateCategoy">
                            Update Categories
                          </Link>


                        </span>
                      </Accordion.Body>
                    </Accordion.Item>

                  </Accordion>
                
                  <Accordion defaultActiveKey={['0']} >
                    <Accordion.Item eventKey="2">
                      <Accordion.Header >Product</Accordion.Header>
                      <Accordion.Body >
                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/addProduct">
                            Add product
                          </Link>

                        </span>
                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/products">
                            All Products
                          </Link>


                        </span>
                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/updateProduct">
                            Update product
                          </Link>


                        </span>
                      </Accordion.Body>
                    </Accordion.Item>

                  </Accordion>
                  <Accordion defaultActiveKey={['0']} >
                    <Accordion.Item eventKey="3">
                      <Accordion.Header >Varients</Accordion.Header>
                      <Accordion.Body >
                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/addVarient">
                            Add varient
                          </Link>

                        </span>
                        

                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/updateVarient">
                            Update varient
                          </Link>


                        </span>
                        <span className="nav-item">
                          <Link className="nav-link" href="/wah-control-center/remainingFewAndNegativeVarients">
                            Critical varients
                          </Link>


                        </span>
                      </Accordion.Body>
                    </Accordion.Item>

                  </Accordion>

                </Accordion.Body>
              </Accordion.Item> : ''}
              {user?.permissions[0].userUpdate ? <Accordion.Item eventKey="1">
                <Accordion.Header>User Management</Accordion.Header>
                <Accordion.Body>
                  {user?.role === 1 && <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/addUser">
                      Add User
                    </Link>


                  </span>}
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/updateUser">
                      Update User
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/users">
                      Users
                    </Link>


                  </span>
                </Accordion.Body>
              </Accordion.Item> : ''}
              {user?.permissions[0].complementaryContentManagment ? <Accordion.Item eventKey="2">
                <Accordion.Header>Complementary Content Management</Accordion.Header>
                <Accordion.Body>

                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/addBlogs">
                      Add Blogs
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/addFAQ">
                      Add Faq
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/blogs">
                      Blogs
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/faqs">
                      FAQs
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/addRecipe">
                      Add Recipe
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/queries">
                    Queries
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/recipes">
                      Recipe
                    </Link>


                  </span>
                </Accordion.Body>
              </Accordion.Item> : ''}
              {user?.permissions[0].siteManagement ? <Accordion.Item eventKey="3">
                <Accordion.Header>Site Management</Accordion.Header>
                <Accordion.Body>

                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/banners">
                      Banners
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/slider">
                      Slider
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/updateStaticData">
                    Update Static Data
                    </Link>


                  </span>

                </Accordion.Body>
              </Accordion.Item> : ''}
              {user?.permissions[0].offersAndDiscounts ? <Accordion.Item eventKey="4">
                <Accordion.Header>Offers And Discounts</Accordion.Header>
                <Accordion.Body>

                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/addCombo">
                      Add Combo
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/combo">
                      Combo
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/addCoupon">
                      Add Coupon
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/coupons">
                      Coupon
                    </Link>


                  </span>

                </Accordion.Body>
              </Accordion.Item> : ''}
              {user?.permissions[0].consumerAndOrderManagement ? <Accordion.Item eventKey="5">
                <Accordion.Header>Customer and Order Management</Accordion.Header>
                <Accordion.Body>

                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/customers">
                      Customers
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/paidAndPendingOrders">
                      Paid And Pending Orders
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/processingAndAwbGeneratedOrders">
                      Processing And AWB Generated Orders
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/shortOrders">
                      Short Orders
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/allOrders">
                      All Orders
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/cancelledAndRefundedOrders">
                      Cancelled And Refunded Orders
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/cancelledButNotRefunded">
                      Cancelled But Not-Refunded Orders
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/compleatedOrders">
                      Compleated Orders
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/ordersWithReferal">
                      Orders With Referal
                    </Link>


                  </span>

                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/paymentFailedOrders">
                      Payment Failed Orders
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/orderCancellationRequest">
                      Order Cancellation Request 
                    </Link>


                  </span>
                  <span className="nav-item">
                    <Link className="nav-link" href="/wah-control-center/abandonedCart">
                    Abandoned Carts 
                    </Link>


                  </span>


                </Accordion.Body>
              </Accordion.Item> : ''}
            </Accordion>

            {user?.permissions[0].globalSetting ?
              <Accordion.Header onClick={() => { rtr.push("/wah-control-center/globalSettings") }} className={"no-border-children"} >
                Global Setting
              </Accordion.Header>
              : ""}
            {user?.permissions[0].archives ?
              <Accordion.Header onClick={() => { rtr.push("/wah-control-center/archives") }} className={"no-border-children"} >
               Archives
              </Accordion.Header>
              : ""}


          </ul>
        </div>
      )}


    </div>
  );
};

export default Sidebar;

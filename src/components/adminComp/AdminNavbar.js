"use client"
import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
const AdminNavbar = () => {
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
    <>

      <nav className="sidebar sidebar-offcanvas absolute" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="#" className="nav-link">
              <div className="nav-profile-image">
                <Image src={url} width={500} height={600} alt="profile" />
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
          <Accordion.Header onClick={()=>{rtr.push("/wah-control-center/")}} className={"no-border-children "} >Dashboard </Accordion.Header>
          
          <Accordion className={"no-border-children "} defaultActiveKey={['0']} alwaysOpen>

            {user?.permissions[0].productAndInventory ?<Accordion.Item eventKey="0">
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
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>

              </Accordion.Body>
            </Accordion.Item>:''}
           {user?.permissions[0].userUpdate ? <Accordion.Item eventKey="1">
              <Accordion.Header>User Management</Accordion.Header>
              <Accordion.Body>
               { user?.role===1 && <span className="nav-item">
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
            </Accordion.Item>:''}
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
                  <Link className="nav-link" href="/wah-control-center/recipes">
                     Recipe
                  </Link>


                </span>
              </Accordion.Body>
            </Accordion.Item>:''}
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
               
              </Accordion.Body>
            </Accordion.Item>:''}
           {user?.permissions[0].siteManagement ? <Accordion.Item eventKey="4">
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
            </Accordion.Item>:''}
          </Accordion>

          {user?.permissions[0].globalSetting?
            <Accordion.Header onClick={()=>{rtr.push("/wah-control-center/globalSettings")}} className={"no-border-children"} > 
            Global Setting
         </Accordion.Header>
            :""} 


        </ul>
      </nav>


    </>
  )
}

export default AdminNavbar

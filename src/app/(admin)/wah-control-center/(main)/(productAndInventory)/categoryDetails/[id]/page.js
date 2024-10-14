import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'



const page = async (prop) => {
    const user = await getServerSession(authOptions)
    if (user && user.permissions?.length>0&&!user.permissions[0].productAndInventory) return <div>Access Denied</div>
    console.log(prop)
    if (!user || (user.role !== 1 && user.role !== 2) || user.status == 0) {
        return <div>Access Denied</div>
    }
    const userPermission = await db.permissions.findUnique({
        where: { adminId: user.id },
        select: { productAndInventory: true }
    });

    if (!userPermission.productAndInventory) {
        return <div>Access Denied</div>

    };
    const requestedCategory = await db.category.findUnique({
        where: { id: prop.params.id },
        // include: { parent: true, createdBy: true }
        select:{
            categoryName:true,
            slug:true,
            createdBy:{
                select:{
                    userName:true
                }
            },
            status:true,
            showOnHome:true,
            createdAt:true,
            updatedAt:true,
            parent:{
                select:{
                    slug:true
                }
            },
            children:{select:{
                id:true,
                slug:true
            }},
            _count:{
                select:{
                    product:true
                }
            }
        }
    })
    console.log(requestedCategory)


    return (
        <>

            <section className="bg-light py-3 py-md-5 py-xl-8">


                <div className="container">
                    <div className="row gy-lg-0">

                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <ul className="nav nav-tabs" id="profileTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview-tab-pane" type="button" role="tab" aria-controls="overview-tab-pane" aria-selected="true">Overview</button>
                                        </li>

                                    </ul>
                                    <div className="tab-content pt-4" id="profileTabContent">
                                        <div className="tab-pane fade show active" id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab" tabIndex="0">



                                            <div className="row g-0">
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Category Name</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3 form-check form-switch">
                                                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                        <div className="p-2">{requestedCategory.categoryName}</div>
                                                    </div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Slug</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{requestedCategory.slug  }</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Parent Slug</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{requestedCategory.parent?.slug || "Root"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Number of Product Under Category</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{requestedCategory._count.product }</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Status</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedCategory.status === 1 ? 'active' : 'not active'}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Show On Home</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedCategory.showOnHome}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Creater User Name</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedCategory.createdBy.userName}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Date Of Creation</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedCategory.createdAt}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Last Edit</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedCategory.updatedAt}`}</div>
                                                </div>


                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Children Slug</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    
                                                    {requestedCategory.children.length===0? "No children": requestedCategory.children.map((child)=><div key={child.id} className="p-2">{child.slug}</div>)}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="tab-pane fade" id="email-tab-pane" role="tabpanel" aria-labelledby="email-tab" tabIndex="0">



                                            <form className="row g-0">
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">First Name</div>
                                                </div>
                                                
                                            </form>
                                        </div> */}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default page

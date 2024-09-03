import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AdminLayout from '@/layouts/AdminLayout'
import { getServerSession } from 'next-auth'


const page = async (prop) => {
    const user = await getServerSession(authOptions)
    if (!user.permissions[0].userUpdate) return <div>Access Denied</div>
    console.log(prop)
    if (!user || (user.role !== 1 && user.role !== 2) || user.status == 0) {
        return <div>Access Denied</div>
    }
    const userPermission = await db.permissions.findUnique({
        where: { adminId: user.id },
        select: { userUpdate: true }
    });

    if (!userPermission.userUpdate) {
        return <div>Access Denied</div>

    };
    const requestedUser = await db.admin.findUnique({
        where: { id: prop.params.id },
        select: {
            fullName: true,
            userName: true,
            email: true,
            status: true,
            gender: true,
            lastLogin: true,
            lastLoginIp: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            permissions: {

            }
        }
    })
    console.log(requestedUser)


    return (
        <>

            <section  className="bg-light py-3 py-md-5 py-xl-8">


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
                                    <div className={"hide-scrollbar tab-content pt-4"} style={{height:"72vh",overflow:"scroll",width:"100%"}} id="profileTabContent">
                                        <div className="tab-pane fade show active" id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab" tabIndex="0">



                                            <div className="row g-0">
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Full Name</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3 form-check form-switch">
                                                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                        <div className="p-2">{requestedUser.fullName}</div>
                                                    </div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">User Name</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{requestedUser.userName}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Role</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{requestedUser.role == 1 ? "SuperUser" : "Admin"}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Last Login</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedUser.lastLogin}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Last LoginIp</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedUser.lastLoginIp}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Email</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedUser.email}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Date of Enrollment</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedUser.createdAt}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Last Edit</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedUser.updatedAt}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Gender</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedUser.gender == "1" ? "male" : "female"}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Role</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2">{`${requestedUser.role == "1" ? "SuperUser" : "Admin"}`}</div>
                                                </div>
                                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                                    <div className="p-2">Permissions</div>
                                                </div>
                                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                                    <div className="p-2"></div>
                                             {    Object.entries(requestedUser.permissions[0]).map(([key, value]) => 
                                                       { 
                                                        if (key ==="id"||key ==="adminId") {
                                                            return
                                                            
                                                        }
                                                        return <div key={key} className="p-2">{key} :- {value?"true":"false"} </div>}
                                                        )
                                             }
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






import PieChart from '@/components/adminComp/PieChart'
import SalesChart from '@/components/adminComp/SalesChart'
import SendEmail from '@/components/adminComp/SendEmail'
import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'
import Link from 'next/link'



const Page = async () => {
  

  const totalOrders = await db.orders.count({
    where: {
      AND: [{
        CustomerMeta: {
          not: null,  // This filters out orders where CustomerMeta is  not null
        }
      }, { paymentToken: { not: null } }]

    }


  })
  const paidAndPending = await db.orders.count({
    where: {
      AND: [{ orderStatus: 0 }, { paymentStatus: 1 }]

    }


  })
  const compleatedOrders = await db.orders.count({
    where: {
      AND: [{ orderStatus: 2 }, { paymentStatus: 1 }, { awb: { not: null } }]

    }


  })
  const ProcessingAndAwb = await db.orders.count({
    where: {
      AND: [{ orderStatus: 1 }, { paymentStatus: 1 }, { awb: { not: null } }]

    }

  })

  const canButNREf = await db.orders.count({
    where: {
      AND: [{ orderStatus: 3 }, { paymentStatus: 1 }]

    }


  })
  const refunded = await db.orders.count({
    where: {
      AND: [{ orderStatus: 3 }, { paymentStatus: 2 }]

    }
  })


  const short = await db.orders.count({
    where: {
      AND: [{ shortItmsMeta: { not: null } }, { shortItmStatus: 1 }, {
        orderStatus: {
          not: {
            gt: 1
          }
        }
      }]

    }


  })
 
  const pieDataArr = [paidAndPending, ProcessingAndAwb, canButNREf, short]
  const pieLabel = ["Paid and pending", "Processing and awb gen.", "Canceled but not refunded", "short Order"]




  return (
    <AdminLayout>
    

      <div className={"hide-scrollbar"} style={{ height: "90vh", overflow: "scroll", width: "100%" }}>
        <div className="row">
       <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">
                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                <h4 className="font-weight-normal mb-3"><Link style={{color:"white"}} href={"/wah-control-center/allOrders"}>Total Orders
                </Link> </h4>
                <h2 className="mb-5"> {totalOrders} </h2>

              </div>
            </div>
          </div>
          
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                <h4 className="font-weight-normal mb-3"><Link style={{color:"white"}} href={"/wah-control-center/paidAndPendingOrders"}>Paid Pending Orders
              </Link>  </h4>
                <h2 className="mb-5">{paidAndPending}</h2>

              </div>
            </div>
          </div>

          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                <h4 className="font-weight-normal mb-3"><Link style={{color:"white"}} href={"/wah-control-center/compleatedOrders"}>Completed Orders
               </Link> </h4>
                <h2 className="mb-5">{compleatedOrders}</h2>

              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                <h4 className="font-weight-normal mb-3"><Link style={{color:"white"}} href={"/wah-control-center/processingAndAwbGeneratedOrders"}>Processing Orders And AWB Gen.
               </Link> </h4>
                <h2 className="mb-5">{ProcessingAndAwb}</h2>

              </div>
            </div>
          </div>

          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">
                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                <h4 className="font-weight-normal mb-3">Canceled  Orders
                </h4>

                <span style={{ fontSize: "20px", display: "block" }}> <Link style={{color:"white"}} href={"/wah-control-center/cancelledButNotRefunded"}>Not Refunded</Link> -  <span className="mb-5"> {canButNREf}</span></span>
                <span style={{ fontSize: "20px", display: "block" }}> <Link style={{color:"white"}} href={"/wah-control-center/cancelledAndRefundedOrders"}> Refunded </Link>-  <span className="mb-5"> {refunded}</span></span>






              </div>
            </div>
          </div>
         
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                <h4 className="font-weight-normal mb-3"><Link style={{color:"white"}} href={"/wah-control-center/shortOrders"}>Short Orders To Be Handeled
               </Link> </h4>
                <h2 className="mb-5">{short}</h2>

              </div>
            </div>
          </div>

        </div>
       
        <div style={{ backgroundColor: "white", marginBottom: "50px", padding: "50px" }} className="row">
          <SalesChart style={{ width: "50%", height: "50vh", display: "flex" }} />


        </div>
        <PieChart pieDataArr={pieDataArr} pieLabel={pieLabel} />
     


      </div>
    </AdminLayout>


  )
}

export default Page

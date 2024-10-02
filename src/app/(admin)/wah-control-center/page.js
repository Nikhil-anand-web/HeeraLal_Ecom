



import AdminLayout from '@/layouts/AdminLayout'
import db from '@/lib/db'



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
 const  compleatedOrders = await db.orders.count({
    where: {
      AND: [{ orderStatus: 2 }, { paymentStatus: 1 }, { awb: { not: null } }]

    }


  })
  const ProcessingAndAwb = await db.orders.count({
    where: {
      AND: [{ orderStatus: 2 }, { paymentStatus: 1 }, { awb: { not: null } }]

    }

  })

  const canButNREf  = await db.orders.count({
    where:{
      AND:[{orderStatus:3},{paymentStatus:2},{awb:{not:null}}]

    }


  })
  


  const refunded = await db.orders.count({
    where:{
      AND:[{orderStatus:3},{paymentStatus:1},{awb:{not:null}}]

    }
  })

  
  const short = await db.orders.count({
    where:{
      AND:[{shortItmsMeta:{not:null}},{shortItmStatus:1},{orderStatus:{
        not:{
          gt:1
        }
      }}]

    }


  })
 

  return (
    <AdminLayout>

      <div className={"hide-scrollbar"} style={{ height: "90vh", overflow: "scroll", width: "100%" }}>
        <div class="row">
          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-danger card-img-holder text-white">
              <div class="card-body">
                <img src="images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                <h4 class="font-weight-normal mb-3">Total Orders
                </h4>
                <h2 class="mb-5"> {totalOrders}</h2>

              </div>
            </div>
          </div>
          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-info card-img-holder text-white">
              <div class="card-body">
                <img src="images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                <h4 class="font-weight-normal mb-3">Paid Pending Orders
                </h4>
                <h2 class="mb-5">{paidAndPending}</h2>

              </div>
            </div>
          </div>

          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-success card-img-holder text-white">
              <div class="card-body">
                <img src="images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                <h4 class="font-weight-normal mb-3">Compleated Orders
                </h4>
                <h2 class="mb-5">{compleatedOrders}</h2>
               
              </div>
            </div>
          </div>
          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-success card-img-holder text-white">
              <div class="card-body">
                <img src="images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                <h4 class="font-weight-normal mb-3">Processing Orders And AWB Gen.
                </h4>
                <h2 class="mb-5">{ProcessingAndAwb}</h2>
               
              </div>
            </div>
          </div>

          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-danger card-img-holder text-white">
              <div class="card-body">
                <img src="images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                <h4 class="font-weight-normal mb-3">Canceled  Orders
                </h4>
               
                <span  style={{fontSize:"20px",display:"block"}}> Not Refunded -  <span class="mb-5"> {canButNREf}</span></span>
                <span style={{fontSize:"20px",display:"block"}}>  Refunded -  <span class="mb-5"> {refunded}</span></span>
                
               
              
                
               

              </div>
            </div>
          </div>
          <div class="col-md-4 stretch-card grid-margin">
            <div class="card bg-gradient-success card-img-holder text-white">
              <div class="card-body">
                <img src="images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                <h4 class="font-weight-normal mb-3">Short Orders To Be Handeled
                </h4>
                <h2 class="mb-5">{short}</h2>
               
              </div>
            </div>
          </div>

        </div>


      </div>
    </AdminLayout>


  )
}

export default Page

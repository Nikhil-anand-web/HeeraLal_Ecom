import CarouselComp from "@/components/CarouselComp";

import ProductCategories from "@/components/ProductCategories";
import BottomBanner from "@/components/BottomBanner";

import TopSellingProduct from "@/components/TopSellingProduct";
import BlogContent from "@/components/BlogContent";
import MainLayout from "@/layouts/MainLayout";

import MustHaveSection from "@/components/MustHaveSection";
import db from "@/lib/db";

export default async function Home() {
 
  var categories = await db.category.findMany({
    where:{
      AND:[{showOnHome:true},{status:1}]
    },
    select: {
      categoryName: true,
      slug: true,
      image: true,
      id: true
    },
    orderBy: {
      displayOrder: 'asc', // Order by 'displayOrder' in ascending order
    },
  })
  categories.forEach(cat => {
    cat.image = JSON.parse(cat.image)
    
  });
  const productsTopSelling = await db.product.findMany({
    where: {

      AND: [{
        tags: {
          array_contains: ['topSelling'],  // Check if the tags array contains "mustHave"
        }
      }, {


        showOnHome: true


      },{
        status:true
      }]
    },

    select: {
      id: true,
      name: true,
      stars: true,
      thumbNail: true,
      slug:true,
      varient: {
        where: {
          isDefault: true
        },
        select: {
          id: true,
          mrp: true,
          slug:true,
          discount:true
        }
        
        

      }

    }
  })
 
  
  const productsTrending = await db.product.findMany({
    where: {

      AND: [{
        tags: {
          array_contains: ['trending'],  // Check if the tags array contains "mustHave"
        }
      }, {


        showOnHome: true


      },{
        status:true
      }]
    },

    select: {
      id: true,
      name: true,
      stars: true,
      thumbNail: true,
      slug:true,
      varient: {
        where: {
          isDefault: true
        },
        select: {
          id: true,
          mrp: true,
          slug:true,
          discount:true
        }

      }

    }
  })

 
  const productRecentlyAdded = await db.product.findMany({
    where: {

      AND: [{
        tags: {
          array_contains: ['recentlyAdded'],  // Check if the tags array contains "mustHave"
        }
      }, {


        showOnHome: true


      },{
        status:true
      }]
    },

    select: {
      id: true,
      name: true,
      stars: true,
      thumbNail: true,
      slug:true,
      varient: {
        where: {
          isDefault: true
        },
        select: {
          id: true,
          mrp: true,
          slug:true,
          discount:true
        }

      }

    }
  })

  const blogs = await db.blog.findMany({
    where:{
      status:1

    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,  
    select:{
      brief:true,
      title:true,
      urlSlug:true,
      thumbnailImage:true,
      createdAt:true
    }
  });
  const productTopRated = await db.product.findMany({
    where: {



      AND: [{
        tags: {
          array_contains: ['toprated'],  // Check if the tags array contains "mustHave"
        }
      }, {


        showOnHome: true


      },{
        status:true
      }]

    },

    select: {
      id: true,
      name: true,
      stars: true,
      thumbNail: true,
      slug:true,
      varient: {
        where: {
          isDefault: true
        },
        select: {
          id: true,
          mrp: true,
          slug:true,
          discount:true
        }
      }

    }
  })
const sliderRooot0 = await db.slider.findMany({
   where:{
    AND :[{pageSlug:'root'},{displayOrder:0}]
   },select:{
    images:true
   }

})


 const bottomBanner =  await db.banners.findFirst({
  where:{

    AND:[{pageSlug:"root"},{displayOrder:1}]
  }
 })
 const mustHaveSectionBanners = await db.banners.findMany({
  where:{
    AND:[{pageSlug:"root"},{OR:[{displayOrder:4},{displayOrder:2},{displayOrder:3}]}]
  },orderBy: {
    displayOrder: 'asc', // or 'desc'
  },

 })

  return (
    <MainLayout>
      <main>
        <CarouselComp images={sliderRooot0[0].images}  />
        <section className="categoriesbox pb-0">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 text-center">
                <h2 className="primary-color mb-2">Browse By Categories</h2>
                <p className="gray4">Explore & Choose</p>
              </div>
            </div>
            <div className="row">
              {categories.map(cat => <ProductCategories imageS={cat.image[0].url} categoryName={cat.categoryName} goTo={`/products/${cat.slug}`} />)}



            </div>

            <div className="row ">

              <div className="col-md-12">
                <div className="funfact pt-5  d-none d-lg-flex justify-content-center ">

                  <div className="funfact-txt">
                    <div className="funfact-colum  text-center">
                      <h3 className="primary-color">360+</h3>
                      <p>Spice Categories</p>
                    </div>
                  </div>

                  <div className="funfact-txt">
                    <div className="funfact-colum  text-center">
                      <h3 className="primary-color">60+</h3>
                      <p>Countries Shipping</p>
                    </div>
                  </div>

                  <div className="funfact-txt">
                    <div className="funfact-colum  text-center">
                      <h3 className="primary-color">2560+</h3>
                      <p>Happy Customers</p>
                    </div>
                  </div>
                 

                </div>
              </div>


            </div>
            {/* <BottomBanner imageS={bottomBanner.images[0].url} /> */}
          </div>



        </section>
        <MustHaveSection mustHaveSectionBanners={mustHaveSectionBanners} />
        {/* <section className="product-part  pt-0">
          <div className="container">

            <div className="row">
              <div className="col-md-6 col-lg-3">
                <div className="top-selling">
                  <h3>Top Selling</h3>
                  <div className="divider-top-selling"></div>


                  {productsTopSelling.map((pro) => <TopSellingProduct stars={pro.stars} goTo={`/product-details/${pro.slug}`} imageS={pro.thumbNail[0].url} discount={pro.varient[0].discount}  productName={pro.name} price={pro.varient[0].mrp} varientId={pro.varient[0].id} />)}
                </div>
              </div>



              <div className="col-md-6 col-lg-3">
                <div className="top-selling">
                  <h3>Trending Products</h3>
                  <div className="divider-top-selling"></div>

                  {productsTrending.map((pro) => <TopSellingProduct stars={pro.stars} goTo={`/product-details/${pro.slug}`} imageS={pro.thumbNail[0].url} discount={pro.varient[0].discount} productName={pro.name} price={pro.varient[0].mrp} varientId={pro.varient[0].id} />)}

                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="top-selling">
                  <h3>Recently added</h3>
                  <div className="divider-top-selling"></div>

                  {productRecentlyAdded.map((pro) => <TopSellingProduct stars={pro.stars} goTo={`/product-details/${pro.slug}`} imageS={pro.thumbNail[0].url} discount={pro.varient[0].discount}  productName={pro.name} price={pro.varient[0].mrp} varientId={pro.varient[0].id} />)}
                </div>

              </div>

              <div className="col-md-6 col-lg-3">
                <div className="top-selling">
                  <h3>Top Rated</h3>
                  <div className="divider-top-selling"></div>

                  {productTopRated.map((pro) => <TopSellingProduct stars={pro.stars} goTo={`/product-details/${pro.slug}`} imageS={pro.thumbNail[0].url} discount={pro.varient[0].discount}  productName={pro.name} price={pro.varient[0].mrp} varientId={pro.varient[0].id} />)}
                </div>
              </div>


            </div>
          </div>
        </section> */}
        {/* <section className="our-blog pt-0">

          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="primary-color mb-2">Our Blog</h2>
                <p className="gray4">At <span className="primary-color">WAH INDIA,</span> we believe, that natural goodness is the way to go for a healthy, balanced life.</p>
              </div>
            </div>
            <div className="row mt-3">
             
              {blogs.map((bl)=> <BlogContent goTo={`/blog-details/${bl.urlSlug}`} heading={bl.title} paragraph={bl.brief} by={"admin"} dateString={bl.createdAt} imageS={bl.thumbnailImage[0].url} />)}


            </div>
          </div>
        </section> */}




      </main>
    </MainLayout> 


    // <div>
    //   <h1>{blogs[0].title}</h1>
    // </div>
  );
}

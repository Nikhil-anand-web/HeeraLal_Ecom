import Image from 'next/image'

import Link from 'next/link'
const ProductCategories = ({categoryName,imageS,goTo="/"}) => {
  return (
    <div className="col-md-6 col-lg-3 text-center col-6">
    <div className="catergoary-box">
     <Link href={goTo}>
      <Image layout='responsive' height={75} width={250} src={imageS} alt='logo'/>
        <div className="pros-txt mt-3">{categoryName}</div>
        </Link>
     
    </div>
  </div>
  )
}

export default ProductCategories

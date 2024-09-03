"use client"


import Image from 'next/image'
import axios from 'axios';
import tempImg from '../../../public/images/dashboard/ecommerce/img_2.png'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';




const CategoryModel = ({ categoriesList:categoryDetail,setstateRefresherDummyValue}) => {
  

const rtr = useRouter()
 
  const onDelete= async()=>{
    try {
      const res = await axios.delete(`/api/v1/deleteCategory`, {
        data:[{id:categoryDetail.id}]
      });
      if (res.data.success) {
        toast.success(res.data.message)
        setstateRefresherDummyValue((pre)=>!pre)
    
        
        
      }
      
    } catch (error) {
      console.log(error,"error")
            
        toast.warning(error.response.data.message)
      
    }

  }
  const onStatusFlip= async()=>{
    try {
      const res = await axios.post('/api/v1/categoryStatusToggle',{id:categoryDetail.id})
        console.log(res)
      
      if (res.data.success) {
        toast.success(res.data.message)
        setstateRefresherDummyValue((pre)=>!pre)
   
        
      }
      
    } catch (error) {
      console.log(error)
            
            toast.warning(error.response.data.message)
      
    }

  }
  if (!categoryDetail) {
    return<div>the category is empty</div>
    
  }
  const onClickModel = ()=>{
    rtr.push(`/wah-control-center/categoryDetails/${categoryDetail.id}`)
  }



  return (
    <div id={categoryDetail.id} className="card mb-2 text-start" style={{ border: 'none', cursor: 'pointer' }} >
      <div  className="row g-0">
      
          <Image alt={"cat Image"} width={500} height={500} style={{height:"100px",width:"100px"}} src={categoryDetail.image[0]?.url || tempImg} />
      
        <div onClick={onClickModel}   className="col-8">
          <div className="card-body py-2 px-3">
            <h6 className="card-title mb-1">Category Name :- {categoryDetail.categoryName}</h6>
            <p className="card-text mb-1"><small className="text-muted">Category Slug :- {categoryDetail.slug}</small></p>
            <p className="card-text mb-1"><small className="text-muted">Parent Category :- {categoryDetail.parent===null?"Root":categoryDetail.parent.categoryName}</small></p>
            
          </div>
          
        </div>
      
        <button onClick={onDelete}  type="button"  style={{
          margin: "10px",
          background: "red",
          border: "none",
          borderRadius: "inherit",
          color: "#fff",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Delete</button>
       
       
        {!categoryDetail.status ?
        <button onClick={onStatusFlip} type="button"  style={{
          margin: "10px",
          background: "green",
          border: "none",
          borderRadius: "inherit",
          color: "#fff",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Activate</button>
        :

        <button onClick={onStatusFlip}  type="button" style={{
          margin: "10px",
          background: "yellow",
          border: "none",
          borderRadius: "inherit",
          color: "black",
          fontSize: "14px",
          padding: "8px 15px"
        }}>Deactivate</button>

      }


      </div>

     
     




    </div>
  )
}

export default CategoryModel

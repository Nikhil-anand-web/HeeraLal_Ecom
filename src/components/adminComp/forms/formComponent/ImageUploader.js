"use client"
import React from 'react'


const ImageUploader = ({label,multiple = false,name,required , register=null}) => {
    const val =(e)=>{
        const files = e.target.files;
          Array.from(files).forEach(file => {
           
            const fileExtension = file.name.split('.').pop();
            console.log(fileExtension)
           if (fileExtension!=="jpg" && fileExtension!=="jpeg" &&fileExtension!=="webp" && fileExtension!=="png" ) {
            e.target.file = null
            e.target.value = null
            
           }
         
        });
    }
  return (
    <div class="mb-3">
  <label htmlFor={name}className="form-label">{label}</label>
 {!register? <input name={name} onChange={val}  className="form-control" type="file" id={name} multiple={multiple}  accept="image/*"/>:
  <input name={name} onChange={val}  className="form-control" type="file" id={name} multiple={multiple} {...register(name, { required: required })}accept="image/*"/>}
</div>

  )
}

export default ImageUploader

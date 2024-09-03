import React from 'react'
import { Controller } from 'react-hook-form'

const CheckBox = ({control,children , id,errors}) => {
  return (
    <div className="form-group">
    <div className="form-check">
      <Controller
          name={id}
          control={control}
          defaultValue={false}
        
          render={({ field }) => (
              <>
                  <input style={{marginLeft:"5.5rem"}} class="form-check-input"  type="checkbox" role="switch" {...field} id={id} />
                 
              </>
          )}
      />
      <label className="form-check-label" htmlFor={id}>{children}</label>
      </div>
  </div>
  )
}

export default CheckBox

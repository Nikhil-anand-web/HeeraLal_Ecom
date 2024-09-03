import React from 'react'
import { Controller } from 'react-hook-form'

const CheckBox = ({control,children , id}) => {
  return (
    <div className="form-group">
    <div className="form-check">
      <Controller
          name={id}
          control={control}
          defaultValue={false}
        
          render={({ field }) => (
              <>
                  <input className="form-check-input" type="checkbox" {...field} id={id} />
                 
              </>
          )}
      />
      <label className="form-check-label" htmlFor={id}>{children}</label>
      </div>
  </div>
  )
}

export default CheckBox

import React from 'react'
import { Controller } from 'react-hook-form'

const CheckBoxType2 = ({ control, children, id, defaultChecked }) => {
  return (
    <div className="form-group">
      <div className="form-check">
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                {...field}
                id={id}
                checked={field.value || false} // Set based on the form value
                onChange={e => field.onChange(e.target.checked)} // Handle changes
              />
            </>
          )}
        />
        <label className="form-check-label" htmlFor={id}>{children}</label>
      </div>
    </div>
  );
};

export default CheckBoxType2;

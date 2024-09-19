"use client"
import React, { useState } from 'react';
import axios from 'axios';
import checkPinCodeAv from '@/app/actions/checkPinCodeAv';

const PincodeServiceabilityCheck = () => {
  const [pincode, setPincode] = useState('');
  const [serviceable, setServiceable] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckServiceability = async () => {
    if (pincode.length === 6) {
      setLoading(true);
      setError('');
      setServiceable({});

      try {
        // Mock API call - Replace with your actual serviceability check API
        const response = await checkPinCodeAv(pincode);
        

        if (response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.ErrorMessage.length >0) {
          setServiceable(response.res.data.GetDomesticTransitTimeForPinCodeandProductResult);
          console.log(response.res.data.GetDomesticTransitTimeForPinCodeandProductResult.ErrorMessage)
          


        } else{
          setServiceable({});
        }



      } catch (err) {
        setError('Failed to check serviceability. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter a valid 6-digit pincode.');
    }
  };
  console.log(serviceable,"jdjjd")

  return (
    <div className="pincode-check">
      <h6>Check Pincode Serviceability</h6>
      <input
        className="form-control"
        type="text"
        placeholder="Enter pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        maxLength={6}
      />
      <button onClick={handleCheckServiceability} class="btn btn-success" disabled={loading}>
        {loading ? 'Checking...' : 'Check'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {Object.keys(serviceable).length>0 && (
        <p style={{ color: !(serviceable.ErrorMessage==='InBoundServiceNotAvailable'  )  ? 'green' : 'red' }}>
          {!(serviceable.ErrorMessage==='InBoundServiceNotAvailable'  ) ? `Available by ${serviceable.ExpectedDateDelivery}` : 'Service is not available for this pincode.'}
        </p>
      )}
    </div>
  );
};


export default PincodeServiceabilityCheck;

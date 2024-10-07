'use client';

import raiseCancellationRequest from '@/app/actions/raiseCancellationRequest';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CancellationForm({orderId}) {
  // State to store the input value and loading state
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading to true
    

    try {
      setIsLoading(true);
      const res = await raiseCancellationRequest(orderId,reason)
      if (!res.success) {
        throw res
        
      }
      toast.success(res.message)

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.warning(error.message)
      
    }finally{
        setIsLoading(false);

    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Raise Cancelation Request</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <textarea
            placeholder="Reason for cancellation"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              resize: 'vertical', // Allows vertical resizing
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isLoading ? '#ccc' : '#32d4bc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

"use client"
import React from 'react'
import Papa from 'papaparse';

function downloadCSV(csvContent, filename = 'data.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
}


const ArchiveModule = ({orders,customers}) => {
    
  return (
    <div>
        <button className="mt-3 pay-now-button btn" onClick={()=>downloadCSV(Papa.unparse(customers))}>
            Users to csv
        </button>
        <button className="mt-3 pay-now-button btn" onClick={()=>downloadCSV(Papa.unparse(orders))}>
            Orders to csv
        </button >
      
    </div>
  )
}

export default ArchiveModule

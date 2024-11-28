"use client"
import React from 'react'
import * as XLSX from "xlsx";
import customerData from '@/app/actions/customerData';
import { toast } from 'react-toastify';
import orderData from '@/app/actions/orderData';
import varientData from '@/app/actions/varientData';


function saveToJsonFile(obj, filename) {
  const jsonString = JSON.stringify(obj, null, 2); // Convert object to JSON string with pretty formatting
  const blob = new Blob([jsonString], { type: "application/json" }); // Create a Blob with JSON data
  const link = document.createElement("a"); // Create a temporary link element
  link.href = URL.createObjectURL(blob); // Set the link's href to the Blob URL
  link.download = filename; // Set the filename
  document.body.appendChild(link); // Append link to the DOM
  link.click(); // Trigger the download
  document.body.removeChild(link); // Clean up by removing the link
}
export function exportToExcel(data, filename = "data.xlsx") {
    // Convert the data object into an array of arrays for worksheet creation
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook and trigger a download
    XLSX.writeFile(workbook, filename);
}


const ArchiveModule = () => {

  const userTOCsv = async ()=>{
    try {
      const res =await customerData()
      if (!res.success) {
        throw res
        
      }
      saveToJsonFile(res.data,"users")
      toast.success("Downloading  ...")

      
    } catch (error) {
      console.log(error)
      toast.warning(error.message)
      
    }


  }
  const orderToCSV = async ()=>{
    try {
      const res =await orderData()
      if (!res.success) {
        throw res
        
      }
      saveToJsonFile(res.data,"orders")
      toast.success("Downloading  ...")

      
    } catch (error) {
      console.log(error)
      toast.warning(error.message)
      
    }


  }
  const varientToCSV = async ()=>{
    try {
      const res =await varientData()
      if (!res.success) {
        throw res
        
      }
      exportToExcel(res.data,"varient.xlsx")
      toast.success("Downloading  ...")

      
    } catch (error) {
      console.log(error)
      toast.warning(error.message)
      
    }


  }

  return (
    <div>
      <button className="mt-3 pay-now-button btn" onClick={userTOCsv}>
        Users to JSON
      </button>
      <button className="mt-3 pay-now-button btn" onClick={orderToCSV}>
        Orders to JSON
      </button >
      <button className="mt-3 pay-now-button btn" onClick={varientToCSV}>
        varients to XLSX
      </button >

    </div>
  )
}

export default ArchiveModule

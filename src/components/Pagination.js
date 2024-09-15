"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";



const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  
  maxVisiblePages = 5,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);


  const pathname = usePathname();
  const rtr = useRouter()


  // Function to generate the visible pages
  const getVisiblePages = () => {
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    // Adjust if there's fewer than maxVisiblePages left at the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  // Handle page change
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
    //   onPageChange(page)
   
    const parts = pathname.split('/');
    var newRoute= ''
    if (isNaN(parts[parts.length-1])) {
       newRoute = pathname+`/${page}`
    }else{
      parts[parts.length-1] = page
      newRoute = parts.join('/')
    }

    console.log(newRoute)
       
      
      //  const frontcorrector = currPage[0] !=='/'?'/':''
      //  console.log(`${frontcorrector}${currPage}${page}`)
       rtr.push(newRoute)
      
    }
  };
 

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        First
      </button>


      {visiblePages.map((page) => 
       { 
       
         
        return <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`pagination-button ${
           ( currentPage === page.toString()) || (currentPage===page) ? 'active' : ''
          }`}
        >
          {page}
        </button>}
      )}

     

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Last
      </button>
    </div>
  );
};



export default Pagination;

"use client";
import getSearchedPublicApplication from "@/app/actions/getSearchedPublicApplication";
import debounce from "@/lib/debounce";

import React, { useCallback, useEffect, useState } from "react";

const DealerApplicationsList = ({ itemsPerPage, pageNo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPublicQuery, setFilteredPublicQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const fetchResults = useCallback(
    debounce(async (searchQuery) => {

      try {
        setIsLoading(true)
        // const response = await getSearchedPublicQuery(searchQuery, itemsPerPage, pageNo)
        const response = await getSearchedPublicApplication(searchQuery, itemsPerPage, pageNo)

        console.log(response)

        setFilteredPublicQuery(response.queries)



      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false)
      }

    }, 500),
    []
  );



  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const helper = () => {
      fetchResults(lowercasedQuery)
    }
    helper()

  }, [searchQuery]);
 

  return (
    <div className="row g-4 mt-3">
      <div style={{ marginBottom: "5rem" }} className="input-group">

        <span className="input-group-text" id="">Search</span>

        <input style={{ border: "2px" }} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" className="form-control border-r-emerald-500" />

      </div>
      {filteredPublicQuery.map((app, index) => (
        <div key={app.id} className="col-md-6 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-start">
              <h5 className="card-title mb-2">
                {app.firstName} {app.lastName}{" "}
                <span className="badge bg-primary ms-2">{app.age} yrs</span>
              </h5>
              <p className="text-muted mb-1">
                <strong>Area:</strong> {app.localArea}, {app.district},{" "}
                {app.state}
              </p>
              <p className="text-muted mb-1">
                <strong>Firm:</strong> {app.firmName || "N/A"}
              </p>
              <p className="text-muted mb-1">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${app.email}`}>{app.email}</a>
              </p>
              <p className="text-muted mb-1">
                <strong>Mobile:</strong> {app.mobile}
              </p>

              {/* Collapsible Long Details */}
              <details className="mt-2">
                <summary className="text-primary" style={{ cursor: "pointer" }}>
                  View More
                </summary>
                <div className="mt-2 small">
                  <p>
                    <strong>Firm Address:</strong> {app.firmAddress}
                  </p>
                  <p>
                    <strong>Pincode :</strong> {app.pincode}
                  </p>
                  <p>
                    <strong>Business Type:</strong> {app.businessType}
                  </p>
                  <p>
                    <strong>Annual Sales:</strong> {app.annualSales}
                  </p>
                  <p>
                    <strong>Investment:</strong> {app.investment}
                  </p>
                  <p>
                    <strong>Has Manpower:</strong>{" "}
                    {app.hasManpower ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Reason:</strong> {app.reason}
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealerApplicationsList;

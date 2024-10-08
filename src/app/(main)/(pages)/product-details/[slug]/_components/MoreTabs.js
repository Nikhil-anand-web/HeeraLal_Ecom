"use client"
import React, { useState } from 'react';


const MoreTabs = ({description,recipe}) => {
  const [activeTab, setActiveTab] = useState('description');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="row mt-5 products-tabs">
      <div className="col-md-12">
        {/* Nav tabs */}
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => handleTabClick('description')}
            >
              DESCRIPTION
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'recipes' ? 'active' : ''}`}
              onClick={() => handleTabClick('recipes')}
            >
              Recipes
            </button>
          </li>
          {/* Uncomment if needed */}
          {/* <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'delivary' ? 'active' : ''}`}
              onClick={() => handleTabClick('delivary')}
            >
              Reviews
            </button>
          </li> */}
        </ul>

        {/* Tab panes */}
        <div className="tab-content">
          <div id="description" className={`container tab-pane ${activeTab === 'description' ? 'active' : 'fade'}`}>
            <br />
            {description}
          </div>
          <div id="recipes" className={`container tab-pane ${activeTab === 'recipes' ? 'active' : 'fade'}`}>
            <br />
            <div className="row">
              <div className="col-12 text-center mb-4">
                <h4>Recipes</h4>
              </div>
              {recipe.map((obj, index) => (
                <div className="col-3" key={index}>
                  <iframe
                    width="100%"
                    height="215"
                    src={obj.videoLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                  <h5 className="text-center">{obj.name}</h5>
                </div>
              ))}
            </div>
          </div>
          {/* Add more tabs here if needed */}
          {/* <div id="delivary" className={`container tab-pane ${activeTab === 'delivary' ? 'active' : 'fade'}`}>
            <br />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MoreTabs;

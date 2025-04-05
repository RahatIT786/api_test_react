import React, { useState } from 'react';
import RahatLogo from '../../assets/img/rahat_logo.png';
import { Link, useLocation } from 'react-router-dom'; 

const Sidebar = () => { // <-- Change to uppercase 'Sidebar'
  // State to manage the collapse of sections

  const location = useLocation();
  const isActive = (route) => location.pathname.includes(route);


  const [isDashboardOpen, setDashboardOpen] = useState(false);
  const [isCompanyManagementOpen, setCompanyManagementOpen] = useState(false);

  const toggleDashboard = () => {
    setDashboardOpen(!isDashboardOpen);
  };

  const toggleCompanyManagement = () => {
    setCompanyManagementOpen(!isCompanyManagementOpen);
  };


  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <a href="" className="logo">
            <img
              src={RahatLogo}
              alt="navbar brand"
              className="navbar-brand"
              height="80px"
            />
          </a>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
      </div>
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            {/* Dashboard Section */}
            <li className="nav-item active">
              <Link
                onClick={toggleDashboard}
                className={`collapsed ${isDashboardOpen ? 'show' : ''}`}
                aria-expanded={isDashboardOpen}
                to={'/dashboard'} 
              >
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            {/* Agent Management */}
            <li className="nav-item">
              <a data-bs-toggle="collapse">
                <i className="fas fa-layer-group"></i>
                <p>User Management</p>
              </a>
            </li>

            <li className={`nav-item ${isActive('company_management') ? 'active' : ''}`}>
              <a onClick={toggleCompanyManagement} className={`collapsed ${isCompanyManagementOpen ? 'show' : ''}`}>
                <i className="fas fa-layer-group"></i>
                <p>Product Management</p>
                <span className="caret"></span>
              </a>
              { (isCompanyManagementOpen || (isActive('company_management'))) && (
                <div className="collapse show">
                  <ul className="nav nav-collapse">
                    <li>
                      <Link to="/productCategories">
                        <span className="sub-item">Product Categories</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/company">
                        <span className="sub-item">Product list</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

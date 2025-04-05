import React from "react";
import AddIcon from '@mui/icons-material/Add';
import AddFormButton from "../../components/ui/AddFormButton";
import SearchBox from "../../components/ui/SearchBox";

const Branches = () => {
    return (
        <div className="container">
            <div className="page-inner">
                <div className="page-header d-flex justify-content-between" style={{ marginBottom: '0px' }}>
                    <div>
                        <ul className="breadcrumbs mb-3" style={{ marginLeft: '0px', paddingLeft: '0px' }}>
                            <li className="nav-home">
                                <a href="#">
                                    <i className="icon-home"></i>
                                </a>
                            </li>
                            <li className="separator">
                                <i className="icon-arrow-right"></i>
                            </li>
                            <li className="nav-item">
                                <a href="#">Company Management</a>
                            </li>
                            <li className="separator">
                                <i className="icon-arrow-right"></i>
                            </li>
                            <li className="nav-item">
                                <a href="#">Branches</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <AddFormButton 
                            buttonName="Add Branch"
                            buttonColor="blue"
                            buttonIcon={<AddIcon />}
                            link="/company_management/branch-add"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="d-flex justify-content-between mt-3">
                                <div className="card-header" style={{ paddingLeft: '0px' }}>
                                    <div className="card-title">Branches</div>
                                </div>
                                <div>
                                    <SearchBox />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table
                                        id="basic-datatables"
                                        className="display table table-striped table-hover"
                                    >
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td>61</td>
                                                <td>2011/04/25</td>
                                                <td>$320,800</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                <td>Garrett Winters</td>
                                                <td>Accountant</td>
                                                <td>Tokyo</td>
                                                <td>63</td>
                                                <td>2011/07/25</td>
                                                <td>$170,750</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                <td>Ashton Cox</td>
                                                <td>Junior Technical Author</td>
                                                <td>San Francisco</td>
                                                <td>66</td>
                                                <td>2009/01/12</td>
                                                <td>$86,000</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                <td>Cedric Kelly</td>
                                                <td>Senior Javascript Developer</td>
                                                <td>Edinburgh</td>
                                                <td>22</td>
                                                <td>2012/03/29</td>
                                                <td>$433,060</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                <td>Airi Satou</td>
                                                <td>Accountant</td>
                                                <td>Tokyo</td>
                                                <td>33</td>
                                                <td>2008/11/28</td>
                                                <td>$162,700</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Branches;


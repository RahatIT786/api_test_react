import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layout/applayout/applayout'
import Home from '../pages/Home'
import About from '../pages/About'

// Company Management Section
import Branches from '../pages/company_management/Branches'
import BranchesForm from '../pages/company_management/BranchesForm'

//product
import ProductCategories from '../pages/product/ProductCategories'
import EditProduct from '../pages/product/EditProduct'
import Enquiry from '../pages/Enquiry/Enquiry'


//Inventory Management
import PackageComponent from '../pages/inventory_management/package_management/PackageComponent'
import PackageForm from '../pages/inventory_management/package_management/packageForm';

//Staff Management
import Role from '../pages/staff_management/Role'
import Department from '../pages/staff_management/Department'
import StaffList from '../pages/staff_management/StaffList'
import AddStaff from '../pages/staff_management/AddStaff'
import EditStaff from '../pages/staff_management/EditStaff'

//PNR Management
import PnrList from '../pages/pnr_management/PnrList'
import PnrFormPopup from '../pages/pnr_management/PnrFormPopup'
import BookingList from '../pages/pnr_management/BookingList'
import Login from '../auth/Login'
import ProtectedRoute from '../auth/ProtectedRoute'
import Company from '../pages/company_management/Company'
import AddCompany from '../pages/company_management/AddCompany'
import ViewCompany from '../pages/company_management/ViewCompany'
import BankList from '../pages/company_management/BankList'
import AddBankDetails from '../pages/company_management/AddBankDetails'
const AppRoutes = () => {

  return (
   <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>} />

            <Route  element={
                  <ProtectedRoute  />
                  }> 
                  <Route element={<AppLayout/>}>
                <Route index element={<Home />} />
                <Route path='/dashboard' element={<Home />} />
                <Route path="about" element={<About />} />

                {/* Company Management Routes */}
                <Route path="/company_management/branch" element={<Branches />}/>
                <Route path="/company_management/branch-add" element={<BranchesForm />}/> 

                <Route path='/company'  element={<Company/>} />
                <Route path='/productCategories'  element={<ProductCategories />} />
                <Route path='/edit-product/:id' element={<EditProduct />}/>

                <Route path='/enquiry'  element={<Enquiry />}/>

                <Route path='/addcompany' element={<AddCompany/>}/>
                <Route path='/editcompany/:index' element={<AddCompany/>}/>
                <Route path='/company-details/:index' element={<ViewCompany/>}/>
                <Route path='/list/banklist' element={<BankList/>}/>
                <Route path='/add/bankdetails' element={<AddBankDetails/>}/>


                {/* Staff Management Routes */}
                <Route path='/staff_management/role' element={<Role/>} />
                <Route path='/staff_management/department' element={<Department />}/>
                <Route path='/staff_management/staff_list' element={<StaffList />}/>
                <Route path='/staff_management/staff_add' element={<AddStaff />}/>
                <Route path='/staff_management/staff_edit/:id' element={<EditStaff />} />

                {/* Inventory Management */}
                <Route path="/inventory_management/packages" element={<PackageComponent />} />
                <Route path="/inventory_management/add_packages" element={<PackageForm />} />


                {/* PNR MANAGEMENT */}
                <Route path="/pnr_management/pnr_list" element={<PnrList />} />
                <Route path="/pnr_management/pnr_form" element={<PnrFormPopup />} />
                <Route path='/pnr_management/booking_list' element={<BookingList />} />
            </Route>
            </Route>
              

               {/* ✅ Catch-all for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes
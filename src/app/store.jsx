import { configureStore } from '@reduxjs/toolkit';
import pnrReducer from '../features/pnr/PnrSlice';
import  companyDetailsReducer  from '../features/company_management/CompanyDetailSlice';
export const store = configureStore({
  reducer: {
    pnr: pnrReducer, // Registering the PNR slice
    companyDetail:companyDetailsReducer,
  },
});

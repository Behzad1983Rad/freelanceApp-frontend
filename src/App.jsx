import './App.css';
// import { useState } from 'react';
import ContactusPage from "./pages/ContacusPage/ContactusPage";
import JobList from './pages/CompanyView/JobList/JobList.jsx';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import CompaniesList from './pages/CompaniesList/CompaniesList.jsx';
import Signup from './components/Signup/Signup.jsx';
import LogOut from './components/LogOut/LogOut.jsx'
import NavBarCompany from './pages/CompanyView/NavBarCompany/NavBarCompany.jsx';
import CompanyProfile from './pages/CompanyView/CompanyProfile/CompanyProfile.jsx';
import AddJobForm from './pages/CompanyView/AddJobForm/AddJobForm.jsx';
import SingleJobView from './pages/CompanyView/SingleJobView/SingleJobView.jsx';
import EditJobModal from './pages/CompanyView/EditJobModal/EditJobModal.jsx';
import AddProfile from './pages/CompanyView/CompanyProfile/AddProfile.jsx';


export default function App() {  
  return (
    <>
   
    <NavBarCompany />

      <Routes>
          <Route path="/" element={ <HomePage />}/>
          <Route path="/jobs" element={ <JobList /> }/>
          <Route path="/companies" element={ <CompaniesList /> }/>
          <Route path="/companies/add" element={ <AddProfile /> }/>
          <Route path="/aboutus" element={ <AboutUs /> }/>
          <Route path="/contactus" element={ <ContactusPage /> }/>
          <Route path="/companies/:companyid" element={ <CompanyProfile /> }/>
          <Route path="/jobs/add" element={ <AddJobForm  /> }/>
          <Route path="/jobs/:jobid" element={ <SingleJobView  /> }/>
          <Route path="/job_edit" element={ <EditJobModal /> }/>
          <Route path="/login" element={ <LoginForm /> }/>
          <Route path="/signup" element={ <Signup /> }/>
          <Route path="/logout" element={ <LogOut /> }/>
          
          
      </Routes>
  </>
 
  )
}
'use client';
import React from 'react'
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import DefaultInputs from "@/components/form/form-elements/DefaultInputs";
import ApiService from "@/service/ApiService";
const addBranch = () => {
    const isAdmin = ApiService.isAdmin();
    if (!isAdmin) {
        return(
        <div>
            <h1 className="text-center text-2xl font-bold">Access Denied</h1>
            <p className="text-center">You do not have permission to access this page.</p>
            <button onClick={() => window.location.href = '/'} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go to Home</button>
        </div>)
    }
  return (
    <>
    <PageBreadcrumb pageTitle="Register Branch" />
    <div>
      {/* <DefaultInputs /> */}
      <h1 className="text-center text-2xl font-bold">Add Branch</h1>
    </div>
    </>
  )
}

export default addBranch
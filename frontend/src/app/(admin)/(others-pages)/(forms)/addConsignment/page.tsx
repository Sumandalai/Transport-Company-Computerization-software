import React from 'react'
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import CheckboxComponents from "@/components/form/form-elements/CheckboxComponents";
import DefaultInputs from "@/components/form/form-elements/DefaultInputs";
// import DropzoneComponent from "@/components/form/form-elements/DropZone";
// import FileInputExample from "@/components/form/form-elements/FileInputExample";
// import InputGroup from "@/components/form/form-elements/InputGroup";
// import InputStates from "@/components/form/form-elements/InputStates";
// import RadioButtons from "@/components/form/form-elements/RadioButtons";
// import SelectInputs from "@/components/form/form-elements/SelectInputs";
// import TextAreaInput from "@/components/form/form-elements/TextAreaInput";
// import ToggleSwitch from "@/components/form/form-elements/ToggleSwitch";
const addConsignment = () => {
  return (
    <>
    <PageBreadcrumb pageTitle="Consignment Details" />
    <div>
      <DefaultInputs />
    </div>
    </>
  )
}

export default addConsignment
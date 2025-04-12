"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import axios from 'axios';
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { EnvelopeIcon, ChevronDownIcon, PlusIcon, TrashBinIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";

export default function DefaultInputs() {
  const router = useRouter();
  // User Info State
  const [userInfo, setUserInfo] = useState({
    senderName: "",
    receiverName: "",
    senderEmail: "",
    receiverEmail: "",
    senderPhone: "",
    receiverPhone: "",
    senderBranch: "",
    receiverBranch: ""
  });

  // Consignments State
  const [consignments, setConsignments] = useState([
    { volume: "", weight: "", description: "", value: "" },
  ]);

  // Payment Info State
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    method: "",
  });

  // Common State Handlers
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  // Consignment Handlers
  const addConsignment = () => {
    setConsignments([...consignments, { volume: "", weight: "", description: "", value: "" }]);
  };

  const removeConsignment = (index: number) => {
    setConsignments(consignments.filter((_, i) => i !== index));
  };

  type ConsignmentField = "volume" | "weight" | "description" | "value";
  const handleConsignmentChange = (index: number, field: ConsignmentField, value: string) => {
    const updatedConsignments = [...consignments];
    updatedConsignments[index][field] = value;
    setConsignments(updatedConsignments);
  };

  // Select Options
  const paymentMethods = [
    { value: "visa", label: "Visa" },
    { value: "mastercard", label: "MasterCard" },
    { value: "amex", label: "American Express" },
  ];

  const options = [
    { value: "Mumbai", label: "Mumbai, Maharashtra" },
    { value: "Delhi", label: "Delhi, Delhi" },
    { value: "Bengaluru", label: "Bengaluru, Karnataka" },
    { value: "Hyderabad", label: "Hyderabad, Telangana" },
    { value: "Ahmedabad", label: "Ahmedabad, Gujarat" },
    { value: "Chennai", label: "Chennai, Tamil Nadu" },
    { value: "Kolkata", label: "Kolkata, West Bengal" },
    { value: "Surat", label: "Surat, Gujarat" },
    { value: "Pune", label: "Pune, Maharashtra" },
    { value: "Jaipur", label: "Jaipur, Rajasthan" }
];


  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];

  // Phone Input Handler
  const handlePhoneNumberChange = (phoneNumber: string, type: 'sender' | 'receiver') => {
    setUserInfo(prev => ({ ...prev, [`${type}Phone`]: phoneNumber }));
  };

  // Form Submission
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   const formData = {
  //     userInfo,
  //     consignments,
  //     paymentInfo
  //   };
  //   console.log("Form Data:", formData);

  //   // try {
  //   //   const response = await axios.post('/api/shipment', formData);
  //   //   console.log('Submission successful:', response.data);
  //   //   // Handle success (e.g., show success message, reset form)
  //   // } catch (error) {
  //   //   console.error('Submission failed:', error);
  //   //   // Handle error (e.g., show error message)
  //   // }
  // };




// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
  
//   try {
//     // const response = await axios.post('/api/shipment', {
//     //   userInfo,
//     //   consignments,
//     //   paymentInfo
//     // });

//     // Save data for printing
//     const printData = {
//       truckDetails: response.data.truckDetails,
//       consignment: {
//         id: response.data.consignmentId,
//         items: consignments
//       },
//       payment: {
//         method: paymentInfo.method,
//         amount: response.data.totalAmount,
//         transactionId: response.data.transactionId
//       }
//     };

//     localStorage.setItem("printData", JSON.stringify(printData));
//     router.push("/print");
//   } catch (error) {
//     console.error("Submission failed:", error);
//   }
// };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Generate dummy data
  const generateDummyData = () => ({
    truckDetails: {
      licensePlate: "TRK-" + Math.floor(Math.random() * 10000),
      driverName: "Driver " + ["A", "B", "C"][Math.floor(Math.random() * 3)],
      estimatedArrival: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
    },
    consignmentId: "CONS-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    transactionId: "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    totalAmount: consignments.reduce((sum, item) => sum + (Number(item.value) || 0), 0).toFixed(2)
  });

  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dummyResponse = generateDummyData();

    const printData = {
      truckDetails: dummyResponse.truckDetails,
      consignment: {
        id: dummyResponse.consignmentId,
        items: consignments
      },
      payment: {
        method: paymentInfo.method,
        amount: dummyResponse.totalAmount,
        transactionId: dummyResponse.transactionId
      }
    };

    localStorage.setItem("printData", JSON.stringify(printData));
    router.push("/print");
  } catch (error) {
    console.error("Submission failed:", error);
    // Handle error state
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* User Info Card */}
        <ComponentCard title="User Info.">
          <div className="space-y-6">
            {/* Name Inputs */}
            <div className="flex justify-between space-x-6">
              <div className="w-1/2">
                <Label>Sender Name</Label>
                <Input 
                  type="text" 
                  name="senderName"
                  value={userInfo.senderName}
                  onChange={handleUserInfoChange}
                />
              </div>
              <div className="w-1/2">
                <Label>Receiver Name</Label>
                <Input 
                  type="text" 
                  name="receiverName"
                  value={userInfo.receiverName}
                  onChange={handleUserInfoChange}
                />
              </div>
            </div>

            {/* Email Inputs */}
            <div className="flex justify-between space-x-6">
              <div className="w-1/2 relative">
                <Label>Sender Email</Label>
                <Input
                  name="senderEmail"
                  placeholder="info@gmail.com"
                  type="email"
                  className="pl-[62px]"
                  value={userInfo.senderEmail}
                  onChange={handleUserInfoChange}
                />
                <span className="absolute left-0 top-7 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <EnvelopeIcon />
                </span>
              </div>
              <div className="w-1/2 relative">
                <Label>Receiver Email</Label>
                <Input
                  name="receiverEmail"
                  placeholder="info@gmail.com"
                  type="email"
                  className="pl-[62px]"
                  value={userInfo.receiverEmail}
                  onChange={handleUserInfoChange}
                />
                <span className="absolute left-0 top-7 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <EnvelopeIcon />
                </span>
              </div>
            </div>

            {/* Phone Inputs */}
            <div className="flex justify-between space-x-6">
              <div className="w-1/2">
                <Label>Sender Phone</Label>
                <PhoneInput
                  selectPosition="start"
                  countries={countries}
                  placeholder="+1 (555) 000-0000"
                  value={userInfo.senderPhone}
                  onChange={(phone) => handlePhoneNumberChange(phone, 'sender')}
                />
              </div>
              <div className="w-1/2">
                <Label>Receiver Phone</Label>
                <PhoneInput
                  selectPosition="start"
                  countries={countries}
                  placeholder="+1 (555) 000-0000"
                  value={userInfo.receiverPhone}
                  onChange={(phone) => handlePhoneNumberChange(phone, 'receiver')}
                />
              </div>
            </div>

            {/* Branch Selects */}
            <div className="flex justify-between space-x-6">
              <div className="w-1/2">
                <Label>Sender Branch Office</Label>
                <div className="relative">
                  <Select
                    options={options}
                    placeholder="Select sender branch"
                    value={userInfo.senderBranch}
                    onChange={(value) => setUserInfo(prev => ({ ...prev, senderBranch: value }))}
                    className="dark:bg-dark-900"
                  />
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="w-1/2">
                <Label>Receiver Branch Office</Label>
                <div className="relative">
                  <Select
                    options={options}
                    placeholder="Select receiver branch"
                    value={userInfo.receiverBranch}
                    onChange={(value) => setUserInfo(prev => ({ ...prev, receiverBranch: value }))}
                    className="dark:bg-dark-900"
                  />
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Consignment Info Card */}
        <ComponentCard title="Consignment Info.">
          <div className="space-y-6">
            {consignments.map((consignment, index) => (
              <div key={index} className="p-4 border rounded-lg dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-blue-light-25">Consignment {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeConsignment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashBinIcon />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4">
                  {Object.entries(consignment).map(([field, value]) => (
                    <div key={field}>
                      <Label>
                        {field.charAt(0).toUpperCase() + field.slice(1)} 
                        {field === 'value' && ' (in USD)'}
                        {(field === 'volume' || field === 'weight') && ' (in kg)'}
                      </Label>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => handleConsignmentChange(
                          index, 
                          field as ConsignmentField, 
                          e.target.value
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addConsignment}
              className="flex items-center px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              <PlusIcon className="w-3 h-3 mr-2" />
              Add Consignment
            </button>
          </div>
        </ComponentCard>

        {/* Payment Details Card */}
        <ComponentCard title="Payment Details">
          <div className="space-y-6">
            <div>
              <Label>Payment Method</Label>
              <Select
                options={paymentMethods}
                placeholder="Select Payment Method"
                value={paymentInfo.method}
                onChange={(value) => setPaymentInfo(prev => ({ ...prev, method: value }))}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label>Card Number</Label>
              <div className="relative">
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  className="pl-[62px]"
                />
                <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
                  💳
                </span>
              </div>
            </div>

            <div>
              <Label>Cardholder Name</Label>
              <Input
                type="text"
                name="cardHolder"
                placeholder="John Doe"
                value={paymentInfo.cardHolder}
                onChange={handlePaymentChange}
              />
            </div>

            <div className="flex space-x-6">
              <div className="w-1/2">
                <Label>Expiration Date</Label>
                <Input
                  type="month"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                />
              </div>
              <div className="w-1/2">
                <Label>CVV</Label>
                <Input
                  type="password"
                  name="cvv"
                  placeholder="***"
                  max="3"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Shipment
          </button>
        </div>
      </div>
    </form>
  );
}
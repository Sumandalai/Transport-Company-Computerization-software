'use client';
import { useState } from 'react';
import { Truck, Package, Check, Clock, Search } from 'lucide-react';

export default function ConsignmentTracker() {
  // City options for addresses
  const cityOptions = [
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
  
  // Dummy data based on your provided entity structure
  const [consignments] = useState([
    {
      id: 1001,
      volume: 2.5,
      receivedDate: "2025-04-05T09:30:00",
      dispatchedDate: "2025-04-06T10:15:00",
      senderName: "ABC Electronics",
      senderAddress: cityOptions[0].label, // Mumbai
      receiverName: "XYZ Distribution",
      receiverAddress: cityOptions[1].label, // Delhi
      status: "IN_TRANSIT",
      branchOffice: { name: "Mumbai Hub" },
      destinationBranch: { name: "Delhi Distribution Center" },
      client: { name: "ABC Electronics Corp." }
    },
    {
      id: 1002,
      volume: 1.8,
      receivedDate: "2025-04-07T11:45:00",
      dispatchedDate: null,
      senderName: "Fresh Farms",
      senderAddress: cityOptions[8].label, // Pune
      receiverName: "City Grocery",
      receiverAddress: cityOptions[6].label, // Kolkata
      status: "RECEIVED",
      branchOffice: { name: "Pune Hub" },
      destinationBranch: { name: "Kolkata Distribution Center" },
      client: { name: "Fresh Farms Inc." }
    },
    {
      id: 1003,
      volume: 3.2,
      receivedDate: "2025-04-02T08:15:00",
      dispatchedDate: "2025-04-03T09:20:00",
      senderName: "Global Manufacturing",
      senderAddress: cityOptions[5].label, // Chennai
      receiverName: "Retail Solutions",
      receiverAddress: cityOptions[2].label, // Bengaluru
      status: "DELIVERED",
      branchOffice: { name: "Chennai Hub" },
      destinationBranch: { name: "Bengaluru Distribution Center" },
      client: { name: "Global Manufacturing LLC" }
    },
    {
      id: 1004,
      volume: 1.5,
      receivedDate: "2025-04-06T14:20:00",
      dispatchedDate: "2025-04-07T08:30:00",
      senderName: "Tech Innovations",
      senderAddress: cityOptions[3].label, // Hyderabad
      receiverName: "Gadget World",
      receiverAddress: cityOptions[9].label, // Jaipur
      status: "ASSIGNED",
      branchOffice: { name: "Hyderabad Hub" },
      destinationBranch: { name: "Jaipur Distribution Center" },
      client: { name: "Tech Innovations Inc." }
    }
  ]);

  const [selectedConsignment, setSelectedConsignment] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'RECEIVED': return 'bg-blue-500';
      case 'ASSIGNED': return 'bg-yellow-500';
      case 'IN_TRANSIT': return 'bg-purple-500';
      case 'DELIVERED': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'RECEIVED': return <Clock className="w-5 h-5" />;
      case 'ASSIGNED': return <Package className="w-5 h-5" />;
      case 'IN_TRANSIT': return <Truck className="w-5 h-5" />;
      case 'DELIVERED': return <Check className="w-5 h-5" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderTrackingSteps = (status: string) => {
    const steps = ['RECEIVED', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED'];
    const currentStep = steps.indexOf(status);
    
    return (
      <div className="flex items-center justify-between w-full mt-6">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? getStatusColor(step) : 'bg-gray-300'}`}>
              {getStatusIcon(step)}
            </div>
            <span className="text-xs mt-1">{step.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    );
  };

  const filteredConsignments = consignments.filter(consignment => 
    consignment.id.toString().includes(searchTerm) ||
    consignment.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consignment.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consignment.senderAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consignment.receiverAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Consignment Tracking System</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Consignment List */}
        <div className="w-full lg:w-1/3">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search consignments..."
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <h2 className="text-lg font-semibold mb-4 text-gray-700">All Consignments</h2>
          
          {filteredConsignments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No consignments found
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredConsignments.map(consignment => (
                <div 
                  key={consignment.id}
                  className={`border rounded-lg p-4 cursor-pointer transition hover:shadow-md ${selectedConsignment === consignment.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                  onClick={() => setSelectedConsignment(consignment.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">#{consignment.id}</span>
                    <div className={`px-3 py-1 rounded-full text-white text-xs ${getStatusColor(consignment.status)}`}>
                      {consignment.status.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="flex justify-between">
                      <span>From:</span> 
                      <span className="font-medium">{consignment.senderName}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>To:</span> 
                      <span className="font-medium">{consignment.receiverName}</span>
                    </p>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs">
                        <span className="font-medium">Source:</span> {consignment.senderAddress.split(',')[0]}
                      </p>
                      <p className="text-xs">
                        <span className="font-medium">Destination:</span> {consignment.receiverAddress.split(',')[0]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Consignment Details */}
        <div className="w-full lg:w-2/3 border rounded-lg p-6">
          {selectedConsignment ? (
            <div>
              {consignments.filter(c => c.id === selectedConsignment).map(consignment => (
                <div key={consignment.id}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Consignment #{consignment.id}</h2>
                    <div className={`px-4 py-2 rounded-full text-white font-medium ${getStatusColor(consignment.status)}`}>
                      {consignment.status.replace('_', ' ')}
                    </div>
                  </div>

                  {renderTrackingSteps(consignment.status)}

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">Sender Information</h3>
                      <p className="font-medium">{consignment.senderName}</p>
                      <p className="text-gray-600">{consignment.senderAddress}</p>
                      <p className="text-gray-600 mt-2">Branch: {consignment.branchOffice.name}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">Receiver Information</h3>
                      <p className="font-medium">{consignment.receiverName}</p>
                      <p className="text-gray-600">{consignment.receiverAddress}</p>
                      <p className="text-gray-600 mt-2">Branch: {consignment.destinationBranch.name}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">Shipment Details</h3>
                      <p>Volume: {consignment.volume} cubic meters</p>
                      <p>Client: {consignment.client.name}</p>
                      <p className="mt-2 pt-2 border-t border-gray-200 text-sm">
                        <span className="font-medium">Route:</span> {consignment.senderAddress.split(',')[0]} → {consignment.receiverAddress.split(',')[0]}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">Timeline</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          <span>Received: {formatDate(consignment.receivedDate)}</span>
                        </div>
                        {consignment.dispatchedDate && (
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-2 text-purple-500" />
                            <span>Dispatched: {formatDate(consignment.dispatchedDate)}</span>
                          </div>
                        )}
                        {consignment.status === 'DELIVERED' && (
                          <div className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                            <span>Delivered: {consignment.dispatchedDate ? formatDate(new Date(new Date(consignment.dispatchedDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString()) : "Not available"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Transport Route</h3>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Package className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="mt-2 text-sm font-medium">{consignment.senderAddress.split(',')[0]}</p>
                        <p className="text-xs text-gray-500">{consignment.senderAddress.split(',')[1]}</p>
                      </div>
                      
                      <div className="flex-1 mx-4">
                        <div className="h-1 bg-gray-200 relative">
                          <div 
                            className={`h-1 absolute left-0 top-0 ${
                              consignment.status === 'RECEIVED' ? 'w-1/4 bg-blue-500' :
                              consignment.status === 'ASSIGNED' ? 'w-1/2 bg-yellow-500' :
                              consignment.status === 'IN_TRANSIT' ? 'w-3/4 bg-purple-500' :
                              'w-full bg-green-500'
                            }`}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <Check className="w-6 h-6 text-green-500" />
                        </div>
                        <p className="mt-2 text-sm font-medium">{consignment.receiverAddress.split(',')[0]}</p>
                        <p className="text-xs text-gray-500">{consignment.receiverAddress.split(',')[1]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-16">
              <Package className="w-16 h-16 mb-4" />
              <p>Select a consignment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Printer, Truck, Box, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Consignment {
  id: string;
  volume: number;
  sender: string;
  receiver: string;
  receivedDate: string;
}

interface TruckAssignment {
  id: string;
  truckLicensePlate: string;
  scheduledDeparture: string;
  status: string;
}

interface BranchDetails {
  branch: {
    id: string;
    name: string;
    accumulatedVolume: number;
  };
  activeAssignment: TruckAssignment | null;
  consignments: Consignment[];
}

export default function BranchDetailsPage({ branchId }: { branchId: string }) {
//   const router = useRouter();
  const [branchData, setBranchData] = useState<BranchDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch data from your API
    // For now, we'll use the mock data
    const fetchBranchDetails = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data
      const result = {
        branch: {
          id: branchId,
          name: getBranchNameById(branchId),
          accumulatedVolume: 198.4
        },
        activeAssignment: branchId === 'BR001' || branchId === 'BR002' ? {
          id: 'A12345',
          truckLicensePlate: 'TRK-9087',
          scheduledDeparture: new Date().toISOString(),
          status: 'SCHEDULED'
        } : null,
        consignments: [
          {
            id: 'C001',
            volume: 500.0,
            sender: 'Alpha Logistics',
            receiver: 'Delta Industries',
            receivedDate: new Date().toISOString()
          },
          {
            id: 'C002',
            volume: 15.3,
            sender: 'Bravo Traders',
            receiver: 'Gamma Corp',
            receivedDate: new Date().toISOString()
          },
          {
            id: 'C003',
            volume: 45.8,
            sender: 'Echo Shipping',
            receiver: 'Foxtrot Warehouse',
            receivedDate: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'C004',
            volume: 32.1,
            sender: 'Golf Transport',
            receiver: 'Hotel Distribution',
            receivedDate: new Date(Date.now() - 172800000).toISOString()
          }
        ]
      };

      
      console.log('Branch Data:', result);
      setBranchData(result);
      setLoading(false);
    };

    fetchBranchDetails();
  }, [branchId]);

  const getBranchNameById = (id: string): string => {
    const branchNames: Record<string, string> = {
      'BR001': 'North Ridge Depot',
      'BR002': 'East Valley Station',
      'BR003': 'Central City Hub',
      'BR004': 'West Gate Terminal',
      'BR005': 'South Coast Point'
    };
    return branchNames[id] || 'Unknown Branch';
  };

  const handleDispatch = () => {
    // In a real app, you would dispatch to your API
    // For now, just show an alert
    alert(`Truck ${branchData?.activeAssignment?.truckLicensePlate} has been dispatched!`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!branchData) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold text-red-600">Branch not found</h2>
        <Link href="/branches" className="mt-4 text-blue-500 hover:underline flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to branches
        </Link>
      </div>
    );
  }

  const { branch, activeAssignment, consignments } = branchData;
  const totalVolume = consignments.reduce((sum, consignment) => sum + consignment.volume, 0);
  const canAssignTruck = totalVolume >= 500 && !activeAssignment;

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/branches" className="text-blue-500 hover:underline flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to branches
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Branch Information Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Branch Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Basic details about this branch</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Branch ID:</span>
                <span className="font-medium">{branch.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Branch Name:</span>
                <span className="font-medium">{branch.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Volume:</span>
                <span className="font-medium">{totalVolume.toFixed(1)}m³</span>
              </div>
            </div>
          </div>
        </div>

        {/* Volume Status Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Volume Status</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Current volume capacity</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Accumulated Volume:</span>
                  <span className="font-medium">{totalVolume.toFixed(1)}/1000m³</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${totalVolume >= 500 ? 'bg-green-500' : 'bg-blue-500'} rounded-full`}
                    style={{ width: `${(totalVolume / 1000) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 text-center">
                  {totalVolume >= 500 ? 'Ready for truck assignment' : 'Minimum 500m³ required for truck assignment'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Truck Assignment Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Truck Assignment</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Current truck status</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            {activeAssignment ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Truck ID:</span>
                  <span className="font-medium">{activeAssignment.truckLicensePlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Assignment ID:</span>
                  <span className="font-medium">{activeAssignment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Scheduled Departure:</span>
                  <span className="font-medium text-right">
                    {format(new Date(activeAssignment.scheduledDeparture), 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeAssignment.status === 'DISPATCHED' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activeAssignment.status}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-24">
                <Truck className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-gray-500 text-sm">
                  {totalVolume >= 500 ? 'Ready for truck assignment' : 'Insufficient volume for truck assignment'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Consignment Details Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Box className="h-5 w-5 mr-2" />
            Consignment Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            List of all consignments at this branch
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consignment ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (m³)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {consignments.map((consignment) => (
                  <tr key={consignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{consignment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consignment.volume.toFixed(1)}m³</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consignment.sender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consignment.receiver}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(consignment.receivedDate), 'MMM dd, yyyy')}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{totalVolume.toFixed(1)}m³</td>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {activeAssignment && activeAssignment.status !== 'DISPATCHED' && (
          <button 
            onClick={handleDispatch}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Truck className="h-4 w-4 mr-2" />
            Dispatch Truck
          </button>
        )}
        {!activeAssignment && canAssignTruck && (
          <button 
            onClick={() => alert('Truck assignment would be implemented here')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Truck className="h-4 w-4 mr-2" />
            Assign Truck
          </button>
        )}
        <button 
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Consignment Details
        </button>
      </div>
    </div>
  );
}
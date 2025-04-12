"use client";
import { useState } from "react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
// import Badge from "../ui/badge/Badge";
// import Button from "../ui/button/Button";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

interface Truck {
  id: string;
  truckId: string;
  destinationTo: string;
  volumeFilled: number;
  capacity: number;
  dispatchId?: string;
  consignments: number;
}

const tableData: Truck[] = [
  {
    id: "1",
    truckId: "TRK-1234",
    destinationTo: "New York Warehouse",
    volumeFilled: 650,
    capacity: 1000,
    consignments: 5
  },
  {
    id: "2",
    truckId: "TRK-5678",
    destinationTo: "Los Angeles Port",
    volumeFilled: 480,
    capacity: 1000,
    consignments: 3
  },
  {
    id: "3",
    truckId: "TRK-9012",
    destinationTo: "Chicago Distribution Center",
    volumeFilled: 720,
    capacity: 1000,
    dispatchId: "DSP-3456",
    consignments: 6
  },
  {
    id: "4",
    truckId: "TRK-3456",
    destinationTo: "Miami Storage",
    volumeFilled: 920,
    capacity: 1000,
    dispatchId: "DSP-1234",
    consignments: 8
  },
];

const BranchData = [
  {
    "Branch ID": "BR001",
    "Branch Name": "Mumbai, Maharashtra",
    "Volume Filled": 550.5
  },
  {
    "Branch ID": "BR002",
    "Branch Name": "Delhi, Delhi",
    "Volume Filled": 700.0
  },
  {
    "Branch ID": "BR003",
    "Branch Name": "Bengaluru, Karnataka",
    "Volume Filled": 198.7
  },
  {
    "Branch ID": "BR004",
    "Branch Name": "Hyderabad, Telangana",
    "Volume Filled": 153.9
  },
  {
    "Branch ID": "BR005",
    "Branch Name": "Ahmedabad, Gujarat",
    "Volume Filled": 221.3
  },
  {
    "Branch ID": "BR006",
    "Branch Name": "Chennai, Tamil Nadu",
    "Volume Filled": 189.2
  },
  {
    "Branch ID": "BR007",
    "Branch Name": "Kolkata, West Bengal",
    "Volume Filled": 175.8
  },
  {
    "Branch ID": "BR008",
    "Branch Name": "Surat, Gujarat",
    "Volume Filled": 162.4
  },
  {
    "Branch ID": "BR009",
    "Branch Name": "Pune, Maharashtra",
    "Volume Filled": 210.6
  },
  {
    "Branch ID": "BR010",
    "Branch Name": "Jaipur, Rajasthan",
    "Volume Filled": 199.9
  }
];



export default function Export() {

  const [trucks, setTrucks] = useState(tableData);
  const [branches, setBranches] = useState(BranchData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Adjust items per page as needed

  // Calculate pagination values
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  // const currentTrucks = tableData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const currentBranches = branches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const handleDispatch = (truckId: string) => {
  //   setTrucks(prev => prev.map(truck =>
  //     truck.id === truckId ? {
  //       ...truck,
  //       dispatchId: `DSP-${Math.floor(1000 + Math.random() * 9000)}`
  //     } : truck
  //   ));
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  
  return (
    <>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                 Branch ID
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                 Branch Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status (Volume Filled)
                </TableCell>
                {/* <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Dispatch
                </TableCell> */}
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Details
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentBranches.map((branch) => (
                <TableRow key={branch["Branch ID"]} className="hover:bg-gray-50 dark:hover:bg-white/[0.08]">
                  <TableCell className="px-5 py-4 sm:px-6 text-start font-medium text-gray-800 dark:text-white/90">
                    {branch["Branch ID"]}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {branch["Branch Name"]}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          // style={{ width: `${(truck.volumeFilled / truck.capacity) * 100}%` }}
                          style={{ width: `${(branch["Volume Filled"] / 1000) * 100}%` }}
                        />
                      </div>
                      <span className="text-theme-sm">
                        {/* {truck.volumeFilled}/{truck.capacity}m³ */}
                        {branch["Volume Filled"]}m³
                      </span>
                    </div>
                  </TableCell>

                  {/* <TableCell className="px-4 py-3 text-start">
                    {truck.dispatchId ? (
                      <Badge color="success" >
                        <div className="flex flex-col align-middle items-center justify-center">
                          <span className="text-theme-xs font-medium">Dispatched</span>
                          <span className="text-[10px] text-center font-mono opacity-75">
                            {truck.dispatchId}
                          </span>
                        </div>
                      </Badge>
                    ) : (
                      <button
                        onClick={() => handleDispatch(truck.id)}
                        disabled={truck.volumeFilled <= 500}
                        className={`
        px-3 py-1.5 text-sm font-medium rounded-md transition-colors
        ${truck.volumeFilled > 500 ?
                            'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700' :
                            'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500'
                          }
      `}
                      >
                        Dispatch
                      </button>
                    )}
                  </TableCell> */}

                  <TableCell className="px-4 py-3 text-start">
                    <Link
                      href={`/branch/${branch["Branch ID"]}`}
                      className="text-blue-500 hover:text-blue-700 text-theme-sm dark:text-blue-300"
                    >
                      View Details 
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
    </div>

    <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
    
  );
}
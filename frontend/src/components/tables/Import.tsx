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
// import Link from "next/link";
// import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

interface Import {
    id: string;
    truckId: string;
    branchId: string;
    branchName: string;
    status: 'pending' | 'arrived';
  }
  
  const importData: Import[] = [
    {
      id: "1",
      truckId: "TRK-7890",
      branchId: "BR002",
      branchName: "Delhi, Delhi",
      status: 'pending'
    },
    {
      id: "2",
      truckId: "TRK-3456",
      branchId: "BR004",
      branchName: "Hyderabad, Telangana",
      status: 'arrived'
    },
    {
      id: "3",
      truckId: "TRK-9012",
      branchId: "BR001",
      branchName: "Mumbai, Maharashtra",
      status: 'pending'
    },
    {
      id: "4",
      truckId: "TRK-5678",
      branchId: "BR005",
      branchName: "Ahmedabad, Gujarat",
      status: 'pending'
    },
  ];
  
  
  // Add this component below your Export component
  export default function ImportTable() {
    const [imports, setImports] = useState(importData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
  
    const totalPages = Math.ceil(importData.length / itemsPerPage);
    const currentImports = imports.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const handleStatusChange = (importId: string) => {
      setImports(prev => prev.map(imp => 
        imp.id === importId ? { ...imp, status: 'arrived' } : imp
      ));
    };
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
  
    return (
      <div className="mt-8">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Truck ID
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Branch ID
                  </TableCell>
                  <TableCell isHeader className="px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Branch Name
                  </TableCell>
                  <TableCell isHeader className="px-20 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>
  
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {currentImports.map((imp) => (
                  <TableRow key={imp.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.08]">
                    <TableCell className="px-5 py-4 sm:px-6 text-start font-medium text-gray-800 dark:text-white/90">
                      {imp.truckId}
                    </TableCell>
  
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {imp.branchId}
                    </TableCell>
  
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {imp.branchName}
                    </TableCell>
  
                    <TableCell className="px-4 py-3 text-start">
                      <button
                        onClick={() => handleStatusChange(imp.id)}
                        className={`
                          px-3 py-1.5 text-sm font-medium rounded-md transition-colors w-48
                          ${imp.status === 'arrived' 
                            ? 'bg-green-100 text-green-700 cursor-default' 
                            : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'}
                        `}
                        disabled={imp.status === 'arrived'}
                      >
                        {imp.status === 'arrived' ? 'Truck Arrived' : 'Confirm Arrival'}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
  
        <div className="flex justify-end mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    );
  }
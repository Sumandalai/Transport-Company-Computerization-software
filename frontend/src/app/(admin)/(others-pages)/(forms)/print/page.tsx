"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Printer, Truck, Package, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PrintData {
  truckDetails: {
    licensePlate: string;
    driverName: string;
    estimatedArrival: string;
  };
  consignment: {
    id: string;
    items: Array<{
      description: string;
      volume: string;
      weight: string;
      value: string;
    }>;
  };
  payment: {
    method: string;
    amount: string;
    transactionId: string;
  };
}

export default function PrintPage() {
  const [printData, setPrintData] = useState<PrintData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, this would come from localStorage or an API
    // For demo purposes, we'll simulate loading data
    setTimeout(() => {
      // Mock data in case localStorage is empty (for development)
      const mockData: PrintData = {
        truckDetails: {
          licensePlate: "TRK-9087",
          driverName: "John Doe",
          estimatedArrival: "April 8, 2025, 14:30",
        },
        consignment: {
          id: "CSG-78901",
          items: [
            {
              description: "Electronic Components",
              volume: "45.5",
              weight: "120",
              value: "3,200.00",
            },
            {
              description: "Office Supplies",
              volume: "22.3",
              weight: "85",
              value: "1,450.00",
            },
            {
              description: "Machinery Parts",
              volume: "60.8",
              weight: "250",
              value: "5,870.00",
            },
          ],
        },
        payment: {
          method: "Credit Card",
          amount: "1,250.00",
          transactionId: "TXN-45678901",
        },
      };

      const savedData = localStorage.getItem("printData");
      if (savedData) {
        setPrintData(JSON.parse(savedData));
      } else {
        // Use mock data for development
        setPrintData(mockData);
      }
      setLoading(false);
    }, 500);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!printData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-gray-600 mb-4">No print data available</p>
        <Link 
          href="/" 
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Return to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Print button - only visible on screen */}
        <div className="no-print fixed bottom-8 right-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            <Printer className="w-5 h-5 mr-2" />
            Print Receipt
          </button>
        </div>

        {/* Back button - only visible on screen */}
        <div className="no-print mb-6 print:hidden">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        {/* Receipt Paper */}
        <div className="bg-white rounded-lg shadow-md print:shadow-none print:rounded-none mb-8">
          {/* Header */}
          <div className="border-b px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 print:text-black">
                  Shipping Receipt
                </h1>
                <p className="text-gray-500 print:text-gray-700">
                  Date: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-800 print:text-black">
                  LogiTech Transport
                </div>
                <div className="text-gray-500 print:text-gray-700">
                  123 Transport Ave, Logistic City
                </div>
                <div className="text-gray-500 print:text-gray-700">
                  contact@logitech-transport.com
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-8 py-6 space-y-8">
            {/* Truck Details */}
            <div className="bg-blue-50 rounded-lg p-6 print:bg-white print:border-2 print:border-gray-200">
              <div className="flex items-center mb-4">
                <Truck className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800 print:text-black">
                  Assigned Truck Details
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1 print:text-gray-600">License Plate</p>
                  <p className="font-semibold text-gray-800 print:text-black">{printData.truckDetails.licensePlate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1 print:text-gray-600">Driver Name</p>
                  <p className="font-semibold text-gray-800 print:text-black">{printData.truckDetails.driverName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1 print:text-gray-600">Estimated Arrival</p>
                  <p className="font-semibold text-gray-800 print:text-black">{printData.truckDetails.estimatedArrival}</p>
                </div>
              </div>
            </div>

            {/* Consignment Details */}
            <div>
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800 print:text-black">
                  Consignment Details
                </h2>
              </div>
              <div className="mb-4 flex items-center">
                <p className="text-gray-500 text-sm print:text-gray-600 mr-2">Consignment ID:</p>
                <p className="font-semibold text-gray-800 print:text-black">{printData.consignment.id}</p>
              </div>
              <div className="bg-gray-50 rounded-lg overflow-hidden print:bg-white print:border-2 print:border-gray-200">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 bg-gray-100 px-6 py-3 print:bg-gray-200">
                  <div className="font-medium text-gray-600 print:text-black">Description</div>
                  <div className="font-medium text-gray-600 print:text-black">Volume (m³)</div>
                  <div className="font-medium text-gray-600 print:text-black">Weight (kg)</div>
                  <div className="font-medium text-gray-600 print:text-black">Value ($)</div>
                </div>
                {/* Table Content */}
                {printData.consignment.items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`grid grid-cols-4 gap-4 px-6 py-4 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } print:bg-white`}
                  >
                    <div className="text-gray-800 print:text-black">{item.description}</div>
                    <div className="text-gray-800 print:text-black">{item.volume}</div>
                    <div className="text-gray-800 print:text-black">{item.weight}</div>
                    <div className="text-gray-800 print:text-black">${item.value}</div>
                  </div>
                ))}
                {/* Total row */}
                <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-100 font-medium print:bg-gray-200">
                  <div className="text-gray-800 print:text-black">Total</div>
                  <div className="text-gray-800 print:text-black">
                    {printData.consignment.items.reduce(
                      (sum, item) => sum + parseFloat(item.volume), 0
                    ).toFixed(1)}
                  </div>
                  <div className="text-gray-800 print:text-black">
                    {printData.consignment.items.reduce(
                      (sum, item) => sum + parseFloat(item.weight), 0
                    ).toFixed(0)}
                  </div>
                  <div className="text-gray-800 print:text-black">
                    $
                    {printData.consignment.items.reduce(
                      (sum, item) => sum + parseFloat(item.value.replace(/,/g, '')), 0
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-green-50 rounded-lg p-6 print:bg-white print:border-2 print:border-gray-200">
              <div className="flex items-center mb-4">
                <CreditCard className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800 print:text-black">
                  Payment Summary
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1 print:text-gray-600">Payment Method</p>
                  <p className="font-semibold text-gray-800 print:text-black">{printData.payment.method}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1 print:text-gray-600">Amount Paid</p>
                  <p className="font-semibold text-gray-800 print:text-black">${printData.payment.amount}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1 print:text-gray-600">Transaction ID</p>
                  <p className="font-semibold text-gray-800 print:text-black">{printData.payment.transactionId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-8 py-6 text-center text-gray-500 print:text-gray-700">
            <p>Thank you for your business!</p>
            <p className="text-sm mt-1">This receipt was automatically generated on {new Date().toLocaleDateString()} and is valid without signature.</p>
          </div>
        </div>
      </div>

      {/* Print-specific styles */}
      {/* <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
        }
      `}</style> */}
    </div>
  );
}
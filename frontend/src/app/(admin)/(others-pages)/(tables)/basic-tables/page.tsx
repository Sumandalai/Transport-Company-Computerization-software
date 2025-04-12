import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Export from "@/components/tables/Export";
// import BasicTableOne from "@/components/tables/Export";
import Import from "@/components/tables/Import";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="TransportTables" />
      <div className="space-y-6">
        <ComponentCard title="export">
          {/* <BasicTableOne /> */}
          <Export />
          
        </ComponentCard>
      </div>
      <div className="space-y-6">
        <ComponentCard title="import">
          {/* <BasicTableOne /> */}
          <Import />
          
        </ComponentCard>
      </div>
    </div>
  );
}
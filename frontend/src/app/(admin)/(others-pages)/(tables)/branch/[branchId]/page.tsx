import BranchDetailsPage from "@/components/BranchDetailsPage";

export default async function BranchPage({ params }: { params: { branchId: string } }) {
  const { branchId } = params;

  return <BranchDetailsPage branchId={branchId} />;
}
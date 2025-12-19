"use client";

import { useParams } from "next/navigation";
import FinancialForm from "@/components/FinancialForm";

export default function ProductFinancialPage() {
  const params = useParams();
  const productId = params.id as string;
  
  return <FinancialForm productId={productId} />;
}

"use client";

import { useParams } from "next/navigation";
import Gate2Form from "@/components/Gate2Form";

export default function ProductGate2Page() {
  const params = useParams();
  const productId = params.id as string;
  
  return <Gate2Form productId={productId} />;
}

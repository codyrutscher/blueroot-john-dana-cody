"use client";

import { useParams } from "next/navigation";
import Gate3Form from "@/components/Gate3Form";

export default function ProductGate3Page() {
  const params = useParams();
  const productId = params.id as string;
  
  return <Gate3Form productId={productId} />;
}

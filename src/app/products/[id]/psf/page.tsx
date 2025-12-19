"use client";

import { useParams } from "next/navigation";
import PSFForm from "@/components/PSFForm";

export default function ProductPSFPage() {
  const params = useParams();
  const productId = params.id as string;
  
  return <PSFForm productId={productId} />;
}

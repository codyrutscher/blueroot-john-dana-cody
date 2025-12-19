import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: data.id,
    name: data.name,
    brand: data.brand,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    financial: data.financial,
    gate2: data.gate2,
    gate3: data.gate3,
    psf: data.psf,
    gate2Complete: data.gate2_complete,
    gate3Complete: data.gate3_complete,
    psfComplete: data.psf_complete,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = await request.json();

  // Map camelCase to snake_case for Supabase
  const dbUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.brand !== undefined) dbUpdates.brand = updates.brand;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.financial !== undefined) dbUpdates.financial = updates.financial;
  if (updates.gate2 !== undefined) dbUpdates.gate2 = updates.gate2;
  if (updates.gate3 !== undefined) dbUpdates.gate3 = updates.gate3;
  if (updates.psf !== undefined) dbUpdates.psf = updates.psf;
  if (updates.gate2Complete !== undefined) dbUpdates.gate2_complete = updates.gate2Complete;
  if (updates.gate3Complete !== undefined) dbUpdates.gate3_complete = updates.gate3Complete;
  if (updates.psfComplete !== undefined) dbUpdates.psf_complete = updates.psfComplete;

  const { data, error } = await supabase
    .from("products")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    product: {
      id: data.id,
      name: data.name,
      brand: data.brand,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      financial: data.financial,
      gate2: data.gate2,
      gate3: data.gate3,
      psf: data.psf,
      gate2Complete: data.gate2_complete,
      gate3Complete: data.gate3_complete,
      psfComplete: data.psf_complete,
    },
  });
}

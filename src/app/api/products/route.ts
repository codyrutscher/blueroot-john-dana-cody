import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Map snake_case to camelCase for frontend
    const products = data?.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      status: p.status,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
      financial: p.financial,
      gate2: p.gate2,
      gate3: p.gate3,
      psf: p.psf,
      gate2Complete: p.gate2_complete,
      gate3Complete: p.gate3_complete,
      psfComplete: p.psf_complete,
    }));

    return NextResponse.json(products || []);
  } catch (error) {
    console.error("Error loading products:", error);
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, brand } = await request.json();

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        brand,
        status: "draft",
        gate2_complete: false,
        gate3_complete: false,
        psf_complete: false,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      product: {
        id: data.id,
        name: data.name,
        brand: data.brand,
        status: data.status,
        createdAt: data.created_at,
        gate2Complete: data.gate2_complete,
        gate3Complete: data.gate3_complete,
        psfComplete: data.psf_complete,
      },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create", details: String(error) },
      { status: 500 }
    );
  }
}

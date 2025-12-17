import { NextRequest, NextResponse } from "next/server";
import { loadCSV, saveData, updateCell, updateCells } from "@/lib/csvStore";

export async function GET() {
  try {
    const data = loadCSV();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Full data update
    if (body.data) {
      saveData(body.data);
      return NextResponse.json({ success: true });
    }

    // Single cell update
    if (body.row !== undefined && body.col !== undefined && body.value !== undefined) {
      const data = updateCell(body.row, body.col, body.value);
      return NextResponse.json({ success: true, data });
    }

    // Multiple cell updates
    if (body.updates) {
      const data = updateCells(body.updates);
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}

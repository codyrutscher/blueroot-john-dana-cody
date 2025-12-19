import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "psf-documents.json");

function loadDocuments() {
  if (fs.existsSync(DATA_PATH)) {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  }
  return [];
}

function saveDocuments(docs: unknown[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(docs, null, 2));
}

export async function GET() {
  try {
    const docs = loadDocuments();
    return NextResponse.json(docs);
  } catch {
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const doc = await request.json();
    doc.id = Date.now().toString();
    doc.createdAt = new Date().toISOString();

    const docs = loadDocuments();
    docs.push(doc);
    saveDocuments(docs);

    return NextResponse.json({ success: true, doc });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

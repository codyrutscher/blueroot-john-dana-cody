import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Get Excel files from OneDrive
    const response = await fetch(
      "https://graph.microsoft.com/v1.0/me/drive/root/search(q='.xlsx')",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.value || []);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { fileId, worksheet, range, values } = await request.json();

    if (!fileId || !worksheet || !range || !values) {
      return NextResponse.json(
        { error: "Missing required fields: fileId, worksheet, range, values" },
        { status: 400 }
      );
    }

    // Update Excel range
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/workbook/worksheets/${worksheet}/range(address='${range}')`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update Excel" }, { status: 500 });
  }
}

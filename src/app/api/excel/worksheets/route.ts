import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const fileId = request.nextUrl.searchParams.get("fileId");
  
  if (!fileId) {
    return NextResponse.json({ error: "fileId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/workbook/worksheets`,
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
    return NextResponse.json({ error: "Failed to fetch worksheets" }, { status: 500 });
  }
}

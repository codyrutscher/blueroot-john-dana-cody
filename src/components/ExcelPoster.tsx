"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

interface ExcelFile {
  id: string;
  name: string;
}

interface Worksheet {
  id: string;
  name: string;
}

export default function ExcelPoster() {
  const { data: session, status } = useSession();
  const [files, setFiles] = useState<ExcelFile[]>([]);
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedWorksheet, setSelectedWorksheet] = useState("");
  const [range, setRange] = useState("A1:C3");
  const [values, setValues] = useState('[["Name", "Age", "City"], ["John", 30, "NYC"], ["Jane", 25, "LA"]]');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      fetchFiles();
    }
  }, [session]);

  useEffect(() => {
    if (selectedFile) {
      fetchWorksheets(selectedFile);
    }
  }, [selectedFile]);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/excel");
      const data = await res.json();
      if (Array.isArray(data)) {
        setFiles(data);
      }
    } catch (error) {
      setMessage("Failed to fetch files");
    }
  };

  const fetchWorksheets = async (fileId: string) => {
    try {
      const res = await fetch(`/api/excel/worksheets?fileId=${fileId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setWorksheets(data);
        if (data.length > 0) {
          setSelectedWorksheet(data[0].name);
        }
      }
    } catch (error) {
      setMessage("Failed to fetch worksheets");
    }
  };


  const postToExcel = async () => {
    if (!selectedFile || !selectedWorksheet || !range || !values) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const parsedValues = JSON.parse(values);
      const res = await fetch("/api/excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId: selectedFile,
          worksheet: selectedWorksheet,
          range,
          values: parsedValues,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Successfully posted to Excel!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to post data. Check your JSON format.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Excel Live Sheet Poster</h1>
        <p className="text-gray-600">Sign in with Microsoft to post data to Excel</p>
        <button
          onClick={() => signIn("azure-ad")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Sign in with Microsoft
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Excel Live Sheet Poster</h1>
        <button
          onClick={() => signOut()}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Sign out
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Excel File</label>
          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            className="w-full border rounded-lg p-2 bg-white"
          >
            <option value="">Select a file...</option>
            {files.map((file) => (
              <option key={file.id} value={file.id}>
                {file.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Worksheet</label>
          <select
            value={selectedWorksheet}
            onChange={(e) => setSelectedWorksheet(e.target.value)}
            className="w-full border rounded-lg p-2 bg-white"
            disabled={!selectedFile}
          >
            <option value="">Select a worksheet...</option>
            {worksheets.map((ws) => (
              <option key={ws.id} value={ws.name}>
                {ws.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Range (e.g., A1:C3)</label>
          <input
            type="text"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="A1:C3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Values (JSON 2D array)</label>
          <textarea
            value={values}
            onChange={(e) => setValues(e.target.value)}
            className="w-full border rounded-lg p-2 font-mono text-sm"
            rows={5}
            placeholder='[["A1", "B1"], ["A2", "B2"]]'
          />
        </div>

        <button
          onClick={postToExcel}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post to Excel"}
        </button>

        {message && (
          <div className={`p-3 rounded-lg ${message.includes("Error") || message.includes("Failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

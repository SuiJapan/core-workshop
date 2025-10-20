import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("API route called - Headers:", {
      contentType: request.headers.get("content-type"),
      contentLength: request.headers.get("content-length"),
    });

    const body = await request.text();
    console.log("Raw body:", body.slice(0, 200));

    const { txKind, sender } = JSON.parse(body);

    console.log("Received request:", {
      txKind: txKind.slice(0, 50) + "...",
      sender
    });

    if (!txKind || !sender) {
      return NextResponse.json(
        { error: "Missing txKind or sender" },
        { status: 400 }
      );
    }

    const ACCESS_KEY = process.env.NEXT_PUBLIC_SHINAMI_ACCESS_KEY;

    if (!ACCESS_KEY) {
      console.error("Missing ACCESS_KEY");
      return NextResponse.json(
        { error: "Missing Shinami access key" },
        { status: 500 }
      );
    }

    // Extract region from ACCESS_KEY (e.g., "us1_sui_testnet_xxx")
    const region = ACCESS_KEY.split("_")[0];
    const apiUrl = `https://api.${region}.shinami.com/gas/v1`;

    console.log("Calling Shinami Gas Station API:", apiUrl);

    // Call Shinami Gas Station API directly using JSON-RPC
    const rpcPayload = {
      jsonrpc: "2.0",
      method: "gas_sponsorTransactionBlock",
      params: [txKind, sender],
      id: 1,
    };

    console.log("RPC payload:", JSON.stringify(rpcPayload, null, 2));

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": ACCESS_KEY,
      },
      body: JSON.stringify(rpcPayload),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Shinami API error response:", errorText);
      throw new Error(`Shinami API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Response data:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("Shinami RPC error:", data.error);
      throw new Error(data.error.message || JSON.stringify(data.error));
    }

    if (!data.result) {
      console.error("No result in response:", data);
      throw new Error("No result from Shinami API");
    }

    console.log("Sponsorship successful");
    return NextResponse.json(data.result);
  } catch (error: any) {
    console.error("Error sponsoring transaction:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      {
        error: error.message || "Failed to sponsor transaction",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

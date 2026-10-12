export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const data: Record<string, any> = {};

    if (contentType.includes("application/json")) {
      const json = await req.json();
      Object.assign(data, json);
    } else {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    // Check all potential environment variable names with user's key fallback
    const accessKey =
      process.env.WEB3FORMS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      process.env.W3FORMS_KEY ||
      process.env.NEXT_PUBLIC_W3FORMS_KEY ||
      "ccd20e1c-d127-47b7-88b5-41b45080d930";

    const payload = {
      ...data,
      access_key: accessKey.trim(),
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return Response.json(result, { status: response.status });
  } catch (error: any) {
    console.error("Contact API route error:", error);
    return Response.json(
      {
        success: false,
        message: error?.message || "Failed to send message. Please email directly at agnelfrancis2007@hotmail.com.",
      },
      { status: 500 }
    );
  }
}

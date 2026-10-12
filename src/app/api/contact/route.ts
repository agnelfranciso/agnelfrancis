export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Check all potential environment variable names on the server
    const accessKey =
      process.env.WEB3FORMS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      process.env.W3FORMS_KEY ||
      process.env.NEXT_PUBLIC_W3FORMS_KEY;

    if (!accessKey) {
      return Response.json(
        {
          success: false,
          message: "Form access key is missing on the server. Please email directly at agnelfrancis2007@hotmail.com.",
        },
        { status: 500 }
      );
    }

    // Ensure access_key is attached
    formData.set("access_key", accessKey.trim());

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Contact API route error:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to send message. Please email directly at agnelfrancis2007@hotmail.com.",
      },
      { status: 500 }
    );
  }
}

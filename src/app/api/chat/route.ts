import { projectsData } from "@/data/projects";

const rateLimitMap = new Map<string, { count: number, startTime: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    
    // Allow 5 requests per minute per IP
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, startTime: now });
    } else {
      const data = rateLimitMap.get(ip)!;
      if (now - data.startTime > 60000) {
        rateLimitMap.set(ip, { count: 1, startTime: now });
      } else {
        data.count++;
        if (data.count > 5) {
          return Response.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
        }
      }
    }

    const { messages } = await req.json();

    // System prompt with project context
    const systemInstruction = `You are a helpful AI assistant for Agnel Francis's portfolio website. 
You know all about Agnel's projects, experience, and background. Here is his personal info:
- Name: Agnel Francis Olakkengil
- Role: Full-stack developer, designer, and CEO of FramePixel.
- FramePixel: A digital solutions and web-based games studio focused on building experiences that actually matter.
- Education: 
  1. B.Tech Computer Science and Engineering (Cybersecurity) at Jyothi Engineering College, Cheruthuruthy (Current: 2025 - 2029).
  2. Junior Software Developer Course at Sarvodayam VHSS, Aryampadam (2023 - 2025).
  3. High School Education at Govt RSRV HSS, Velur (2017 - 2023).

Here is his project data:
${JSON.stringify(projectsData, null, 2)}

CRITICAL RULES:
1. Answer questions extremely concisely (1-3 sentences max) and politely.
2. If the user asks ANY question that is NOT related to Agnel, his projects, his experience, or his portfolio, you MUST politely decline to answer. 
3. Do NOT act as a general-purpose AI. Do NOT write code, essays, or solve general knowledge problems. You exist ONLY to discuss Agnel and his work.`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: messages.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini Error:", data.error);
      return Response.json({ error: data.error.message }, { status: 500 });
    }

    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
    
    return Response.json({ message: aiMessage });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Groq } from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // The user provided the API key in the prompt, let's use it for the assignment
    // Alternatively, this should be in process.env.GROQ_API_KEY
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `You are an Agentic AI Internship Recommendation Assistant.
Your role is to analyze a student's academic profile, technical skills, interests, preferred technologies, and CGPA, then provide personalized internship recommendations and a structured learning roadmap.

Student Profile:
Name: ${body.name}
CGPA: ${body.cgpa}
Year: ${body.year}
Branch: ${body.branch}
College: ${body.college}
Skills: ${body.skills}
Programming Languages: ${body.languages}
Frameworks: ${body.frameworks}
Tools: ${body.tools}
Databases: ${body.databases}
Projects: ${body.projects}
Interests: ${body.interests}
Preferred Technologies: ${body.preferred_technologies}
Career Goal: ${body.career_goal}
Hours available per week: ${body.hours}

Your objectives:
1. Analyze strengths and weaknesses.
2. Recommend the best internship roles (Rank them).
3. Identify missing skills (Gap Analysis table).
4. Explain why each role fits.
5. Generate a phased learning roadmap.
6. Create a weekly study plan based on available hours.
7. Suggest 5 resume-worthy projects.
8. Recommend certifications.
9. Recommend interview preparation resources.
10. Calculate an Internship Readiness Score (0-100).

Return the response strictly in formatted Markdown as requested in the prompt. Do not hallucinate.`;

    // Using Groq API directly instead of full LangGraph overhead for simplicity and speed,
    // though LangChain/LangGraph could orchestrate multiple prompts. 
    // Given the prompt is self-contained, a powerful LLM can do this in one shot.
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile", // Updated to a supported model
      temperature: 0.2,
      max_tokens: 4000,
    });

    const result = chatCompletion.choices[0]?.message?.content || "Error generating response.";

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Generate API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

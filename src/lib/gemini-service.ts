import { GoogleGenerativeAI } from "@google/generative-ai";

interface GeminiResponse {
  text: string;
  error?: string;
}

export async function reviewCode(code: string, apiKey: string): Promise<GeminiResponse> {
  if (!apiKey) {
    return { text: "", error: "API key is required" };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: 
        "You are an expert code reviewer with extensive experience across multiple programming languages and paradigms. " +
        "Analyze the provided code and provide thorough yet practical feedback in these categories:\n\n" +
        "1. **Code Quality & Readability**\n" +
        "   - Structure, naming conventions, and language-specific style guides\n" +
        "   - Opportunities to improve clarity through better organization or documentation\n\n" +
        "2. **Potential Bugs & Logic Issues**\n" +
        "   - Edge cases that may not be handled properly\n" +
        "   - Logical flaws that could lead to unexpected behavior\n\n" +
        "3. **Security Vulnerabilities**\n" +
        "   - Input validation issues, authentication weaknesses\n" +
        "   - Common vulnerability patterns specific to the language/framework\n\n" +
        "4. **Performance Considerations**\n" +
        "   - Algorithmic efficiency and computational complexity\n" +
        "   - Resource utilization (memory, CPU, network, etc.)\n\n" +
        "5. **Best Practices & Maintainability**\n" +
        "   - Design pattern implementation\n" +
        "   - Testing suggestions\n" +
        "   - Future-proofing recommendations\n\n" +
        "For each issue identified:\n" +
        "- Explain WHY it matters, not just WHAT should change\n" +
        "- Provide specific code examples demonstrating improvements\n" +
        "- Use markdown formatting for clarity\n" +
        "- Cite language-specific standards when relevant\n\n" +
        "Balance criticism with positive reinforcement of well-implemented patterns.",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 100000,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(code);
    return { text: result.response.text() };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { 
      text: "", 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}
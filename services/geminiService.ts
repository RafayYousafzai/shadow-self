
import { GoogleGenAI } from "@google/genai";
import { EROS_SYSTEM_INSTRUCTION } from "../constants";
import { ParsedResult, CosmicDetails } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeArchetype = async (counts: Record<string, number>, cosmicDetails?: CosmicDetails): Promise<ParsedResult> => {
  const ai = getClient();

  // Format counts for the prompt
  const countString = Object.entries(counts)
    .map(([key, val]) => `${key}:${val}`)
    .join(", ");

  let prompt = `
    User just finished the quiz. Here are their letter counts:
    ${countString}
  `;

  if (cosmicDetails) {
    prompt += `
    
    User Birth Details for Zodiac Calculation:
    Date: ${cosmicDetails.birthDate}
    Time: ${cosmicDetails.birthTime || "Unknown"}
    City: ${cosmicDetails.birthCity || "Unknown"}
    
    If the Date is "Unknown", skip calculating specific planetary placements but assume a "Mystery" sign or generic reading, but DO still generate the sections.
    `;
  }

  prompt += `\nGenerate the result using the strict format defined in the system instruction.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: EROS_SYSTEM_INSTRUCTION,
        temperature: 0.65, // Strictness for logic adherence
      }
    });

    const text = response.text || "";
    return parseResponse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const generateMoodboardImage = async (prompt: string): Promise<string | null> => {
  const ai = getClient();
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/jpeg'
      }
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const imageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${imageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};

// Helper to parse the raw text into structured data for the UI
const parseResponse = (text: string): ParsedResult => {
  // Defaults
  const result: ParsedResult = {
    rawText: text,
    title: "Unknown Archetype",
    subtitle: "(Unknown)",
    primaryArchetype: "Mystery",
    shadowArchetype: "Unknown",
    vibe: "Your energy is too chaotic to read.",
    celebrities: [],
    moodboardPrompt: "abstract dark art",
    brutalHonesty: "You broke the machine.",
    matches: "None."
  };

  try {
    // Basic Regex Extraction
    const titleMatch = text.match(/\*\*(.*?)\*\*/);
    if (titleMatch) result.title = titleMatch[1];

    const subtitleMatch = text.match(/\((.*?)\)/);
    if (subtitleMatch) result.subtitle = subtitleMatch[0];

    const primaryMatch = text.match(/Primary seduction archetype:\s*(.*)/);
    if (primaryMatch) result.primaryArchetype = primaryMatch[1];

    const shadowMatch = text.match(/Shadow archetype:\s*(.*)/);
    if (shadowMatch) result.shadowArchetype = shadowMatch[1];

    const vibeMatch = text.match(/One-sentence vibe:\s*(.*)/);
    if (vibeMatch) result.vibe = vibeMatch[1];

    const celebSection = text.split("Celebrity/character energy:")[1]?.split("Moodboard prompt")[0];
    if (celebSection) {
      result.celebrities = celebSection
        .split("\n")
        .map(line => line.replace(/•|-/, '').trim())
        .filter(line => line.length > 0);
    }

    const promptMatch = text.match(/Moodboard prompt.*:\s*"([^"]+)"/s) || text.match(/Moodboard prompt.*:\s*"(.*)"/);
    if (promptMatch) {
        result.moodboardPrompt = promptMatch[1].replace(/\n/g, " ").trim();
    } else {
        const promptLine = text.split("Moodboard prompt for Flux/SD3 (copy-paste this directly into image gen):")[1]?.split("\n")[1];
        if (promptLine) result.moodboardPrompt = promptLine.trim();
    }

    const honestMatch = text.split("Brutally honest section (18+):")[1]?.split("Best match:")[0];
    if (honestMatch) result.brutalHonesty = honestMatch.trim();

    const matchSection = text.split("Best match:")[1]?.split("===COSMIC LAYER===")[0] || text.split("Best match:")[1]?.split("===RESULT END===")[0];
    if (matchSection) {
        result.matches = "Best match: " + matchSection.trim();
    }

    // Cosmic Parsing
    if (text.includes("===COSMIC LAYER===")) {
      result.cosmic = {
        zodiacHeader: "",
        analysis: "",
        universeMessage: "",
        prophecy: []
      };

      const cosmicPart = text.split("===COSMIC LAYER===")[1];
      
      // Get header line (between stars)
      const headerMatch = cosmicPart.match(/\*\*(.*?)\*\*/);
      if (headerMatch) result.cosmic.zodiacHeader = headerMatch[1];

      // Get Analysis (text after header, before next section)
      const analysisRaw = cosmicPart.split(/\*\*MESSAGE FROM THE UNIVERSE\*\*/)[0].replace(/\*\*.*?\*\*/, "").trim();
      result.cosmic.analysis = analysisRaw;

      // Get Message
      const messageRaw = cosmicPart.split(/\*\*MESSAGE FROM THE UNIVERSE\*\*/)[1]?.split(/\*\*2026 SEDUCTION PROPHECY\*\*/)[0];
      if (messageRaw) result.cosmic.universeMessage = messageRaw.trim();

      // Get Prophecy
      const prophecyRaw = cosmicPart.split(/\*\*2026 SEDUCTION PROPHECY\*\*/)[1]?.split("===RESULT END===")[0];
      if (prophecyRaw) {
        result.cosmic.prophecy = prophecyRaw
          .split("\n")
          .map(line => line.replace(/•|-/, '').trim())
          .filter(line => line.length > 0);
      }
    }

  } catch (e) {
    console.warn("Parsing failed, falling back to raw text display", e);
  }

  return result;
};

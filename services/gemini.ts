import { GoogleGenAI, Type } from "@google/genai";
import { NutritionalData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFood = async (foodQuery: string): Promise<NutritionalData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analise nutricionalmente o seguinte alimento ou refeição: "${foodQuery}". Forneça uma estimativa precisa baseada em porções padrão se não especificado. Retorne os dados em JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Nome curto e formatado do alimento" },
            calories: { type: Type.NUMBER, description: "Total de calorias (kcal)" },
            protein: { type: Type.NUMBER, description: "Proteína em gramas" },
            carbs: { type: Type.NUMBER, description: "Carboidratos em gramas" },
            fat: { type: Type.NUMBER, description: "Gorduras totais em gramas" },
            fiber: { type: Type.NUMBER, description: "Fibras em gramas" },
            servingSize: { type: Type.STRING, description: "Tamanho da porção considerada (ex: 100g, 1 unidade)" },
            description: { type: Type.STRING, description: "Uma breve curiosidade nutricional ou dica de saúde sobre este alimento (max 2 frases)." }
          },
          required: ["name", "calories", "protein", "carbs", "fat", "fiber", "servingSize", "description"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as NutritionalData;
    }
    
    throw new Error("Não foi possível analisar os dados.");
  } catch (error) {
    console.error("Erro na análise:", error);
    throw error;
  }
};
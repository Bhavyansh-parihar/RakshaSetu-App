import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

@Injectable()
export class ChatbotService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async askQuestion(message: string): Promise<string> {
    const systemInstruction = `You are RakshaSetu, an emergency and disaster survival assistant. You must ONLY answer questions regarding disaster survival, evacuation, first aid, weather safety, and emergency response. If the user asks about ANY unrelated topic (e.g., sports, programming, politics, general knowledge), you must politely refuse to answer and redirect them to safety topics. Keep answers concise, empathetic, and actionable.`;
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: message,
        config: {
          systemInstruction,
        }
      });
      return response.text;
    } catch (error) {
      console.error('Gemini error:', error);
      return 'I am currently experiencing technical difficulties. For immediate emergency assistance, please press the SOS button.';
    }
  }
}

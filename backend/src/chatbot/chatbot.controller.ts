import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async ask(@Body() body: { message: string }) {
    const reply = await this.chatbotService.askQuestion(body.message);
    return { reply };
  }
}

interface ChatMessage {
  role: string;
  content: Array<{
    type: string;
    text?: string;
    image_url?: string;
  }>;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class MistralClient {
  private apiKey: string;
  private baseUrl = 'https://api.mistral.ai/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  chat = {
    complete: async (params: ChatCompletionRequest): Promise<ChatCompletionResponse> => {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return response.json();
    }
  };
}
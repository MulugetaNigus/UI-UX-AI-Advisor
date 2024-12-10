import { MistralClient } from './mistralClient';
import { MISTRAL_API } from '../API_KEY'

interface MistralResponse {
  feedback: string;
  status: 'success' | 'error';
}

// Function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

export async function analyzeFeedback(imageFile: File): Promise<MistralResponse> {
  try {
    const base64Image = await fileToBase64(imageFile);
    
    const client = new MistralClient(MISTRAL_API);
    
    const messages = [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "What does this image depict, and can you provide detailed suggestions for UI/UX improvements?"
          },
          {
            type: 'image_url',
            image_url: `data:image/jpeg;base64,${base64Image}`
          }
        ]
      }
    ];

    const response = await client.chat.complete({
      model: 'pixtral-12b-2409',
      messages
    });

    return {
      feedback: response.choices[0].message.content,
      status: 'success'
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    return {
      feedback: 'Failed to analyze image. Please try again.',
      status: 'error'
    };
  }
}
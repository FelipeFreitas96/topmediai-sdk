import { ConstructorDTO, GenerateDTO } from "./src/dto/TopMediAi.dto";
import { GetApiKeyInfoResponse } from "./src/responses/getApiKeyInfo.response";
import { GetVoiceListResponse } from "./src/responses/getVoiceList.responses";
import { TextToSpeechResponse } from "./src/responses/TextToSpeech.response";

export { EmotionEnums } from "./src/enums/emotion.enum";
export class TopMediAiClient {
  private apiKey: string;
  constructor(dto: ConstructorDTO) {
    this.apiKey = dto.apiKey;
  }

  private isApiKeySetted() {
    if (!this.apiKey) {
      throw new Error("API key is not set. Please call init() method first.");
    }
    return true;
  }

  async getVoiceList() {
    return new Promise<GetVoiceListResponse>((resolve, reject) => {
      if (this.isApiKeySetted()) {
        fetch("https://api.topmediai.com/v1/voices_list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
          },
        })
          .then((response) => response.json())
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      }
    });
  }

  async getApiKeyInfo() {
    return new Promise<GetApiKeyInfoResponse>(async (resolve, reject) => {
      if (this.isApiKeySetted()) {
        const response = await fetch(
          "https://api.topmediai.com/v1/get_api_key_info",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": this.apiKey,
            },
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          return reject(errorResponse);
        }

        const jsonResponse: GetApiKeyInfoResponse = await response.json();
        return resolve(jsonResponse);
      }
    });
  }

  async generate(dto: GenerateDTO) {
    return new Promise<Buffer>(async (resolve, reject) => {
      if (this.isApiKeySetted()) {
        try {
          const response = await fetch(
            "https://api.topmediai.com/v1/text2speech",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": this.apiKey,
              },
              body: JSON.stringify(dto),
            }
          );

          if (!response.ok) {
            const errorResponse = await response.json();
            return reject(errorResponse);
          }

          const jsonResponse: TextToSpeechResponse = await response.json();
          const fileResponse = await fetch(jsonResponse.data.oss_url);
          const arrayBuffer = await fileResponse.arrayBuffer();
          return resolve(Buffer.from(arrayBuffer));
        } catch (err) {
          return reject(err);
        }
      }
    });
  }
}

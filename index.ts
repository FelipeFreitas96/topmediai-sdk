import { ConstructorDTO, GenerateDTO } from "./src/dto/TopMediAi.dto";
import { GetVoiceListResponse } from "./src/responses/getVoiceList.responses";
import { TextToSpeechResponse } from "./src/responses/TextToSpeech.response";

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

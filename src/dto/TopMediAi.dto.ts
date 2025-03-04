import { EmotionEnums } from "../enums/emotion.enum";

export type ConstructorDTO = {
  apiKey: string;
};

export type GenerateDTO = {
  text: string;
  speaker: string;
  emotion?: EmotionEnums;
};

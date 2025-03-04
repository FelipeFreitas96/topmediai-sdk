export type TextToSpeechResponse = {
  status: number;
  message: string;
  data: {
    type: number;
    name: string;
    speaker: string;
    oss_url: string;
  };
};

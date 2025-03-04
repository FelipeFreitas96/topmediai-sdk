export interface Voice {
  languageName: string; // voice's language
  plan: number;
  speaker: string;
  classification?: string;
  classNameArray?: string;
  name: string;
  type: string;
  typeIsHot?: boolean;
  urlName?: string;
  trending?: boolean;
  describe?: string;
  modelToken?: string;
  voiceIsNew?: boolean;
  avatarUrl?: string;
  isVip?: boolean;
  isFree?: boolean;
  urlList?: string;
}

export type GetVoiceListResponse = {
  Voice: Voice[];
};

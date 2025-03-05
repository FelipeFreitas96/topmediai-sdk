"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopMediAiClient = exports.EmotionEnums = void 0;
var emotion_enum_1 = require("./src/enums/emotion.enum");
Object.defineProperty(exports, "EmotionEnums", { enumerable: true, get: function () { return emotion_enum_1.EmotionEnums; } });
class TopMediAiClient {
    constructor(dto) {
        this.apiKey = dto.apiKey;
    }
    isApiKeySetted() {
        if (!this.apiKey) {
            throw new Error("API key is not set. Please call init() method first.");
        }
        return true;
    }
    getVoiceList() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
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
        });
    }
    getApiKeyInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (this.isApiKeySetted()) {
                    const response = yield fetch("https://api.topmediai.com/v1/get_api_key_info", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": this.apiKey,
                        },
                    });
                    if (!response.ok) {
                        const errorResponse = yield response.json();
                        return reject(errorResponse);
                    }
                    const jsonResponse = yield response.json();
                    return resolve(jsonResponse);
                }
            }));
        });
    }
    generate(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (this.isApiKeySetted()) {
                    try {
                        const response = yield fetch("https://api.topmediai.com/v1/text2speech", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-api-key": this.apiKey,
                            },
                            body: JSON.stringify(dto),
                        });
                        if (!response.ok) {
                            const errorResponse = yield response.json();
                            return reject(errorResponse);
                        }
                        const jsonResponse = yield response.json();
                        const fileResponse = yield fetch(jsonResponse.data.oss_url);
                        const arrayBuffer = yield fileResponse.arrayBuffer();
                        return resolve(Buffer.from(arrayBuffer));
                    }
                    catch (err) {
                        return reject(err);
                    }
                }
            }));
        });
    }
}
exports.TopMediAiClient = TopMediAiClient;

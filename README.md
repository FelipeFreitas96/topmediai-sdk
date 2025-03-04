# TopMediAi SDK

This open-source library was created to simplify the integration of TopMediAi APIs, enabling seamless generation of Text-To-Speech audio, music, and more. It is a non-profit project designed to help developers easily incorporate this technology into their applications.

Contributions are welcome! Feel free to fork, improve, and share. 

# 🚀 How to Use

### 1️⃣ Install Dependencies

Make sure you have Node.js installed. Then, install the required dependencies:

```bash
npm install topmediai-sdk fs
```

### 2️⃣ Run the Test Script

Create a new file, index.js, and paste the following code:

```js
import { TopMediaAiClient, EmotionEnums } from "topmediai-sdk";
const client = new TopMediaAiClient({
  apiKey: "----apikey here----",
});

const stream = await client.generate({
  speaker: "00151554-3826-11ee-a861-00163e2ac61b",
  text: "Hello, World!",
  emotion: EmotionEnums.Friendly,
});

if (stream) {
  const fileStream = fs.createWriteStream("output.mp3");
  fileStream.write(stream);
  fileStream.end();
}
```
# 💖 Support This Project
If you find this project helpful and want to support its continued development, you can make a donation via:

- GitHub Sponsors
- [PayPal](https://www.paypal.com/donate/?business=QV6Z6FXJBS6MS&no_recurring=0&item_name=%F0%9F%99%82&currency_code=USD)

# 📝 License
This project is licensed under the Creative Commons Attribution-NoDerivatives 4.0 International License (CC BY-ND 4.0).
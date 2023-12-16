import dotenv from "dotenv";

dotenv.config();

export default {
  webhookSecret: process.env.WEBHOOK_SECRET || "any_webhook_secret",
  serverPort: process.env.PORT || 3000,
};

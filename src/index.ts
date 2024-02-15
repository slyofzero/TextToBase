import { Bot, Context } from "grammy";
import { FileFlavor, hydrateFiles } from "@grammyjs/files";
import { initiateBotCommands, initiateCallbackQueries } from "./bot";
import { log } from "./utils/handlers";
import { BOT_TOKEN } from "./utils/env";

type FileContext = FileFlavor<Context>;
export const teleBot = new Bot<FileContext>(BOT_TOKEN || "");
teleBot.api.config.use(hydrateFiles(teleBot.token));
log("Bot instance ready");

// Check for new transfers at every 20 seconds
const interval = 20;

(async function () {
  teleBot.start();
  log("Telegram bot setup");
  initiateBotCommands();
  initiateCallbackQueries();

  async function toRepeat() {
    //
    setTimeout(toRepeat, interval * 1e3);
  }
  await toRepeat();
})();

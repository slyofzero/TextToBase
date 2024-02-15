import { teleBot } from "@/index";
import { log } from "@/utils/handlers";
import { buildWebsite } from "./buildWebsite";

export function initiateCallbackQueries() {
  log("Bot callback queries up");

  teleBot.callbackQuery("build-website", (ctx) => {
    buildWebsite(ctx);
  });
}

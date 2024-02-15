import { teleBot } from "@/index";
import { log } from "@/utils/handlers";
import { buildWebsite } from "./buildWebsite";
import { templateSelection } from "./templateSelection";
import { selectTemplate } from "./selectTemplate";

export function initiateCallbackQueries() {
  log("Bot callback queries up");

  teleBot.callbackQuery("build-website", (ctx) => {
    buildWebsite(ctx);
  });

  teleBot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data.startsWith("template-")) {
      // @ts-expect-error Weird type I don't wanna fill in
      templateSelection(ctx);
    } else if (data.startsWith("select-")) {
      // @ts-expect-error Weird type I don't wanna fill in
      selectTemplate(ctx);
    }
  });
}

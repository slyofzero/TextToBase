import { teleBot } from "@/index";
import { log } from "@/utils/handlers";
import { buildWebsite } from "./buildWebsite";
import { templateSelection } from "./templateSelection";
import { selectTemplate } from "./selectTemplate";
import { userState } from "@/vars/userState";

export function initiateCallbackQueries() {
  log("Bot callback queries up");

  teleBot.callbackQuery("build-website", (ctx) => {
    buildWebsite(ctx);
  });

  teleBot.callbackQuery("cancel", (ctx) => {
    const from = ctx.from;
    if (!from) return ctx.reply("Please click again");

    delete userState[from.id];
    ctx.deleteMessage();
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

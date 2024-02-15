import { teleBot } from "@/index";
import { startBot } from "./start";
import { log } from "@/utils/handlers";
import { userState } from "@/vars/userState";
import { template1Step1 } from "../creator/create1/step1";

export function initiateBotCommands() {
  teleBot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
  ]);

  teleBot.command("start", (ctx) => startBot(ctx));

  teleBot.hears(/./, (ctx) => {
    const from = ctx.from;
    if (!from) return ctx.reply("Please do /start again");
    const [template, step] = userState[from.id]
      .split("-")
      .map((item) => Number(item));

    if (template == 1) {
      if (step == 1) template1Step1(ctx);
    }
  });

  log("Bot commands up");
}

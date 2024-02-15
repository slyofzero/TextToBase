import { teleBot } from "@/index";
import { startBot } from "./start";
import { log } from "@/utils/handlers";
import { userState } from "@/vars/userState";
import { template1Step1 } from "../creator/1/step1";
import { template1Step2 } from "../creator/1/step2";
import { template1Step3 } from "../creator/1/step3";

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
      if (step == 2) template1Step2(ctx);
      if (step == 3) template1Step3(ctx);
    }
  });

  log("Bot commands up");
}

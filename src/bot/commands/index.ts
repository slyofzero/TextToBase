import { teleBot } from "@/index";
import { startBot } from "./start";
import { log } from "@/utils/handlers";
import { userState } from "@/vars/userState";
import * as creator from "../creator";

export function initiateBotCommands() {
  teleBot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
  ]);

  teleBot.command("start", (ctx) => startBot(ctx));

  teleBot.on(":photo", async (ctx) => {
    const from = ctx.from;
    if (!from) return ctx.reply("Please do /start again");
    const state = userState[from.id];
    if (!state) return;

    const [template, step] = state.split("-").map((item) => Number(item));

    if (template == 1) {
      if (step == 3) creator.template1Step3(ctx);
      if (step == 5) creator.template1Step5(ctx);
    }
  });

  teleBot.hears(/./, (ctx) => {
    const from = ctx.from;
    if (!from) return ctx.reply("Please do /start again");
    const state = userState[from.id];
    if (!state) return;

    const [template, step] = state.split("-").map((item) => Number(item));

    if (template == 1) {
      if (step == 1) creator.template1Step1(ctx);
      if (step == 2) creator.template1Step2(ctx);
      if (step == 4) creator.template1Step4(ctx);
    }
  });

  log("Bot commands up");
}

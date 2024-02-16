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
      if (step == 8) creator.template1Step8(ctx);
      if (step == 11) creator.template1Step11(ctx);
    } else if (template == 2) {
      if (step == 4) creator.template2Step4(ctx);
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
      else if (step == 2) creator.template1Step2(ctx);
      else if (step == 4) creator.template1Step4(ctx);
      else if (step == 6) creator.template1Step6(ctx);
      else if (step == 7) creator.template1Step7(ctx);
      else if (step == 9) creator.template1Step9(ctx);
      else if (step == 10) creator.template1Step10(ctx);
      else if (step == 12) creator.template1Step12(ctx);
      else if (step == 13) creator.template1Step13(ctx);
      else if (step == 14) creator.template1Step14(ctx);
    } else if (template == 2) {
      if (step == 1) creator.template2Step1(ctx);
      else if (step == 2) creator.template2Step2(ctx);
      else if (step == 3) creator.template2Step3(ctx);
      else if (step == 5) creator.template2Step5(ctx);
      else if (step == 6) creator.template2Step6(ctx);
      else if (step == 7) creator.template2Step7(ctx);
      else if (step == 8) creator.template2Step8(ctx);
      else if (step == 9) creator.template2Step9(ctx);
      else if (step == 10) creator.template2Step10(ctx);
      else if (step == 11) creator.template2Step11(ctx);
      else if (step == 12) creator.template2Step12(ctx);
      else if (step == 13) creator.template2Step13(ctx);
      else if (step == 14) creator.template2Step14(ctx);
      else if (step == 15) creator.template2Step15(ctx);
      else if (step == 16) creator.template2Step16(ctx);
      else if (step == 17) creator.template2Step17(ctx);
      else if (step == 18) creator.template2Step18(ctx);
      else if (step == 19) creator.template2Step19(ctx);
      else if (step == 20) creator.template2Step20(ctx);
      else if (step == 21) creator.template2Step21(ctx);
      else if (step == 22) creator.template2Step22(ctx);
    }
  });

  log("Bot commands up");
}

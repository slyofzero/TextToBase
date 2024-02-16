export * from "./step1";
export * from "./step2";
export * from "./step3";
export * from "./step4";
export * from "./step5";
export * from "./step6";
export * from "./step7";
export * from "./step8";
export * from "./step9";
export * from "./step10";
export * from "./step11";
export * from "./step12";
export * from "./step13";
export * from "./step14";
export * from "./step15";
export * from "./step16";
export * from "./step17";
export * from "./step18";
export * from "./step19";
export * from "./step20";
export * from "./step21";
export * from "./step22";

import { copyFolderSync } from "@/utils/files";
import { errorHandler } from "@/utils/handlers";
import { prevMessage } from "@/vars/prevMessage";
import { userState } from "@/vars/userState";
import { CallbackQueryContext, Context, InputFile } from "grammy";
import path from "path";

export async function createTemplate2(
  ctx: CallbackQueryContext<Context>,
  templateId: number
) {
  try {
    const from = ctx.from;
    if (!from) return ctx.reply("Please do /start again");

    const caption = `You have selected template ${templateId}, just follow the steps as they show and your website would be ready!
    
Please send the hero text in the next message that would show in the website.\n\nStep 1 of 22`;

    const source = path.join(process.cwd(), "templates", String(templateId));
    const target = path.join(process.cwd(), "temp", `${from.id}-${templateId}`);
    copyFolderSync(source, target);

    const photo = new InputFile("./step-images/2/1.png");
    const message = await ctx.replyWithPhoto(photo, { caption });
    userState[from.id] = `2-1`;
    prevMessage[from.id] = message.message_id;
    ctx.deleteMessage();
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please restart again");
  }
}

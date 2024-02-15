import { errorHandler } from "@/utils/handlers";
import {
  generateTemplateKeyboard,
  generateTemplateText,
} from "@/utils/template";
import { CallbackQueryContext, Context, InputFile } from "grammy";

export function templateSelection(ctx: CallbackQueryContext<Context>) {
  const templateId = Number(ctx.callbackQuery.data.replace("template-", ""));
  const caption = generateTemplateText(templateId);
  const keyboard = generateTemplateKeyboard(templateId);

  ctx.deleteMessage().catch((e) => errorHandler(e));
  const photo = new InputFile(`./template-images/${templateId}.png`);
  ctx
    .replyWithPhoto(photo, { caption, reply_markup: keyboard })
    .catch((e) => errorHandler(e));
}

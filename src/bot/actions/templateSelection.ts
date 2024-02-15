import { errorHandler } from "@/utils/handlers";
import {
  generateTemplateKeyboard,
  generateTemplateText,
} from "@/utils/template";
import { CallbackQueryContext, Context } from "grammy";

export function templateSelection(ctx: CallbackQueryContext<Context>) {
  const templateId = Number(ctx.callbackQuery.data.replace("template-", ""));
  const text = generateTemplateText(templateId);
  const keyboard = generateTemplateKeyboard(templateId);

  ctx.deleteMessage().catch((e) => errorHandler(e));
  ctx.reply(text, { reply_markup: keyboard }).catch((e) => errorHandler(e));
}

import { copyFolderSync } from "@/utils/files";
import { userState } from "@/vars/userState";
import { CallbackQueryContext, Context } from "grammy";
import path from "path";

export function createTemplate(
  ctx: CallbackQueryContext<Context>,
  templateId: number
) {
  const from = ctx.from;
  if (!from) return ctx.reply("Please do /start again");
  const text = `You have selected template ${templateId}, just follow the steps as they show and your website would be ready!`;

  const source = path.join(process.cwd(), "templates", String(templateId));
  const target = path.join(process.cwd(), "temp", `${from.id}-${templateId}`);
  copyFolderSync(source, target);

  userState[from.id] = `${templateId}-1`;
  ctx.reply(text);
}

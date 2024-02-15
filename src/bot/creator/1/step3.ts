import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context } from "grammy";
import { editHtmlFile } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";

export async function template1Step3(ctx: HearsContext<Context>) {
  try {
    const from = ctx.from;
    const message = ctx.message;
    const descriptionText = message?.text || "";

    if (!from || !message) return ctx.reply("Please do /start again");

    const filePath = path.join(
      process.cwd(),
      "temp",
      `${from.id}-1`,
      "index.html"
    );

    await editHtmlFile(filePath, "p.lead", descriptionText);
    userState[from.id] = "1-2";

    const text = `"${descriptionText}" set as description for the first section.\n\nNext up, send the description for the first section in the next message.`;
    ctx.reply(text);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}

import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context } from "grammy";
import { editHtmlFileText } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";

export async function template1Step2(ctx: HearsContext<Context>) {
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

    await editHtmlFileText(filePath, "p.lead", descriptionText);
    userState[from.id] = "1-3";

    const text = `"${descriptionText}" set as description for the first section.\n\nNext up, send the image you want to be shown in the first section.`;
    ctx.reply(text);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}

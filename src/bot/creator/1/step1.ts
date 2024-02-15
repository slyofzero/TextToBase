import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context, InputFile } from "grammy";
import { editHtmlFileText } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";

export async function template1Step1(ctx: HearsContext<Context>) {
  try {
    const from = ctx.from;
    const message = ctx.message;
    const heroText = message?.text || "";

    if (!from || !message) return ctx.reply("Please do /start again");

    const filePath = path.join(
      process.cwd(),
      "temp",
      `${from.id}-1`,
      "index.html"
    );

    await editHtmlFileText(filePath, "h1.hero", heroText);
    userState[from.id] = "1-2";

    const photo = new InputFile("./images/1.png");
    const caption = `"${heroText}" set as Hero text.\n\nNext up, send the description for the first section in the next message.`;

    ctx.replyWithPhoto(photo, { caption });
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}

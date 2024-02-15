import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context } from "grammy";
import { editHtmlLink } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";

export async function template1Step4(ctx: HearsContext<Context>) {
  try {
    const from = ctx.from;
    const message = ctx.message;
    const navLink = message?.text || "";

    if (!from || !message) return ctx.reply("Please do /start again");

    const filePath = path.join(
      process.cwd(),
      "temp",
      `${from.id}-1`,
      "index.html"
    );

    await editHtmlLink(filePath, "a.button", navLink);
    userState[from.id] = "1-5";

    const text = `"${navLink}" set as link to the button.\n\nNext up, send the logo of the website.`;
    ctx.reply(text);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}

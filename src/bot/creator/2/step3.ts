import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context, InputFile } from "grammy";
import { editHtmlLink } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";
import { prevMessage } from "@/vars/prevMessage";

export async function template2Step3(ctx: HearsContext<Context>) {
  try {
    const from = ctx.from;
    const message = ctx.message;
    const navLink = message?.text || "";

    if (!from || !message) return ctx.reply("Please do /start again");
    const confirmation = await ctx.reply("Adding...");

    const filePath = path.join(
      process.cwd(),
      "temp",
      `${from.id}-2`,
      "index.html"
    );

    await editHtmlLink(filePath, "a:eq(1)", navLink);

    const storedPrevMessage = prevMessage[from.id];
    const photo = new InputFile("./step-images/2/4.png");
    const caption = `"${navLink}" set as link to the button.\n\nNext up, send the image for the hero section.\n\nStep 4 of 22`;
    const reply = await ctx.replyWithPhoto(photo, { caption });

    userState[from.id] = "2-4";
    prevMessage[from.id] = reply.message_id;
    ctx.deleteMessage();
    ctx.deleteMessages([storedPrevMessage, confirmation.message_id]);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}

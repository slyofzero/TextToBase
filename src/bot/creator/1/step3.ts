import path from "path";
import { userState } from "@/vars/userState";
import { Context, InputFile } from "grammy";
import { editHtmlFileImage } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";
import { FileFlavor } from "@grammyjs/files";
import { prevMessage } from "@/vars/prevMessage";

export async function template1Step3(ctx: FileFlavor<Context>) {
  try {
    const from = ctx.from;
    const file = await ctx.getFile();

    if (!from) return ctx.reply("Please do /start again");
    if (!file) return ctx.reply("Please send an image again");
    const confirmation = await ctx.reply("Adding...");

    const fileName = file.file_path?.split("/").at(-1) || "";
    const dirPath = path.join(process.cwd(), "temp", `${from.id}-1`);
    const filePath = path.join(dirPath, "index.html");
    const photoPath = path.join(dirPath, fileName);
    file.download(photoPath);

    await editHtmlFileImage(filePath, "div.col-one-half img", `./${fileName}`);
    userState[from.id] = "1-4";

    const storedPrevMessage = prevMessage[from.id];
    const photo = new InputFile("./step-images/1/4.png");
    const caption = `Photo you sent is now set as the main image for the first section.\n\nNext up send the URL the button at the top right should lead to.\n\nStep 4 of 14`;
    const reply = await ctx.replyWithPhoto(photo, { caption });

    userState[from.id] = "1-4";
    prevMessage[from.id] = reply.message_id;
    ctx.deleteMessage();
    ctx.deleteMessages([storedPrevMessage, confirmation.message_id]);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}

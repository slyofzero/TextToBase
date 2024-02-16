import { Context, HearsContext, InputFile } from "grammy";
import { userState } from "@/vars/userState";
import { templateSteps } from "./steps";
import path from "path";
import { copyFolderSync, deleteFileOrFolder, zipFolder } from "@/utils/files";
import {
  editHtmlFileImage,
  editHtmlFileText,
  editHtmlLink,
} from "@/utils/template";
import { prevMessage } from "@/vars/prevMessage";
import { errorHandler } from "@/utils/handlers";

export async function executeStep(ctx: HearsContext<Context>) {
  try {
    const from = ctx.from;
    if (!from) return ctx.reply("Please send the message again");
    const state = userState[from.id];
    if (!state) return false;

    const [template, step] = state.split("-").map((item) => Number(item));
    const currentStepData = templateSteps[template][step];

    // If no step data then user has reached the end
    if (!currentStepData) return delete userState[from.id];

    let caption = "";
    const message = ctx.message;
    const { selector, inputType } = currentStepData;
    let confirmationMessage: number | null = null;

    if (!message) {
      const source = path.join(process.cwd(), "templates", String(template));
      const target = path.join(process.cwd(), "temp", `${from.id}-${template}`);
      copyFolderSync(source, target);

      caption += `You have selected template ${template}, just follow the steps as they show and your website would be ready!\n\n`;
    } else {
      const isText = Boolean(message?.text);
      const isImage = Boolean(message?.photo?.length);
      const filePath = path.join(process.cwd(), "temp", `${from.id}-${template}`, "index.html"); // prettier-ignore

      if (inputType === "text") {
        if (isText) {
          await editHtmlFileText(filePath, selector, message.text || "");
          caption += `"${message.text}" added to the website. `;
        } else return ctx.reply("Please enter a text");
      } else if (inputType === "image") {
        if (isImage) {
          const file = await ctx.getFile();
          const fileName = file.file_path?.split("/").at(-1) || "";
          const dirPath = path.join(process.cwd(), "temp", `${from.id}-${template}`); // prettier-ignore
          const filePath = path.join(dirPath, "index.html");
          const photoPath = path.join(dirPath, fileName);
          // @ts-expect-error download() in FileFlavor<Context>
          file.download(photoPath).catch((e) => errorHandler(e));

          await editHtmlFileImage(filePath, selector, `./${fileName}`);
          caption += `The photo you send was added to the website. `;
        } else return ctx.reply("Please pass an image").catch((e) => errorHandler(e)); // prettier-ignore
      } else if (inputType === "link") {
        if (isText) {
          await editHtmlLink(filePath, selector, message.text || "");
          caption += `Link updated to "${message.text}". `
        } else return ctx.reply("Please enter a text").catch((e) => errorHandler(e)); // prettier-ignore
      }

      // Processing to next step
      userState[from.id] = `${template}-${step + 1}`;
    }

    // Being done as user state might or might not change based on the previous condition
    const newUserState = userState[from.id];
    const [, nextStep] = newUserState.split("-").map((item) => Number(item));
    const nextStepData = templateSteps[template][nextStep];
    const totalSteps = Object.keys(templateSteps[template]).length;

    let replyMsgId: number | null = null;
    // Move to the next step if there is one, otherwise just compress the project and hand it over
    if (nextStepData) {
      if (ctx.message)
        confirmationMessage = (await ctx.reply("Adding...")).message_id;

      const { setting, image } = nextStepData;
      caption += `Pass the ${setting} in the next message.\n\nStep ${nextStep} of ${totalSteps}`;

      if (image) {
        const imageFile = new InputFile(image);
        replyMsgId = (await ctx.replyWithPhoto(imageFile, { caption }))
          .message_id;
      } else {
        replyMsgId = (await ctx.reply(caption)).message_id;
      }
    } else {
      confirmationMessage = (
        await ctx.reply("Preparing your project, please wait a few moments...")
      ).message_id;

      const caption = "Your project is ready.";
      const folderPath = path.join(process.cwd(), "temp", `${from.id}-${template}`); // prettier-ignore
      const zipFolderPath = path.join(process.cwd(), "temp", `${from.id}.zip`);
      await zipFolder(folderPath, zipFolderPath);
      await ctx.replyWithDocument(new InputFile(zipFolderPath), {
        caption,
      });

      deleteFileOrFolder(folderPath);
      deleteFileOrFolder(zipFolderPath);
    }

    ctx.deleteMessage().catch((e) => errorHandler(e));

    if (prevMessage[from.id])
      ctx.deleteMessages([prevMessage[from.id]]).catch((e) => errorHandler(e));

    if (confirmationMessage)
      ctx.deleteMessages([confirmationMessage]).catch((e) => errorHandler(e));

    if (replyMsgId) prevMessage[from.id] = replyMsgId;
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please restart website creation").catch((e) => errorHandler(e));
  }
}

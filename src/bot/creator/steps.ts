import { template1Steps } from "./1";
import { template2Steps } from "./2";
import { template3Steps } from "./3";

export interface Step {
  setting: string;
  image?: string;
  selector: string;
  inputType: "text" | "image" | "link";
}

export interface Steps {
  [key: number]: Step;
}
export interface TemplateSteps {
  [key: number]: Steps;
}

export const templateSteps: TemplateSteps = {
  1: template1Steps,
  2: template2Steps,
  3: template3Steps,
};

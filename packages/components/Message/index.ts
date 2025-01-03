import { withInstallFunction } from "@toy-element/utils";
import Message from "./methods";

export const ErMessage = withInstallFunction(Message, "$message");
export * from "./type";

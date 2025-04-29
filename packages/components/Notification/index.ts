import { withInstallFunction } from "@toy-element/utils";
import Notification from "./method";

export const ErNotification = withInstallFunction(
  Notification,
  "$notification",
);
export * from "./type";

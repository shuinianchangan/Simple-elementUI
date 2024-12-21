export type AlertType = "success" | "warning" | "danger" | "info";

export type AlertProps = {
  title?: string;
  type?: AlertType;
  description?: string;
  closable?: boolean;
  center?: boolean;
  showIcon?: boolean;
  effect?: "light" | "dark";
};

export interface AlertEmits {
  (e: "close"): void;
}

export interface AlertInstance {
  open(): void;
  close(): void;
}

import type { ComponentPropsWithoutRef } from "react";
import style from "./index.module.scss";
import { cn } from "../../../functions/utils";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: "sm" | "md" | "lg";
}

export const Button = ({ size = "sm", ...props }: ButtonProps) => {
  return <button className={cn(style.button, style[size])} {...props}></button>;
};

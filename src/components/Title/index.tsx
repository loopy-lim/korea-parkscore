import style from "./index.module.scss";

interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return <h1 className={style.title}>{title}</h1>;
}

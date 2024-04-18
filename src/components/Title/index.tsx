import style from "./index.module.scss";

interface TitleProps {
  title: string;
  subtitle: string;
}

export function Title({ title, subtitle }: TitleProps) {
  return (
    <div className={style.titleWapper}>
      <img className={style.logo} src="/jnu-logo.svg" alt="jnu logo"></img>
      <div>
        <h1 className={style.title}>{title}</h1>
        <h2 className={style.subtitle}>{subtitle}</h2>
      </div>
    </div>
  );
}

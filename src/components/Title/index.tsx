import style from "./index.module.scss";

interface TitleProps {
  title: string;
  subtitle: string;
}

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div className="flex gap-4 my-8">
      <img
        className={style.logo}
        src="/team-logo.png"
        alt="green park score logo"
      ></img>
      <div>
        <h1 className="font-bold text-3xl">{title}</h1>
        <h2 className="font-light text-xl">{subtitle}</h2>
      </div>
    </div>
  );
};

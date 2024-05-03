import { useId, useRef } from "react";
import { parkScoreParser } from "../../functions/data-parser";
import style from "./index.module.scss";
import { useScore } from "../../stores/scores";

export const FileGetter = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const setScore = useScore((state) => state.setScores);
  const id = useId();

  const onFileInput = () => {
    if (!fileRef.current) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result;
      if (!buffer) {
        return;
      }
      const data = parkScoreParser({ blob: buffer });
      setScore(data);
    };
    fileRef.current.files && reader.readAsArrayBuffer(fileRef.current.files[0]);
  };

  return (
    <>
      <label htmlFor={id} className={style.fileGetterButton}>
        파일 넣기
      </label>
      <input
        className={style.inputFile}
        type="file"
        id={id}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        ref={fileRef}
        onChange={onFileInput}
      />
    </>
  );
};

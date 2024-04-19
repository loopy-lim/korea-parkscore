import { useRef, type FormEvent } from "react";
import { parkScoreParser } from "../../functions/data-parser";

export const FileGetter = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    };
    fileRef.current.files && reader.readAsArrayBuffer(fileRef.current.files[0]);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        ref={fileRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

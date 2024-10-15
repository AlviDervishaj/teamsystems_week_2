import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Input } from "./Input";
const initialTitle: string = document.title;

export const ExerciseOne = () => {
  const [title, setTitle] = useState<string>("");

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setTitle(value);
  };

  const changeSiteTitle = useCallback(() => {
    document.title = title.trim() === "" ? initialTitle : title;
  }, [title]);

  useEffect(() => {
    changeSiteTitle();
  }, [changeSiteTitle])


  return (
    <Input onChange={handleOnChange} placeholder="Enter page title..." />
  )
}

import { FormEvent, useEffect, useRef, useState } from "react"
import { Input } from "./Input";
import { Button } from "./Button";

type FormData = {
  name: string,
  email: string,
  age: string,
}

export const Form = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", age: "", email: "" })
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);


  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fData = new FormData(event.currentTarget);
    const _name = fData.get("name") as string | null;
    const _email = fData.get("email") as string | null;
    const _age = fData.get("age") as string | null;
    if (!_name || !_email || !_age) return;
    const data = {
      name: _name,
      email: _email,
      age: _age,
    }
    setFormData(data);

    event.currentTarget.reset();
  }

  const resetList = () => {
    setFormData({ name: "", age: "", email: "" });
  }

  return (
    <div className="space-y-12">
      <Button className="text-lg mx-auto" onClick={resetList}>Reset</Button>
      <form onSubmit={handleFormSubmit} className="w-dvw h-fit p-2 flex flex-row items-center content-center justify-center gap-12">
        <Input placeholder="Name ..." name="name" ref={nameRef} />
        <Input placeholder="Email ..." name="email" />
        <Input placeholder="Age ..." name="age" />
        <Button type={"submit"}>Submit</Button>
      </form>
      <ul className="flex flex-row items-center content-center justify-center gap-5">
        {Object.values(formData).map((value, index) => <li key={index}><p className="text-xl text-slate-100 text-center"> {value} </p></li>)}
      </ul>
    </div >
  )
}

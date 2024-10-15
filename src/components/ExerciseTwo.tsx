import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { UserType } from "../types";
import { useUser } from "../hooks/useUser";
import { Button } from "./Button";
export const ExerciseTwo = () => {
  const { data, error, isLoading, revalidate } = useUser<UserType[]>("https://jsonplaceholder.typicode.com/users");
  useEffect(() => {
    revalidate();
  }, [revalidate]);
  return (
    <div className="pt-20">
      {isLoading && <p className="text-center text-3xl text-slate-300">Loading ...</p>}
      {data && <>
        <div className="w-full flex flex-row items-center content-center justify-center pb-10">
          <Button className="text-lg border-2" onClick={revalidate}>Reload</Button>
        </div>
        <DisplayUsers users={data} />
      </>}
      {error && <p>{error}</p>}
    </div>
  );
}

const DisplayUsers = ({ users }: { users: UserType[] }) => {
  const [details, setDetails] = useState<UserType | null>(null);
  return (
    <div className="w-full h-fit flex flex-row gap-4 justify-between overflow-y-scroll">
      <div className="w-full h-full flex flex-col items-start content-center justify-center overflow-y-scroll">
        {users.map((user) => <User setDetails={setDetails} key={user.name} user={user} />)}
      </div>
      {details !== null && <Details close={() => setDetails(null)} details={details} />}
    </div>
  )
}

const User = ({ user, setDetails }: { user: UserType, setDetails: Dispatch<SetStateAction<UserType | null>> }) => {
  const { data, revalidate } = useUser<UserType>(`https://jsonplaceholder.typicode.com/users/${user.id}`);
  const moreInformation = useCallback(() => {
    revalidate();
  }, [revalidate]);

  useEffect(() => {
    setDetails(data);
  }, [setDetails, data]);
  return (
    <section className="flex flex-row items-center content-center justify-between w-[40dvw] mx-auto h-fit p-2 space-y-3 rounded-lg bg-red-500/30 my-2">
      <p className="text-slate-200 text-2xl w-8/12">{user.name}</p>
      <div className="w-1/3 flex flex-row items-center content-center justify-between">
        <p className="text-slate-200 text-sm text-left">{user.company.name}</p>
        <Button onClick={moreInformation} className="border-2 border-slate-300">More Info</Button>
      </div>
    </section>
  );
}

const Details = ({ close, details }: { close: () => void, details: UserType }) => {
  return (
    <div className="w-64 fixed right-12 top-1/2 p-4 bg-red-500/50 shadow-lg shadow-slate-800 rounded-lg flex flex-col items-start content-center justify-center gap-3">
      <p className="text-slate-200 text-2xl">{details.address.suite}</p>
      <p className="text-slate-200 text-2xl">{details.address.city}</p>
      <p className="text-slate-200 text-2xl">{details.address.street}</p>
      <Button onClick={close} className="border-2 border-slate-300 text-slate-200 ml-4">Close</Button>
    </div>
  )

}

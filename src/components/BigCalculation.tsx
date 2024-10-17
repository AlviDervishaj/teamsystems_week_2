import { useReducer, useMemo, useState } from "react";
type StateType = { km: number, miles: number, c: number, f: number, transitionType: SelectionType };
type ActionType = { type: "set_km", km: number } | { type: "set_c", c: number } | { type: "set_transition_type", transitionType: SelectionType };
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "set_km":
      return { ...state, km: action.km };
    case "set_transition_type":
      return { ...state, transitionType: action.transitionType };
    case "set_c":
      return { ...state, c: action.c }
  }
}
type SelectionType = "to_miles" | "to_fahrenheit";
export const BigCalculation = () => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, { km: 0, miles: 0, c: 0, f: 0, transitionType: "to_miles" });
  const setConverterKm = (value: number) => {
    dispatch({ type: "set_km", km: value });
    return;
  }
  const setConverterF = (value: number) => {
    dispatch({ type: "set_c", c: value });
    return;
  }

  const setTransitionType = (value: SelectionType) => {
    dispatch({ type: "set_transition_type", transitionType: value });
    return;
  }
  const convertToM = (value: number) => {
    return value * 0.621371;
  };
  const convertToF = (value: number) => {
    return ((value * 9) / 5) + 32;
  };

  const kmConversion = useMemo(() => convertToM(state.km), [state.km])
  const cConversion = useMemo(() => convertToF(state.c), [state.c])
  return (
    <div className="flex flex-col items-center content-center justify-center gap-12">
      <div className="space-x-12">
        <input type="number" defaultValue={0} className="p-2 text-slate-900" onChange={(e) => setConverterKm(Number(e.target.value))} placeholder="Enter KM ..." />
        <input type="number" defaultValue={0} className="p-2 text-slate-900" onChange={(e) => setConverterF(Number(e.target.value))} placeholder="Enter Fahrenheit ..." />
      </div>
      <select
        onChange={e => setTransitionType(e.target.value as SelectionType)}
        defaultValue={"to_miles"}
        className="text-slate-800 p-2"
      >
        <option value="to_miles">To Miles</option>
        <option value="to_fahrenheit">To Fag</option>
      </select>
      {state.transitionType === "to_fahrenheit" ?
        <p>C to Fahrenheit: {cConversion}</p>
        :
        <p>Kilometers to Miles: {kmConversion}</p>
      }

    </div>
  )
}

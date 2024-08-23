import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
/*

    react Notes! 
    States :- 
    useEffect
    useCallback
    useRef
    */
function App() {
  const [Range, setRange] = useState(8);
  const [Charaters, setCharters] = useState(false);
  const [Number, setNumber] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (Number) str += "0123456789";
    if (Charaters) str += "~!@#$%^&*()_+{}";

    for (let i = 1; i <= Range; i++) {
      let Char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(Char);
    }
    setPassword(pass);
  }, [Range, Charaters, Number, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [Range, Number, Charaters, passwordGenerator]);

  const ref = useRef(null);
  const copypass = useCallback(() => {
    ref.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);
  return (
    <>
      <div className="bg-green-300 m-20 rounded-2xl">
        <div className="flex justify-center">
          <h1 className="text-center text-teal-50 bg-slate-700 rounded-2xl p-5 my-10 w-64 flex justify-center">
            PassWord Generater
          </h1>
        </div>
        <div className="flex justify-center p-5">
          <input
            type="text"
            value={Password}
            className="rounded-l-lg outline-none placeholder:text-2xl px-5 justify-center"
            placeholder="Password"
            readOnly
            ref={ref}
          />
          <button
            className="p-2 bg-slate-500 text-3xl hover:bg-amber-800 rounded-r-lg text-rose-100"
            onClick={copypass}
          >
            copy
          </button>
        </div>
        <div className="flex justify-center p-5">
          <input
            type="range"
            min={8}
            max={16}
            value={Range}
            className="cursor-pointer"
            onChange={(e) => {
              setRange(e.target.value);
            }}
          />
          <label className="mx-2">{Range} </label>
          Number:{" "}
          <input
            className="mx-2"
            type="checkbox"
            value={Number}
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          Charaters:{" "}
          <input
            className="mx-2"
            type="checkbox"
            value={Charaters}
            onChange={() => {
              setCharters((prev) => !prev);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;

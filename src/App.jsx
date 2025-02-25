import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberChecked, setNumberChecked] = useState(false);
  const [charChecked, setCharChecked] = useState(false);
  const [password, setPassword] = useState("");
  const passwordInput = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "0123456789";
    let sym = "!@#$%^&*()_+";

    if (numberChecked) str += num;
    if (charChecked) str += sym;

    for (let i = 0; i < length; i++) {
      let randIdx = Math.floor(Math.random() * str.length);
      pass += str.charAt(randIdx);
    }

    setPassword(pass);
  }, [length, numberChecked, charChecked]);

  useEffect(() => {
    generatePassword();
  }, [length, numberChecked, charChecked]);

  function copyPassword() {
    window.navigator.clipboard.writeText(password);
    passwordInput.current.select();
  }
  return (
    <>
      <div className="w-screen h-screen bg-[#A6CDC6] flex justify-center items-center">
        <div className="bg-[#16404D] w-[450px] text-[#FBF5DD] text-center p-5">
          <h1 className="text-xl">Password Generator</h1>
          <div className="my-2">
            <input
              type="text"
              className="p-1 w-[300px] text-[#16404D] outline-none"
              readOnly
              value={password}
              ref={passwordInput}
            />
            <button onClick={copyPassword} className="bg-blue-600 p-1">
              Copy
            </button>
          </div>
          <div>
            <input
              type="range"
              min={8}
              max={24}
              name=""
              id=""
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length: {length} </label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              className="ml-1"
              defaultChecked={numberChecked}
              onChange={() => {
                setNumberChecked((prev) => !prev);
              }}
            />
            <label htmlFor="numbers">Numbers</label>
            <input
              type="checkbox"
              name="characters"
              id="characters"
              className="ml-1"
              defaultChecked={charChecked}
              onChange={() => {
                setCharChecked((prev) => !prev);
              }}
            />
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

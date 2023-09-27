"use client";
import { CONVERSIONFACTORS, UNITOPTIONS } from "@/constants/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputUnit, setInputUnit] = useState(UNITOPTIONS[0]);
  const [outputUnit, setOutputUnit] = useState(UNITOPTIONS[0]);
  const [inputValue, setInputValue] = useState(0);
  const [resultValue, setResultValue] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const conversion = () => {
    // Both Units are same result same value as input value
    if (inputUnit === outputUnit) {
      setResultValue(inputValue);
      return;
    }

    if (inputUnit && outputUnit && inputValue) {
      // inputFactor values used to convert value from Input Unit to meter & outputFactor values used to convert it from meter to Output unit
      const inputFactor = CONVERSIONFACTORS[inputUnit] || 1;
      const outputFactor = CONVERSIONFACTORS[outputUnit] || 1;

      const meterConvertedValue = inputValue * inputFactor;
      const ResultValue = meterConvertedValue / outputFactor;
      setResultValue(ResultValue);
      return;
    }
  };

  const handleInputUnitChanged = (event) => {
    setInputUnit(event?.target?.value);
  };
  const handleOutputUnitChanged = (event) => {
    setOutputUnit(event?.target?.value);
  };
  const handleInputValueChanged = (event) => {
    setInputValue(event?.target?.value);
    if (event?.target?.value <= 0) {
      setErrorMsg("Invalid Input Value !");
      return;
    } else {
      setErrorMsg(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10">
      <h1 className="text-xl font-bold mb-2 mt-2">Length Converter App</h1>
      <div className=" w-[600px] text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <form className="p-8 flex flex-col  justify-center items-start">
          <div className="w-full">
            <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter Input Value
            </label>
            <input
              type="number"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter value"
              required
              onChange={handleInputValueChanged}
            />
            {errorMsg && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errorMsg}
              </span>
            )}
          </div>
          <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
            Select Input Unit
          </label>
          <select
            id="units"
            value={inputUnit}
            onChange={handleInputUnitChanged}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {UNITOPTIONS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
            Select Output Unit
          </label>
          <select
            id="units"
            value={outputUnit}
            onChange={handleOutputUnitChanged}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {UNITOPTIONS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <button
            onClick={conversion}
            type="button"
            disabled={errorMsg ? true : false}
            className={`mt-4 text-white ${
              errorMsg
                ? "bg-gray-500"
                : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 `}
          >
            Convert
          </button>
          {resultValue > 0 && (
            <div className="text-lg font-semibold">Result : {resultValue}</div>
          )}
        </form>
      </div>
    </main>
  );
}

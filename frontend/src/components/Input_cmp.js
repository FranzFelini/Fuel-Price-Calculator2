import React from "react";
import Select from "react-select";

const Input = ({
  handleInputChange,
  inputValue,
  handleCurrencyChange,
  currnecyOptions,
  currencydata,
}) => {
  return (
    <div className="flex flex-col sm:flex-row align-center items-center justify-center gap-2 sm:gap-[3.5em]">
      <div className="flex justify-center items-center w-full sm:w-auto mb-[0.5em]">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Number of liters"
          className="h-[3em] w-[20em] text-white  sm:w-[20em] mt-[1em] p-[0.5em] bg-black rounded-md border text-center border-white hover:border-violet-300"
        />
      </div>
      <div className="flex justify-center items-center w-full sm:w-auto">
        {currencydata.length > 0 ? (
          <Select
            options={currnecyOptions}
            className="w-full w-[20em] sm:w-[20em] text-white"
            onChange={handleCurrencyChange}
            placeholder="Select a currency"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "black",
                height: "3em",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "rgb(167, 139, 250)",
                },
              }),
              menu: (base) => ({
                ...base,
                maxHeight: "300px",
                overflow: "auto",
                scrollBehavior: "smooth",
              }),
              placeholder: (base) => ({
                ...base,
                color: "white",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                color: isFocused ? "white" : "black",
                backgroundColor: isFocused ? "rgb(167, 139, 250)" : "white",
              }),
              input: (provided) => ({
                ...provided,
                color: "white",
              }),
            }}
          />
        ) : (
          <div className="text-white font-thin">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Input;

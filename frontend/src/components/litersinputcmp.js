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
    <div className="flex flex-row justify-center gap-[3.5em] items-center">
      <div className="flex justify-center items-center">
        <input
          type="string"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Number of liters"
          className="h-[2.4em] w-[20em] mt-[1.5em] mb-[2em] p-[0.5em] bg-inherit rounded-md border text-center border-white text-white hover:border-violet-300"
        />
      </div>

      <div className="flex flex-row justify-center gap-[3.5em] items-center h-[7em] bg-inherit">
        <div className="items-center align-center justify-center">
          {currencydata.length > 0 ? (
            <Select
              options={currnecyOptions}
              className="w-[20em] text-white"
              onChange={handleCurrencyChange}
              placeholder="Select a currency"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "inherit",
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
              }}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;

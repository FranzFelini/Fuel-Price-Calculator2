import React from "react";
import Select from "react-select";

const Selector = ({
  handleFuelChange,
  handleCountryChange,
  countryOptions,
  fuelOptions,
  data,
}) => {
  return (
    <div>
      <div className="flex flex-row justify-center gap-[3.5em] items-center h-[7em] bg-inherit mb-[-2.8em] mt-[2em]">
        <div className="items-center align-center justify-center">
          {data.length > 0 ? (
            <Select
              options={countryOptions}
              className="w-[20em] text-white sm:w-[20em]"
              onChange={handleCountryChange}
              placeholder="Select a country"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "black",
                  borderColor: "white",
                  height: "3em",
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
        <div className="flex items-center align-center justify-center">
          <Select
            options={fuelOptions}
            className="w-[20em] text-white sm:w-[20em]"
            onChange={handleFuelChange}
            placeholder="Select fuel type"
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
        </div>
      </div>
    </div>
  );
};

export default Selector;

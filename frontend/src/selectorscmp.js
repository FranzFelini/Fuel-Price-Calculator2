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
      <div className="justify-center flex">
        <div className="flex flex-col relative w-[40em] bg-white h-[0.2px] mt-[-1.9em]"></div>
      </div>
      <div className="flex flex-row justify-center gap-[3.5em] items-center h-[7em] bg-inherit">
        <div className="items-center align-center justify-center">
          {data.length > 0 ? (
            <Select
              options={countryOptions}
              className="w-[20em] text-white"
              onChange={handleCountryChange}
              placeholder="Select a country"
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
        <div className="flex items-center align-center justify-center">
          <Select
            options={fuelOptions}
            className="w-[20em] text-white"
            onChange={handleFuelChange}
            placeholder="Select fuel type"
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
        </div>
      </div>
    </div>
  );
};

export default Selector;

import Axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Data fetcher
  const [selectedCountry, setSelectedCountry] = useState(null); // Country selector
  const [selectedFuel, setSelectedFuel] = useState(null); // Fuel type selector
  const [inputValue, setInputValue] = useState(0); // Input value
  const [priceToDisplay, setPriceToDisplay] = useState(null); // Price to display on button click
  const [filter, setFilter] = useState(""); // Filter input

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/countries");
      setData(response.data);
      console.log("Fetched countries:", response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFuelChange = (selectedOption) => {
    setSelectedFuel(selectedOption);
    console.log("Selected fuel:", selectedOption);
  };

  const handleInputChange = (event) => {
    const liters = parseFloat(event.target.value);
    if (!isNaN(liters) && liters >= 0) {
      setInputValue(liters);
    } else {
      setInputValue(0);
    }
    console.log("Input liters:", liters);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    console.log("Selected country:", selectedOption);
  };

  const calculatePrice = (liters) => {
    if (selectedCountry && selectedFuel) {
      const pricePerLiter =
        selectedFuel.value === "diesel_price"
          ? parseFloat(selectedCountry.diesel_price)
          : parseFloat(selectedCountry.gasoline_price);

      if (!isNaN(pricePerLiter) && !isNaN(liters)) {
        return pricePerLiter * liters;
      }
    }
    return 0;
  };

  const handleGetPrice = () => {
    const price = calculatePrice(inputValue);
    setPriceToDisplay(price);
  };

  const countryOptions = data.map((country) => ({
    value: country.name,
    label: country.name,
    diesel_price: country.diesel_price,
    gasoline_price: country.gasoline_price,
  }));

  const fuelOptions = [
    { value: "diesel_price", label: "Diesel" },
    { value: "gasoline_price", label: "Gasoline" },
  ];

  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center flex-row gap-[2em] justify-center mt-[3em]">
        <h1 className="bg-inherit text-white flex justify-center tracking-normal text-5xl pt-[1.5em] pb-[1em] font-thin">
          <span className="font-normal">FUEL&nbsp; </span> PRICE CALCULATOR
        </h1>
        <img
          className="flex h-[4em] align-center"
          src="headingicon.svg"
          alt="Icon"
        />
      </div>
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
      <div className="flex flex-row justify-center gap-[3.5em] items-center">
        <div className="flex justify-center items-center">
          <input
            onChange={handleInputChange}
            placeholder="Number of liters"
            className="h-[2.4em] w-[20em] mt-[1.5em] mb-[2em] p-[0.5em] bg-inherit rounded-md border text-center border-white text-white hover:border-violet-300"
          />
        </div>
      </div>
      <div className="flex justify-center mt-[2em]">
        <div className="flex justify-center items-center w-[44em] border-[0.2px] h-[7em] rounded-xl bg-inherit text-white font-extralight">
          <p className="text-center items-center text-3xl">
            {priceToDisplay !== null
              ? priceToDisplay.toFixed(2) + "  $"
              : " FUEL PRICE DISPLAYED "}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-[3em]">
        <button
          onClick={handleGetPrice}
          className="flex w-[10em] h-[3em] justify-center items-center bg-violet-400 text-white font-light rounded-md mt-[4em] hover:scale-105 hover:bg-violet-300 border-white"
        >
          GET PRICE
        </button>

        <img src="list.svg" className=" h-[3em] mt-[4em]"></img>
      </div>

      <div className="flex justify-end mt-[7em] mr-[3.3em] hover:via-violet-300 mb-[-2em]">
        <input
          type="text"
          placeholder="Filter by country"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-[2.4em] w-[24em] p-[0em] bg-inherit border text-center border-white text-white hover:border-violet-300"
        />
      </div>

      <div className="flex justify-center mt-[3em]">
        <table className="table-auto border-collapse border-[0.2px] w-full border-white mx-[3em]">
          <thead>
            <tr>
              <th className="border border-white border-x-2 bg-violet-400 px-4 py-2 text-black font-normal">
                Country
              </th>
              <th className="border border-white border-x-2 bg-violet-400 px-4 py-2 text-black font-normal">
                Diesel Price
              </th>
              <th className="border border-white border-x-2 bg-violet-400 px-4 py-2 text-black font-normal">
                Gasoline Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map((country) => (
              <tr key={country.name} className="justify-center">
                <td className="border border-white bg-neutral-300 px-4 py-2 text-black">
                  {country.name}
                </td>
                <td className="border border-white bg-neutral-300 px-4 py-2 text-black">
                  {country.diesel_price} $
                </td>
                <td className="border border-white bg-neutral-300 px-4 py-2 text-black">
                  {country.gasoline_price} $
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

import Axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Data fetcher
  const [selectedCountry, setSelectedCountry] = useState(null); // Country selector
  const [selectedFuel, setSelectedFuel] = useState(null); // Fuel type selector
  const [inputValue, setInputValue] = useState(0); // Input value
  const [priceToDisplay, setPriceToDisplay] = useState(null); // Price to display on button click

  const getData = async () => {
    const response = await Axios.get("http://localhost:3001/countries"); // Getting data from REST API
    setData(response.data); // Putting data in state
  };

  useEffect(() => {
    getData();
  }, []); // Fetch data on component mount

  const handleFuelChange = (event) => {
    const fuelType = event.target.value;
    setSelectedFuel(fuelType); // Store fuel type
  };

  const handleInputChange = (event) => {
    const liters = event.target.value;
    setInputValue(liters); // Store input values
  };

  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    const country = data.find((c) => c.name === countryName);
    setSelectedCountry(country); // Store selected country
  };

  const calculatePrice = (liters) => {
    if (selectedCountry && selectedFuel) {
      const pricePerLiter =
        selectedFuel === "diesel_price"
          ? selectedCountry.diesel_price
          : selectedCountry.gasoline_price;

      return pricePerLiter * liters; // Return calculated price
    }
    return 0; // Return 0 if no fuel or country selected
  };

  const handleGetPrice = () => {
    const price = calculatePrice(inputValue);
    setPriceToDisplay(price); // Set the price to display
  };

  return (
    <>
      <h1 className="bg-inherit text-white flex justify-center text-5xl pt-[1.5em] pb-[1em] font-thin hover:scale-105">
        FUEL PRICE CALCULATOR
      </h1>
      <div className="flex flex-row justify-center gap-[4em] items-center h-[10em] bg-inherit">
        <div className="items-center align-center justify-center">
          {data.length > 0 ? (
            <select
              className="h-[3em] w-[15em] rounded-xl p-[0.3em] bg-inherit text-center text-white border border-white hover:border-violet-300"
              onChange={handleCountryChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a country
              </option>
              {data.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="flex items-center align-center justify-center">
          <select
            className="h-[3em] w-[15em] rounded-xl p-[0.3em] bg-inherit text-center text-white border border-white hover:border-violet-300"
            onChange={handleFuelChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select fuel type
            </option>
            <option value="diesel_price"> Diesel </option>
            <option value="gasoline_price"> Gasoline </option>
          </select>
        </div>

        <div className="flex justify-center items-center">
          <input
            onChange={handleInputChange}
            type="number"
            placeholder="Number of liters"
            className="h-[3em] w-[15em] rounded-xl p-[0.5em] bg-inherit border text-center border-white text-white hover:border-violet-300"
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-[10em] bg-inherit">
        <p className="border border-white h-[7em] w-[40em] text-center items-center pt-[2.5em] text-white text-xl  rounded-xl">
          {priceToDisplay !== null
            ? priceToDisplay.toFixed(2) + "  $"
            : " Price will be displayed here"}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGetPrice}
          className="flex w-[10cem] h-[3em] justify-center items-center bg-violet-400 text-white rounded-xl mt-[1em] hover:scale-105 hover:bg-violet-300"
        >
          GET PRICE
        </button>
      </div>
    </>
  );
}

export default App;

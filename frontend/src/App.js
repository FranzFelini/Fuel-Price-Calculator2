import Axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Buttonrow from "./buttonrowcmp";
import Table from "./countrytablecmp";
import Footer from "./footercmp";
import Heading from "./headingcmp";
import Input from "./litersinputcmp";
import Selector from "./selectorscmp";
import Filter from "./tablefiltercmp";
import Price from "./totalpricecmp";

function App() {
  const [data, setData] = useState([]); // Data fetcher
  const [currencydata, setCurrencyData] = useState([]); // Currency Data fetcher
  const [selectedCurrency, setSelectedCurrency] = useState(null);
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

  const getCurrnecyData = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/currencies");
      setCurrencyData(response.data);
      console.log("Fetched currencies:", response.data);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getCurrnecyData();
  }, []);

  const handleFuelChange = (selectedOption) => {
    setSelectedFuel(selectedOption);
    console.log("Selected fuel:", selectedOption);
  };

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    console.log("Selected currency:", selectedOption);
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

  const currencyOptions = currencydata.map((currencies) => ({
    value: currencies.name,
    label: currencies.name,
    rate: currencies.value,
  }));

  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <body className="bg-bgc ">
      <Heading lastUpdated={data.length > 0 ? data[0].date : null} />
      <Selector
        handleCountryChange={handleCountryChange}
        handleFuelChange={handleFuelChange}
        countryOptions={countryOptions}
        fuelOptions={fuelOptions}
        data={data}
      />

      <Input
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        handleCurrencyChange={handleCurrencyChange}
        currnecyOptions={currencyOptions}
        currencydata={currencydata}
      />
      <Price priceToDisplay={priceToDisplay} />
      <Buttonrow handleGetPrice={handleGetPrice} />

      <Filter setFilter={setFilter} filter={filter} />
      <Table filteredCountries={filteredCountries} />

      <div className="justify-center flex">
        <div className="flex flex-col relative w-[40em] bg-white h-[0.2px] mt-[-0.5em]"></div>
      </div>

      <Footer />
    </body>
  );
}

export default App;

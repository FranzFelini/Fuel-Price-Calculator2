import Axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import About from "./components/About_cmp";
import Convert from "./components/Convert_button_cmp";
import Selector from "./components/Country_currency_selector_cmp";
import Disclaimer2 from "./components/Disclaimer_2_cmp";
import Disclaimer from "./components/Disclaimer_cmp";
import Singleprice from "./components/Display_cmp";
import Price from "./components/Display_converted_cmp";
import Footer from "./components/Footer_cmp";
import Heading from "./components/Header_cmp";
import Input from "./components/Input_cmp";
import Buttonrow from "./components/Price_button_cmp";
import Table from "./components/Table_cmp";
import Filter from "./components/Table_filter_cmp";

function App() {
  const [data, setData] = useState([]);
  const [currencydata, setCurrencyData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [InputValue, setInputValue] = useState(0);
  const [priceToDisplay, setPriceToDisplay] = useState(null);
  const [ConvertedPriceToDisplay, setConvertedPriceToDisplay] = useState(null);
  const [filter, setFilter] = useState("");

  const NEXT_PUBLIC_API_URL = process.env.REACT_APP_API_URL;

  const getAllData = async () => {
    try {
      console.log("API_URL", NEXT_PUBLIC_API_URL);
      const response = await Axios.get(`${NEXT_PUBLIC_API_URL}countries`);
      const response2 = await Axios.get(`${NEXT_PUBLIC_API_URL}currencies`);
      setData(response.data);
      setCurrencyData(response2.data);
      console.log("Fetched countries:", response.data);
      console.log("Fetched currencies:", response2.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleFuelChange = (selectedOption) => {
    setSelectedFuelType(selectedOption);
  };

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleGetPrice = () => {
    const price = calculatePrice(InputValue);
    setPriceToDisplay(price);
  };

  const handleInputChange = (event) => {
    const liters = parseFloat(event.target.value);
    if (!isNaN(liters) && liters >= 0) {
      setInputValue(liters);
    } else {
      setInputValue(0);
    }
  };

  const handleGetConvertedPrice = () => {
    const price = calculatePrice(InputValue);
    const convertedPrice = calculateConvertedPrice(price);
    setConvertedPriceToDisplay(convertedPrice);
  };

  const calculatePrice = (liters) => {
    if (selectedCountry && selectedFuelType) {
      const pricePerLiter =
        selectedFuelType.value === "diesel_price"
          ? parseFloat(selectedCountry.diesel_price)
          : parseFloat(selectedCountry.gasoline_price);

      if (!isNaN(pricePerLiter) && !isNaN(liters)) {
        return pricePerLiter * liters;
      }
    }
    return 0;
  };

  const calculateConvertedPrice = (price) => {
    if (selectedCurrency && price !== null) {
      const currencyRate = parseFloat(selectedCurrency.rate);
      if (!isNaN(currencyRate)) {
        return price * currencyRate;
      }
    }
    return 0;
  };

  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

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

  return (
    <>
      <div className="bg-bgc flex flex-col items-center">
        <Heading lastUpdated={data.length > 0 ? data[0].date : null} />
        <div className="flex justify-center">
          <div className=" border-b-[0.1px] border-white w-[20em] mt-[-0em] md:max-w-[40em] md:hidden inline"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-center mt-[2.5em] gap-6 md:gap-[3em]">
          <div className="flex flex-col justify-center items-center gap-[2em] bg-gray-900 px-4 md:px-[2em] py-4 md:py-[1em] ml-[1.5em] rounded-2xl w-full md:w-auto">
            <Selector
              handleCountryChange={handleCountryChange}
              handleFuelChange={handleFuelChange}
              countryOptions={countryOptions}
              fuelOptions={fuelOptions}
              data={data}
            />
            <Input
              handleInputChange={handleInputChange}
              inputValue={InputValue}
              handleCurrencyChange={handleCurrencyChange}
              currnecyOptions={currencyOptions}
              currencydata={currencydata}
            />
            <Singleprice priceToDisplay={priceToDisplay} />
            <Buttonrow
              handleGetPrice={handleGetPrice}
              handleGetConvertedPrice={handleGetConvertedPrice}
            />
            <Disclaimer />
          </div>

          <div className="flex justify-center w-full md:w-[25em]">
            <div className="flex flex-col bg-gray-900 justify-center gap-6 items-center px-4 md:px-[1em] py-4 md:py-[1em] ml-[1.5em] rounded-2xl w-full">
              <Price
                priceToDisplay={priceToDisplay}
                selectedCurrency={selectedCurrency}
                ConvertedPriceToDisplay={ConvertedPriceToDisplay}
              />
              <Convert handleGetConvertedPrice={handleGetConvertedPrice} />
              <Disclaimer2 />
            </div>
          </div>
        </div>

        <Filter setFilter={setFilter} filter={filter} />
        <Table
          className="flex justify-center"
          filteredCountries={filteredCountries}
        />
        <div className="flex justify-center w-full">
          <div className="border-b-[0.1px] border-white w-full mt-[-1em] mb-[4em] md:max-w-[80em]"></div>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <About />
      </div>
      <div className="bottom-o md:bottom-0">
        <Footer />
      </div>
    </>
  );
}

export default App;

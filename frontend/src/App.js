import Axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import About from "./aboutcmp";
import Buttonrow from "./components/buttonrowcmp";
import Convert from "./components/convertcmp";
import Table from "./components/countrytablecmp";
import Disclaimer from "./components/disclaimercmp";
import Disclaimer2 from "./components/disclaimercmp2";
import Footer from "./components/footercmp";
import Heading from "./components/headingcmp";
import Input from "./components/litersinputcmp";
import Selector from "./components/selectorscmp";
import Singleprice from "./components/singlepricecmp";
import Filter from "./components/tablefiltercmp";
import Price from "./components/totalpricecmp";

function App() {
  const [data, setData] = useState([]);
  const [currencydata, setCurrencyData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [priceToDisplay, setPriceToDisplay] = useState(null);
  const [ConvertedPriceToDisplay, setConvertedPriceToDisplay] = useState(null);
  const [filter, setFilter] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_API_URL;

  const getData = async () => {
    try {
      const response = await Axios.get(`${API_KEY}/countries`);
      setData(response.data);
      console.log("Fetched countries:", response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getCurrnecyData = async () => {
    try {
      const response = await Axios.get(`${API_KEY}/currencies`);
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
  };

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  const handleInputChange = (event) => {
    const liters = parseFloat(event.target.value);
    if (!isNaN(liters) && liters >= 0) {
      setInputValue(liters);
    } else {
      setInputValue(0);
    }
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
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

  const calculateConvertedPrice = (price) => {
    if (selectedCurrency && price !== null) {
      const currencyRate = parseFloat(selectedCurrency.rate);
      if (!isNaN(currencyRate)) {
        return price * currencyRate;
      }
    }
    return 0;
  };

  const handleGetPrice = () => {
    const price = calculatePrice(inputValue);
    setPriceToDisplay(price);
  };

  const handleGetConvertedPrice = () => {
    const price = calculatePrice(inputValue);
    const convertedPrice = calculateConvertedPrice(price);
    setConvertedPriceToDisplay(convertedPrice);
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
              inputValue={inputValue}
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

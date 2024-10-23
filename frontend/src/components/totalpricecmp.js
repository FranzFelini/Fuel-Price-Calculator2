const Price = ({
  priceToDisplay,
  selectedCurrency,
  ConvertedPriceToDisplay,
}) => {
  return (
    <div className="flex flex-row gap-[4em] justify-center mt-[2em]">
      <div className="flex flex-col justify-center items-center w-[20em] border-[0.2px] h-[7em] rounded-xl bg-inherit text-white font-extralight">
        <p className="text-white">USD</p>
        <p className="text-center items-center text-3xl">
          {priceToDisplay !== null
            ? priceToDisplay.toFixed(2)
            : " FUEL PRICE DISPLAYED "}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-[20em] border-[0.2px] h-[7em] rounded-xl bg-inherit text-white font-extralight">
        <p className="text-white">
          {selectedCurrency ? selectedCurrency.label : "N/A"}
        </p>
        <p className="text-center items-center text-3xl">
          {ConvertedPriceToDisplay !== null
            ? ConvertedPriceToDisplay.toFixed(2)
            : " FUEL PRICE DISPLAYED "}
        </p>
      </div>
    </div>
  );
};

export default Price;

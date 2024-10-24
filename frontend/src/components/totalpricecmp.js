const Price = ({
  priceToDisplay,
  selectedCurrency,
  ConvertedPriceToDisplay,
}) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-[4em] justify-center mt-4">
        <div className="flex flex-col justify-center items-center w-[20em] border-[0.2px] h-[7em] rounded-xl bg-black text-white font-extralight hover:border-violet-300">
          <p className="text-white text-sm sm:text-base">USD</p>
          <p className="text-center text-xl sm:text-2xl md:text-3xl">
            {priceToDisplay !== null
              ? priceToDisplay.toFixed(2)
              : "FUEL PRICE DISPLAYED"}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-[20em] border-[0.2px] h-[7em] rounded-xl bg-black text-white font-extralight hover:border-violet-300">
          <p className="text-white text-sm sm:text-base">
            {selectedCurrency ? selectedCurrency.label : "N/A"}
          </p>
          <p className="text-center text-xl sm:text-2xl md:text-3xl">
            {ConvertedPriceToDisplay !== null
              ? ConvertedPriceToDisplay.toFixed(2)
              : "FUEL PRICE DISPLAYED"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Price;

const Singleprice = ({ priceToDisplay }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-4 w-full max-w-[44em] border border-gray-300 h-[7em] rounded-xl bg-black text-white font-extralight p-4 hover:border-violet-300">
      <p className="text-white text-xl sm:text-base">USD</p>
      <p className="text-center text-xl sm:text-2xl md:text-3xl">
        {priceToDisplay !== null
          ? priceToDisplay.toFixed(2)
          : "FUEL PRICE DISPLAYED"}
      </p>
    </div>
  );
};

export default Singleprice;

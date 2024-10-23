const Price = ({ priceToDisplay }) => {
  return (
    <div className="flex justify-center mt-[2em]">
      <div className="flex justify-center items-center w-[44em] border-[0.2px] h-[7em] rounded-xl bg-inherit text-white font-extralight">
        <p className="text-center items-center text-3xl">
          {priceToDisplay !== null
            ? priceToDisplay.toFixed(2) + "  $"
            : " FUEL PRICE DISPLAYED "}
        </p>
      </div>
    </div>
  );
};

export default Price;

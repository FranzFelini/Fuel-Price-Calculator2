const Buttonrow = ({ handleGetPrice }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-[5em]">
      <button
        onClick={handleGetPrice}
        className="flex w-[20em] h-[3em] justify-center items-center bg-violet-400 text-black font-normal rounded-md mt-[2em] mb-[2em] hover:scale-105 hover:bg-purple-200 transition-3s border-white"
      >
        GET PRICE
      </button>
    </div>
  );
};

export default Buttonrow;

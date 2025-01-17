const Convert = ({ handleGetConvertedPrice }) => {
  return (
    <button
      className="flex w-[20em] h-[3em] justify-center items-center bg-violet-400 text-black font-normal rounded-md mt-[2em] hover:scale-105 hover:bg-violet-200 border-white mb-[2em]"
      onClick={handleGetConvertedPrice}
    >
      CONVERT
    </button>
  );
};

export default Convert;

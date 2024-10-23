const Buttonrow = ({ handleGetPrice }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-[3em]">
      <button
        onClick={handleGetPrice}
        className="flex w-[10em] h-[3em] justify-center items-center bg-violet-400 text-black font-light rounded-md mt-[4em] hover:scale-105 hover:bg-violet-300 border-white"
      >
        GET PRICE
      </button>

      <a href="#searchbyname">
        <img src="list.svg" className=" h-[3em] mt-[4em]"></img>
      </a>
    </div>
  );
};

export default Buttonrow;

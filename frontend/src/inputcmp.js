const Input = ({ handleInputChange, inputValue }) => {
  return (
    <div className="flex flex-row justify-center gap-[3.5em] items-center">
      <div className="flex justify-center items-center">
        <input
          onChange={handleInputChange}
          placeholder="Number of liters"
          className="h-[2.4em] w-[20em] mt-[1.5em] mb-[2em] p-[0.5em] bg-inherit rounded-md border text-center border-white text-white hover:border-violet-300"
        />
      </div>
    </div>
  );
};

export default Input;

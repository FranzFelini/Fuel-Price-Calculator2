const Heading = ({ lastUpdated }) => {
  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleString()
    : "Not available";

  return (
    <div>
      <div className="flex flex-col mt-[-5em] md:mt-14 justify-end gap-8">
        <div className="flex items-center flex-col md:flex-row gap-4 md:gap-8 text-center justify-center">
          <h1 className="flex md:flex-row flex-col bg-inherit text-white tracking-normal text-4xl md:text-5xl pt-4 pb-2 font-thin">
            <strong className="md:mb-[0em] mb-[-0.9em]">FUEL&nbsp;</strong>
            PRICE CALCULATOR
          </h1>
          <img
            className="h-16 md:h-16 mt-4 md:mt-0 mb-[1.3em] md:inline hidden"
            src="headingicon.svg"
            alt="Icon"
          />
          <p className="text-white text-lg md:text-xl font-thin mt-4 md:mt-0">
            DEMO VERSION
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="border-b-[0.1px] border-white mt-0 w-[28m] md:w-[50em]"></div>
      </div>
      <div className="flex justify-center w-full">
        <p className="text-white font-thin text-sm md:text-md mt-4 text-center">
          Last updated: {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default Heading;

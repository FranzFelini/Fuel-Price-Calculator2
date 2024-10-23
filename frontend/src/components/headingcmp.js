const Heading = ({ lastUpdated }) => {
  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleString()
    : "Not available";

  return (
    <div>
      <div className="flex flex-col mt-[2em] justify-end gap-[2em]">
        <div className="flex items-center flex-row gap-[1em] text-center justify-center">
          <h1 className=" flex md:flex-row flex-col bg-inherit text-white tracking-normal text-5xl pt-[1.5em] pb-[0.5em] font-thin">
            <p className="flex font-normal">FUEL&nbsp;</p>
            PRICE CALCULATOR
          </h1>
          <img
            className="h-[4em] align-center"
            src="headingicon.svg"
            alt="Icon"
          />
          <p className="text-white text-xl font-thin align-top">DEMO VERSION</p>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div className="border-b-[0.1px] border-white w-full mt-[0em] md:max-w-[40em]"></div>
      </div>
      <div className="flex justify-center w-full">
        <p className="text-white font-thin text-md mt-[1em] text-center">
          Last updated: {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default Heading;

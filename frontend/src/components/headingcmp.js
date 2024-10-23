const Heading = ({ lastUpdated }) => {
  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleString()
    : "Not available";

  return (
    <div>
      <div className="flex flex-col mt-[2em] justify-end mr-[4em] gap-[2em]"></div>
      <div className="flex items-center flex-row gap-[1em] justify-center mt-[0em]">
        <h1 className="bg-inherit text-white flex justify-center tracking-normal text-5xl pt-[1.5em] pb-[0.5em] font-thin">
          <span className="font-normal">FUEL&nbsp; </span> PRICE CALCULATOR
        </h1>
        <img
          className="flex h-[4em] align-center"
          src="headingicon.svg"
          alt="Icon"
        />
        <p className="text-white text-xl font-thin align-top">DEMO VERSION</p>
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

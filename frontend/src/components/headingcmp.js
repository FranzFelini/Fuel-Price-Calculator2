const Heading = ({ lastUpdated }) => {
  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleString()
    : "Not available";

  return (
    <div>
      <div className="flex flex-row mt-[2em] justify-end mr-[4em]">
        <p className="text-white font-thin text-md">
          Last updated: {formattedDate}
        </p>
      </div>
      <div className="flex items-center flex-row gap-[2em] justify-center mt-[3em]">
        <h1 className="bg-inherit text-white flex justify-center tracking-normal text-5xl pt-[1.5em] pb-[1em] font-thin">
          <span className="font-normal">FUEL&nbsp; </span> PRICE CALCULATOR
        </h1>
        <img
          className="flex h-[4em] align-center"
          src="headingicon.svg"
          alt="Icon"
        />
        <p className="text-white text-xl font-thin">DEMO VERSION</p>
      </div>
    </div>
  );
};

export default Heading;

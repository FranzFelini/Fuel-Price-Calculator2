const About = () => {
  return (
    <div className="flex justify-center w-full md:w-[60em] bg-gray-900 md:h-[20em] h-[33em] rounded-2xl border-white border-[0.1px] hover: shadow-2xl hover:shadow-violet-300">
      <div className="flex flex-col gap-[3em] items-center">
        <h1 className="font-extralight text-white text-3xl text-center md:mt-[1.5em] mt-[1.5em]">
          ABOUT MY FUEL PRICE CALCULATOR APP
        </h1>

        <p className="md:w-[40em] w-[17em] text-white font-thin text-justify md:mt-[0em] mt-[1em]">
          The Fuel Price Calculator is an app that enables users to search and
          calculate their fuel consumption based on the country where they buy
          the fuel and based on liters that they put it. The app itself is
          updated regularly so you don't need to worry about false data.
        </p>

        <div className="flex flex-row gap-[2em] justify-center">
          <p className="font-extralight text-white ">
            {" "}
            INTERESTED IN MY GITHUB ?
          </p>
          <a href="https://github.com/FranzFelini">
            <img
              src="git.svg"
              className="h-[4em] w-[4em] items-center pb-[1em] md:m-[-1em] ml-[0.5em] mb-[2em] hover:scale-125 hover:grayscale-0"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

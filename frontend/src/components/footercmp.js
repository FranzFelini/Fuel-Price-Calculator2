const Footer = () => {
  return (
    <footer className="flex flex-row gap-[2em] h-[8em] bg-black text-neutral-300 text-md justify-center font-extralight items-center">
      <p className="font-thin"> Test poject by Fedja Arnautovic</p>
      <p className="font-thin">
        &copy; {new Date().getFullYear()} Fuel Price Calculator. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;

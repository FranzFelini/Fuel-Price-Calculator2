const Footer = () => {
  return (
    <footer className="flex h-[5em] bg-black text-neutral-300 text-md justify-center font-extralight items-center">
      <p className="font-thin">
        &copy; {new Date().getFullYear()} Fuel Price Calculator. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;

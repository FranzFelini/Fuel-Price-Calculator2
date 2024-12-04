const Filter = ({ setFilter, filter }) => {
  return (
    <div className="flex justify-center md:justify-end mt-[7em] mb-[-2em] w-full md:mr-[13.5em]">
      <input
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="h-[2.4em] w-full md:w-[20em] p-[0em] bg-inherit border text-center border-white text-white hover:border-violet-300"
      />
    </div>
  );
};

export default Filter;

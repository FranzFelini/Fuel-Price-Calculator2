const Filter = ({ setFilter, filter }) => {
  return (
    <div
      id="searchbyname"
      className="flex justify-end mt-[7em] mr-[3.3em] hover:via-violet-300 mb-[-2em]"
    >
      <input
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="h-[2.4em] w-[24em] p-[0em] bg-inherit border text-center border-white text-white hover:border-violet-300"
      />
    </div>
  );
};
export default Filter;

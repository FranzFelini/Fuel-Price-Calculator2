const Table = ({ filteredCountries }) => {
  return (
    <div
      className="overflow-y-auto justify-center flex my-[3em] px-[3em]"
      style={{ maxHeight: "630px", width: "100%" }}
    >
      <table className=" border-[0.2px] w-full border-white rounded-xl">
        <thead className="bg-violet-400">
          <tr>
            <th className="sticky top-0 border border-white border-x-2 px-4 py-2 text-black font-normal bg-violet-400">
              Country
            </th>
            <th className="sticky top-0 border border-white border-x-2 px-4 py-2 text-black font-normal bg-violet-400">
              Diesel Price
            </th>
            <th className="sticky top-0 border border-white border-x-2 px-4 py-2 text-black font-normal bg-violet-400">
              Gasoline Price
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => (
            <tr key={country.name} className="justify-center">
              <td className="border border-white bg-neutral-300 px-4 py-2 text-black">
                {country.name}
              </td>
              <td className="border border-white bg-neutral-300 px-4 py-2 text-black">
                {country.diesel_price} $
              </td>
              <td className="border border-white bg-neutral-300 px-4 py-2 text-black">
                {country.gasoline_price} $
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

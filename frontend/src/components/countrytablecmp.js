const Table = ({ filteredCountries }) => {
  return (
    <div
      className="overflow-y-auto justify-center flex my-[3em] px-[3em]"
      style={{ maxHeight: "630px", width: "100%" }}
    >
      <table className=" border-[0.2px] h-[2em] w-full border-white rounded-xl">
        <thead className="bg-violet-400 h-[3.5em]">
          <tr>
            <th className="sticky top-0  border-x-[0.1px] text-lg px-4 py-2 text-white font-thin bg-gray-800">
              COUNTRY
            </th>
            <th className="sticky top-0  border-x-[0.1px]  text-lg px-4 py-2 text-white font-thin bg-gray-800">
              DIESEL PRICE
            </th>
            <th className="sticky top-0 border-x-[0.1px]  text-lg px-4 py-2 text-white font-thin bg-gray-800">
              GASOLINE PRICE
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

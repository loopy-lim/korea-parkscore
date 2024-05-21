export const CitySearch = () => {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="City Name"
        className="bg-transparent border p-2 w-full"
      />
      <button className="p-2 cursor-pointer bg-black text-gray-300 px-8">
        Search
      </button>
    </div>
  );
};

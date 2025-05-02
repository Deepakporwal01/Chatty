import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = ({ setSearchQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    setInput(e.target.value);
    setSearchQuery(e.target.value); // Update the search query
  };

  const submitSearch = (e) => {
    e.preventDefault();
    console.log("Searched for", input);
    setInput("");
  };

  return (
    <form className="flex items-center justify-center gap-2 mt-2">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search…"
        className="input input-bordered rounded-full w-[80%] text-center"
        value={input}
      />
      <button
        onClick={submitSearch}
        type="submit"
        className="btn btn-circle bg-sky-500 text-white"
      >
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;

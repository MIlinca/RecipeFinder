import { useState } from "react";

interface SearchBar{
    onSearch:(query: string)=> void;
}

const SearchBar:React.FC<SearchBar>=({onSearch})=>{
    const [query,setQuery]=useState("");

    const handleSearch=()=>{
        if(query.trim()){
            onSearch(query);
        }
    };

return (
    <div className="flex items-center justify-center w-full mt-8">
      <input
        type="text"
        className="border rounded-full px-4 py-2 w-3/4 md:w-1/2 focus:outline-none"
        placeholder="What do you feel like eating?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
    className="ml-2 p-2 bg-gray-200 rounded-full"
    onClick={handleSearch}
    aria-label="Search"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M9 17a8 8 0 100-16 8 8 0 000 16z"
        />
    </svg>
</button>
    </div>
  );
};

export default SearchBar;

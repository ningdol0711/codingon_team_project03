import { useState } from "react";
import { SearchProps } from "../types/types";

export default function Search({ searchOpt, search }: SearchProps) {
  const [searchVal, setSearchVal] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = () => {
    const searchValue = searchVal.toLowerCase();
    let searchQuery = searchValue;
    if (searchValue === "엘지") {
      searchQuery = "lg";
    }
    else if (searchValue === "samsung") {
      searchQuery = "삼성";
    }
    else if (searchValue === "coway") {
      searchQuery = "코웨이";
    }
    else if (searchValue === "roborock") {
      searchQuery = "로보락";
    }
    else if (searchValue === "에스케이") {
      searchQuery = "sk";
    }
    search(searchQuery);
    setSearchVal("");
  };

  return (
    <div className="search">
      <div className="search_inputBox">
        <input
          type="text"
          className="search_input"
          placeholder={searchOpt}
          value={searchVal}
          onChange={handleSearchChange}
        />
        <button className="search_sendBtn" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </div>
  );
}

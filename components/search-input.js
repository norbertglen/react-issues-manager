import React, { useCallback, useEffect, useState } from "react";

import { useDebounce } from "../hooks";

const SearchBox = ({ onTextChange }) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("searching...", debouncedSearchTerm);
      onTextChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onTextChange]);

  const handleChangeText = useCallback(
    (e) => setSearchText(e.currentTarget.value),
    []
  );

  return (
    <input
      onChange={handleChangeText}
      type="text"
      role="search"
      placeholder="Search here..."
      name="searchBox"
    />
  );
};

export default SearchBox;

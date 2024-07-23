// In components/Search.js
import React, { useState } from "react";
import { useGiphy } from "../logic";

function Search() {
    const [query, setQuery] = useState("");
    const { searchGifs } = useGiphy();

    const handleSubmit = (e) => {
        e.preventDefault();
        searchGifs(query);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search GIFs"
                className="search-input"
            />
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
}

export default Search;

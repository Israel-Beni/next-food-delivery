"use client";
import React, { useState } from 'react';

function SearchBar(): JSX.Element {
    const [query, setQuery] = useState("");
    return (
        <div className="mb-6">
            <input className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-green-500 focus:ring-opacity-50" type="text" placeholder="Search restaurants" />
        </div>
    )
}

export default SearchBar;
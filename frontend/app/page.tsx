"use client";
import Image from "next/image";
import styles from "./page.module.css";
import RestaurantList from "@/components/RestaurantList";
import {useState } from 'react';

export default function Home() {
    const [query, setQuery] = useState("KFC");
    return (
        <main className="mx-auto container m-6">
            {/* <button className="inline-block py-3 px-7 w-full md:w-auto text-lg leading-7 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm">
                Primary button
            </button> */}

        <div className="mb-6">
            <input className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-green-500 focus:ring-opacity-50" type="text" placeholder="Search restaurants" 
            onChange={(e) => setQuery(e.target.value)}/>
        </div>
            <RestaurantList query={query} />

        </main>
    );
}

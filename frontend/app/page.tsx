import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className="mx-auto container">
            <button className="inline-block py-3 px-7 w-full md:w-auto text-lg leading-7 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm">
                Primary button
            </button>
        </main>
    );
}

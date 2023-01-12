import useGlobalContext from "../context/contextApi";
import moment from "moment";
import { useRef, useEffect, useState } from "react";

function Details() {
  const { covidData, loading, searchQuery, theme, serverMessage } =
    useGlobalContext();
  const lastElementRef = useRef(null);
  const observeRef = useRef(null);
  const [size, setSize] = useState(5);

  const countries = searchQuery
    ? covidData?.filter((item) => {
      return searchQuery.toLowerCase() === ""
        ? item
        : item.Country.toLowerCase().includes(searchQuery.toLowerCase());
    })
    : covidData?.slice(0, size)

  useEffect(() => {
    if (!observeRef.current) {
      observeRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSize((prevSize) => prevSize + 5);
          }
        });
      });
    }

    if (lastElementRef.current) {
      observeRef.current.observe(lastElementRef.current);
    }
  }, [countries, observeRef, lastElementRef]);

  return (
    <>
      {loading || serverMessage ? (
        <h2
          className={`text-2xl text-center ${theme === "light" ? "text-gray-800" : "text-white"
            } mt-5 font-semibold`}
        >
          {serverMessage ? serverMessage : "Loading Data Please Wait...."}
        </h2>
      ) : (
        <section className="grid grid-cols-1 gap-10 px-10 py-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:px-20">
          {countries.map((data, index) => {
            const {
              ID,
              Country,
              CountryCode,
              NewConfirmed,
              TotalConfirmed,
              NewDeaths,
              TotalDeaths,
              NewRecovered,
              TotalRecovered,
              Date,
            } = data;

            const isLastElement = countries.length - 1 === index;
            const ref = isLastElement ? lastElementRef : undefined;

            return (
              <div key={ID} ref={ref} className="bg-gray-800 p-4 rounded">
                <h2 className="font-bold text-green-400 text-3xl mb-4">
                  {Country}, <span className="font-light">{CountryCode}</span>
                </h2>
                <ul>
                  <li className="flex justify-between my-2 text-red-300">
                    <span className="font-bold">New Confirmed Cases:</span>{" "}
                    {NewConfirmed}
                  </li>
                  <li className="flex justify-between my-2 text-blue-300">
                    <span className="font-bold">Total Confirmed Cases:</span>{" "}
                    {TotalConfirmed}
                  </li>
                  <li className="flex justify-between my-2 text-yellow-300">
                    <span className="font-bold">New Deaths:</span> {NewDeaths}
                  </li>
                  <li className="flex justify-between my-2 text-purple-300">
                    <span className="font-bold">Total Deaths:</span>{" "}
                    {TotalDeaths}
                  </li>
                  <li className="flex justify-between my-2 text-indigo-300">
                    <span className="font-bold">New Recovered Cases:</span>{" "}
                    {NewRecovered}
                  </li>
                  <li className="flex justify-between my-2 text-pink-300">
                    <span className="font-bold">Total Recovered Cases:</span>{" "}
                    {TotalRecovered}
                  </li>
                  <li className="text-green-100 mt-5">
                    <span className="font-bold">Date:</span>{" "}
                    {moment(`${Date}`).format("MMMM Do YYYY hh:mm:ss")}
                  </li>
                </ul>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Details;

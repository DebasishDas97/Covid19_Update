import useGlobalContext from "../context/contextApi"

const Search = () => {
    const { setSearchQuery, searchQuery, theme } = useGlobalContext()

    return (
        <section className="">
            <form className="w-9/12 mx-auto pt-5 lg:w-1/2">
                <input
                    type="text"
                    name="Search Countries"
                    id="searchCountries"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search For a Country"
                    className={`${theme === "light" && "border-2 border-gray-700"}
                    text-lg  font-bold tracking-widest w-full py-2 px-5 rounded`}
                />
            </form>
        </section>
    )
}

export default Search
import Search from "./Search"
import useGlobalContext from "../context/contextApi"

const Header = () => {
  const { toggleTheme, theme } = useGlobalContext()

  return (
    <>
      <div className="pt-6 flex items-center justify-center w-full">
        <h1 className={`${theme === "light" ? "text-gray-700" : "text-white"} text-2xl md:text-4xl font-extrabold font-serif text-cente`}>
          Covid-19 Update
        </h1>
        <button className={`${theme === "light" ? "bg-white text-gray-800" :
          "bg-[rgb(22, 21, 21)] text-white"} text-xl rounded-full px-[5px] py-[1px] border-2 border-green-400 ml-3 shadow-inner`}
          id="toggleBtn" onClick={toggleTheme}>
          {theme === "light" ? "🌞" : "🌛"}
        </button>
      </div>
      <Search />
    </>
  )
}

export default Header
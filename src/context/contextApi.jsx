import { useState, useEffect, createContext, useContext } from "react";

const CovidContext = createContext()

export const CovidDataProvider = ({children}) => {
    const [covidData, setCovidData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [theme, setTheme] = useState("light")
    const [serverMessage, setServerMessage] = useState("")

    useEffect(() => {
        setLoading(true)
        fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(data => {
            setCovidData(data?.Countries)
            data.Message === "Caching in progress" && setServerMessage("The server is busy right now🙇‍♂️, please try again🥺")
            setLoading(false)
        })
    }, [])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    return (
        <CovidContext.Provider value={{covidData, loading, setLoading, setCovidData, setSearchQuery, searchQuery, toggleTheme, theme, serverMessage}}>
            {children}
        </CovidContext.Provider>
    )
}

export default function useGlobalContext() {
    return useContext(CovidContext)
}
import Details from "./components/Details"
import Header from "./components/Header"

import useGlobalContext from "./context/contextApi"

function App() {
  const { theme } = useGlobalContext()
  return (
    <div id={theme}>
    <Header />
    <Details />
    </div>
  )
}

export default App

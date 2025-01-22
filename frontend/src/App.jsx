import { BrowserRouter, Routes, Route } from "react-router-dom"

import TemplateScreen from "./components/screens/TemplateScreen"

import HomeScreen from "./components/screens/HomeScreen"
import ProductScreen from "./components/screens/ProductScreen"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemplateScreen/>}>

          <Route index element={<HomeScreen />} />
          <Route path="products/:id" element={<ProductScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

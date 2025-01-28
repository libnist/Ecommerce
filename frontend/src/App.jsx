import { BrowserRouter, Routes, Route } from "react-router-dom"

import TemplateScreen from "./components/screens/TemplateScreen"

import HomeScreen from "./components/screens/HomeScreen"
import ProductScreen from "./components/screens/ProductScreen"
import CartScreen from "./components/screens/CartScreen"
import LoginScreen from "./components/screens/LoginScreen"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemplateScreen />}>

          <Route index element={<HomeScreen />} />
          <Route path="products/:id" element={<ProductScreen />} />
          <Route path="cart/:id?" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

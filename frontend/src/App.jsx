import { BrowserRouter, Routes, Route } from "react-router-dom"

import TemplateScreen from "./components/screens/TemplateScreen"

import HomeScreen from "./components/screens/HomeScreen"
import ProductScreen from "./components/screens/ProductScreen"
import CartScreen from "./components/screens/CartScreen"
import LoginScreen from "./components/screens/LoginScreen"
import RegisterScreen from "./components/screens/RegisterScreen"
import ProfileScreen from "./components/screens/ProfileScreen"
import ShippingScreen from "./components/screens/ShippingScreen"
import PaymentScreen from "./components/screens/PaymentScreen"
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen"
import OrderScreen from "./components/screens/OrderScreen"
import UserListScreen from "./components/screens/UsersListScreen"
import UserEditScreen from "./components/screens/UserEditScreen"
import ProductListScreen from "./components/screens/ProductListScreen"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemplateScreen />}>

          <Route index element={<HomeScreen />} />
          <Route path="products/:id" element={<ProductScreen />} />
          <Route path="cart/:id?" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/shipping" element={<ShippingScreen/>}/>
          <Route path="/payment" element={<PaymentScreen/>}/>
          <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
          <Route path="/order/:id" element={<OrderScreen/>}/>
          <Route path="/admin/userlist" element={<UserListScreen/>}/>
          <Route path="/admin/user/:id" element={<UserEditScreen/>}/>
          <Route path="/admin/productlist" element={<ProductListScreen/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

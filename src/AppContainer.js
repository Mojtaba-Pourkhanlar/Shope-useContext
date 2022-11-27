import { Navigate, Route, Routes } from "react-router-dom";
// MUI
import { ThemeProvider } from "@mui/material";
import { theme } from "./frontEnd/mui/theme";
// Components
import Products from "./frontEnd/components/Products";
import ProductDetails from "./frontEnd/components/product/ProductDetails";
import Cart from "./frontEnd/components/cart/Cart";
// Data
import { DataProvider } from "./frontEnd/context/Context";

function AppContainer() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/cart" element={<Cart />} />
          <Route path="/Products/:id" element={<ProductDetails />} />

          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </ThemeProvider>
    </DataProvider>
  );
}

export default AppContainer;

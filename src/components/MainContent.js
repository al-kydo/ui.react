import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryList from "./categories/CategoryList";
import CategoryCreate from "./categories/CategoryCreate";
import CategoryUpdate from "./categories/CategoryUpdate";
import ManufacturerList from "./manufacturers/ManufacturerList";
import ProductList from "./products/ProductList";

function MainContent(props) {
  let handeNavigation = () => {
    switch (props.target) {
      case "CategoryList":
        return <CategoryList />;
      case "ManufacturerList":
        return <ManufacturerList />;
      default:
        return <ProductList />;
    }
  };
  return (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/category" element={<CategoryList />} />
            <Route path="/category/:id" element={<CategoryUpdate />} />
            <Route path="/categorycreate/" element={<CategoryCreate />} />
            <Route path="/manufacturer" element={<ManufacturerList />} />
            <Route path="/product" element={<ProductList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default MainContent;

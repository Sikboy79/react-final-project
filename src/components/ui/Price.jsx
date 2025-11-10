import React from "react";

const Price = () => {
  const originalPrice = 19.99;
  const salePrice = 9.99;
  const price = ( salePrice < originalPrice );
  return (
    <div className="book__price">
        <>
          <span className="book__price--normal">
          ${originalPrice}
          </span>
          ${salePrice}
        </>
    </div>
  );
};

export default Price;

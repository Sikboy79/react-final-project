

import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../assets/empty_cart.svg";


const Cart = ({ updateCart, removeItem, totals, price, item }) => {
  const itemPrice = price;
  const id = cart.cover_edition_key || cart.cover_i || encodeURIComponent(cart.title);
  const [cart, setCart] = useState([]);
  
  if (!cart) {
    return <p>cart not found</p>;
  }

  function updateCart(id, newQuantity, price, book) {
    setCart((oldCart) =>
      oldCart.map((oldId) => {
        if (oldId.book === book) {
          return {
            ...oldId.book.price,
            quantity: newQuantity,
          };
        } else {
          return oldId;
        }
      }, [cart])
    );
  }

  // function removeItem(id) {
  //   setCart((oldCart) => oldCart.filter((cartId) => cartId.title !== id.title));
  // }

  // function numberOfItems() {
  //   let counter = 0;
  //   cart.forEach((id) => {
  //     counter += +id.quantity;
  //   });
  //   return counter;
  // }

  // function calcPrices() {
  //   let total = 0;
  //   cart.forEach((id) => {
  //     total += (id.salePrice || id.originalPrice) * id.quantity;
  //   });
  //   return {
  //     subtotal: total * 0.9,
  //     tax: total * 0.1,
  //     total,
  //   };
  // }

  console.log(cart);

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
              <div className="cart__header">
                <span className="cart__book">Book</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Price</span>
              </div>
              <div className="cart__body">
                {cart.map((item) => {
                  return (
                    <div className="cart__item" key={id}>
                      <div className="cart__book">
                        {" "}
                        books
                        <img
                          className="cart__book--img"
                          src={
                            item.cover_i
                              ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
                              : "fallback.jpg"
                          }
                          alt=""
                        />
                        <div className="cart__book--info">
                          <span className="cart__book--title">
                            {item.title}
                          </span>
                          <span className="cart__book--price">
                            ${itemPrice.toFixed(2)}
                          </span>
                          <button
                            className="cart__book--remove"
                            onClick={() => removeItem(id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart__quantity">
                        <input
                          type="number"
                          className="cart__input"
                          min={0}
                          max={99}
                          value={item.quantity}
                          onChange={(event) =>
                            updateCart(item, event.target.value)
                          }
                        />
                      </div>
                      <div className="cart__total">
                        ${(price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
                {(!cart || !item.length) && <img src={EmptyCart} />}
                {(!cart || !item.length) && (
                  <div className="cart__empty">
                    <h2>You don't have any books in your cart!</h2>
                    <Link to="/books">
                      <button className="btn">Browse books</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {cart && cart.length > 0 && (
              <div className="total">
                <div className="total__item total__sub-total">
                  <span>Subtotal</span>
                  {/* <span>${totals.subtotal.toFixed(2)}</span> */}
                </div>
                {/* <div className="total__item total__tax">
                  <span>Tax</span>
                  <span>${totals.tax.toFixed(2)}</span>
                </div>
                <div className="total__item total__price">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div> */}
                <button
                  className="btn btn__checkout no-cursor"
                  onClick={() => alert(`Haven't got around to doing this :(`)}
                >
                  Proceed to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;

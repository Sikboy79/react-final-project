import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import EmptyCart from "../assets/empty_cart.svg";

import Price from "../components/ui/Price";

import { readCart, updateQuantity, removeFromCart } from "../Cart";

const Cart = () => {
  const [items, setItems] = useState(readCart());

  useEffect(() => {
    setItems(readCart());
  }, []);

  const handleQtyChange = (id, value) => {
    const updated = updateQuantity(id, value);

    setItems(updated);
  };

  const handleRemove = (book) => {
    const updated = removeFromCart(book);

    setItems(updated);
  };

  const subtotal = items.reduce(
    (sum, it) => sum + 9.99 * Number(it.quantity || 1),

    0
  );

  const tax = subtotal * 0.1;

  const total = subtotal + tax;

  console.log(items)
  

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
                {items.length < 0 ? (
                  <div className="cart__empty">
                    <img src={EmptyCart} alt="Empty cart" />

                    <h2>You don't have any books in your cart!</h2>

                    <Link to="/books">
                      <button className="btn">Browse books</button>
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div className="cart__item" key={item.id}>
                      <div className="cart__book">
                        <img
                          className="cart__book--img"
                          src={
                            item[0].cover_i
                              ? `https://covers.openlibrary.org/b/id/${item[0].cover_i}-L.jpg`
                              : require("../assets/fallback-book.jpg")
                          }
                          alt={item.title}
                        />

                        <div className="cart__book--info">
                          <span className="cart__book--title">
                            {item[0].title}
                          </span>

                          <span className="cart__book--price">
                            <Price />
                          </span>

                          <button
                            className="cart__book--remove"
                            onClick={() => handleRemove(item.id)}
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
                          value={Number(item[0].quantity || 1)}
                          onChange={(e) =>
                            handleQtyChange(item[0].id, e.target.value)
                          }
                        />
                      </div>

                      <div className="cart__total">
                        ${(9.99 * Number(item[0].quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {items && items.length > 0 && (
              <div className="total">
                <div className="total__item total__sub-total">
                  <span>Subtotal</span>

                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="total__item total__tax">
                  <span>Tax</span>

                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="total__item total__price">
                  <span>Total</span>

                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  className="btn btn__checkout no-cursor"
                  onClick={() => (alert = "not dont yet")}
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



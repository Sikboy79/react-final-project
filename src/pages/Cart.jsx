import React from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../assets/empty_cart.svg";

function Cart({
  cart,
  updateCart,
  removeItem,
  totals,
  id
}) {

  console.log(cart)
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
                {/* // const itemPrice = id.salePrice; */}
                <div className="cart__item" key={id}>
                  <div className="cart__book">
                    <img
                      className="cart__book--img"
                      src={`https://covers.openlibrary.org/b/olid/${id}-L.jpg`}
                      alt=""
                    />
                    <div className="cart__book--info">
                      <span className="cart__book--title">{id}</span>
                      <span className="cart__book--price">
                        {/* ${itemPrice.toFixed(2)} */}
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
                      // value={id.quantity}
                      onChange={(event) => updateCart(id, event.target.value)}
                    />
                  </div>
                  <div className="cart__total">
                    {/* ${(id.Price * id.quantity).toFixed(2)} */}
                  </div>
                </div>
                {(!cart || !cart.length) && (
                  <div className="cart__empty">
                    <img className="cart__empty--img" src={EmptyCart} alt="" />
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
                {/* <div className="total__item total__sub-total">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="total__item total__tax">
                  <span>Tax</span>
                  <span>${totals.tax.toFixed(2)}</span>
                </div>
                <div className="total__item total__price">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;

// import React from "react";
// import { Link } from "react-router-dom";
// import EmptyCart from "../assets/empty_cart.svg";

// const Cart = ({ cart, updateCart, removeItem, totals, b, price, id }) => {
//   // const itemPrice = b.price;
//   // const id = b.cover_edition_key || b.cover_i || encodeURIComponent(b.title);
//   if (!cart) {
//     return <p>cart not found</p>;
//   }

//   console.log(cart);
//   console.log(price);

//   return (
//     <div id="books__body">
//       <main id="books__main">
//         <div className="books__container">
//           <div className="row">
//             <div className="book__selected--top">
//               <h2 className="cart__title">Cart</h2>
//             </div>
//             <div className="cart">
//               <div className="cart__header">
//                 <span className="cart__book">Book</span>
//                 <span className="cart__quantity">Quantity</span>
//                 <span className="cart__total">Price</span>
//               </div>
//               <div className="cart__body">
//                 {cart.map((price) => {
//                   return (
//                     <div className="cart__item" key={b.key}>
//                       <div className="cart__book">
//                         {" "}
//                         books
//                         <img
//                           className="cart__book--img"
//                           src={
//                             b
//                               ? `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`
//                               : "fallback.jpg"
//                           }
//                           alt=""
//                         />
//                         <div className="cart__book--info">
//                           <span className="cart__book--title">
//                             {b.id}
//                           </span>
//                           <span className="cart__book--price">
//                             {/* ${itemPrice.toFixed(2)} */}
//                           </span>
//                           <button
//                             className="cart__book--remove"
//                             onClick={() => removeItem(b)}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                       <div className="cart__quantity">
//                         <input
//                           type="number"
//                           className="cart__input"
//                           min={0}
//                           max={99}
//                           value={b.quantity}
//                           onChange={(event) =>
//                             updateCart(b, event.target.value)
//                           }
//                         />
//                       </div>
//                       <div className="cart__total">
//                         ${(price * b.quantity).toFixed(2)}
//                       </div>
//                     </div>
//                   );
//                 })}
//                 {(!cart || !cart.length) && <img src={EmptyCart} />}
//                 {(!cart || !cart.length) && (
//                   <div className="cart__empty">
//                     <h2>You don't have any books in your cart!</h2>
//                     <Link to="/books">
//                       <button className="btn">Browse books</button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {cart && cart.length > 0 && (
//               <div className="total">
//                 <div className="total__item total__sub-total">
//                   <span>Subtotal</span>
//                   <span>${totals.subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="total__item total__tax">
//                   <span>Tax</span>
//                   <span>${totals.tax.toFixed(2)}</span>
//                 </div>
//                 <div className="total__item total__price">
//                   <span>Total</span>
//                   <span>${totals.total.toFixed(2)}</span>
//                 </div>
//                 <button
//                   className="btn btn__checkout no-cursor"
//                   onClick={() => alert(`Haven't got around to doing this :(`)}
//                 >
//                   Proceed to checkout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Cart;

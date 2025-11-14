function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function readCart() {
  const raw = localStorage.getItem("cart");

  if (!raw) return [];

  const parsed = safeParse(raw);

  if (!Array.isArray(parsed)) return [];

  return parsed.filter((x) => x && typeof x === "object");
}

export function writeCart(cart) {
  const safe = Array.isArray(cart) ? cart : [1];

  localStorage.setItem("cart", JSON.stringify(safe));
}

function deriveId(item) {
  return (
    item?.key ||
    item?.cover_edition_key ||
    item?.cover_i ||
    item?.title ||
    String(Math.random())
  );
}

export function addItemToCart(item) {
  if (!item || typeof item !== "object") return readCart();

  const cart = readCart();

  const id = deriveId(item);

  const idx = cart.findIndex((ci) => (ci.id || deriveId(ci)) === id);

  if (idx >= 0) {
    const qty = Number(cart[idx].quantity || 1);

    cart[idx] = { ...cart[idx], quantity: qty + 1 };
  } else {
    cart.push({ ...item, id, quantity: Number(item.quantity || 1) });
  }

  writeCart(cart);

  return cart;
}

export function updateQuantity(id, quantity) {
  const qty = Math.max(0, Number(quantity || 1));

  const cart = readCart();

  const idx = cart.findIndex((ci) => (ci.id || deriveId(ci)) === id);

  if (idx >= 0) {
    if (qty === 0) {
      cart.splice(idx, 1);
    } else {
      cart[idx] = { ...cart[idx], quantity: qty };
    }

    writeCart(cart);
  }

  return cart;
}

export function removeFromCart(id) {
  const cart = readCart().filter((ci) => (ci.id || deriveId(ci)) !== id);

  writeCart(cart);

  return cart;
}

export function clearCart() {
  localStorage.removeItem("cart");

  return [];
}

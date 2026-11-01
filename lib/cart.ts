export type CartItem = {
  productId: number;
  title: string;
  image: string;
  price: number;
  size: string | null;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  coupon: string | null;
};

export const emptyCart: CartState = { items: [], coupon: null };

export const FREE_SHIPPING_THRESHOLD = 299;
export const SHIPPING_FEE = 24.9;
export const MAX_QUANTITY = 10;
export const COUPONS: Record<string, number> = { FOUND10: 10 };

const round = (n: number) => Math.round(n * 100) / 100;

export function needsSize(category: string) {
  return category.endsWith("clothing");
}

export function itemKey(item: Pick<CartItem, "productId" | "size">) {
  return `${item.productId}-${item.size ?? "unico"}`;
}

export function normalizeCoupon(code: string) {
  return code.trim().toUpperCase();
}

export function isValidCoupon(code: string) {
  return Object.hasOwn(COUPONS, code);
}

export function addItem(
  state: CartState,
  item: Omit<CartItem, "quantity">,
  quantity = 1
): CartState {
  const key = itemKey(item);
  const exists = state.items.some((i) => itemKey(i) === key);

  const items = exists
    ? state.items.map((i) =>
        itemKey(i) === key
          ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QUANTITY) }
          : i
      )
    : [...state.items, { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }];

  return { ...state, items };
}

export function removeItem(state: CartState, key: string): CartState {
  return { ...state, items: state.items.filter((i) => itemKey(i) !== key) };
}

export function setItemQuantity(
  state: CartState,
  key: string,
  quantity: number
): CartState {
  const safe = Math.min(Math.max(quantity, 1), MAX_QUANTITY);
  return {
    ...state,
    items: state.items.map((i) =>
      itemKey(i) === key ? { ...i, quantity: safe } : i
    ),
  };
}

export function getTotals(state: CartState) {
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = round(
    state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );
  const percent = state.coupon ? (COUPONS[state.coupon] ?? 0) : 0;
  const discount = round((subtotal * percent) / 100);
  // O frete grátis considera o subtotal antes do cupom.
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = count === 0 || freeShipping ? 0 : SHIPPING_FEE;
  const total = round(subtotal - discount + shipping);
  const remainingForFreeShipping = Math.max(
    0,
    round(FREE_SHIPPING_THRESHOLD - subtotal)
  );

  return {
    count,
    subtotal,
    discount,
    shipping,
    total,
    freeShipping,
    remainingForFreeShipping,
  };
}

export type CartTotals = ReturnType<typeof getTotals>;

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.productId === "number" &&
    typeof v.title === "string" &&
    typeof v.image === "string" &&
    typeof v.price === "number" &&
    (v.size === null || typeof v.size === "string") &&
    typeof v.quantity === "number" &&
    v.quantity >= 1
  );
}

export function parseCart(raw: unknown): CartState {
  if (!raw || typeof raw !== "object") return emptyCart;
  const data = raw as { items?: unknown; coupon?: unknown };
  const items = Array.isArray(data.items) ? data.items.filter(isCartItem) : [];
  const coupon =
    typeof data.coupon === "string" && isValidCoupon(data.coupon)
      ? data.coupon
      : null;
  return { items, coupon };
}
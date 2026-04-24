import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductIcon from '../components/product/ProductIcon';
import { useCart } from '../context/CartContext';
import * as cartApi from '../api/cart';
import './CartPage.css';

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, clear, count } = useCart();
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCheckout = async () => {
    setCheckoutBusy(true);
    setCheckoutMsg(null);
    try {
      const session = await cartApi.createCheckoutSession({ items, currency: items[0]?.currency || 'GBP' });
      if (session.url) {
        window.location.href = session.url;
        return;
      }
      setCheckoutMsg(`Demo checkout: ${session.summary.itemCount} items · ${session.summary.currency} ${session.summary.total.toFixed(2)}. Stripe will take over here once VITE_STRIPE_PUBLISHABLE_KEY is set.`);
    } catch (err) {
      setCheckoutMsg(err.message || 'Checkout failed. Please try again.');
    } finally {
      setCheckoutBusy(false);
    }
  };

  const symbol = items[0]?.currencySymbol ?? '£';
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = qualifiesFreeShipping || subtotal === 0 ? 0 : 4.95;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">
          <div className="cart-empty__inner">
            <div className="cart-empty__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h1 className="cart-empty__title">Your cart is empty</h1>
            <p className="cart-empty__subtitle">
              Looks like you haven&apos;t added anything yet. Start with the Carafe — 60 days to decide.
            </p>
            <div className="cart-empty__actions">
              <Link to="/shop" className="cart-btn cart-btn--primary">
                Shop the collection
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
              <Link to="/science" className="cart-btn cart-btn--ghost">The Science</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-hero">
        <div className="cart-hero__inner">
          <span className="cart-hero__eyebrow">Your Cart</span>
          <h1 className="cart-hero__title">
            {count} {count === 1 ? 'item' : 'items'}, ready when you are.
          </h1>
        </div>
      </section>

      <section className="cart-main">
        <div className="cart-main__inner">
          <div className="cart-items" aria-label="Cart items">
            {items.map((item) => {
              const lineTotal = (item.unitPrice * item.qty).toFixed(2);
              const key = `${item.handle}-${item.purchaseType}`;
              return (
                <article className="cart-item" key={key}>
                  <Link to={`/products/${item.handle}`} className="cart-item__media" aria-label={item.name}>
                    <ProductIcon name={item.heroIcon} stroke={item.colorAccent} className="cart-item__icon" />
                  </Link>

                  <div className="cart-item__body">
                    <div className="cart-item__top">
                      <div>
                        <Link to={`/products/${item.handle}`} className="cart-item__name">{item.name}</Link>
                        <p className="cart-item__tag">{item.tagline}</p>
                        {item.purchaseType === 'subscribe' && (
                          <span className="cart-item__badge">Subscribe &amp; Save 15%</span>
                        )}
                      </div>
                      <button
                        className="cart-item__remove"
                        onClick={() => removeItem(item.handle, item.purchaseType)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    <div className="cart-item__bottom">
                      <div className="cart-qty">
                        <button
                          className="cart-qty__btn"
                          onClick={() => updateQty(item.handle, item.purchaseType, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="cart-qty__value" aria-live="polite">{item.qty}</span>
                        <button
                          className="cart-qty__btn"
                          onClick={() => updateQty(item.handle, item.purchaseType, item.qty + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <div className="cart-item__prices">
                        <span className="cart-item__unit">{item.currencySymbol}{item.unitPrice.toFixed(2)} each</span>
                        <span className="cart-item__total">{item.currencySymbol}{lineTotal}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <button className="cart-clear" onClick={clear}>Clear cart</button>
          </div>

          <aside className="cart-summary" aria-label="Order summary">
            <h2 className="cart-summary__title">Summary</h2>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{symbol}{subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `${symbol}${shipping.toFixed(2)}`}</span>
            </div>

            {!qualifiesFreeShipping && subtotal > 0 && (
              <p className="cart-summary__note">
                Add {symbol}{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping.
              </p>
            )}

            <div className="cart-summary__divider" aria-hidden="true"></div>

            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>{symbol}{total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="cart-checkout"
              onClick={handleCheckout}
              disabled={checkoutBusy}
            >
              {checkoutBusy ? 'Preparing checkout…' : 'Checkout'}
              <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>

            {checkoutMsg && (
              <p className="cart-summary__note" role="status">{checkoutMsg}</p>
            )}

            <Link to="/shop" className="cart-summary__continue">Continue shopping</Link>

            <ul className="cart-summary__perks">
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                60-day money-back guarantee
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                Secure checkout via Stripe
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                Cancel or skip any subscription
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}

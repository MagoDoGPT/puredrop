import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../api/auth';
import * as ordersApi from '../api/orders';
import * as accountApi from '../api/account';
import './AccountPage.css';

const SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'orders', label: 'Orders', icon: 'box' },
  { id: 'subscription', label: 'Subscription', icon: 'refresh' },
  { id: 'addresses', label: 'Addresses', icon: 'pin' },
  { id: 'payment', label: 'Payment', icon: 'card' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

const NavIcon = ({ name }) => {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home':
      return <svg {...common}><path d="M3 12l9-9 9 9" /><path d="M5 10v10h14V10" /></svg>;
    case 'box':
      return <svg {...common}><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" /><path d="M3.3 7l8.7 5 8.7-5" /><path d="M12 22V12" /></svg>;
    case 'refresh':
      return <svg {...common}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>;
    case 'pin':
      return <svg {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case 'card':
      return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>;
    case 'user':
      return <svg {...common}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    default:
      return null;
  }
};

const formatDate = (iso) => {
  const [y, m, day] = iso.split('-').map(Number);
  const d = new Date(y, m - 1, day);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function AccountPage() {
  const [user, setUser] = useState(() => auth.getCurrentUser());
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [orderCount, setOrderCount] = useState(0);
  const [subStatus, setSubStatus] = useState('Active');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Pre-load count + sub status for the hero subtitle.
  useEffect(() => {
    if (!user) return;
    Promise.all([ordersApi.listOrders(), ordersApi.getSubscription()]).then(
      ([orders, sub]) => {
        setOrderCount(orders.length);
        setSubStatus(sub.status);
      },
    );
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    try {
      const u = mode === 'signin'
        ? await auth.login({ email: form.email })
        : await auth.register({ email: form.email, password: form.password, name: form.name });
      setUser(u);
    } catch (err) {
      setAuthError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleDemoLogin = async () => {
    setAuthBusy(true);
    setAuthError(null);
    try {
      setUser(await auth.loginAsDemo());
    } finally {
      setAuthBusy(false);
    }
  };

  const handleLogout = async () => {
    await auth.logout();
    setUser(null);
    setActiveSection('dashboard');
  };

  if (!user) {
    return (
      <main className="account-page">
        <section className="account-wrap">
          <div className="account-card">
            <div className="account-card__head">
              <h1 className="account-card__title">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
              <p className="account-card__subtitle">
                {mode === 'signin'
                  ? 'Sign in to manage subscriptions, track orders, and view your order history.'
                  : 'One account for orders, subscriptions, and saved preferences.'}
              </p>
            </div>

            <div className="account-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={mode === 'signin'}
                className={`account-tab ${mode === 'signin' ? 'account-tab--active' : ''}`}
                onClick={() => setMode('signin')}
              >
                Sign in
              </button>
              <button
                role="tab"
                aria-selected={mode === 'register'}
                className={`account-tab ${mode === 'register' ? 'account-tab--active' : ''}`}
                onClick={() => setMode('register')}
              >
                Create account
              </button>
            </div>

            <form className="account-form" onSubmit={handleSubmit}>
              {mode === 'register' && (
                <div className="account-field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
                </div>
              )}

              <div className="account-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
              </div>

              <div className="account-field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} />
                {mode === 'register' && <span className="account-hint">At least 8 characters.</span>}
              </div>

              {mode === 'signin' && (
                <div className="account-row">
                  <label className="account-checkbox">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="account-link">Forgot password?</a>
                </div>
              )}

              {authError && <p className="account-error" role="alert">{authError}</p>}

              <button type="submit" className="account-submit" disabled={authBusy}>
                {authBusy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <div className="account-divider"><span>or</span></div>

            <button type="button" className="account-demo" onClick={handleDemoLogin} disabled={authBusy}>
              {authBusy ? 'Loading…' : 'Preview member area with demo account'}
            </button>

            <div className="account-footer">
              {mode === 'signin' ? (
                <p>Need to check on an order? <Link to="/track-order" className="account-link">Track as guest</Link></p>
              ) : (
                <p>By creating an account you agree to our <Link to="/terms" className="account-link">Terms</Link> and <Link to="/privacy" className="account-link">Privacy Policy</Link>.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="account-page account-page--member">
      <section className="member-hero">
        <div className="member-hero__inner">
          <div>
            <span className="member-hero__eyebrow">My Account</span>
            <h1 className="member-hero__title">Hi, {user.name.split(' ')[0]} 👋</h1>
            <p className="member-hero__subtitle">
              Member since {formatDate(user.memberSince)} · {orderCount} orders · {subStatus === 'Active' ? '1 active subscription' : `Subscription ${subStatus.toLowerCase()}`}
            </p>
          </div>
          <button className="member-hero__logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </section>

      <section className="member-main">
        <div className="member-main__inner">
          <nav className="member-nav" aria-label="Account sections">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`member-nav__btn ${activeSection === s.id ? 'member-nav__btn--active' : ''}`}
                onClick={() => setActiveSection(s.id)}
                aria-current={activeSection === s.id ? 'page' : undefined}
              >
                <NavIcon name={s.icon} />
                <span>{s.label}</span>
              </button>
            ))}
          </nav>

          <div className="member-content">
            {activeSection === 'dashboard' && (
              <DashboardSection user={user} subStatus={subStatus} goTo={setActiveSection} />
            )}
            {activeSection === 'orders' && <OrdersSection />}
            {activeSection === 'subscription' && (
              <SubscriptionSection status={subStatus} setStatus={setSubStatus} />
            )}
            {activeSection === 'addresses' && <AddressesSection />}
            {activeSection === 'payment' && <PaymentSection />}
            {activeSection === 'profile' && <ProfileSection user={user} setUser={setUser} />}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ────────── Dashboard ────────── */
function DashboardSection({ user, subStatus, goTo }) {
  const [orders, setOrders] = useState([]);
  const [sub, setSub] = useState(null);

  useEffect(() => {
    Promise.all([ordersApi.listOrders(), ordersApi.getSubscription()]).then(
      ([o, s]) => { setOrders(o); setSub(s); },
    );
  }, []);

  if (!sub || orders.length === 0) {
    return <div className="member-section"><p className="member-muted">Loading…</p></div>;
  }
  const lastOrder = orders[0];

  return (
    <div className="member-section">
      <h2 className="member-section__title">Overview</h2>

      <div className="member-stats">
        <div className="member-stat">
          <span className="member-stat__label">Total orders</span>
          <span className="member-stat__value">{orders.length}</span>
          <span className="member-stat__hint">Since {formatDate(user.memberSince)}</span>
        </div>
        <div className="member-stat">
          <span className="member-stat__label">Next refill</span>
          <span className="member-stat__value">{formatDate(sub.nextDelivery)}</span>
          <span className="member-stat__hint">{sub.frequency}</span>
        </div>
        <div className="member-stat">
          <span className="member-stat__label">Saved with subscription</span>
          <span className="member-stat__value">£50.40</span>
          <span className="member-stat__hint">15% off every refill</span>
        </div>
      </div>

      <div className="member-cards">
        <div className="member-card">
          <div className="member-card__head">
            <h3 className="member-card__title">Latest order</h3>
            <button className="member-card__link" onClick={() => goTo('orders')}>View all →</button>
          </div>
          <div className="member-card__body">
            <div className="member-order-row">
              <div>
                <strong>{lastOrder.id}</strong>
                <span className="member-muted"> · {formatDate(lastOrder.date)}</span>
              </div>
              <span className={`member-status member-status--${lastOrder.status.toLowerCase().replace(' ', '-')}`}>
                {lastOrder.status}
              </span>
            </div>
            <ul className="member-order-items">
              {lastOrder.items.map((it, i) => (
                <li key={i}>{it.qty} × {it.name}</li>
              ))}
            </ul>
            <div className="member-order-footer">
              <span className="member-muted">Total</span>
              <strong>£{lastOrder.total.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div className="member-card">
          <div className="member-card__head">
            <h3 className="member-card__title">Active subscription</h3>
            <button className="member-card__link" onClick={() => goTo('subscription')}>Manage →</button>
          </div>
          <div className="member-card__body">
            <p className="member-card__lead">{sub.product}</p>
            <p className="member-muted">{sub.sku} · {sub.frequency}</p>
            <div className="member-sub-meta">
              <div>
                <span className="member-muted">Next delivery</span>
                <strong>{formatDate(sub.nextDelivery)}</strong>
              </div>
              <div>
                <span className="member-muted">Status</span>
                <span className={`member-status member-status--${subStatus.toLowerCase()}`}>{subStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────── Orders ────────── */
function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    ordersApi.listOrders().then((o) => {
      setOrders(o);
      setExpanded(o[0]?.id ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="member-section"><p className="member-muted">Loading orders…</p></div>;

  return (
    <div className="member-section">
      <h2 className="member-section__title">Order history</h2>
      <p className="member-section__lead">All your past purchases in one place. Download an invoice or reorder with one click.</p>

      <ul className="member-orders">
        {orders.map((order) => {
          const open = expanded === order.id;
          return (
            <li key={order.id} className={`member-order ${open ? 'member-order--open' : ''}`}>
              <button
                className="member-order__head"
                onClick={() => setExpanded(open ? null : order.id)}
                aria-expanded={open}
              >
                <div className="member-order__meta">
                  <strong>{order.id}</strong>
                  <span className="member-muted">{formatDate(order.date)}</span>
                </div>
                <div className="member-order__right">
                  <span className={`member-status member-status--${order.status.toLowerCase().replace(' ', '-')}`}>
                    {order.status}
                  </span>
                  <strong>£{order.total.toFixed(2)}</strong>
                  <svg className="member-order__chev" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>
              {open && (
                <div className="member-order__body">
                  <ul className="member-order__items">
                    {order.items.map((it, i) => (
                      <li key={i}>
                        <span>{it.qty} × {it.name}</span>
                        <span>£{it.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="member-order__actions">
                    <span className="member-muted">Tracking: {order.tracking}</span>
                    <div className="member-order__btns">
                      <button className="member-btn member-btn--ghost">Download invoice</button>
                      <button className="member-btn member-btn--primary">Reorder</button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ────────── Subscription ────────── */
function SubscriptionSection({ status, setStatus }) {
  const [sub, setSub] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    ordersApi.getSubscription().then(setSub);
  }, []);

  const handleSkip = async () => {
    setBusy(true);
    const { newNextDelivery } = await ordersApi.skipNextDelivery();
    setBusy(false);
    alert(`Next delivery skipped. New date: ${newNextDelivery}.`);
  };
  const handlePauseResume = async () => {
    setBusy(true);
    const updated = status === 'Active' ? await ordersApi.pauseSubscription() : await ordersApi.resumeSubscription();
    setBusy(false);
    setStatus(updated.status);
    setSub(updated);
  };
  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel? You will lose your 15% subscriber discount.')) return;
    setBusy(true);
    const updated = await ordersApi.cancelSubscription();
    setBusy(false);
    setStatus(updated.status);
    setSub(updated);
  };

  if (!sub) return <div className="member-section"><p className="member-muted">Loading subscription…</p></div>;

  return (
    <div className="member-section">
      <h2 className="member-section__title">Your subscription</h2>
      <p className="member-section__lead">Skip a delivery, pause, or cancel any time — no questions asked.</p>

      <div className="member-sub-card">
        <div className="member-sub-card__head">
          <div>
            <h3 className="member-sub-card__title">{sub.product}</h3>
            <p className="member-muted">{sub.sku}</p>
          </div>
          <span className={`member-status member-status--${status.toLowerCase()} member-status--lg`}>{status}</span>
        </div>

        <div className="member-sub-card__grid">
          <div>
            <span className="member-muted">Next delivery</span>
            <strong>{formatDate(sub.nextDelivery)}</strong>
          </div>
          <div>
            <span className="member-muted">Frequency</span>
            <strong>{sub.frequency}</strong>
          </div>
          <div>
            <span className="member-muted">Price per delivery</span>
            <strong>
              £{sub.price.toFixed(2)}
              <span className="member-sub-card__old"> £{sub.originalPrice.toFixed(2)}</span>
            </strong>
          </div>
          <div>
            <span className="member-muted">Deliveries completed</span>
            <strong>{sub.deliveriesCompleted}</strong>
          </div>
        </div>

        <div className="member-sub-card__actions">
          <button className="member-btn member-btn--ghost" onClick={handleSkip} disabled={busy || status !== 'Active'}>
            Skip next delivery
          </button>
          <button className="member-btn member-btn--ghost" onClick={handlePauseResume} disabled={busy || status === 'Cancelled'}>
            {status === 'Paused' ? 'Resume' : 'Pause'} subscription
          </button>
          <button className="member-btn member-btn--danger" onClick={handleCancel} disabled={busy || status === 'Cancelled'}>
            Cancel subscription
          </button>
        </div>
      </div>

      <div className="member-note">
        <strong>Good to know —</strong> you can change the frequency to every 1, 2, 3, or 6 months.
        Rescheduling before the 5-day cut-off is free.
      </div>
    </div>
  );
}

/* ────────── Addresses ────────── */
function AddressesSection() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    accountApi.listAddresses().then((a) => { setAddresses(a); setLoading(false); });
  }, []);

  const handleDelete = async (id) => {
    await accountApi.deleteAddress(id);
    setAddresses((a) => a.filter((ad) => ad.id !== id));
  };

  const handleSetDefault = async (id) => {
    const next = await accountApi.setDefaultAddress(id);
    setAddresses(next);
  };

  if (loading) return <div className="member-section"><p className="member-muted">Loading addresses…</p></div>;

  return (
    <div className="member-section">
      <div className="member-section__header">
        <div>
          <h2 className="member-section__title">Saved addresses</h2>
          <p className="member-section__lead">Addresses are used for shipping and your billing statements.</p>
        </div>
        <button className="member-btn member-btn--primary">+ Add address</button>
      </div>

      <div className="member-address-grid">
        {addresses.map((ad) => (
          <div key={ad.id} className={`member-address ${ad.default ? 'member-address--default' : ''}`}>
            <div className="member-address__head">
              <span className="member-address__label">{ad.label}</span>
              {ad.default && <span className="member-badge">Default</span>}
            </div>
            <address className="member-address__body">
              <strong>{ad.name}</strong>
              <span>{ad.line1}</span>
              {ad.line2 && <span>{ad.line2}</span>}
              <span>{ad.city}, {ad.postcode}</span>
              <span>{ad.country}</span>
            </address>
            <div className="member-address__actions">
              {!ad.default && (
                <button className="member-link" onClick={() => handleSetDefault(ad.id)}>Make default</button>
              )}
              <button className="member-link">Edit</button>
              <button className="member-link member-link--danger" onClick={() => handleDelete(ad.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────── Payment ────────── */
function PaymentSection() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    accountApi.listPayments().then((c) => { setCards(c); setLoading(false); });
  }, []);

  const handleDelete = async (id) => {
    await accountApi.deletePayment(id);
    setCards((c) => c.filter((card) => card.id !== id));
  };
  const handleSetDefault = async (id) => {
    const next = await accountApi.setDefaultPayment(id);
    setCards(next);
  };

  const brandIcon = (brand) => {
    if (brand === 'Visa') return <span className="member-card-brand member-card-brand--visa">VISA</span>;
    if (brand === 'Mastercard') return <span className="member-card-brand member-card-brand--mc">MC</span>;
    return <span className="member-card-brand">{brand}</span>;
  };

  if (loading) return <div className="member-section"><p className="member-muted">Loading payment methods…</p></div>;

  return (
    <div className="member-section">
      <div className="member-section__header">
        <div>
          <h2 className="member-section__title">Payment methods</h2>
          <p className="member-section__lead">All cards are stored securely by Stripe. PureDrop never sees your full card number.</p>
        </div>
        <button className="member-btn member-btn--primary">+ Add card</button>
      </div>

      <ul className="member-cards-list">
        {cards.map((card) => (
          <li key={card.id} className={`member-payment ${card.default ? 'member-payment--default' : ''}`}>
            <div className="member-payment__left">
              {brandIcon(card.brand)}
              <div>
                <strong>{card.brand} •••• {card.last4}</strong>
                <span className="member-muted">Expires {card.exp}</span>
              </div>
            </div>
            <div className="member-payment__right">
              {card.default ? (
                <span className="member-badge">Default</span>
              ) : (
                <button className="member-link" onClick={() => handleSetDefault(card.id)}>Make default</button>
              )}
              <button className="member-link member-link--danger" onClick={() => handleDelete(card.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ────────── Profile ────────── */
function ProfileSection({ user, setUser }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone });
  const [prefs, setPrefs] = useState({ newsletter: true, productUpdates: true, sms: false });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const updated = await auth.updateProfile(form);
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err.message || 'Could not save changes.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="member-section">
      <h2 className="member-section__title">Profile & preferences</h2>
      <p className="member-section__lead">Keep your details up to date — we use them for deliveries and order confirmations.</p>

      <form className="member-form" onSubmit={handleSave}>
        <div className="member-form__grid">
          <div className="account-field">
            <label htmlFor="p-name">Full name</label>
            <input id="p-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="account-field">
            <label htmlFor="p-email">Email</label>
            <input id="p-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="account-field">
            <label htmlFor="p-phone">Phone</label>
            <input id="p-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>

        <h3 className="member-form__subtitle">Email preferences</h3>
        <div className="member-prefs">
          <label className="member-pref">
            <input type="checkbox" checked={prefs.newsletter} onChange={(e) => setPrefs({ ...prefs, newsletter: e.target.checked })} />
            <span>
              <strong>Monthly newsletter</strong>
              <em>Hydration tips, product drops, and behind-the-scenes.</em>
            </span>
          </label>
          <label className="member-pref">
            <input type="checkbox" checked={prefs.productUpdates} onChange={(e) => setPrefs({ ...prefs, productUpdates: e.target.checked })} />
            <span>
              <strong>Product updates</strong>
              <em>New releases and filter-change reminders.</em>
            </span>
          </label>
          <label className="member-pref">
            <input type="checkbox" checked={prefs.sms} onChange={(e) => setPrefs({ ...prefs, sms: e.target.checked })} />
            <span>
              <strong>SMS alerts</strong>
              <em>Delivery notifications only. No marketing.</em>
            </span>
          </label>
        </div>

        <div className="member-form__actions">
          {saved && <span className="member-saved">Saved ✓</span>}
          {error && <span className="account-error" role="alert">{error}</span>}
          <button type="submit" className="member-btn member-btn--primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>

      <div className="member-danger">
        <h3>Danger zone</h3>
        <p>Closing your account is permanent. Any active subscription will be cancelled.</p>
        <button className="member-btn member-btn--danger">Close my account</button>
      </div>
    </div>
  );
}

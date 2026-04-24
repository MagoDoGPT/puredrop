import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ordersApi from '../api/orders';
import './TrackOrderPage.css';

const STAGES = [
  { id: 'ordered', label: 'Order placed' },
  { id: 'packed', label: 'Packed' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'delivered', label: 'Delivered' },
];

export default function TrackOrderPage() {
  const [form, setForm] = useState({ order: '', email: '' });
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await ordersApi.trackOrder({ orderNumber: form.order, email: form.email });
      setResult(data);
    } catch (err) {
      setError(err.message || 'Could not find that order. Check the number and email.');
      setResult(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="track-page">
      <section className="track-hero">
        <div className="track-hero__orb" aria-hidden="true"></div>
        <div className="track-hero__inner">
          <span className="track-hero__eyebrow">Track Order</span>
          <h1 className="track-hero__title">Where&apos;s your order?</h1>
          <p className="track-hero__subtitle">Enter your order number and email to see the latest status. Have an account? <Link to="/account">Sign in</Link> to see all your orders in one place.</p>
        </div>
      </section>

      <section className="track-body">
        <div className="track-body__inner">
          <form className="track-form" onSubmit={handleSubmit}>
            <div className="track-field">
              <label htmlFor="order">Order number</label>
              <input id="order" name="order" type="text" required placeholder="e.g. PD-24013" value={form.order} onChange={handleChange} />
            </div>
            <div className="track-field">
              <label htmlFor="email">Email on order</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} />
            </div>
            <button type="submit" className="track-submit" disabled={busy}>
              {busy ? 'Looking up…' : 'Track'}
            </button>
          </form>

          {error && <p className="track-error" role="alert">{error}</p>}

          {result && (
            <div className="track-result">
              <div className="track-result__head">
                <span className="track-result__label">Order</span>
                <span className="track-result__value">{result.order}</span>
                <span className="track-result__label">Carrier</span>
                <span className="track-result__value">{result.carrier}</span>
                <span className="track-result__label">Tracking #</span>
                <span className="track-result__value">{result.tracking}</span>
                <span className="track-result__label">ETA</span>
                <span className="track-result__value">{result.eta}</span>
              </div>

              <ol className="track-steps" aria-label="Delivery progress">
                {STAGES.map((s, i) => {
                  const isDone = i <= result.currentStage;
                  const isCurrent = i === result.currentStage;
                  return (
                    <li
                      key={s.id}
                      className={`track-step ${isDone ? 'track-step--done' : ''} ${isCurrent ? 'track-step--current' : ''}`}
                    >
                      <span className="track-step__dot" aria-hidden="true">
                        {isDone && (
                          <svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg>
                        )}
                      </span>
                      <span className="track-step__label">{s.label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

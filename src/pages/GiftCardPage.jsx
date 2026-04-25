import { useState, useMemo } from 'react';
import { CheckCircle2, ArrowRight, Mail, Calendar, Heart } from 'lucide-react';
import './GiftCardPage.css';

const PRESETS = [25, 50, 100, 150];
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 500;
const MAX_MESSAGE = 200;

const formatGBP = (n) => {
  if (n === '' || isNaN(n)) return '£0';
  return `£${Number(n).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export default function GiftCardPage() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [usingCustom, setUsingCustom] = useState(false);

  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const [deliveryMode, setDeliveryMode] = useState('now');
  const [deliveryDate, setDeliveryDate] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const finalAmount = useMemo(() => {
    if (usingCustom) {
      const n = Number(customAmount);
      return isNaN(n) ? 0 : n;
    }
    return amount;
  }, [usingCustom, amount, customAmount]);

  const handlePreset = (value) => {
    setUsingCustom(false);
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(v);
    setUsingCustom(true);
  };

  const validate = () => {
    const errs = {};
    if (!recipientName || recipientName.trim().length < 2) errs.recipientName = 'Recipient name is required.';
    if (!recipientEmail || !/^\S+@\S+\.\S+$/.test(recipientEmail)) errs.recipientEmail = 'A valid email is required.';
    if (!senderName || senderName.trim().length < 2) errs.senderName = 'Your name is required.';
    if (finalAmount < MIN_AMOUNT) errs.amount = `Minimum amount is £${MIN_AMOUNT}.`;
    if (finalAmount > MAX_AMOUNT) errs.amount = `Maximum amount is £${MAX_AMOUNT}.`;
    if (deliveryMode === 'scheduled' && !deliveryDate) errs.deliveryDate = 'Pick a delivery date.';
    if (deliveryMode === 'scheduled' && deliveryDate) {
      const picked = new Date(deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (picked < today) errs.deliveryDate = 'Date must be in the future.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  if (submitted) {
    return (
      <main className="giftcard-page giftcard-page--success">
        <div className="giftcard-success">
          <div className="giftcard-success__icon">
            <CheckCircle2 size={56} strokeWidth={1.5} />
          </div>
          <h1>Gift card on its way to {recipientName}.</h1>
          <p>
            {deliveryMode === 'now'
              ? `We've sent ${formatGBP(finalAmount)} of pure-water magic to ${recipientEmail}. Check your inbox for our confirmation receipt.`
              : `We'll deliver ${formatGBP(finalAmount)} to ${recipientEmail} on ${new Date(deliveryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. You'll get a confirmation by email shortly.`}
          </p>
          <div className="giftcard-success__cta">
            <button
              type="button"
              className="giftcard-btn giftcard-btn--primary"
              onClick={() => {
                setSubmitted(false);
                setAmount(50);
                setCustomAmount('');
                setUsingCustom(false);
                setRecipientName('');
                setRecipientEmail('');
                setSenderName('');
                setMessage('');
                setDeliveryMode('now');
                setDeliveryDate('');
              }}
            >
              Send another gift
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="giftcard-page">
      <header className="giftcard-hero">
        <p className="giftcard-eyebrow">Puredrop · Gift Cards</p>
        <h1 className="giftcard-title">
          Give the gift of <span>pure water</span>.
        </h1>
        <p className="giftcard-lede">
          Choose any amount, write a personal note, and we'll deliver a beautifully designed gift card straight to their inbox — instantly or on a date you pick.
        </p>
      </header>

      <section className="giftcard-layout">
        <div className="giftcard-preview-wrap">
          <div className="giftcard-card" aria-hidden="true">
            <div className="giftcard-card__shine"></div>
            <div className="giftcard-card__top">
              <span className="giftcard-card__brand">
                Puredrop<span className="giftcard-card__dot">.</span>
              </span>
              <svg
                className="giftcard-card__drop"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l6 9a6 6 0 1 1-12 0l6-9z" />
              </svg>
            </div>
            <div className="giftcard-card__amount">{formatGBP(finalAmount)}</div>
            <div className="giftcard-card__bottom">
              <div className="giftcard-card__label">
                <span>Gift Card</span>
                <small>Valid 24 months · Use across all products</small>
              </div>
              <div className="giftcard-card__recipient">
                <small>To</small>
                <span>{recipientName.trim() || 'Your recipient'}</span>
              </div>
            </div>
          </div>

          {message.trim() && (
            <div className="giftcard-message-preview">
              <Heart size={14} />
              <p>"{message.trim()}"</p>
              {senderName.trim() && <span>— {senderName}</span>}
            </div>
          )}
        </div>

        <form className="giftcard-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="giftcard-fieldset">
            <legend>1. Choose an amount</legend>
            <div className="giftcard-presets">
              {PRESETS.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`giftcard-preset ${!usingCustom && amount === value ? 'is-active' : ''}`}
                  onClick={() => handlePreset(value)}
                >
                  £{value}
                </button>
              ))}
            </div>
            <div className={`giftcard-custom ${usingCustom ? 'is-active' : ''}`}>
              <label htmlFor="custom-amount">Or set a custom amount</label>
              <div className="giftcard-custom__input">
                <span>£</span>
                <input
                  id="custom-amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="Any amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                  onFocus={() => setUsingCustom(true)}
                />
              </div>
              <small className="giftcard-helper">
                Min £{MIN_AMOUNT} · Max £{MAX_AMOUNT}
              </small>
              {errors.amount && <small className="giftcard-error">{errors.amount}</small>}
            </div>
          </fieldset>

          <fieldset className="giftcard-fieldset">
            <legend>2. Recipient</legend>
            <div className="giftcard-grid-2">
              <div className="giftcard-field">
                <label htmlFor="recipient-name">Their name</label>
                <input
                  id="recipient-name"
                  type="text"
                  placeholder="Alex Johnson"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  maxLength={60}
                />
                {errors.recipientName && <small className="giftcard-error">{errors.recipientName}</small>}
              </div>
              <div className="giftcard-field">
                <label htmlFor="recipient-email">Their email</label>
                <input
                  id="recipient-email"
                  type="email"
                  placeholder="alex@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
                {errors.recipientEmail && <small className="giftcard-error">{errors.recipientEmail}</small>}
              </div>
            </div>
          </fieldset>

          <fieldset className="giftcard-fieldset">
            <legend>3. From</legend>
            <div className="giftcard-field">
              <label htmlFor="sender-name">Your name</label>
              <input
                id="sender-name"
                type="text"
                placeholder="The name they'll see"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                maxLength={60}
              />
              {errors.senderName && <small className="giftcard-error">{errors.senderName}</small>}
            </div>
          </fieldset>

          <fieldset className="giftcard-fieldset">
            <legend>4. Delivery</legend>
            <div className="giftcard-delivery">
              <button
                type="button"
                className={`giftcard-delivery__opt ${deliveryMode === 'now' ? 'is-active' : ''}`}
                onClick={() => setDeliveryMode('now')}
              >
                <Mail size={18} />
                <div>
                  <strong>Send right away</strong>
                  <small>Arrives in their inbox in seconds</small>
                </div>
              </button>
              <button
                type="button"
                className={`giftcard-delivery__opt ${deliveryMode === 'scheduled' ? 'is-active' : ''}`}
                onClick={() => setDeliveryMode('scheduled')}
              >
                <Calendar size={18} />
                <div>
                  <strong>Schedule for later</strong>
                  <small>Pick a date — perfect for birthdays</small>
                </div>
              </button>
            </div>
            {deliveryMode === 'scheduled' && (
              <div className="giftcard-field giftcard-field--date">
                <label htmlFor="delivery-date">Delivery date</label>
                <input
                  id="delivery-date"
                  type="date"
                  min={minDate}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
                {errors.deliveryDate && <small className="giftcard-error">{errors.deliveryDate}</small>}
              </div>
            )}
          </fieldset>

          <fieldset className="giftcard-fieldset">
            <legend>5. Personal message <span className="giftcard-optional">(optional)</span></legend>
            <div className="giftcard-field">
              <textarea
                rows={4}
                placeholder="Happy birthday — here's to better mornings."
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
                maxLength={MAX_MESSAGE}
              />
              <small className="giftcard-helper giftcard-helper--right">
                {message.length} / {MAX_MESSAGE}
              </small>
            </div>
          </fieldset>

          <div className="giftcard-cta">
            <div className="giftcard-cta__summary">
              <span>Total</span>
              <strong>{formatGBP(finalAmount)}</strong>
            </div>
            <button type="submit" className="giftcard-btn giftcard-btn--primary giftcard-btn--full">
              Send Gift Card
              <ArrowRight size={18} />
            </button>
            <p className="giftcard-fineprint">
              The recipient receives a unique code by email. Codes can be redeemed at checkout, partial balances are tracked automatically, and unused balance stays valid for 24 months.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';
import './GiftCardPromo.css';

export default function GiftCardPromo() {
  return (
    <section className="giftpromo-section">
      <div className="giftpromo-inner">
        <div className="giftpromo-copy">
          <p className="giftpromo-eyebrow">
            <Gift size={14} />
            New · Gift Cards
          </p>
          <h2 className="giftpromo-heading">
            Give the gift of <span>pure water</span>.
          </h2>
          <p className="giftpromo-lede">
            Choose any amount from £25 to £500, write a personal note, and we'll deliver a beautifully designed gift card straight to their inbox — instantly or scheduled for a special date.
          </p>
          <ul className="giftpromo-bullets">
            <li>Redeemable across the full Puredrop range</li>
            <li>Delivered by email · personal message included</li>
            <li>Valid for 24 months · partial balances tracked</li>
          </ul>
          <Link to="/gift-card" className="giftpromo-cta">
            Send a Gift Card
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="giftpromo-visual" aria-hidden="true">
          <div className="giftpromo-card giftpromo-card--back">
            <div className="giftpromo-card__brand">
              Puredrop<span>.</span>
            </div>
            <div className="giftpromo-card__amount">£100</div>
            <div className="giftpromo-card__label">Gift Card</div>
          </div>
          <div className="giftpromo-card giftpromo-card--front">
            <div className="giftpromo-card__brand">
              Puredrop<span>.</span>
            </div>
            <svg
              className="giftpromo-card__drop"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l6 9a6 6 0 1 1-12 0l6-9z" />
            </svg>
            <div className="giftpromo-card__amount">£50</div>
            <div className="giftpromo-card__bottom">
              <div className="giftpromo-card__label">Gift Card</div>
              <div className="giftpromo-card__recipient">For someone special</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

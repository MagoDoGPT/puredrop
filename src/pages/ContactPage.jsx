import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as contactApi from '../api/contact';
import './ContactPage.css';

const TOPICS = ['General inquiry', 'Order support', 'Returns & refunds', 'Press & partnerships'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [ticketId, setTicketId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { ticketId: id } = await contactApi.sendContactMessage(form);
      setTicketId(id);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not send your message. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero__orb" aria-hidden="true"></div>
        <div className="contact-hero__inner">
          <span className="contact-hero__eyebrow">Contact</span>
          <h1 className="contact-hero__title">Talk to a human.</h1>
          <p className="contact-hero__subtitle">
            Our UK support team answers every message — usually within 4 working hours. For instant answers, start with <Link to="/faq">the FAQ</Link>.
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="contact-body__inner">
          <aside className="contact-aside">
            <h2 className="contact-aside__title">Other ways to reach us</h2>

            <div className="contact-channel">
              <span className="contact-channel__label">Email</span>
              <a href="mailto:hello@puredrop.co" className="contact-channel__value">hello@puredrop.co</a>
            </div>

            <div className="contact-channel">
              <span className="contact-channel__label">Support hours</span>
              <span className="contact-channel__value">Mon–Fri, 09:00–18:00 GMT</span>
            </div>

            <div className="contact-channel">
              <span className="contact-channel__label">Headquarters</span>
              <address className="contact-channel__value">
                PureDrop Ltd.<br />
                12 King Street<br />
                Manchester, M2 6AQ<br />
                United Kingdom
              </address>
            </div>

            <div className="contact-channel">
              <span className="contact-channel__label">Press</span>
              <a href="mailto:press@puredrop.co" className="contact-channel__value">press@puredrop.co</a>
            </div>
          </aside>

          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                <h2>Message received.</h2>
                <p>We&apos;ll reply to <strong>{form.email}</strong> within 4 working hours. Check your spam folder if you don&apos;t see us — some providers are overzealous.</p>
                {ticketId && <p className="contact-success__ticket">Ticket reference: <strong>{ticketId}</strong></p>}
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form__title">Send us a note</h2>

                <div className="contact-field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
                </div>

                <div className="contact-field">
                  <label htmlFor="topic">Topic</label>
                  <select id="topic" name="topic" value={form.topic} onChange={handleChange}>
                    {TOPICS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="6" required value={form.message} onChange={handleChange}></textarea>
                </div>

                {error && <p className="contact-error" role="alert">{error}</p>}

                <button type="submit" className="contact-submit" disabled={busy}>
                  {busy ? 'Sending…' : 'Send message'}
                  <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

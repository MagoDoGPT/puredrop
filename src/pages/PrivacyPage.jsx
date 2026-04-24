import LegalLayout from '../components/ui/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 April 2026">
      <h2>1. Data controller</h2>
      <p>
        PureDrop Ltd. is the data controller for personal data collected through puredrop.co. We are registered with the UK Information Commissioner&apos;s Office (ICO registration ZA842113).
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>Account details: name, email, password (hashed, never stored in plain text).</li>
        <li>Order details: address, phone, order history, subscription preferences.</li>
        <li>Payment details: processed by Stripe — we never see or store your full card number.</li>
        <li>Usage data: pages visited, device type, approximate location, essential cookies.</li>
      </ul>

      <h2>3. How we use it</h2>
      <p>
        We use your data to fulfil orders, manage subscriptions, send transactional emails, detect fraud, and improve our products. We will only send marketing emails if you opt in, and you can unsubscribe in one click from any email.
      </p>

      <h2>4. Who we share it with</h2>
      <p>
        We share the minimum data necessary with trusted processors: Stripe (payments), Royal Mail and DPD (delivery), Postmark (transactional email), and Cloudflare (hosting and DDoS protection). All processors are bound by data-processing agreements.
      </p>
      <p>
        We will never sell your data. We will only share it with law enforcement when legally compelled.
      </p>

      <h2>5. Your rights</h2>
      <ul>
        <li>Access: request a copy of the data we hold on you.</li>
        <li>Rectification: correct anything that&apos;s wrong.</li>
        <li>Erasure: ask us to delete your account and associated data.</li>
        <li>Portability: receive your data in a machine-readable format.</li>
        <li>Objection: opt out of marketing at any time.</li>
      </ul>
      <p>
        To exercise any of these rights, email <a href="mailto:privacy@puredrop.co">privacy@puredrop.co</a>. We reply within 30 days.
      </p>

      <h2>6. Cookies</h2>
      <p>
        We use strictly necessary cookies for cart and session management, and optional analytics cookies only if you accept them via the consent banner. You can change your preferences any time through the banner.
      </p>

      <h2>7. Retention</h2>
      <p>
        We retain order records for 7 years to satisfy tax and consumer-protection obligations. Marketing data is deleted within 30 days of unsubscribe. Inactive accounts are deleted after 3 years of inactivity.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions? Email <a href="mailto:privacy@puredrop.co">privacy@puredrop.co</a>. You also have the right to complain to the ICO at <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a>.
      </p>
    </LegalLayout>
  );
}

import styles from '../legal.module.css';

export const metadata = {
  title: 'Privacy Policy | Invent Elevator',
  description: 'Learn how Invent Elevator collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroMeta}>Last updated: June 2026</p>
        </div>
      </div>
      <div className={styles.content}>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Introduction</h2>
          <p className={styles.para}>Invent Elevator LLC ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or engage with our services across the UAE.</p>
          <p className={styles.para}>By using our website or services, you agree to the collection and use of information in accordance with this policy.</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Information We Collect</h2>
          <p className={styles.para}>We may collect the following categories of personal information:</p>
          <ul className={styles.list}>
            <li>Contact details — name, email address, phone number, and company name submitted through enquiry or contact forms.</li>
            <li>Project information — details about your property, requirements, and specifications you share during consultation.</li>
            <li>Usage data — pages visited, time spent, browser type, and IP address collected automatically through analytics.</li>
            <li>Communication records — emails, messages, and notes related to your enquiry or project.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
          <ul className={styles.list}>
            <li>Respond to enquiries and provide quotes for elevator installations and maintenance.</li>
            <li>Manage your project from consultation through to delivery and after-sales support.</li>
            <li>Send relevant updates about your project or our services (you may opt out at any time).</li>
            <li>Improve our website and services based on aggregated analytics.</li>
            <li>Comply with legal obligations under UAE law.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Sharing</h2>
          <p className={styles.para}>We do not sell or rent your personal data. We may share information with trusted third parties — such as installation contractors and technology providers — under strict confidentiality agreements. We may also disclose information where required by UAE law or regulatory authority.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Data Retention</h2>
          <p className={styles.para}>We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Project records are typically retained for seven years in line with UAE commercial regulations.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Rights</h2>
          <ul className={styles.list}>
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your data, subject to legal retention requirements.</li>
            <li>Withdraw consent for marketing communications at any time.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <div className={styles.contactBox}>
            <p><strong>Invent Elevator LLC</strong></p>
            <p>Email: <a href="mailto:info@inventelevator.com">info@inventelevator.com</a></p>
            <p>Phone: +971-58-5723553</p>
            <p>Dubai, UAE</p>
          </div>
        </div>

      </div>
    </div>
  );
}

import './Privacy.css';

function Privacy() {
  return (
    <>
      <div className="privacy-container">
        <section className="privacy-section">
            <h1>Privacy Policy</h1>
            <p>
            At Project Vault, we take your privacy seriously and are committed to
            protecting your personal information. This Privacy Policy outlines how we collect,
            use, and safeguard your data when you use our services.
            </p>
        </section>

        <section className="information-collect-section">
            <h2>Information We Collect</h2>
            <p>
            We collect the following types of information:
            </p>
            <ul>
            <li>Personal information (e.g., name, email address) provided during account registration.</li>
            <li>Transaction and payment data when you purchase or sell projects.</li>
            <li>Information collected automatically through cookies and similar technologies.</li>
            </ul>
        </section>

        <section className="use-of-information-section">
            <h2>Use of Information</h2>
            <p>
            We use your information for the following purposes:
            </p>
            <ul>
            <li>To provide and improve our services, including processing transactions.</li>
            <li>To personalize your experience and communicate with you about our platform.</li>
            <li>To ensure the security and integrity of our platform.</li>
            <li>To comply with legal obligations and enforce our policies.</li>
            </ul>
        </section>

        <section className="data-sharing-section">
            <h2>Data Sharing</h2>
            <p>
            We may share your information with third parties in the following circumstances:
            </p>
            <ul>
            <li>With service providers who assist us in delivering our services.</li>
            <li>When required by law or to protect our rights and safety.</li>
            <li>With your consent or as otherwise disclosed to you.</li>
            </ul>
        </section>

        <section className="data-retention-section">
            <h2>Data Retention</h2>
            <p>
            We retain your information only for as long as necessary for the purposes outlined
            in this Privacy Policy or as required by law. You may request deletion of your account
            and associated data at any time.
            </p>
        </section>

        <section className="user-rights-section">
            <h2>Your Rights</h2>
            <p>
            You have the following rights regarding your personal information:
            </p>
            <ul>
            <li>Access and review your data stored on our platform.</li>
            <li>Request corrections or updates to your information.</li>
            <li>Object to the processing of your data under certain circumstances.</li>
            <li>Request deletion of your account and associated data.</li>
            </ul>
        </section>

        <section className="contact-section">
            <h2>Contact Us</h2>
            <p>
            If you have any questions or concerns about our Privacy Policy or data practices,
            please contact us.
            </p>
        </section>
        <button className="cta-button">Contact Us</button>
        </div>
    </>
  );
}

export default Privacy;
import './TermsAndCondition.css';

function TermsAndCondition() {
  return (
    <>
      <div className="terms-container">
      <section className="terms-section">
        <h1>Terms & Conditions</h1>
        <p>
          By using this website, you agree to comply with and be bound by the following terms
          and conditions of use. Please read these terms carefully before using our platform.
        </p>
      </section>

      <section className="use-of-platform-section">
        <h2>Use of Platform</h2>
        <p>
          The use of this website is subject to the following terms:
        </p>
        <ul>
          <li>You must be at least 18 years old to use our services.</li>
          <li>You agree to provide accurate and truthful information during account registration.</li>
          <li>You are responsible for maintaining the security of your account credentials.</li>
          <li>You agree not to engage in any unlawful or unauthorized activities on our platform.</li>
        </ul>
      </section>

      <section className="intellectual-property-section">
        <h2>Intellectual Property</h2>
        <p>
          All content and materials available on this website, including projects, research papers,
          and website design, are owned or licensed by us and protected by intellectual property laws.
        </p>
      </section>

      <section className="user-generated-content-section">
        <h2>User-Generated Content</h2>
        <p>
          By uploading projects or content to our platform, you grant us a non-exclusive,
          royalty-free license to use, reproduce, and distribute the content for promotional
          and operational purposes.
        </p>
      </section>

      <section className="pricing-and-sales-section">
        <h2>Pricing and Sales</h2>
        <p>
          Sellers set their own prices for projects and agree to receive 84.4% commission on
          each sale. Buyers agree to purchase projects for personal and educational use only.
        </p>
      </section>

      <section className="disclaimer-section">
        <h2>Disclaimer</h2>
        <p>
          We do not guarantee the accuracy, completeness, or usefulness of any content or
          information provided on our platform. Users rely on the content at their own risk.
        </p>
      </section>

      <section className="termination-section">
        <h2>Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account and access to our platform
          without prior notice for any reason, including violation of these terms and conditions.
        </p>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about our terms and conditions, please contact
          us.
        </p>
      </section>
      <button className="cta-button">Contact Us</button>
    </div>
    </>
  );
}

export default TermsAndCondition;

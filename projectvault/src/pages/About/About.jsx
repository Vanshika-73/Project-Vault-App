import './About.css';
import { useAuth0 } from "@auth0/auth0-react";

function About() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <div className="about-container">
      <section className="about-section">
        <h1>Welcome to Our Academic Projects Marketplace!</h1>
        <p>
        Welcome to our academic projects marketplace, where students, researchers, and educators converge to exchange innovative ideas and scholarly works. Our platform serves as a hub for knowledge dissemination, enabling creators to showcase their academic projects encompassing a wide array of disciplines—from computer science and engineering to social sciences and humanities. Whether you're seeking inspiration for your next research endeavor, looking to share your groundbreaking findings, or simply interested in exploring cutting-edge academic work, our marketplace offers a curated collection of projects, research papers, theses, and dissertations. Join our community to collaborate, discover, and contribute to the advancement of academic excellence.
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
        Our goal is to help people share and learn by providing a carefully chosen selection of academic projects and research papers. We want to empower students, researchers, and teachers around the world by offering a diverse collection of scholarly works covering different subjects and topics. Whether you're a student looking for ideas, a researcher wanting to share discoveries, or a teacher seeking resources for education, our platform is here to support you. Join us in our mission to expand knowledge and promote collaborative learning in the academic community.
        </p>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>Buy and download high-quality academic projects and research papers.</li>
          <li>Upload your own projects and set your desired price.</li>
          <li>Earn 84.4% commission on each sale of your project.</li>
          <li>Explore a variety of disciplines and topics.</li>
          <li>Secure and easy-to-use platform.</li>
        </ul>
      </section>

      <section className="benefits-section">
        <h2>Benefits of Using Our Marketplace</h2>
        <ul>
          <li>Access a diverse collection of academic projects and papers.</li>
          <li>Monetize your academic work by selling your projects to a global audience.</li>
          <li>Support academic collaboration and knowledge sharing.</li>
          <li>Gain recognition for your research and academic achievements.</li>
          <li>Contribute to the academic community.</li>
        </ul>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <ol>
          <li>Sign up or log in to your account.</li>
          <li>Browse projects or upload your own.</li>
          <li>Set prices for your projects and start earning.</li>
          <li>Download purchased projects instantly.</li>
        </ol>
      </section>
      <div className='free-services-div'>
        <div className='left-line'><p>l</p></div>
        <section className="how-it-works-section">
          <h2>We are currently offering our services for free!</h2>
          <ol>
            <li>While we typically operate as a marketplace for paid academic projects,</li>
            <li>we have decided to offer all projects free of charge for an initial period.</li>
            <li>This allows people to freely explore and experience our projects.</li>
          </ol>
        </section>
      </div>
      

      <section className="join-us-section">
        <h2>Join Us Today!</h2>
        <p>
          Whether you're a student, researcher, or enthusiast, our marketplace welcomes you to
          explore, learn, and share knowledge. Sign up now and start discovering a world of
          academic projects!
        </p>
        { !isAuthenticated && <button className="cta-button">Sign Up</button>}
      </section>
    </div>
    </>
  );
}

export default About;

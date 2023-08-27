import "../heroSection.css";
import hero from "../assets/hero.png";
const HeroSection = () => {
  return (
    <div className="container w-full px-10">
      <div className="content ">
        <h1>Austrailia's top Designer's & Dev's Ready to Freelance.</h1>
        <p>
          Upspot connects you directly to local tech experts from top Austrailia
          companies.
        </p>
        <a href="#" className="cta-button">
          Get Started
        </a>
      </div>

      <div className="image">
        <img src={hero} alt="Landing Image" />
      </div>
    </div>
  );
};

export default HeroSection;

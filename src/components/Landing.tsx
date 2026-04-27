import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              TUSHAR
              <br />
              <span>BHATT</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Full Stack Developer &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Web </div>
              <div className="landing-h2-2">App</div>
            </h2>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Landing;

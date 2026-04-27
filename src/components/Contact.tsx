import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/tusharbhatt24/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — tusharbhatt24
              </a>
            </p>
            <p>
              <a
                href="mailto:bhatttushar2006@gmail.com"
                data-cursor="disable"
              >
                Gmail — bhatttushar2006@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.Tech in Computer Science and Engineering, AKTU — 2024–2028
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/tusharbhatt-24"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/tusharbhatt24/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>

            <a
              href="https://www.instagram.com/tushar__bhatt/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
            <a
              href="mailto:bhatttushar2006@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Gmail <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Tushar Bhatt</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

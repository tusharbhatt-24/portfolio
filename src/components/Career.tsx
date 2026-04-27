import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const careerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".career-section",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      careerTimeline
        .fromTo(".career-timeline", { maxHeight: "0%" }, { maxHeight: "100%", duration: 1 }, 0)
        .fromTo(".career-timeline", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)
        .fromTo(".career-info-box", { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: 0.3, duration: 1 }, 0.2)
        .fromTo(".career-dot", { scale: 0 }, { scale: 1, duration: 0.3 }, 0);
        
      if (window.innerWidth > 1024) {
        careerTimeline.to(".career-section", { y: "15%", duration: 1 }, 0);
      }
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Work <span></span>
          <br />
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>RetirePRO</h4>
                <h5>Not published yet</h5>
              </div>
              <h3>MAR 2026 - PRESENT</h3>
            </div>
            <p>
              Building RetirePRO, a platform for retired profesionals 
              Companies can hire them for their projects on part-time or full-time basis.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>ISLBridge</h4>
                <h5>Not published yet</h5>
              </div>
              <h3>FEB 2026 - PRESENT</h3>
            </div>
            <p>
              Building ISLBridge, a real time indian sign language translator 
              which tracks hand movement and rephrase it in text or voice.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BotForge</h4>
                <h5>ChatBot builder</h5>
              </div>
              <h3>MAR 2026</h3>
            </div>
            <p>
              Build BotForge, a platform for building chatbot 
              which only reads frontend (means no data theft insecurity)
              only reads frontend and files and understands it and form itself only for that website.

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

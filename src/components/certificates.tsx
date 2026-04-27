import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTrophy, FaBriefcase, FaBook, FaChevronDown, FaXmark } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Certificates.css";

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  icon: JSX.Element;
  items: Certificate[];
}

const certificateData: Category[] = [
  {
    id: "hackathons",
    name: "HACKATHONS",
    icon: <FaTrophy />,
    items: [
      { id: 1, title: "VOYAGER BLITZ", issuer: "HACKERRANK", date: "2026.04.12", image: `${import.meta.env.BASE_URL}certificates/hackathon/HackerRank.jpeg` },
      { id: 2, title: "HACKINDIA SPARK 4", issuer: "UNSTOP", date: "2026.03.20", image: `${import.meta.env.BASE_URL}certificates/hackathon/HackIndia1.jpeg` },
    ],
  },
  {
    id: "internships",
    name: "INTERNSHIPS",
    icon: <FaBriefcase />,
    items: [
      { id: 3, title: "SYSTEM_NULL", issuer: "PENDING_VERIFICATION", date: "0000.00.00", image: "" },
    ],
  },
  {
    id: "skill-development",
    name: "SKILL_DEVELOPMENT",
    icon: <FaBook />,
    items: [
      { id: 5, title: "AI-ML ARCHITECTURE", issuer: "EVENTDEVX", date: "2026.01.15", image: `${import.meta.env.BASE_URL}certificates/skill development/AI-ML.jpeg` },
      { id: 6, title: "NEURAL_INTERFACE_WORKSHOP", issuer: "BE10X", date: "2026.02.10", image: `${import.meta.env.BASE_URL}certificates/skill development/Be10x.jpeg` },
      { id: 7, title: "GENAI_PROTOCOL_WEBINAR", issuer: "IEEE EDS MAIT", date: "2026.02.28", image: `${import.meta.env.BASE_URL}certificates/skill development/IEEE_EDS.jpeg` },
    ],
  },
];

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleCategory = (id: string) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  useEffect(() => {
    Object.keys(contentRefs.current).forEach((key) => {
      const el = contentRefs.current[key];
      if (el) {
        if (activeCategory === key) {
          gsap.to(el, { height: "auto", opacity: 1, duration: 0.6, ease: "expo.out" });
        } else {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: "expo.in" });
        }
      }
    });
  }, [activeCategory]);

  return (
    <section className="certificates-section" id="certificates">
      <div className="technical-grid-overlay"></div>
      <div className="certificates-header">
        <div className="system-status">
          <span className="blink-dot"></span> SYSTEM_ACTIVE // NEURAL_ARCHIVE
        </div>
        <h2 className="title">
          CERT<span className="cyan-text">IFICATES</span>
        </h2>
        <p className="subtitle">AUTHENTICATED_ACHIEVEMENTS // [READ_ONLY_ACCESS]</p>
      </div>

      <div className="accordion-container">
        {certificateData.map((category) => (
          <div
            key={category.id}
            className={`accordion-item ${activeCategory === category.id ? "active" : ""}`}
          >
            <button
              className="accordion-header"
              onClick={() => toggleCategory(category.id)}
              data-cursor="expand"
            >
              <div className="header-left">
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
                <span className="item-count">[{category.items.length}]</span>
              </div>
              <div className="header-right">
                <span className="technical-code">0x{category.id.substring(0, 4)}</span>
                <FaChevronDown className="chevron" />
              </div>
            </button>

            <div
              className="accordion-content"
              ref={(el) => (contentRefs.current[category.id] = el)}
              style={{ height: 0, opacity: 0, overflow: "hidden" }}
            >
              <div className="certificates-grid">
                {category.items.map((cert) => (
                  <div
                    key={cert.id}
                    className="cert-card"
                    onClick={() => setSelectedCert(cert)}
                    data-cursor="view"
                  >
                    <div className="technical-notch"></div>
                    <div className="cert-thumbnail">
                      <img src={cert.image} alt={cert.title} />
                      <div className="cert-overlay">
                        <span>SCAN_CERTIFICATE</span>
                      </div>
                    </div>
                    <div className="cert-details">
                      <div className="cert-metadata">
                        <span className="cert-serial">COUNT-{[...category.items].reverse().indexOf(cert) + 1}</span>
                        <span className="cert-date">{cert.date}</span>
                      </div>
                      <h3>{cert.title}</h3>
                      <p className="issuer-tag">ISSUER: {cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCert && createPortal(
        <div className="cert-modal" onClick={() => setSelectedCert(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10000 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-technical-border"></div>
            <button className="close-modal" onClick={() => setSelectedCert(null)}>
              <FaXmark />
            </button>
            <div className="modal-image">
              <img src={selectedCert.image} alt={selectedCert.title} />
            </div>
            <div className="modal-info">
              <span className="modal-id">FRAGMENT_ID: {selectedCert.id}</span>
              <h2>{selectedCert.title}</h2>
              <p className="modal-meta">ISSUER_PROTOCOL: {selectedCert.issuer} // TIMESTAMP: {selectedCert.date}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Certificates;

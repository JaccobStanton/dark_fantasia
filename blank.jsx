import { useEffect, useRef, useState } from "react";
import albumCover1 from "../assets/ghost_town.webp";
import albumCover2 from "../assets/august_moon.webp";
import recordImage from "../assets/record.png";
import "./Music.css";

function Music() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="music-section" id="music" ref={sectionRef}>
      <div className="music-inner">
        <div className={`album-stage ${isVisible ? "is-visible" : ""}`}>
          <img className="record-image" src={recordImage} alt="Vinyl record" />
          <img
            className="album-cover-image"
            src={albumCover1}
            alt="Album cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Music;

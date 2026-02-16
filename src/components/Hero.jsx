import "./Hero.css";
import videoClip from "../assets/video.mov";

function Hero() {
  return (
    <main className="hero">
      <div className="hero-overlay" />

      <section className="hero-bottom">
        <article className="bottom-news">
          <a className="eyebrow eyebrow-link" href="#news">
            WHAT TO EXPECT ON THE DARK FANTASIA TOUR
          </a>
          <p className="meta">
            <span>NEWS</span>
            <span>10/4/2025</span>
          </p>
        </article>

        <article className="bottom-quote">
          <p>"Masterpieces that shake the soul and ignite the spirit."</p>
          <p className="meta">
            <span>METAL MAGAZINE</span>
            <span>12/05/2025</span>
          </p>
        </article>

        <article className="bottom-video" aria-label="Featured video">
          <div className="video-preview">
            <video
              className="video-preview-media"
              src={videoClip}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <p className="meta">
            <span className="video-meta-label">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 6.5a1 1 0 0 1 1.52-.86l8.5 5.5a1 1 0 0 1 0 1.72l-8.5 5.5A1 1 0 0 1 8 17.5v-11Z" />
              </svg>
              VIDEO
            </span>
            <span>GHOST TOWN</span>
          </p>
        </article>
      </section>
    </main>
  );
}

export default Hero;

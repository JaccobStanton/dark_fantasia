import { useEffect, useRef, useState } from "react";
import albumCover from "../assets/ghost_town.webp";
import albumCoverTwo from "../assets/august_moon.webp";
import recordImage from "../assets/record.png";
import "./Music.css";

function Music() {
  const sectionRef = useRef(null);
  const holdTimeoutRef = useRef(null);
  const holdUntilRef = useRef(0);
  const [cursorCta, setCursorCta] = useState({ active: false, x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [titleDimmed, setTitleDimmed] = useState(false);
  const [showAlbumOneCaption, setShowAlbumOneCaption] = useState(false);
  const [showAlbumTwoCaption, setShowAlbumTwoCaption] = useState(false);

  const titleDimStart = 0.34;

  const albumOneStart = 0.18;
  const albumOneCenter = 0.42;
  const albumOneVinylStart = 0.46;
  const albumOneVinylEnd = 0.58;
  const albumOneExitStart = albumOneVinylEnd;
  const albumOneExitEnd = 0.76;

  const albumTwoStart = 0.72;
  const albumTwoCenter = 0.86;
  const albumTwoVinylStart = 0.89;
  const albumTwoVinylEnd = 0.96;

  const rangeProgress = (value, start, end) =>
    Math.min(1, Math.max(0, (value - start) / (end - start)));

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      const start = sectionTop - viewportHeight * 0.82;
      const rawEnd = sectionTop + sectionHeight - viewportHeight * 0.18;
      const end = Math.min(rawEnd, maxScroll);
      const distance = Math.max(1, end - start);
      const next = Math.min(1, Math.max(0, (scrollY - start) / distance));
      setProgress(next);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const shouldHold = () => Date.now() < holdUntilRef.current;

    const onWheel = (event) => {
      if (shouldHold()) event.preventDefault();
    };

    const onTouchMove = (event) => {
      if (shouldHold()) event.preventDefault();
    };

    const onKeyDown = (event) => {
      if (!shouldHold()) return;
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Space",
        "Home",
        "End",
      ];
      if (keys.includes(event.code) || keys.includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const holdViewForAnimation = (duration = 900) => {
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current);
    }
    holdUntilRef.current = Date.now() + duration;

    holdTimeoutRef.current = window.setTimeout(() => {
      holdUntilRef.current = 0;
      holdTimeoutRef.current = null;
    }, duration);
  };

  useEffect(() => {
    if (progress >= titleDimStart && !titleDimmed) {
      setTitleDimmed(true);
    }
  }, [progress, titleDimStart, titleDimmed]);

  const albumOneEntry = rangeProgress(progress, albumOneStart, albumOneCenter);
  const albumOneVinyl = rangeProgress(progress, albumOneVinylStart, albumOneVinylEnd);
  const albumOneExit = rangeProgress(progress, albumOneExitStart, albumOneExitEnd);

  const albumTwoEntry = rangeProgress(progress, albumTwoStart, albumTwoCenter);
  const albumTwoVinyl = rangeProgress(progress, albumTwoVinylStart, albumTwoVinylEnd);

  const showAlbumOne = progress > albumOneStart && progress < 1;
  const showAlbumTwo = progress > albumTwoStart;

  const albumOneStageTranslateY = (1 - albumOneEntry) * 120 - albumOneExit * 170;
  const albumOneStageScale = 0.72 + albumOneEntry * 0.28;
  const albumOneStageOpacity = 0.18 + albumOneEntry * 0.82;
  const albumOneRecordTranslate = -7 + albumOneVinyl * 46;
  const albumOneRecordRotate = -2 + albumOneVinyl * 8;

  const albumTwoStageTranslateY = (1 - albumTwoEntry) * 120;
  const albumTwoStageScale = 0.72 + albumTwoEntry * 0.28;
  const albumTwoStageOpacity = 0.18 + albumTwoEntry * 0.82;
  const albumTwoRecordTranslate = -7 + albumTwoVinyl * 46;
  const albumTwoRecordRotate = -2 + albumTwoVinyl * 8;

  useEffect(() => {
    if (albumOneEntry >= 0.995 && !showAlbumOneCaption) {
      const timer = window.setTimeout(() => {
        setShowAlbumOneCaption(true);
      }, 180);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [albumOneEntry, showAlbumOneCaption]);

  useEffect(() => {
    if (albumTwoEntry >= 0.995 && !showAlbumTwoCaption) {
      const timer = window.setTimeout(() => {
        setShowAlbumTwoCaption(true);
      }, 180);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [albumTwoEntry, showAlbumTwoCaption]);

  useEffect(() => {
    if (showAlbumOneCaption) {
      holdViewForAnimation(950);
    }
  }, [showAlbumOneCaption]);

  useEffect(() => {
    if (showAlbumTwoCaption) {
      holdViewForAnimation(1100);
    }
  }, [showAlbumTwoCaption]);

  useEffect(
    () => () => {
      if (holdTimeoutRef.current) {
        window.clearTimeout(holdTimeoutRef.current);
      }
      holdUntilRef.current = 0;
    },
    [],
  );

  const showCursorCta = (event) => {
    setCursorCta({
      active: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const moveCursorCta = (event) => {
    setCursorCta((prev) =>
      prev.active
        ? {
            ...prev,
            x: event.clientX,
            y: event.clientY,
          }
        : prev,
    );
  };

  const hideCursorCta = () => {
    setCursorCta((prev) => ({ ...prev, active: false }));
  };

  return (
    <section className="music-section" id="music" ref={sectionRef}>
      <div className="music-sticky">
        <aside className="music-rail" aria-hidden="true">
          <p className="music-featured">FEATURED</p>
          <div className="music-progress-track">
            <div
              className="music-progress-fill"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>
        </aside>

        <div className="music-title-wrap">
          <h2
            className={`music-title ${titleDimmed ? "is-dimmed" : ""}`}
            style={{ opacity: titleDimmed ? 0.08 : 1 }}
          >
            MUSIC
          </h2>

          {showAlbumOne ? (
            <div
              className="music-album-stage"
              onMouseEnter={showCursorCta}
              onMouseMove={moveCursorCta}
              onMouseLeave={hideCursorCta}
              style={{
                transform: `translate(-50%, -50%) translateY(${albumOneStageTranslateY}%) scale(${albumOneStageScale})`,
                opacity: albumOneStageOpacity,
              }}
            >
              <img
                className="music-record-image"
                src={recordImage}
                alt="Vinyl record"
                style={{
                  transform: `translate(-50%, -50%) translateX(${albumOneRecordTranslate}%) rotate(${albumOneRecordRotate}deg)`,
                }}
              />
              <div className="music-album-mask" />
              <img className="music-album-cover" src={albumCover} alt="Album cover" />
              <p
                className={`music-album-caption ${showAlbumOneCaption ? "is-visible" : ""}`}
              >
                Ghost Town
              </p>
            </div>
          ) : null}

          {showAlbumTwo ? (
            <div
              className="music-album-stage stage-two"
              onMouseEnter={showCursorCta}
              onMouseMove={moveCursorCta}
              onMouseLeave={hideCursorCta}
              style={{
                transform: `translate(-50%, -50%) translateY(${albumTwoStageTranslateY}%) scale(${albumTwoStageScale})`,
                opacity: albumTwoStageOpacity,
              }}
            >
              <img
                className="music-record-image"
                src={recordImage}
                alt="Vinyl record"
                style={{
                  transform: `translate(-50%, -50%) translateX(${albumTwoRecordTranslate}%) rotate(${albumTwoRecordRotate}deg)`,
                }}
              />
              <div className="music-album-mask" />
              <img
                className="music-album-cover music-album-cover-two"
                src={albumCoverTwo}
                alt="Album cover"
              />
              <p
                className={`music-album-caption ${showAlbumTwoCaption ? "is-visible" : ""}`}
              >
                August Moon
              </p>
            </div>
          ) : null}

          <div
            className={`music-cursor-cta ${cursorCta.active ? "is-visible" : ""}`}
            style={{ left: `${cursorCta.x}px`, top: `${cursorCta.y}px` }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 160 160">
              <defs>
                <path
                  id="music-cursor-ring-text"
                  d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
                />
              </defs>
              <path
                className="music-cursor-ring"
                fillRule="evenodd"
                d="M80 10 A70 70 0 1 1 79.99 10 Z M80 34 A46 46 0 1 0 80 126 A46 46 0 1 0 80 34 Z"
              />
              <text>
                <textPath
                  href="#music-cursor-ring-text"
                  textLength="364"
                  lengthAdjust="spacingAndGlyphs"
                >
                  VIEW MORE DETAILS • VIEW MORE DETAILS • VIEW MORE DETAILS •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Music;

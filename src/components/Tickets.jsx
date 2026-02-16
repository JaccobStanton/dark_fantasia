import { useEffect, useRef } from "react";
import "./Tickets.css";

const events = [
  {
    date: "April 7, 2026",
    venue: "The Pageant",
    location: "6161 Delmar Blvd, St. Louis, MO 63112",
  },
  {
    date: "June 18, 2026",
    venue: "Delmar Hall",
    location: "6133 Delmar Blvd, St. Louis, MO 63112",
  },
  {
    date: "August 13, 2026",
    venue: "Off Broadway",
    location: "3509 Lemp Ave, St. Louis, MO 63118",
  },
  {
    date: "September 3, 2026",
    venue: "The Factory",
    location: "17105 N Outer 40 Rd, Chesterfield, MO 63005",
  },
  {
    date: "September 9, 2026",
    venue: "Hollywood Casino Amphitheatre",
    location: "14141 Riverport Dr S, Maryland Heights, MO 63043",
  },
  {
    date: "January 6, 2027",
    venue: "Stifel Theatre",
    location: "1400 Market St, St. Louis, MO 63103",
  },
];

function Tickets() {
  const titleRef = useRef(null);
  const rowRefs = useRef([]);
  const moreBtnRef = useRef(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    const rows = rowRefs.current.filter(Boolean);
    const moreBtnEl = moreBtnRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    if (titleEl) io.observe(titleEl);
    rows.forEach((row) => io.observe(row));
    if (moreBtnEl) io.observe(moreBtnEl);

    return () => io.disconnect();
  }, []);

  return (
    <section
      className="tickets-section"
      id="events"
      aria-label="Upcoming events"
    >
      <div className="tickets-inner">
        <h2 ref={titleRef} className="tickets-title">
          UPCOMING EVENTS
        </h2>

        <div className="tickets-table" role="table" aria-label="Tour dates">
          {events.map((event, i) => (
            <article
              key={`${event.date}-${event.venue}`}
              role="row"
              className="ticket-row"
              ref={(el) => (rowRefs.current[i] = el)}
              style={{ "--delay": `${i * 90}ms` }}
            >
              <div className="ticket-col ticket-col-main" role="cell">
                <p className="ticket-date">{event.date}</p>
                <p className="ticket-venue">{event.venue}</p>
              </div>

              <p className="ticket-col ticket-location" role="cell">
                {event.location}
              </p>

              <div className="ticket-col ticket-cta-wrap" role="cell">
                <button className="ticket-btn" type="button">
                  Tickets
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="tickets-more-wrap">
          <button ref={moreBtnRef} className="tickets-more-btn" type="button">
            MORE EVENTS
          </button>
        </div>
      </div>
    </section>
  );
}

export default Tickets;

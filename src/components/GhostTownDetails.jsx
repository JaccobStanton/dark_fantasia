import AlbumDetailsLayout from "./AlbumDetailsLayout";
import albumCover from "../assets/ghost_town.webp";

function GhostTownDetails() {
  return (
    <AlbumDetailsLayout
      albumCover={albumCover}
      albumAlt="Ghost Town album cover"
      description="Ghost Town is a bone-crushing fusion of metal and indie rock, delivering a soundscape that teeters on the edge of chaos and beauty. From the very first note, the song engulfs listeners in a storm of thunderous riffs, eerie melodies, and hauntingly poetic lyrics."
      format="LP"
      releaseDate="11.21.2022"
      musicians="John Nuckols • Ramiro Gamarra • Lulu de la Rosa "
      availability="Vinyl, CD, Streaming"
      label="Portal to the Abyss Records"
      listenUrl="https://www.youtube.com/watch?v=1GFA6yms2KA"
    />
  );
}

export default GhostTownDetails;

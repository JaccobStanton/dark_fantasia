import AlbumDetailsLayout from "./AlbumDetailsLayout";
import albumCover from "../assets/august_moon.webp";

function AugustMoonDetails() {
  return (
    <AlbumDetailsLayout
      albumCover={albumCover}
      albumAlt="August Moon album cover"
      description="August Moon surges with cinematic heaviness and razor-sharp hooks, balancing melancholic textures with relentless rhythm. The song escalates from intimate tension into towering choruses, creating a song built for dark stages and loud nights."
      format="LP"
      releaseDate="8.28.2020"
      musicians="John Nuckols"
      availability="Vinyl, CD, Streaming"
      label="Portal to the Abyss Records"
      listenUrl="https://www.youtube.com/watch?v=1GFA6yms2KA"
    />
  );
}

export default AugustMoonDetails;

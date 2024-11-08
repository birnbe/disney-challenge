import { useParams } from "react-router-dom";
import { useDisneyCharacter } from "./contexts/DisneyCharacterContext";
import SearchHeader from "./components/SearchHeader";
import FeaturedCharacters from "./components/FeaturedCharacters";
import CharacterDetailCard from "./components/CharacterDetailCard";
import Footer from "./components/Footer";

const CharacterDetail = (): JSX.Element => {
  const { charId } = useParams();
  const { getCharacterById } = useDisneyCharacter();
  const characterDetails = getCharacterById(Number(charId));

  return (
    <>
      <SearchHeader />
      {characterDetails !== undefined ? (
        <CharacterDetailCard {...characterDetails} />
      ) : (
        <h1 className="text-center my-4">
          The character id {charId} hasn't been loaded
        </h1>
      )}
      <FeaturedCharacters />
      <Footer />
    </>
  );
};

export default CharacterDetail;

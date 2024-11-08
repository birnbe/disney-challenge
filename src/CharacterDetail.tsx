import { useParams } from "react-router-dom";
import { useDisneyCharacter } from "./contexts/DisneyCharacterContext";
import CharacterDetailCard from "./components/CharacterDetailCard";

const CharacterDetail = (): JSX.Element => {
  const { charId } = useParams();
  const { getCharacterById } = useDisneyCharacter();
  const characterDetails = getCharacterById(Number(charId));

  return (
    <>
      {characterDetails !== undefined ? (
        <CharacterDetailCard {...characterDetails} />
      ) : (
        <h1 className="text-center my-4">
          The character id {charId} hasn't been loaded
        </h1>
      )}
    </>
  );
};

export default CharacterDetail;

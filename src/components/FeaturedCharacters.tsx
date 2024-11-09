import CharacterCard from "./CharacterCard";
import { CharacterType } from "../types";
import { useDisneyCharacter } from "../contexts/DisneyCharacterContext";

const FeaturedCharacters = (): JSX.Element => {
  const { featuredDisney } = useDisneyCharacter();

  return (
    <section className="bg-disney-blue-500 p-5 md:p-10 xl:p-20 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
      <h2 className="text-white text-2xl sm:text-4xl col-span-full text-center mb-6">
        Featured Characters!
      </h2>
      {featuredDisney.map((char: CharacterType | undefined) => {
        if (!char) return null;

        return (
          <CharacterCard
            key={char._id}
            id={char._id}
            imageUrl={char.imageUrl}
            name={char.name}
            films={char.films}
          />
        );
      })}
    </section>
  );
};

export default FeaturedCharacters;

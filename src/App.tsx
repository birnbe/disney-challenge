import SearchHeader from "./components/SearchHeader";
import CharacterCard from "./components/CharacterCard";
import FeaturedCharacters from "./components/FeaturedCharacters";
import Footer from "./components/Footer";
import { useDisneyCharacter } from "./contexts/DisneyCharacterContext";
import { CharacterType } from "./types";

function App() {
  const { defaultDisney } = useDisneyCharacter();

  return (
    <>
      <SearchHeader />
      <main>
        <section className="bg-disney-blue-100 p-5 md:p-10 xl:p-20 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
          {defaultDisney.map((char: CharacterType | undefined) => {
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
        <FeaturedCharacters />
      </main>
      <Footer />
    </>
  );
}

export default App;

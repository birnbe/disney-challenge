/* eslint-disable no-extra-boolean-cast */
import SearchHeader from "./components/SearchHeader";
import CharacterCard from "./components/CharacterCard";
import FeaturedCharacters from "./components/FeaturedCharacters";
import Footer from "./components/Footer";
import { useDisneyCharacter } from "./contexts/DisneyCharacterContext";
import { CharacterType } from "./types";

function App() {
  const { visibleCharacters, searchString, defaultDisney } =
    useDisneyCharacter();

  const isDefaultLoaded = defaultDisney.some((char) => char !== undefined);

  const isInitialDefaultLoad =
    isDefaultLoaded &&
    visibleCharacters.length === 0 &&
    searchString.length > 2;

  return (
    <>
      <SearchHeader />
      <main>
        <section className="bg-disney-blue-100 p-5 md:p-10 xl:p-20 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
          {searchString.length > 2 ? (
            <h2 className="text-4xl mb-10 sm:col-span-2 md:col-span-3 xl:col-span-4 text-center">
              Search Results - {searchString}
            </h2>
          ) : null}

          {visibleCharacters.length > 0 ? (
            visibleCharacters.map((char: CharacterType | undefined) => {
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
            })
          ) : (
            <h4 className="text-base sm:col-span-2 md:col-span-3 xl:col-span-4 text-center">
              {isInitialDefaultLoad
                ? "Sorry, your search has no results."
                : "Loading Disney Characters..."}
            </h4>
          )}
        </section>
        <FeaturedCharacters />
      </main>
      <Footer />
    </>
  );
}

export default App;

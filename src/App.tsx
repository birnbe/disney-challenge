/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { GetSpecificCharacters } from "./utils/api";
import disneyLogo from "./assets/disneylogo.svg";
import avatarImg from "./assets/avatar.svg";
import CharacterCard from "./components/CharacterCard";
import {
  User,
  UserContextType,
  CharacterResponse,
  CharacterType,
} from "./types";

function App() {
  const DISNEY_DEFAULT_IDS = [3347, 3389, 156, 25, 2099, 256, 3771, 4994];
  const FEATURED_IDS = [571, 544, 4703, 1947];

  const defaultDisney = GetSpecificCharacters(DISNEY_DEFAULT_IDS);
  const featuredDisney = GetSpecificCharacters(FEATURED_IDS);
  const belle = GetSpecificCharacters(573);
  // const {
  //   data: characterData,
  //   refetch: characterRefetch,
  //   status: characterStatus,
  // } = GetCharacters();

  console.log("defaultDisney", defaultDisney);
  console.log("belle", belle);

  // const {
  //   data: charData,
  //   refetch: charRefetch,
  //   status: charStatus,
  // } = GetSpecificCharacter(12);

  // const {
  //   data: characterGroupData,
  //   // refetch: characterGroupRefetch,
  //   // status: characterGroupStatus,
  // } = GetCharacterGroup(DISNEY_DEFAULT_IDS);

  //  const charGroup = GetSpecificCharacters(DISNEY_DEFAULT_IDS);

  // const char = GetSpecificCharacters(308);

  // console.log('charGroup1', charGroup);
  //   console.log('char 308 ',char.data)

  // char.refetch();
  useEffect(() => {
    // console.log('charGroup',charGroup)
    // console.log('char',char)
    // charRefetch();
    // GetSpecificCharacter(12);
    // fetch each json file once, on mount
    // characterRefetch();
    // characterGroupRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   // fetch each json file once, on mount
  //   console.log('characterData',characterData)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [characterData]);

  return (
    <>
      <header
        // className="bg-white h-12 grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-10 my-8"
        className="bg-white h-12 flex items-center gap-2 sm:gap-3 md:gap-10 mt-4 mb-8 md:my-8"
      >
        <a href="http://www.disney.com" className="">
          <img alt="Disney Logo" src={disneyLogo} className="h-10 w-auto" />
        </a>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Find a character..."
          className="block w-full rounded-full border-0 outline-none placeholder:[#A7B6C5] p-4 bg-disney-blue-100 focus:ring-2 focus:ring-inset focus:ring-disney-blue-500 text-[15px]/[18px]"
        />
        <button>
          <img alt="Profile" src={avatarImg} className="" />
        </button>
      </header>
      <main>
        <section className="bg-disney-blue-100 p-5 md:p-10 xl:p-20 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
          {!defaultDisney.pending
            ? defaultDisney.data.map((char: CharacterType | undefined) => {
                if (!char) return null;

                return (
                  <CharacterCard
                    key={char._id}
                    imageUrl={char.imageUrl}
                    name={char.name}
                    films={char.films}
                  />
                );
              })
            : null}
        </section>
        <section className="bg-disney-blue-500 p-5 md:p-10 xl:p-20 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
          <h2 className="text-white text-2xl sm:text-4xl sm:col-span-2 md:col-span-3 xl:col-span-4 text-center mb-6">
            Featured Characters!
          </h2>
          {!featuredDisney.pending
            ? featuredDisney.data.map((char: CharacterType | undefined) => {
                if (!char) return null;

                return (
                  <CharacterCard
                    key={char._id}
                    imageUrl={char.imageUrl}
                    name={char.name}
                    films={char.films}
                  />
                );
              })
            : null}
        </section>
      </main>
      <footer className="text-center py-10 bg-white">
        <img
          alt="Disney Logo"
          src={disneyLogo}
          className="h-10 w-auto mx-auto"
        />
        <p className="text-[11px]">
          For educational use only. All characters and content are the property
          of Disney. This test is for private use and development testing only
          and should not be distributed for public consumption
        </p>
      </footer>
    </>
  );
}

export default App;

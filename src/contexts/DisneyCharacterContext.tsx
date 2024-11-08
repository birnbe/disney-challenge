import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CharacterType } from "../types";
import { GetSpecificCharacters } from "../utils/api";
import { compact } from "lodash";

const DISNEY_DEFAULT_IDS = [3347, 3389, 156, 25, 2099, 256, 3771, 4994];
const FEATURED_IDS = [571, 544, 4703, 1947];

// Define the Context type with characters, addCharacter function, and search by _id
interface DisneyCharacterContextType {
  characters: CharacterType[];
  addCharacter: (character: CharacterType) => void;
  addCharacters: (newCharacters: CharacterType[]) => void;
  getCharacterById: (id: number) => CharacterType | undefined;
  defaultDisney: (CharacterType | undefined)[];
  featuredDisney: (CharacterType | undefined)[];
}

// Initialize the context with empty values
const DisneyCharacterContext = createContext<DisneyCharacterContextType>({
  characters: [],
  addCharacter: () => {},
  addCharacters: () => {},
  getCharacterById: () => undefined,
  defaultDisney: [],
  featuredDisney: [],
});

// Define the Provider component
export const DisneyCharacterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [defaultDisney, setDefaultDisney] = useState<
    (CharacterType | undefined)[]
  >([]);
  const [featuredDisney, setFeaturedDisney] = useState<
    (CharacterType | undefined)[]
  >([]);

  // Function to add a new character, checking for duplicates by _id
  const addCharacter = (newCharacter: CharacterType) => {
    setCharacters((prevCharacters) => {
      const isDuplicate = prevCharacters.some(
        (character) => character._id === newCharacter._id
      );

      if (!isDuplicate) {
        return [...prevCharacters, newCharacter];
      }
      return prevCharacters;
    });
  };

  // Function to add an array of new characters, checking for duplicates by _id
  const addCharacters = (newCharacters: CharacterType[]) => {
    setCharacters((prevCharacters: CharacterType[]) => {
      // const isDuplicate = prevCharacters.some(
      //   (character) => character._id === newCharacter._id
      // );

      // Filter out items that already exist in prevItems based on id
      const uniqueCharacters = newCharacters.filter(
        newChar => !prevCharacters.some(item => item._id === newChar._id)
      );

      // Add only the unique items to the previous items
      return [...prevCharacters, ...uniqueCharacters];
    });
  };

  // Function to search for a character by _id
  const getCharacterById = (id: number): CharacterType | undefined => {
    return characters.find((character) => character._id === id);
  };

  const defaultDisneyData = GetSpecificCharacters(DISNEY_DEFAULT_IDS);
  const featuredDisneyData = GetSpecificCharacters(FEATURED_IDS);

  // initialize default and featured list of characters
  useEffect(() => {
      setDefaultDisney(defaultDisneyData.data);
      if (!defaultDisneyData.pending) {
      addCharacters(compact(defaultDisneyData.data));
    }
  }, [defaultDisneyData]);

  useEffect(() => {
      setFeaturedDisney(featuredDisneyData.data);
      if (!featuredDisneyData.pending) {
      addCharacters(compact(featuredDisneyData.data));
    }
  }, [featuredDisneyData]);

  // Provide context values
  return (
    <DisneyCharacterContext.Provider
      value={{
        characters,
        addCharacter,
        addCharacters,
        getCharacterById,
        defaultDisney,
        featuredDisney,
      }}
    >
      {children}
    </DisneyCharacterContext.Provider>
  );
};

// Custom hook to use the DisneyCharacterContext
export const useDisneyCharacter = () => {
  return useContext(DisneyCharacterContext);
};

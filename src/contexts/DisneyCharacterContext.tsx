import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { CharacterResponse, CharacterType } from "../types";
import { compact } from "lodash";

const DISNEYAPI = "https://api.disneyapi.dev/character";
const DISNEY_DEFAULT_IDS = [3347, 3389, 156, 25, 2099, 256, 3771, 4994];
const FEATURED_IDS = [571, 544, 4703, 1947];

// Define the Context type with characters, addCharacter function, and search by _id
interface DisneyCharacterContextType {
  characters: CharacterType[];
  addCharacter: (character: CharacterType) => void;
  addCharacters: (newCharacters: CharacterType[]) => void;
  getCharacterById: (id: number) => CharacterType | undefined;
  setSearchString: (nameStr: string) => void; //CharacterType | CharacterType[] | undefined;
  defaultDisney: (CharacterType | undefined)[];
  featuredDisney: (CharacterType | undefined)[];
  visibleCharacters: (CharacterType | undefined)[];
  searchString: string;
}

// Initialize the context with empty values
const DisneyCharacterContext = createContext<DisneyCharacterContextType>({
  characters: [],
  addCharacter: () => {},
  addCharacters: () => {},
  getCharacterById: () => undefined,
  setSearchString: () => undefined,
  defaultDisney: [],
  featuredDisney: [],
  visibleCharacters: [],
  searchString: "",
});

const fetchCharData = async (
  charId: number
): Promise<CharacterResponse<CharacterType>> =>
  axios.get(`${DISNEYAPI}/${charId}`).then((res) => res.data);

const GetSpecificCharacters = (chars: number[] | number) => {
  const characterArray = Array.isArray(chars) ? chars : [chars];
  return useQueries({
    queries: characterArray.map((charId) => ({
      queryKey: ["character", charId],
      queryFn: () => fetchCharData(charId),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data?.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
};

// Define the Provider component
export const DisneyCharacterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [visibleCharacters, setVisibleCharacters] = useState<
    (CharacterType | undefined)[]
  >([]);
  const [defaultDisney, setDefaultDisney] = useState<
    (CharacterType | undefined)[]
  >([]);
  const [featuredDisney, setFeaturedDisney] = useState<
    (CharacterType | undefined)[]
  >([]);

  const [searchString, setSearchStringState] = useState("");

  const SearchForCharactersByName = useQuery<
    CharacterResponse<CharacterType[]>
  >({
    queryKey: ["character-name", searchString],
    enabled: searchString.length > 2,
    queryFn: async () => {
      const response = await fetch(
        `${DISNEYAPI}?name=${encodeURIComponent(searchString)}`
      );
      if (!response.ok) {
        throw new Error("Character response was not ok");
      }
      return await response.json();
    },
  });

  const { data: charactersByNameData } = SearchForCharactersByName;

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
      // Filter out items that already exist in prevItems based on id
      const uniqueCharacters = newCharacters.filter(
        (newChar) => !prevCharacters.some((item) => item._id === newChar._id)
      );

      // Add only the unique items to the previous items
      return [...prevCharacters, ...uniqueCharacters];
    });
  };

  // Function to search for a character by _id
  const getCharacterById = (id: number): CharacterType | undefined => {
    return characters.find((character) => character._id === id);
  };

  const setSearchString = (nameStr: string) => {
    setSearchStringState(nameStr);
  };

  useEffect(() => {
    if (searchString.length <= 2 && searchString.length >= 0) {
      setVisibleCharacters(defaultDisney);
    } else if (charactersByNameData?.data) {
      const nameData = Array.isArray(charactersByNameData?.data)
        ? charactersByNameData?.data
        : [charactersByNameData?.data];
      addCharacters(compact(nameData));
      setVisibleCharacters(nameData);
    }
  }, [searchString, charactersByNameData?.data]);

  const defaultDisneyData = GetSpecificCharacters(DISNEY_DEFAULT_IDS);
  const featuredDisneyData = GetSpecificCharacters(FEATURED_IDS);

  // initialize default and featured list of characters
  useEffect(() => {
    setDefaultDisney(defaultDisneyData.data);
    if (!defaultDisneyData.pending) {
      addCharacters(compact(defaultDisneyData.data));
      setVisibleCharacters(compact(defaultDisneyData.data));
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
        setSearchString,
        defaultDisney,
        featuredDisney,
        visibleCharacters,
        searchString,
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

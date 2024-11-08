/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { CharacterResponse, CharacterType } from "../types";

const DISNEYAPI = "https://api.disneyapi.dev/character";

const fetchCharData = async (charId: number): Promise<CharacterResponse<CharacterType>> => axios
    .get(`${DISNEYAPI}/${charId}`)
    //   , {
    //   params: {
    //     limit: size,
    //     skip: page,
    //   },
    // })
    .then((res) => res.data);

export const GetSpecificCharacters = (chars: number[] | number) => {
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
        }
      },
    })
  };
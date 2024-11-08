export interface User {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  lastUpdate: Date;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export interface CharacterType {
  _id: number;
  url: string;
  name: string;
  imageUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
}

export interface CharacterResponse<T = CharacterType | CharacterType[]> {
  data: T;
  info: {
    count: number;
    nextPage?: string | null;
    previousPage?: string | null;
    totalPages?: number;
  }
}
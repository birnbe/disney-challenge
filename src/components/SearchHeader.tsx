import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { useDisneyCharacter } from "../contexts/DisneyCharacterContext";
import disneyLogo from "../assets/disneylogo.svg";
import avatarImg from "../assets/avatar.svg";

const SearchHeader = (): JSX.Element => {
  const [nameQuery, setNameQuery] = useState("");
  const [debouncedNameQuery, setDebouncedNameQuery] = useState("");

  const { setSearchString } = useDisneyCharacter();

  useEffect(() => {
    const debouncedHandler = debounce((value) => {
      setDebouncedNameQuery(value);
    }, 500);
    debouncedHandler(nameQuery);

    return debouncedHandler.cancel;
  }, [nameQuery]);

  useEffect(() => {
    setSearchString(debouncedNameQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameQuery]);

  return (
    <header className="bg-white h-12 flex items-center gap-2 sm:gap-3 md:gap-10 mt-4 mb-8 md:my-8">
      <Link to="http://www.disney.com" target="_blank" className="">
        <img alt="Disney Logo" src={disneyLogo} className="h-10 w-auto" />
      </Link>
      <input
        id="disneyname"
        name="disneyname"
        type="text"
        placeholder="Find a character..."
        className="block w-full rounded-full border-0 outline-none placeholder:[#A7B6C5] p-4 bg-disney-blue-100 focus:ring-2 focus:ring-inset focus:ring-disney-blue-500 text-[15px]/[18px]"
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
      />
      <button>
        <img alt="Profile" src={avatarImg} className="" />
      </button>
    </header>
  );
};

export default SearchHeader;

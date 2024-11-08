import { useState, useEffect } from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { debounce } from "lodash";
import { useDisneyCharacter } from "../contexts/DisneyCharacterContext";
import disneyLogo from "../assets/disneylogo.svg";
import avatarImg from "../assets/avatar.svg";

const SearchHeader = (): JSX.Element => {
  const { searchString, setSearchString } = useDisneyCharacter();
  
  const [nameQuery, setNameQuery] = useState(searchString);
  const [debouncedNameQuery, setDebouncedNameQuery] = useState(searchString);

  const navigate = useNavigate();
  const isHomePage = useMatch("/");

  useEffect(() => {
    const debouncedHandler = debounce((value) => {
      setDebouncedNameQuery(value);
    }, 500);
    debouncedHandler(nameQuery);

    return debouncedHandler.cancel;
  }, [nameQuery]);

  useEffect(() => {
    setSearchString(debouncedNameQuery);

    if (isHomePage === null && debouncedNameQuery.length > 2) navigate("/");
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
      <Link to="/profile">
        <img alt="Profile" src={avatarImg} className="" />
      </Link>
    </header>
  );
};

export default SearchHeader;

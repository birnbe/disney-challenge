import disneyLogo from "../assets/disneylogo.svg";
import avatarImg from "../assets/avatar.svg";

const SearchHeader = (): JSX.Element => {
  return <header className="bg-white h-12 flex items-center gap-2 sm:gap-3 md:gap-10 mt-4 mb-8 md:my-8">
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
}

export default SearchHeader;

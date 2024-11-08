import disneyLogo from "../assets/disneylogo.svg";

const Footer = (): JSX.Element => {
  return (
    <footer className="text-center py-10 bg-white">
      <img alt="Disney Logo" src={disneyLogo} className="h-10 w-auto mx-auto" />
      <p className="text-[11px]">
        For educational use only. All characters and content are the property of
        Disney. This test is for private use and development testing only and
        should not be distributed for public consumption
      </p>
    </footer>
  );
};

export default Footer;

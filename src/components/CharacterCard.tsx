import { arrayToQuotedString } from "../utils";
import { Link } from "react-router-dom";

type CharacterCardProps = {
  id: number;
  imageUrl: string;
  name: string;
  films: string[];
};

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  return (
    <Link to={`/${props.id}`} className="group">
    <figure className="border group-hover:border-disney-blue-500 border-transparent transition-all group-hover:drop-shadow-[0_4px_4px_rgba(5,69,83,0.24)] flex flex-col justify-center w-62 cursor-pointer">
      <img
        src={props.imageUrl}
        alt={props.name}
        className="size-62 object-cover bg-white"
      />
      <figcaption className="flex flex-col text-center bg-white pb-8 pt-4 h-[170px]">
        <h3 className="text-lg font-bold">{props.name}</h3>
        {props.films.length > 0 ? (
          <>
            <section className="py-4 px-2 flex-grow">
              <h4 className="text-[15px] font-bold">Featured Films</h4>
              <p className="text-xs line-clamp-2">
                {arrayToQuotedString(props.films)}
              </p>
            </section>
            <button className="font-extrabold uppercase text-sm group-hover:underline">
              View Profile
            </button>
          </>
        ) : null}
      </figcaption>
    </figure>
    </Link>
  );
};

export default CharacterCard;

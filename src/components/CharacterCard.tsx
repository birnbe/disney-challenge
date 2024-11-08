import { arrayToQuotedString } from "../utils";

type CharacterCardProps = {
  imageUrl: string;
  name: string;
  films: string[];
};

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  return (
    <figure className="group flex flex-col justify-center w-62 cursor-pointer">
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
            <button className="font-extrabold uppercase text-sm underline">
              View Profile
            </button>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
};

export default CharacterCard;

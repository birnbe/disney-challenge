import { CharacterType } from "../types";
import { format } from "date-fns";

const CharacterDetailCard = (props: CharacterType): JSX.Element => {
  const updatedDate = format(new Date(props.updatedAt), "MMMM do, yyyy");

  return (
    <article className="group flex md:flex-row flex-col justify-top gap-10 p-5 sm:p-10 lg:p-20 bg-disney-blue-100">
      <img
        src={props.imageUrl}
        alt={props.name}
        className="object-cover bg-white md:basis-1/2 lg:basis-5/12 rounded-2xl max-h-[529px] object-top"
      />
      <section className="flex flex-col md:basis-1/2 lg:basis-7/12 gap-y-6">
        <h3 className="text-[40px]/[48px] font-semibold">{props.name}</h3>
        <p className="text-xs">Last Updated {updatedDate}</p>
        {props.films.length > 0 ? (
          <section>
            <h4 className="text-lg font-bold">Featured Films</h4>
            <ul className="list-disc pl-6">
              {props.films.map((item, index) => (
                <li key={`film-${index}`} className="text-[15px]/[24px]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {props.shortFilms.length > 0 ? (
          <section>
            <h4 className="text-lg font-bold">Short Films</h4>
            <ul className="list-disc pl-6">
              {props.shortFilms.map((item, index) => (
                <li key={`film-${index}`} className="text-[15px]/[24px]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {props.tvShows.length > 0 ? (
          <section>
            <h4 className="text-lg font-bold">TV Shows</h4>
            <ul className="list-disc pl-6">
              {props.tvShows.map((item, index) => (
                <li key={`film-${index}`} className="text-[15px]/[24px]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <div>
          <a
            href={props.sourceUrl}
            className="inline-block bg-disney-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-base drop-shadow-[0_4px_4px_rgba(5,69,83,0.24)]"
            target="_blank"
          >
            Explore More Character Details
          </a>
        </div>
      </section>
    </article>
  );
};

export default CharacterDetailCard;

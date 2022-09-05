import s from './MovieDetails.module.css';
import PropTypes from 'prop-types';

const IMG_PATH = 'https://image.tmdb.org/t/p/w300';

export default function MainMovieDetails({ information }) {
  const {
    poster_path,
    imdb_id,
    original_title,
    original_name,
    vote_average,
    overview,
    genres,
  } = information;

  return (
    <div className={s.wrapper}>
      <div className={s.block_img}>
        <img src={`${IMG_PATH}${poster_path}`} alt={imdb_id} />
      </div>
      <div className={s.block_info}>
        <h2 className={s.info_title_main}>{original_title ?? original_name}</h2>
        <p className={s.info_text}>User Score: {vote_average}%</p>
        <h3 className={s.info_title_secondary}>Overview</h3>
        <p className={s.info_text}>{overview}</p>
        <h3 className={s.info_title_secondary}>Genres</h3>
        <p>
          {genres &&
            genres.map(({ name }) => (
              <span className={s.genres} key={name}>
                {`${name} /`}
              </span>
            ))}
        </p>
      </div>
    </div>
  );
}

MainMovieDetails.propTypes = {
  information: PropTypes.shape({
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    original_name: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
};

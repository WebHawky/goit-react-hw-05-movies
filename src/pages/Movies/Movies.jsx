import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { SearchBar } from 'components';
import PropTypes from 'prop-types';

import s from './Movies.module.css';

const IMG_PATH = 'https://image.tmdb.org/t/p/w300';
const DEFAULT_MOVIE_IMG =
  'https://ranobehub.org/img/ranobe/posters/default.jpg';

export default function Movies({ onSubmit, collection }) {
  const [SearchParams, setSearchParams] = useSearchParams();
  const filmQuery = SearchParams.get('query') ?? '';
  const location = useLocation();

  const updateQuery = query => {
    const nextParams = query !== '' ? { query } : '';
    setSearchParams(nextParams);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (filmQuery.trim() === '') {
      alert('Input field can not be empty');
      return;
    }

    onSubmit(filmQuery);
  };

  return (
    <>
      <div>
        <SearchBar
          value={filmQuery}
          onChange={updateQuery}
          onSubmit={handleSubmit}
        />
      </div>
      <ul className={s.list}>
        {collection &&
          collection.map(
            ({ original_title, original_name, id, poster_path }) => {
              return (
                <li key={id} className={s.item}>
                  <Link to={`/movies/${id}`} state={{ from: location }}>
                    <img
                      className={s.item_image}
                      src={
                        poster_path !== null
                          ? `${IMG_PATH}${poster_path}`
                          : DEFAULT_MOVIE_IMG
                      }
                      alt="banner"
                    />
                    <div className={s.overlay}>
                      <h3 className={s.item_title}>
                        {original_title ?? original_name}
                      </h3>
                    </div>
                  </Link>
                </li>
              );
            }
          )}
      </ul>
    </>
  );
}

Movies.propTypes = {
  onSubmit: PropTypes.func,
  collection: PropTypes.arrayOf(
    PropTypes.shape({
      original_title: PropTypes.string,
      original_name: PropTypes.string,
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
    })
  ),
};

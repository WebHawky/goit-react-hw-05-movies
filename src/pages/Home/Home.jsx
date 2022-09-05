import { useState, useEffect } from 'react';
import { Api } from 'Api/Api';
import { Link, useLocation } from 'react-router-dom';

import s from './Home.module.css';

const IMG_PATH = 'https://image.tmdb.org/t/p/w300';

export default function Home() {
  const [trendMovies, setTrendMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const trendingMovies = async () => {
      try {
        const data = await Api.trendingFetch();
        setTrendMovies(data);
      } catch (error) {
        alert(error.message);
      }
    };

    trendingMovies();
  });

  return (
    <ul className={s.list}>
      {trendMovies &&
        trendMovies.map(
          ({ original_title, original_name, id, poster_path }) => {
            return (
              <li key={id} className={s.item}>
                <Link
                  to={`/movies/${id}`}
                  state={{ from: location }}
                  className={s.link}
                >
                  <img
                    className={s.item_image}
                    src={`${IMG_PATH}${poster_path}`}
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
  );
}

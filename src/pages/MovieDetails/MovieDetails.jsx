import { useParams, Link, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Api } from 'Api/Api';
import { Cast, Reviews } from 'components';
import MainMovieDetails from './MainMovieDetails';

import s from './MovieDetails.module.css';

export default function MovieDetails() {
  const [movieInfo, setMovieInfo] = useState([]);
  const { movieID } = useParams();
  const location = useLocation();

  const BackRef = location?.state?.from ?? '/movies';

  useEffect(() => {
    const movieInfo = async () => {
      try {
        const data = await Api.movieDescription(movieID);
        setMovieInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    movieInfo();
  }, [movieID]);

  return (
    <div className={s.container}>
      <Link to={BackRef} className={s.link}>
        Go Back
      </Link>
      {movieID && (
        <>
          <MainMovieDetails information={movieInfo} />
          <AddInfo />
        </>
      )}
    </div>
  );
}

function AddInfo() {
  return (
    <>
      <h3 className={s.info_title_secondary}>Additional Information</h3>
      <ul className={s.list}>
        <li className={s.item}>
          <Link to="cast" className={s.item_link}>
            Cast
          </Link>
        </li>
        <li className={s.item}>
          <Link to="reviews" className={s.item_link}>
            Reviews
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="cast" element={<Cast />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
    </>
  );
}

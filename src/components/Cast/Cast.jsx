import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from 'Api/Api';

import s from './Cast.module.css';

const IMG_PATH = 'https://image.tmdb.org/t/p/w200';
const DEFAULT_IMAGE =
  'https://st4.depositphotos.com/9998432/19610/v/380/depositphotos_196100722-stock-illustration-default-photo-placeholder.jpg?forcejpeg=true';

export default function Cast() {
  const [movieCasts, setMovieCasts] = useState(null);
  const { movieID } = useParams();

  useEffect(() => {
    const movieActors = async () => {
      try {
        const data = await Api.movieActors(movieID);
        setMovieCasts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    movieActors();
  }, [movieID]);

  return (
    <div className={s.list}>
      {movieCasts &&
        movieCasts.map(({ id, profile_path, name, character }) => {
          console.log(profile_path === null);
          return (
            <div key={id} className={s.item}>
              <img
                className={s.img}
                src={
                  profile_path === null
                    ? `${DEFAULT_IMAGE}`
                    : `${IMG_PATH}${profile_path}`
                }
                alt={name}
              />
              <h3>{name}</h3>
              <p>Character: {character}</p>
            </div>
          );
        })}
    </div>
  );
}

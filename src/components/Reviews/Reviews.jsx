import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from 'Api/Api';

import s from './Reviews.module.css';

export default function Reviews() {
  const [movieReviews, setMovieReview] = useState([]);
  const { movieID } = useParams();

  useEffect(() => {
    const movieReviews = async () => {
      try {
        const data = await Api.movieReview(movieID);
        setMovieReview(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    movieReviews();
  }, [movieID]);

  return (
    <>
      <ul className={s.list}>
        {movieReviews.length !== 0 ? (
          movieReviews.map(review => {
            return (
              <li key={review.id} className={s.item}>
                <h3 className={s.title}>{review.author}</h3>
                <p className={s.text}>{review.content}</p>
              </li>
            );
          })
        ) : (
          <li className={s.warning_item}>
            Sorry, there is no reviews at this time
          </li>
        )}
      </ul>
    </>
  );
}

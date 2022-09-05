import { Route, Routes } from 'react-router-dom';
import { Home, MovieDetails, Movies } from './index';
import { Navigation } from '../Navigation';
import { useState, useEffect } from 'react';
import { Api } from 'Api/Api';

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [searchCollection, setSearchCollection] = useState(null);

  useEffect(() => {
    if (searchName) {
      const filmList = async () => {
        try {
          const data = await Api.movieSearch(searchName);
          setSearchCollection(data);
        } catch (error) {
          console.log(error.message);
        }
      };
      filmList();
    }
  }, [searchName]);

  const handleSubmit = inputName => {
    setSearchName(inputName);
  };
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="movies"
          element={
            <Movies onSubmit={handleSubmit} collection={searchCollection} />
          }
        />
        <Route path="movies/:movieID/*" element={<MovieDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

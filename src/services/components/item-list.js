import React from 'react';

import Spinner from '../components/spinner';
import MoviesCard from '../components/movie';

const MoviesItem = (props) => {
  const movieItem = props.moviesData.map((el, i) => {
    return (
      <MoviesCard
        key={i}
        path={el.poster_path}
        title={el.title}
        date={el.release_date}
        voteAverage={el.vote_average}
        genre={el.genre_ids}
        overview={el.overview}
        loading={props.loading}
      />
    );
  });

  return (
    <div>
      {!props.loading ? (
        <div className="movielist" key={MoviesItem}>
          {movieItem}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MoviesItem;

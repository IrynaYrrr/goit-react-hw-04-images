import React, { useEffect, useState } from "react";
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getCards } from 'services/api';

const appStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '16px',
  paddingBottom: '24px'
};

export const App = () => {

  const [cards, setCards] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    searchString && setIsLoading(true)
    page && setIsLoading(true)

    getCardFunc()

  }, [page, searchString])

  const getCardFunc = async () => {
    try {
      setIsLoading(true)
      const { hits, totalHits } = await getCards(searchString, page);
      setCards([...cards, ...hits])
      setError(null)
      setTotalImages(totalHits)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchForm = (searchString) => {
    setCards([]);
    setPage(1);
    setSearchString(searchString);
  }

  const loadMoreClick = () => {
    setPage(page + 1);
  }

  return (
    <div style={appStyles}>
      <Searchbar onSubmit={(value) => { handleSearchForm(value) }} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {searchString && <ImageGallery cards={cards} />}
      {searchString && totalImages > cards.length && <Button onClick={loadMoreClick} />}
    </div>
  );
}

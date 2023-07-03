import React, { Component } from 'react';
import { fetchItems } from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
import { Container } from './App.styled';

const toastConfig = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: false,
    selectedImage: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) this.fetchImages();
  }

  handleSubmit = query => {
    const lowercaseQuery = query.toLowerCase().trim();

    if (lowercaseQuery !== this.state.query) {
      this.setState({ query: lowercaseQuery, page: 1, images: [] });
    }
  };

  fetchImages = async () => {
    const { query, page } = this.state;

    this.setState({ loading: true });

    try {
      const response = await fetchItems(query, page);
      const newImages = response.data.hits;
      const totalHits = response.data.totalHits;

      if (newImages.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          page: prevState.page + 1,
        }));
        toast.success(`Found ${totalHits} images`, toastConfig);
      } else {
        toast.info('Sorry, no results found', toastConfig);
      }
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(error.message, toastConfig);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    if (this.state.loading) {
      return;
    }

    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };

  openModal = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images, loading, error, showModal, selectedImage, query } =
      this.state;

    return (
      <Container>
        <>
          <Searchbar onSubmit={this.handleSubmit} />
          {loading && <Loader />}

          {error !== null && <p>Error: {error.message}</p>}

          {query === '' ? (
            <p>Please enter a value in the search field</p>
          ) : (
            images.length > 0 && (
              <>
                <ImageGallery images={images} openModal={this.openModal} />
                {images.length >= 12 && !loading && (
                  <Button onClick={this.loadMore} />
                )}
              </>
            )
          )}

          {showModal && (
            <Modal image={selectedImage} onClose={this.closeModal} />
          )}
          <ToastContainer />
        </>
      </Container>
    );
  }
}

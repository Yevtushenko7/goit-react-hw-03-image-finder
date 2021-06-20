import React from "react";
import { Component } from "react";
import ServiceApi from "./service/GalleryApi";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";
import MyLoad from "./components/Loader";
import SearchBar from "./components/SearchBar";

class App extends Component {
  state = {
    page: 1,
    query: "",
    images: [],
    error: "",
    loader: false,
    showModal: false,
    url: "",
    tag: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (query !== prevState.query) {
      this.fetchImages()

        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loader: false }));
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ loader: true });
    return ServiceApi.getImage(query, page).then((images) => {
      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
        error: "",
      }));
    });
  };

  OnBtnClick = () => {
    this.fetchImages()
      .then(() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loader: false }));
  };

  FormData = ({ query }) => {
    this.setState({
      page: 1,
      query,
      images: [],
    });
  };

  ImageClick = ({ target }) => {
    if (target.nodeName !== "IMG") {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    this.setState({
      url,
      tag,
      loader: true,
    });
    this.toggleModal();
  };

  toggleModal = () =>
    this.setState((prevState) => ({ showModal: !prevState.showModal }));

  LoaderInModal = () => this.setState({ loader: false });

  render() {
    const { images, loader, showModal, url, tag } = this.state;
    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.ImageClick}>
            {loader && <MyLoad />}
            <img src={url} alt={tag} onLoad={this.LoaderInModal} />
          </Modal>
        )}
        <SearchBar onSubmit={this.FormData} />
        <ImageGallery images={images} onClick={this.ImageClick} />
        {loader && !showModal && <MyLoad />}
        {!loader && images[0] && <Button onClick={this.OnBtnClick} />}
      </>
    );
  }
}

export default App;

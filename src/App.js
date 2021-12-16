import { Component } from 'react';
import { ImageGallery } from './components/ImageGallery';
import { Searchbar } from './components/Searchbar';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { pictureService } from './services/picture-service';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    page: 1,
    modalOpen: false,
    modalPicture: {},
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      pictureService(nextQuery, page).then(pictures => {
        this.setState(prevState =>
          nextPage > 1
            ? {
                pictures: [...prevState.pictures, ...pictures],
                status: Status.RESOLVED,
              }
            : {
                pictures,
                status: Status.RESOLVED,
              },
        );
      });
    }
  }

  pageReset = () => {
    this.setState({
      page: 1,
    });
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  };

  getModalPicture = (largeImageURL, tags) => {
    this.setState({ modalPicture: { largeImageURL, tags } });
  };

  formSubmitHandler = searchQuery => {
    this.pageReset();
    this.setState({
      searchQuery,
    });
  };

  loadMoreBtnHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status } = this.state;

    return (
      <div className="App">
        <Searchbar formSubmitHandler={this.formSubmitHandler} />

        <ImageGallery
          pictures={this.state.pictures}
          toggleModal={this.toggleModal}
          getModalPicture={this.getModalPicture}
        />

        {status === 'resolved' && (
          <Button btnHandler={this.loadMoreBtnHandler} />
        )}

        {this.state.modalOpen && (
          <Modal
            toggleModal={this.toggleModal}
            picture={this.state.modalPicture}
          />
        )}

        {status === 'pending' && (
          <Loader
            className="Loader"
            type="BallTriangle"
            color="#3f51b5"
            height={80}
            width={80}
          />
        )}
      </div>
    );
  }
}

export default App;

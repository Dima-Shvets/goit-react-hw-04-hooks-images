import { useState, useEffect } from 'react';
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

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPicture, setModalPicture] = useState({});
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setStatus(Status.PENDING);

    pictureService(searchQuery, page).then(pictures => {
      page > 1
        ? setPictures(prevState => [...prevState, ...pictures])
        : setPictures(pictures);

      setStatus(Status.RESOLVED);
    });
  }, [searchQuery, page]);

  const toggleModal = () => {
    setModalOpen(prevState => !prevState);
  };

  const getModalPicture = (largeImageURL, tags) => {
    setModalPicture({ largeImageURL, tags });
  };

  const formSubmitHandler = searchQuery => {
    setPage(1);
    setSearchQuery(searchQuery);
  };

  const loadMoreBtnHandler = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="App">
      <Searchbar formSubmitHandler={formSubmitHandler} />

      <ImageGallery
        pictures={pictures}
        toggleModal={toggleModal}
        getModalPicture={getModalPicture}
      />

      {status === 'resolved' && <Button btnHandler={loadMoreBtnHandler} />}

      {modalOpen && <Modal toggleModal={toggleModal} picture={modalPicture} />}

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

export default App;

// componentDidUpdate(prevProps, prevState) {
//   const { page } = this.state;
//   const prevQuery = prevState.searchQuery;
//   const nextQuery = this.state.searchQuery;
//   const prevPage = prevState.page;
//   const nextPage = this.state.page;

//   if (prevQuery !== nextQuery || prevPage !== nextPage) {
//     this.setState({ status: Status.PENDING });
//     pictureService(nextQuery, page).then(pictures => {
//       this.setState(prevState =>
//         nextPage > 1
//           ? {
//               pictures: [...prevState.pictures, ...pictures],
//               status: Status.RESOLVED,
//             }
//           : {
//               pictures,
//               status: Status.RESOLVED,
//             },
//       );
//     });
//   }
// }

// pageReset = () => {
//   this.setState({
//     page: 1,
//   });
// };

// toggleModal = () => {
//   this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
// };

// getModalPicture = (largeImageURL, tags) => {
//   this.setState({ modalPicture: { largeImageURL, tags } });
// };

// formSubmitHandler = searchQuery => {
//   this.pageReset();
//   this.setState({
//     searchQuery,
//   });
// };

// loadMoreBtnHandler = () => {
//   this.setState(prevState => ({ page: prevState.page + 1 }));
// };

//   const { status } = this.state;

//   return (
//     <div className="App">
//       <Searchbar formSubmitHandler={this.formSubmitHandler} />

//       <ImageGallery
//         pictures={this.state.pictures}
//         toggleModal={this.toggleModal}
//         getModalPicture={this.getModalPicture}
//       />

//       {status === 'resolved' && (
//         <Button btnHandler={this.loadMoreBtnHandler} />
//       )}

//       {this.state.modalOpen && (
//         <Modal
//           toggleModal={this.toggleModal}
//           picture={this.state.modalPicture}
//         />
//       )}

//       {status === 'pending' && (
//         <Loader
//           className="Loader"
//           type="BallTriangle"
//           color="#3f51b5"
//           height={80}
//           width={80}
//         />
//       )}
//     </div>
//   );
// }

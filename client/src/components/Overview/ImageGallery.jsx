import React from 'react';

const ImageGallery = ({currentStyle}) => {
  // THIS WILL GET MOVED TO THE CSS FILE LATER
  const outOfStockImage = {
    backgroundImage: 'url(https://www.drip.com/hubfs/Imported_Blog_Media/Out-of-Stock-Product-Pages-WordPress.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '575px',
    height: '575px',
    display: 'inline-block',
  };

  const thumbnailNavBar = {
    width: '85px',
    height: '575px',
    overflow: 'scroll',
    display: 'inline-block'
  };

  const thumbnailImage = {
    width: '75px',
    height: '75px',
    marginBottom: '3.5px'
  };

  const selectedThumbnailImage = {
    width: '75px',
    height: '75px',
    marginBottom: '3.5px',
    border: '2.5px solid black'
  };

  const leftArrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '5px',
    fontSize: '35px',
    color: 'white'
  };

  const rightArrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '5px',
    fontSize: '35px',
    color: 'white'
  };

  const [currentPhoto, setCurrentPhoto] = React.useState(0);

  const renderMainImage = () => {
    if (!currentStyle.photos[0].url) {
      return (
        <div style={outOfStockImage}/>);
    } else {
      return (
        <div style={{
          backgroundImage: `url(${currentStyle.photos[currentPhoto].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '575px',
          height: '575px',
          display: 'inline-block',
          position: 'relative'
        }}>
          <i className="fa-solid fa-arrow-left-long"
            onClick={onLeftClick}
            style={leftArrow}/>
          <i className="fa-solid fa-arrow-right-long"
            onClick={onRightClick}
            style={rightArrow}/>
        </div>);
    }
  };

  const renderPhotoThumbnails = () => {
    let thumbnails = [];
    if (!currentStyle.photos[0].url) {
      return null;
    } else {
      for (let i = 0; i < currentStyle.photos.length; i++) {
        thumbnails.push(
          <img
            key={i}
            name={i}
            src={currentStyle.photos[i].thumbnail_url}
            onClick={changePhoto}
            style={i === currentPhoto ? selectedThumbnailImage : thumbnailImage}
          />);
      }
    }
    return (
      <div style={thumbnailNavBar}>
        {/* <i class="fa-solid fa-angle-up"></i> */}
        {thumbnails}
        {/* <i class="fa-solid fa-angle-down"></i> */}
      </div>
    );
  };

  const changePhoto = (event) => {
    setCurrentPhoto(Number(event.target.name));
  };

  const onLeftClick = (event) => {
    if (currentPhoto > 0) {
      setCurrentPhoto(currentPhoto - 1);
    }
  };

  const onRightClick = (event) => {
    if (currentPhoto < currentStyle.photos.length - 1) {
      setCurrentPhoto(currentPhoto + 1);
    }
  };

  return (
    <div>
      {/* Image Gallery */}
      {currentStyle.photos ? renderPhotoThumbnails() : null}
      {currentStyle.photos ? renderMainImage() : null}
    </div>
  );
};

export default ImageGallery;

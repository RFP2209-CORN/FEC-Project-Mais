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
    width: '82.5px',
    height: '575px',
    display: 'inline-block'
  };

  const navArrows = {
    cursor: 'pointer'
  };

  const thumbnailImages = {
    width: '82.5px',
    height: '540px',
    overflow: 'hidden',
    scrollSnapType: 'y mandatory'
  };

  const thumbnailImage = {
    width: '72.5px',
    height: '72.5px',
    cursor: 'pointer',
    scrollSnapAlign: 'start'
  };

  const selectedThumbnailImage = {
    width: '72.5px',
    height: '72.5px',
    border: '3px solid black',
    scrollSnapAlign: 'start'
  };

  const leftArrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '5px',
    fontSize: '35px',
    color: 'white',
    cursor: 'pointer'
  };

  const rightArrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '5px',
    fontSize: '35px',
    color: 'white',
    cursor: 'pointer'
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
          position: 'relative',
          cursor: 'zoom-in'
        }}>
          {currentPhoto > 0 ?
            <i className="fa-solid fa-arrow-left-long"
              onClick={onLeftClick}
              style={leftArrow}/> : null}
          {currentPhoto < currentStyle.photos.length - 1 ?
            <i className="fa-solid fa-arrow-right-long"
              onClick={onRightClick}
              style={rightArrow}/> : null}
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
            style={i === currentPhoto ? selectedThumbnailImage : thumbnailImage}/>
        );
      }
    }
    return (
      <div style={thumbnailNavBar}>
        <i className="fa-solid fa-angle-up"
          onClick={onUpClick}
          style={navArrows}/>
        <div id="thumbnailNavBar" style={thumbnailImages}>
          {thumbnails}
        </div>
        <i className="fa-solid fa-angle-down"
          onClick={onDownClick}
          style={navArrows}/>
      </div>
    );
  };

  const changePhoto = (event) => {
    setCurrentPhoto(Number(event.target.name));
  };

  const onLeftClick = (event) => {
    if (currentPhoto > 0) {
      setCurrentPhoto(currentPhoto - 1);
      document.getElementById('thumbnailNavBar').scrollBy(0, -75);
    }
  };

  const onRightClick = (event) => {
    if (currentPhoto < currentStyle.photos.length - 1) {
      setCurrentPhoto(currentPhoto + 1);
      document.getElementById('thumbnailNavBar').scrollBy(0, 75);
    }
  };

  const onUpClick = (event) => {
    document.getElementById('thumbnailNavBar').scrollBy(0, -75);
  };

  const onDownClick = (event) => {
    document.getElementById('thumbnailNavBar').scrollBy(0, 75);
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

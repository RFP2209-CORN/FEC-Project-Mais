import React from 'react';
import ExpandedView from './ExpandedView.jsx';

const ImageGallery = ({currentStyle}) => {
  const [currentPhoto, setCurrentPhoto] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const renderMainImage = () => {
    if (!currentStyle.photos[0].url) {
      return (
        <div className="out-of-stock-main-image"/>);
    } else {
      return (
        <div className="default-view">
          <div className ="default-view-image"
            style={{backgroundImage: `url(${currentStyle.photos[currentPhoto].url})`}}
            onClick={onExpandedView}/>
          {currentPhoto > 0 ?
            <i className="fa-solid fa-arrow-left-long"
              onClick={onLeftClick}/> : null}
          {currentPhoto < currentStyle.photos.length - 1 ?
            <i className="fa-solid fa-arrow-right-long"
              onClick={onRightClick}/> : null}
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
            className={i === currentPhoto ? 'thumbnail-nav-bar-image thumbnail-nav-bar-selected' : 'thumbnail-nav-bar-image'}
            src={currentStyle.photos[i].thumbnail_url}
            onClick={changePhoto}/>
        );
      }
    }
    return (
      <div className="thumbnail-nav-bar">
        {currentStyle.photos.length > 7 ?
          <i className="fa-solid fa-angle-up thumbnail-nav-bar-arrows"
            onClick={onUpClick}/> : null}
        <div id="thumbnailNavBar" className="thumbnail-nav-bar-images">
          {thumbnails}
        </div>
        {currentStyle.photos.length > 7 ?
          <i className="fa-solid fa-angle-down thumbnail-nav-bar-arrows"
            onClick={onDownClick}/> : null}
      </div>
    );
  };

  const changePhoto = (event) => {
    setCurrentPhoto(Number(event.target.name || event.target.id));
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

  const onExpandedView = (event) => {
    setIsOpen(true);
  };

  return (
    <div>
      {/* Image Gallery */}
      {currentStyle.photos ? renderPhotoThumbnails() : null}
      {currentStyle.photos ? renderMainImage() : null}
      <ExpandedView open={isOpen} onClose={() => setIsOpen(false)} currentStyle={currentStyle} currentPhoto={currentPhoto} onLeftClick={onLeftClick} onRightClick={onRightClick} changePhoto={changePhoto}/>
    </div>
  );
};

export default ImageGallery;

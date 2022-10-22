import React from 'react';
import ReactDom from 'react-dom';

const ExpandedView = ({open, onClose, currentStyle, currentPhoto, onLeftClick, onRightClick, changePhoto}) => {
  if (!open) {
    return null;
  }

  const [zoomed, setZoomed] = React.useState(false);

  const renderIcons = () => {
    let icons = [];
    for (let i = 0; i < currentStyle.photos.length; i++) {
      if (i === currentPhoto) {
        icons.push(<i key={i} id={i} className="fa-regular fa-circle" onClick={changePhoto}/>);
      } else {
        icons.push(<i key={i} id={i} className="fa-solid fa-circle" onClick={changePhoto}/>);
      }
    }
    return icons;
  };

  const handleZoomedView = (event) => {
    let { left, top, width, height } = event.target.getBoundingClientRect();
    let x = (event.pageX - left) / width * 100;
    let y = (event.pageY - top) / height * 100;
    event.target.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <>
      <div className="overlay-styles" onClick={onClose} />
      <div className="expanded-view-modal-style">
        {zoomed ?
          <div className="expanded-view-image zoomed-view"
            style={{backgroundImage: `url(${currentStyle.photos?.[currentPhoto]?.url})`}}
            onMouseMove={handleZoomedView}
            onClick={event => setZoomed(false)}/> :
          <div className="expanded-view-image"
            style={{backgroundImage: `url(${currentStyle.photos?.[currentPhoto]?.url})`}}
            onClick={event => setZoomed(true)}/>}
        {zoomed ? null :
          <div className="expanded-view-icons">{renderIcons()}</div>}
        {!zoomed && currentPhoto > 0 ?
          <i className="fa-solid fa-arrow-left-long"
            onClick={onLeftClick}/> : null}
        {!zoomed && currentPhoto < currentStyle.photos.length - 1 ?
          <i className="fa-solid fa-arrow-right-long"
            onClick={onRightClick}/> : null}
      </div>
    </>
  );
};

export default ExpandedView;

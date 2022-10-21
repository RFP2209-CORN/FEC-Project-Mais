import React from 'react';
import ReactDom from 'react-dom';

const ExpandedView = ({open, onClose, currentStyle, currentPhoto, onLeftClick, onRightClick, changePhoto}) => {
  if (!open) {
    return null;
  }

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

  return (
    <>
      <div className="overlay-styles" onClick={onClose} />
      <div className="expanded-view-modal-style">
        <div className="expanded-view-image" style={{backgroundImage: `url(${currentStyle.photos?.[currentPhoto]?.url})`}}/>
        <div className="expanded-view-icons">{renderIcons()}</div>
        {currentPhoto > 0 ?
          <i className="fa-solid fa-arrow-left-long"
            onClick={onLeftClick}/> : null}
        {currentPhoto < currentStyle.photos.length - 1 ?
          <i className="fa-solid fa-arrow-right-long"
            onClick={onRightClick}/> : null}
      </div>
    </>
  );
};

export default ExpandedView;

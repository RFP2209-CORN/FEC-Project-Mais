import React from 'react';

const StyleSelector = ({currentStyle, styles, changeCurrentStyle}) => {
  // THIS WILL GET MOVED TO THE CSS FILE LATER
  const styleSelectorThumbnail = {
    width: '55px',
    height: '55px',
    borderRadius: '50%',
  };

  const checkmark = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    padding: '5px',
    borderRadius: '50%',
    backgroundColor: 'green',
    color: 'white',
    width: '12px',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
  };

  const styleSelector = {
    position: 'relative',
    display: 'inline-block',
  };

  const onChange = (event) => {
    let style;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].name === event.target.name) {
        style = styles[i];
        break;
      }
    }
    changeCurrentStyle(style);
  };

  const renderStyleSelectorThumbnails = () => {
    let thumbnails = [];
    let currentRow = 0;
    for (let i = 0; i < styles.length; i++) {
      if (Math.floor(i / 4) !== currentRow) {
        currentRow = Math.floor(i / 4);
        thumbnails.push(<br key={`row ${currentRow}`}/>);
      }
      thumbnails.push(
        <span
          key={styles[i].style_id}
          style={styleSelector}>
          <img
            name={styles[i].name}
            src={styles[i].photos[0].thumbnail_url}
            onClick={onChange}
            style={styleSelectorThumbnail}>
          </img>
          {renderCheckmark(styles[i].style_id)}
        </span>, <span key={i}> </span>
      );
    }
    return thumbnails;
  };

  const renderCheckmark = (styleId) => {
    if (styleId === currentStyle.style_id) {
      return <span style={checkmark}>✓</span>;
    }
  };

  return (
    <div>
      {/* Style Selector */}
      <p>
        <b>STYLE {'>'} </b>
        {currentStyle.name}
      </p>
      {renderStyleSelectorThumbnails()}
    </div>
  );
};

export default StyleSelector;

import React from 'react';
import '../css/widget.css';
import '../css/viedo.css';

function Widget() {
    return (
      <div className="widget">
        <div className="video">
          <iframe
            width="340"
            height="200"
            src="https://www.youtube.com/embed/sFTD5vBfRGY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="video">
          <iframe
            width="340"
            height="200"
            src="https://www.youtube.com/embed/9b8q-vY5BAs"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="video">
          <iframe
            width="340"
            height="200"
            src="https://www.youtube.com/embed/EdDlq6vO_Nw"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="video">
          <iframe
            width="340"
            height="200"
            src="https://www.youtube.com/embed/JfVOs4VSpmA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    );
}

export default Widget;

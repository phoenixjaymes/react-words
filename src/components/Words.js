import React from 'react';
import PropTypes from 'prop-types';

const Words = ({ type, data }) => {
  let html;

  if (type === 'paragraphs') {
    const dataArray = data.split('-+-');
    // console.log(dataArray);
    html = dataArray.map((paragraph, i) => <p key={i}>{paragraph}</p>);
  } else {
    html = <p>{data}</p>;
  }

  return (
    <div>
      {html}
    </div>
  );
};

Words.propTypes = {
  type: PropTypes.string,
  data: PropTypes.string,
};

export default Words;

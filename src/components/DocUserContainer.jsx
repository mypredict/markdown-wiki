import React from 'react';
import { connect } from 'react-redux';

import { changeContainerTypeCreator } from '../redux/actions';
import './DocUserContainer.scss';

function DocUserContainer (props) {
  const {
    containerType
  } = props;

  function a () {
    changeContainerTypeCreator('a')
  }

  return (
    <div className="doc-user-container">
      <div className="content-container">
        <svg
          className="icon"
          aria-hidden="true"
          onClick={() => a()}>
          <use xlinkHref="#icon-close-page" />
        </svg>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    containerType: state.container.type
  }),
  {
    changeContainerTypeCreator
  }
)(DocUserContainer);
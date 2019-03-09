import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import { toggleLayerContainerDisplayCreator } from '../redux/actions';
import Member from './menu_components/Member';
import Version from './menu_components/Version';
import Files from './menu_components/Files';
import Personal from './menu_components/Personal';
import Markdown from './menu_components/Markdown';
import './LayerContainer.scss';

function LayerContainer (props) {
  const {
    layerContainerDisplay,
    toggleLayerContainerDisplayCreator
  } = props;

  return (
    <div
      className="layer-container"
      style={{left: layerContainerDisplay ? 0 : "100%"}}>
      <NavLink to={'/home'}>
        <svg
          className="icon icon-close"
          style={{right: window.location.pathname.includes('markdown') ? '5%' : '20%'}}
          aria-hidden="true"
          onClick={() => toggleLayerContainerDisplayCreator(false)}>
          <use xlinkHref="#icon-close-page" />
        </svg>
      </NavLink>
      <Switch>
        <Route path="/home/member" component={Member} />
        <Route path="/home/version" component={Version} />
        <Route path="/home/files" component={Files} />
        <Route path="/home/personal" component={Personal} />
        <Route path="/home/markdown" component={Markdown} />
      </Switch>
    </div>
  );
}

export default connect(
  state => ({
    layerContainerDisplay: state.layerContainer.display
  }),
  {
    toggleLayerContainerDisplayCreator
  }
)(LayerContainer);
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as trackActionCreators } from '../../ducks/track';
import { actionCreators as authActionCreators } from '../../ducks/auth';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { tracks, activeTrack } = state.track;
  return {
    user,
    tracks,
    activeTrack
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch),
    onPlay: bindActionCreators(trackActionCreators.doPlayTrack, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);

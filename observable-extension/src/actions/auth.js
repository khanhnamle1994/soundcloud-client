import SC from 'soundcloud';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';
import { Observable } from 'rxjs';

export function auth() {
  return {
    type: actionTypes.AUTH
  };
}

function setSession(session) {
  return {
    type: actionTypes.SESSION_SET,
    session
  };
}

export const authEpic = (action$) =>
  action$.ofType(actionTypes.AUTH)
    .mergeMap(() =>
      Observable.from(SC.connect())
        .map(setSession)
    );

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user
  };
}

export const fetchMeEpic = (action$) =>
  action$.ofType(actionTypes.SESSION_SET)
    .mergeMap((action) =>
      Observable.from(fetchMe(action.session))
        .map(setMe)
    );

export const fetchStreamEpic = (action$) =>
  action$.ofType(actionTypes.SESSION_SET)
    .mergeMap((action) =>
      Observable.from(fetchStream(action.session))
        .map((data) => setTracks(data.collection))
    );

const fetchMe = (session) =>
  fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then((response) => response.json());

const fetchStream = (session) =>
  fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
    .then((response) => response.json());

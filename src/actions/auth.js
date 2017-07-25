import SC from 'soundcloud';

export function auth() {
  SC.connect().then((session) => {
    fetchMe(session);
  });
};

function fetchMe(session) {
  fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

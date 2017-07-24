import React from 'react';

class Stream extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { tracks = [] } = this.props;

    return (
      <div>
        {
          tracks.map((track, key) => {
            return (
              <div className="track" key={key}>
                {track.title}
                <button onClick={() => this.setState({ [key]: !this.state[key] })} type="button">
                  { this.state[key] ? 'Dislike' : 'Like'}
                </button>
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default Stream;

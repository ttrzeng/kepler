//LIBRARIES
import React, { PureComponent } from "react";
import logo from './logo.svg';
import fileDownload from 'react-file-download';

//UTILS
import { getAllSongs, createUser, getSong } from './utils/apiFunctions';

/**
 * Main app component, responsible for handling overall application behaviour and layout
 * @class app
 * @extends PureComponent
 */
export class App extends PureComponent<Props> {

  async componentDidMount() {

    // const allSongs = await getAllSongs();
    // const createUserResponse = await createUser('bob', 'john@hotmail.com', '123');
    // console.log(await getSong('talent.z@hotmail.com', '123', '5d85f3d4fb32888d19d9f423fd261cf9'));
    // let songs, error;
    // if(JSON.parse(allSongs.response._attributes.success)) {
    //   songs = allSongs.response.songs;
    //   error = "";
    // } else {
    //   songs = {}
    //   error = allSongs.response._text;
    // }
  }

  render() {

    return (
      <div className="kTunes">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;

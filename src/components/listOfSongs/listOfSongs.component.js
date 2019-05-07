//LIBRARIES
import React, { PureComponent } from "react";
import fileDownload from 'react-file-download';
import { Icon } from 'antd';

//UTILS
import { getAllSongs, createUser, getSong } from '../../utils/apiFunctions';

/**
 * list of songs component, responsible for downloading songs
 * @class ListOfSongs
 * @extends PureComponent
 */
export class ListOfSongs extends PureComponent<Props, State> {

    /**
  	 * Constructor for listOfSongs
  	 * @constructor
  	 */
      constructor(props : Object) {
        super(props);

        this.state = {
            songs: []
        };

        this.downloadSong = this.downloadSong.bind(this);
      }

      async componentDidMount() {
        const allSongs = await getAllSongs();
        this.setState({songs: allSongs.response.songs.song});
      }

      downloadSong(email, pass, songId) {
        console.log(songId.trim());
      }

      render() {

        const { songs } = this.state;

        return (
          <div className="listOfSongs">
            <ul>
              {
                songs.map((song, index) => {
                  return(
                    <div key={index} className="song">
                      <li>
                        {`${song._attributes.name} by ${song._attributes.artist}`}
                        <Icon
                          type="download"
                          className="downloadButton"
                          onClick={() => this.downloadSong(song._text)} />
                      </li>
                    </div>

                  )
                })
              }
            </ul>
          </div>
        );
    }
}

export default ListOfSongs;

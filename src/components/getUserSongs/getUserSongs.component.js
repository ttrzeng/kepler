//LIBRARIES
import React, { PureComponent } from "react";
import { Icon } from 'antd';

//UTILS
import { createUser } from '../../utils/apiFunctions';

/**
 * list of songs component, responsible for downloading songs
 * @class getUserSongs
 * @extends PureComponent
 */
export class getUserSongs extends PureComponent<Props, State> {

    /**
  	 * Constructor for getUserSongs
  	 * @constructor
  	 */
      constructor(props : Object) {
        super(props);

        this.state = {
        };

      }

      async componentDidMount() {

      }

      render() {

        return (
          <div className="getUserSongs">
            getUserSongs
          </div>
        );
    }
}

export default getUserSongs;

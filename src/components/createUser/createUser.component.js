//LIBRARIES
import React, { PureComponent } from "react";
import { Icon } from 'antd';

//UTILS
import { createUser } from '../../utils/apiFunctions';

/**
 * list of songs component, responsible for downloading songs
 * @class createUserForm
 * @extends PureComponent
 */
export class createUserForm extends PureComponent<Props, State> {

    /**
  	 * Constructor for createUserForm
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
          <div className="createUserForm">
            Create user form
          </div>
        );
    }
}

export default createUserForm;

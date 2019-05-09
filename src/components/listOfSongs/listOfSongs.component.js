//LIBRARIES
import React, { PureComponent } from "react";
import fileDownload from 'react-file-download';
import {
  Form, Icon, Input, Button, Modal
} from 'antd';

//UTILS
import { getAllSongs, getSong } from '../../utils/apiFunctions';

/**
 * list of songs component, responsible for downloading songs
 * @class ListOfSongs
 * @extends PureComponent
 */
class ListOfSongsForm extends PureComponent<Props, State> {

    /**
  	 * Constructor for listOfSongs
  	 * @constructor
  	 */
      constructor(props : Object) {
        super(props);

        this.state = {
            songs: [],
            signedIn: false,
            credentials: {
              email: "",
              password: ""
            },
            response: ""
        };

        this.downloadSong = this.downloadSong.bind(this);
        this.resSuccess = this.resSuccess.bind(this);
        this.resError = this.resError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      async componentDidMount() {
        const allSongs = await getAllSongs();
        this.setState({songs: allSongs.response.songs.song});
      }

      resSuccess() {
        Modal.success({
          title: this.state.response
        });
      };

      resError() {
        Modal.error({
          title: this.state.response
        });
      }

      handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          let credentials = {
            email: values.email,
            password: values.password
          };
          if (!err) {
            getAllSongs(values.email, values.password)
              .then(res => {
                if(JSON.parse(res.response._attributes.success)) {
                  this.setState({credentials});
                  this.setState({signedIn: true});
                  this.setState({response: "Successfully logged in"}, () => this.resSuccess());
                } else {
                  this.setState({signedIn: false});
                  this.setState({response: res.response._text}, () => this.resError());
                }
              });
          }
        });
      }

      downloadSong(songName, songId) {
        const { credentials } = this.state;
        getSong(credentials.email, credentials.password, songId)
            .then(res => {
              fileDownload(res.response.rawdata._text, `${songName}.mid`);
            });
      }

      render() {

        const { songs } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
          <div id="listOfSongs">
            <h2>Login</h2>
            <Form onSubmit={ this.handleSubmit }>
              <Form.Item>
                {
                  getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                  )
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )
                }
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            {
              this.state.signedIn &&
              <div>
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
                              onClick={() => this.downloadSong(song._attributes.name, song._text)} />
                          </li>
                        </div>
                      )
                    })
                  }
                </ul>
              </div>
            }
          </div>
        );
    }
}

const ListOfSongs = Form.create()(ListOfSongsForm);

export default ListOfSongs;

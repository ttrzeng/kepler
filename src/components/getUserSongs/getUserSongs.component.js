//LIBRARIES
import React, { PureComponent } from "react";
import {
  Form, Icon, Input, Button, Modal, Card, Row, Col
} from 'antd';

//UTILS
import { getAllSongs } from '../../utils/apiFunctions';

/**
 * list of songs component, responsible for downloading songs
 * @class getUserSongs
 * @extends PureComponent
 */
class getUserSongsForm extends PureComponent<Props, State> {

    /**
  	 * Constructor for getUserSongs
  	 * @constructor
  	 */
      constructor(props : Object) {
        super(props);

        this.state = {
          response: "",
          songs: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.resSuccess = this.resSuccess.bind(this);
        this.resError = this.resError.bind(this);
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
          if (!err) {
            getAllSongs(values.email, values.password)
              .then(res => {
                if(JSON.parse(res.response._attributes.success)) {
                  this.setState({songs: res.response.songs.song._text.trim()});
                  this.setState({response: "Successfully obtained user songs"}, () => this.resSuccess());
                } else {
                  this.setState({response: res.response._text}, () => this.resError());
                }
              });
          }
        });
      }

      render() {

        const { getFieldDecorator } = this.props.form;

        return (
          <div>
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
                  Get user info
                </Button>
              </Form.Item>
            </Form>
            <div>
              <h3>User last downloaded song Id</h3>
              <Card style={{ width: 300 }}>
                {
                  <p>{this.state.songs}</p>
                }
              </Card>
            </div>
          </div>
        );
    }
}

const getUserSongs = Form.create()(getUserSongsForm);

export default getUserSongs;

//LIBRARIES
import React, { PureComponent } from "react";
import {
  Form, Icon, Input, Button, Modal,
} from 'antd';


//UTILS
import { createUser } from '../../utils/apiFunctions';

/**
 * list of songs component, responsible for downloading songs
 * @class createUserForm
 * @extends PureComponent
 */
class createUserForm extends PureComponent<Props, State> {

    /**
  	 * Constructor for createUserForm
  	 * @constructor
  	 */
      constructor(props : Object) {
        super(props);

        this.state = {
          response: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.resSuccess = this.resSuccess.bind(this);
        this.resError = this.resError.bind(this);

      }

      resSuccess() {
        Modal.success({
          title: this.state.response,
          onOk() {}
        });
      }

      resError() {
        Modal.error({
          title: this.state.response,
          onOk() {}
        });
      }

      handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            createUser(values.name, values.email, values.password)
              .then(res => {
                if(JSON.parse(res.response._attributes.success)) {
                  this.setState({response: res.response._text}, () => this.resSuccess());
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
          <Form onSubmit={ this.handleSubmit }>
          <Form.Item>
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
              )
            }
          </Form.Item>
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
                Create
              </Button>
            </Form.Item>
          </Form>
        );
    }
}

const CreateNewUser = Form.create()(createUserForm);

export default CreateNewUser;

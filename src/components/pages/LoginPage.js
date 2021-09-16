import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message} from 'antd';
import API from '../../services/API';
import { buildErrorsText } from '../../utils';

const mapStateToProps = state => ({
  developerName: state.developerName
});

const mapDispatchToProps = dispatch => ({
	onChangeToken: (token) => {
		dispatch({
      type: "CHANGE_TOKEN", 
      token: token
    });
	},
  
	onChangeUsername: (username) => {
		dispatch({
      type: "CHANGE_USERNAME", 
      username: username
    });
  }
});

class LoginPage extends React.Component {
  constructor(props) {
      super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const response  = await API.login(this.props.developerName, values['username'], values['password'])

    if(response["status"] == "ok") {
      this.props.onChangeToken(response["message"]["token"])
      this.props.onChangeUsername(values['username'])
      message.success("Вы авторизированы!")
    } else {
      message.error(buildErrorsText(response["message"]))
    }
  };

  render() {
    return (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onSubmit}
          autoComplete="off"
          style={{textAlign: "center"}}
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите свой username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите свой пароль!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Авторизироваться
            </Button>
          </Form.Item>
        </Form>
      );;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
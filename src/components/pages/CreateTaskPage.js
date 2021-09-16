import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message} from 'antd';
import API from '../../services/API';
import { buildErrorsText } from '../../utils';

const { TextArea } = Input;

const mapStateToProps = state => ({
  developerName: state.developerName,
  token: state.token,
  username: state.username
});

class CreateTaskPage extends React.Component {
  constructor(props) {
      super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const response  = await API.create(this.props.developerName, this.props.token, this.props.username, values["email"], values['text'])

    if(response["status"] == "ok") {
      message.success('Задача создана!')
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
            label="email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: 'Пожалуйста, введите свой email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Текст"
            name="text"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите текст задачи!',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
    
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Form>
      );
    }
}

export default connect(mapStateToProps, null)(CreateTaskPage);
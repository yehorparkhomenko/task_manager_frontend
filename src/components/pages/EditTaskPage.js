import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, message} from 'antd';
import API from '../../services/API';
import { buildErrorsText } from '../../utils';

const { TextArea } = Input;

const mapStateToProps = state => ({
  developerName: state.developerName,
  token: state.token,
  username: state.username
});

class EditTaskPage extends React.Component {
  constructor(props) {
      super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const response = await API.edit(this.props.developerName, 
                                      this.props.token, 
                                      this.props.location.state.task['id'],
                                      parseInt(values['status'], 10),
                                      this.props.username,
                                      values["email"], 
                                      values['text'])
    
    if(response["status"] == ["ok"]) {
      message.success('Задача изменена!')
    } else {
      message.error(buildErrorsText(response["message"]))
    }
  };

  statusTextToCode(status) {
    if(status == "Задача не выполнена") 
      return 0
    if(status == "Задача выполнена") 
      return 10
    return 0
  }

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
          initialValues={{
              username: this.props.location.state.task['username'],
              email: this.props.location.state.task['email'],
              text: this.props.location.state.task['text']
          }}
        >
            <Form.Item 
              label="Статус"
              name="status"
              initialValue={this.statusTextToCode(this.props.location.state.task['status']).toString()}
            >
            <Select>
              <Select.Option value="0">задача не выполнена</Select.Option>
              <Select.Option value="10">задача выполнена</Select.Option>
            </Select>
            </Form.Item>
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
              Подтвердить
            </Button>
          </Form.Item>
        </Form>
      );
    }
}

export default connect(mapStateToProps, null)(EditTaskPage);
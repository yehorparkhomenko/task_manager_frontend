import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, message} from 'antd';
import API from '../../services/API';
import { buildErrorsText, simplifyStatus} from '../../utils';

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
                                      values['status'],
                                      values['username'],
                                      values["email"], 
                                      values['text'])
    
    if(response["status"] == ["ok"]) {
      message.success('Задача изменена!')

      const newTask = this.props.location.state.task
      newTask['status'] = values['status']
      newTask['username'] = values['username']
      newTask['email'] = values['email']
      newTask['text'] = values['text']

      this.props.history.push({
        pathname: '/edit',
        state: { task: newTask }
      })
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
          initialValues={{
              username: this.props.location.state.task['username'],
              email: this.props.location.state.task['email'],
              text: this.props.location.state.task['text']
          }}
        >
            <Form.Item 
              label="Статус"
              name="status"
              initialValue={simplifyStatus(this.props.location.state.task['status']).toString()}
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
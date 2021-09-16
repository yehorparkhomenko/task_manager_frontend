import 'antd/dist/antd.css';
import '../index.css';
import './App.css';
import React from 'react';
import { Layout, Menu } from 'antd';
import { Route, Switch, useHistory} from 'react-router-dom';
import UserInfo from './UserInfo';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TaskListPage from './pages/TaskListPage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';

const { Header, Content, Footer } = Layout;

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <Header>
        <UserInfo />
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item onClick={() => history.push('/login')} key={1}>Авторизироваться</Menu.Item>
          <Menu.Item onClick={() => history.push('/signup')} key={2}>Зарегистрироваться</Menu.Item>
          <Menu.Item onClick={() => history.push('/create')} key={3}>Создать задачу</Menu.Item>
          <Menu.Item onClick={() => history.push('/')} key={4}>Список задач</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px 50px 50px 50px' }}>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/create' component={CreateTaskPage} />
          <Route path='/edit' component={EditTaskPage} />
          <Route path='/' component={TaskListPage} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Task manager ©2021 Created by Yehor Parkhomenko</Footer>
    </div>
  );
}

export default App;

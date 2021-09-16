import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Button, Skeleton, Form, Radio} from 'antd';
import API from '../../services/API';
import taskLogo from '../../task-logo.png'
import { statusCodeToText } from '../../utils';

const mapStateToProps = state => ({
  developerName: state.developerName
});

class TaskListPage extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    list: [],
    page: 1,
    sortDirection: "asc",
    sortBy: "id"
  };

  constructor(props) {
      super(props);
    this.getData = this.getData.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onSortingChanged = this.onSortingChanged.bind(this);
  }
  
  async componentDidMount() {
    const data = await this.getData(this.state.page)
    this.setState({
        initLoading: false,
        list: data
      })
  }

  async getData(page, sortDirection, sortBy){
    const response  = await API.fetchTasks(this.props.developerName, sortBy, sortDirection, page)

    if(response['status'] == "error" || response['message']['tasks'].length == 0) {
      return []
    }

    return response['message']['tasks']
  };

  async onLoadMore() {
    let newPage = this.state.page + 1
    
    this.setState({
      loading: true,
    });

    const data = await this.getData(newPage, this.state.sortDirection, this.state.sortBy)

    if (data.length == 0) 
        newPage--;

    this.setState({
      loading: false,
      list: [...this.state.list, ...data],
      page: newPage,
    });
  };

  onEditTask(task) {
    this.props.history.push({
      pathname: '/edit',
      state: { task: task }
    })
  }

  async onSortingChanged(changedValues, allValues) {
    this.setState({
      loading: true,
      list: []
    });

    for(let i = 1; i < this.state.page + 1; i++) {
      const data = await this.getData(i, allValues["sortDirection"], allValues["sortBy"])
      this.setState({
        list: [...this.state.list, ...data],
      });
    }

    this.setState({
      loading: false,
      sortDirection: allValues["sortDirection"],
      sortBy: allValues["sortBy"]
    })
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>Показать еще</Button>
        </div>
      ) : null;
    return (
      <div>
        <Form style={{textAlign: "left"}} 
        onValuesChange={this.onSortingChanged}
        initialValues={{
          sortDirection: "asc",
          sortBy: "id"
        }}>
          <Form.Item label="Сортировка" name="sortDirection">
            <Radio.Group value={"asc"}>
              <Radio.Button value="asc">asc</Radio.Button>
              <Radio.Button value="desc">desc</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Сортировать по" name="sortBy">
            <Radio.Group value={"id"}>
              <Radio.Button value="id">id</Radio.Button>
              <Radio.Button value="username">username</Radio.Button>
              <Radio.Button value="email">email</Radio.Button>
              <Radio.Button value="status">status</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit" onClick={() => this.onEditTask(item)}>Редактировать</a>]}
            style={{textAlign: "left"}}
          >
            <Skeleton avatar title={false} loading={item.loading} active style={{float:"left"}}>
              <List.Item.Meta
                avatar={
                  <Avatar src={taskLogo} />
                }
                title={<h4>{item['username']}</h4>}
                description={statusCodeToText(item['status'])}
              />
              <div>{item['text']}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(TaskListPage);
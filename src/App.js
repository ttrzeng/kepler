//LIBRARIES
import React, { PureComponent } from "react";
import logo from './assets/logo1.png';
import fileDownload from 'react-file-download';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

//COMPONENTS
import ListOfSongs from './components/listOfSongs/listOfSongs.component';
import CreateUserForm from './components/createUser/createUser.component';
import GetUserSongs from './components/getUserSongs/getUserSongs.component';

//STYLES
import 'antd/dist/antd.css';

//UTILS
import { getAllSongs, createUser, getSong } from './utils/apiFunctions';

const { Content, Sider } = Layout;

/**
 * Main app component, responsible for handling overall application behaviour and layout
 * @class app
 * @extends PureComponent
 */
export class App extends PureComponent<Props> {

    /**
     * Constructor for listOfSongs
     * @constructor
     */
    constructor(props : Object) {
      super(props);

      this.state = {
          activeTab: 1
      };

      this.changeTabTo = this.changeTabTo.bind(this);
    }

    changeTabTo(tab) {
      this.setState({activeTab: tab});
    }

    async componentDidMount() {

      // const allSongs = await getAllSongs();
      // const createUserResponse = await createUser('bob', 'john@hotmail.com', '123');
      // console.log(await getSong('talent.z@hotmail.com', '123', '5d85f3d4fb32888d19d9f423fd261cf9'));
      // let songs, error;
      // if(JSON.parse(allSongs.response._attributes.success)) {
      //   songs = allSongs.response.songs;
      //   error = "";
      // } else {
      //   songs = {}
      //   error = allSongs.response._text;
      // }
    }

    render() {

        const { activeTab } = this.state;

        return (
          <div className="kTunes">
            <Layout>
              <Content style={{ padding: '50px' }}>
                <Layout style={{ background: '#fff' }}>
                  <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%' }}
                    >
                      <Menu.Item key="1" onClick={() => this.changeTabTo(1)}>Downloadable songs</Menu.Item>
                      <Menu.Item key="2" onClick={() => this.changeTabTo(2)}>Create user</Menu.Item>
                      <Menu.Item key="3" onClick={() => this.changeTabTo(3)}>Get user songs</Menu.Item>
                    </Menu>
                  </Sider>
                  <Content style={{ padding: '25px', minHeight: 280 }}>
                    <img src={logo} width="200" height="100" alt="logo"/>
                    { activeTab === 1 && <ListOfSongs/> }
                    { activeTab === 2 && <CreateUserForm /> }
                    { activeTab === 3 && <GetUserSongs /> }
                  </Content>
                </Layout>
              </Content>
            </Layout>
          </div>
        );
    }
}

export default App;

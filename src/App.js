//LIBRARIES
import React, { PureComponent } from "react";
import logo from './assets/logo1.png';
import {
  Layout, Menu, Icon, Row, Col
} from 'antd';

//COMPONENTS
import ListOfSongs from './components/listOfSongs/listOfSongs.component';
import CreateUserForm from './components/createUser/createUser.component';
import GetUserSongs from './components/getUserSongs/getUserSongs.component';

//STYLES
import 'antd/dist/antd.css';

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
          activeTab: 1,
          collapsed: false
      };

      this.changeTabTo = this.changeTabTo.bind(this);
    }

    changeTabTo(tab) {
      this.setState({activeTab: tab});
    }

    onCollapse = (collapsed) => {
      this.setState({ collapsed });
    }

    render() {

        const { activeTab } = this.state;

        return (
          <Row className="kTunes" type="flex" justify="space-around" align="middle">
            <Col>
              <Layout>
                <Content style={{ padding: '50px', width: "fit-content" }}>
                  <Layout style={{ background: '#fff' }}>
                    <Sider
                      width={200}
                      style={{ background: '#fff' }}
                      collapsible
                      collapsed={this.state.collapsed}
                      onCollapse={this.onCollapse}>
                      <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['1']}
                        inlineCollapsed={"menu-fold"}
                        style={{ height: '100%' }}
                      >
                        <Menu.Item key="1" onClick={() => this.changeTabTo(1)}>
                          <Icon type="cloud-download" />
                          <span>Downloadable songs</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={() => this.changeTabTo(2)}>
                          <Icon type="user-add" />
                          <span>Create user</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={() => this.changeTabTo(3)}>
                          <Icon type="info-circle" />
                          <span>Get user songs</span>
                        </Menu.Item>
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
            </Col>
          </Row>
        );
    }
}

export default App;

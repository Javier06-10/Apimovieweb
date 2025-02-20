
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router';


const { Header, Content, Footer } = Layout;

const Mainlayaut: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'end', borderRadius: borderRadiusLG  }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          
        items={[/*{
                  key:'home',
                  label:<Link to={'/home'}>Home</Link>
                    },

                    {
                        key:'about',
                        label:<Link to={'/about'}>About</Link>
                    },
                    */
                    {
                        key:'pOpulartvshows',
                        label:<Link to={'/populartvshows'}>PopularTvShows</Link>
                    },
                    {
                      key:'showdetails',
                      label:<Link to={'/showdetails/:id'}></Link>
                  }

]}
          style={{  flex: 1, minWidth: 0, display: 'flex', justifyContent: 'end' }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
      
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          
               <Outlet/>
               
       
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', justifyContent:'space-between' }}>``
        Ant Design ©{new Date().getFullYear()} Created by Javier Vasquez
      </Footer>
    </Layout>
  );
};

export default Mainlayaut;
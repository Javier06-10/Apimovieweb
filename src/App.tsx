import React, { useState } from 'react';

import './App.css';

import {  Breadcrumb, Layout, Menu, theme } from 'antd';



const { Header, Content, Footer } = Layout;

 export const nav: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'end', borderRadius: borderRadiusLG }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          
          style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }} />
       
      </Header>

      <Content style={{ padding: '0 48px' }}>
      
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item >Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>

      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
     
      
      </div>
    </Content><Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by JAVIER VASQUEZ
      </Footer>
    </Layout>
  );

};

export default nav;

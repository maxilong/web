import React, { useState, useEffect } from 'react'
import Antmenu from '@/components/Menu'
import routes from '@/routes/index'
import Antroute from '@/components/Route'
import Tags from './components/Tags'
import Navbar from './components/Navbar'
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;
function Layouts() {
  return (
    <Layout>
      <Sider>
        <Antmenu routes={routes}></Antmenu>
      </Sider>
      <Layout>
        <Header>
          <Navbar />
          <Tags />
        </Header>
        <Content style={{minHeight: 'calc(100vh - 84px)'}}>
          <Antroute routes={routes}></Antroute>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Layouts;

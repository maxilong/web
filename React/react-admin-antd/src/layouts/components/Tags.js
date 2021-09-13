import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Tag } from 'antd';
import { connect } from 'react-redux'
import {
  FireFilled
} from '@ant-design/icons';
import './index.less'
const mapStateToProps = (state) => {
  return {
    menuData: state.menu
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteMenu: (data) => {
      dispatch({
        type: 'DEL_MENU',
        menuData: data
      })
    }
  }
}
function Tags(props) {
  // 设置横向滚动区域
  const scrollRef = React.createRef()
  const bindScroll = (e) => {
    const deltaY = e.deltaY*5
    let current = scrollRef.current
    current.scrollLeft = current.scrollLeft + deltaY
  }
  // 路由跳转
  const history = useHistory()
  // 删除tag标签
  const deleteTag = (menu) => {
    props.deleteMenu(menu)
    history.push(props.menuData[props.menuData.length -1].path)
  }
  // 点击tag路由标签
  const bingTag = (menu) => {
    if (pathname !== menu.path) {
      history.push(menu.path)
    }
  }
  // 获取当前路由
  const { pathname } = useLocation();
  return (
      <div className="tags-view-container">
        <div className="scrollX" onWheel={bindScroll}>
          <div className="scroll-content" ref={scrollRef}>
            {
              props.menuData.map(menu => {
                return (
                  <Tag
                    className="ml10 mr0"
                    closable={menu.meta.affix ? false : true}
                    key={menu.path}
                    color={pathname === menu.path ? '#1890ff' : ''}
                    icon={pathname === menu.path ? <FireFilled /> : ''}
                    onClose={() => { deleteTag(menu) }}
                    onClick={() => { bingTag(menu) }}
                  >
                    {menu.meta.title}
                  </Tag>
                )
              })
            }
          </div>
        </div>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);

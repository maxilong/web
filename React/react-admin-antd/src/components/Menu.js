import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import SvgIcon  from './SvgIcon'
const { SubMenu } = Menu
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    addMenu: (data) => {
      dispatch({
        type: 'ADD_MENU',
        menuData: data
      });
    }
  };
}

function Antmenu (props) {
  const { routes } = props
  // 初始化选择菜单数组
  const [ selectMenu, setSelectMenu ] = useState([])
  // 获取路由名称
  const { pathname } = useLocation()
  // 通过useEffect 来监听pathname  从而改变彩带的key
  useEffect(() => {
    // 设置菜单数组
    setSelectMenu([pathname])
    // console.log(props.menu)
  }, [pathname])
  // 初始化menu标签数组
  const initMenu = (routeList) => {
    routeList.map(items => {
      if (items.children && items.children.length > 0) {
        initMenu(items.children)
      }else{
        if (items.meta.affix || pathname === items.path) {
          props.addMenu(items)
        }
      }
    })
  }
  initMenu(routes)
  const childrenMenu = (routes) => {
    if (routes.children && routes.children.length > 0) {
      return (
        <SubMenu key={routes.path} icon={routes.meta.icon ? <SvgIcon iconClass={routes.meta.icon} /> : ''} title={routes.meta.title}>
          {
            routes.children.map(item => {
              return childrenMenu(item)
            })
          }
        </SubMenu>
      )
    } else {
      if (!routes.hidden) {
        return (
          <Menu.Item key={routes.path}  icon={routes.meta.icon ? <SvgIcon iconClass={routes.meta.icon} /> : ''}>
            <Link to={routes.path} onClick={() => {props.addMenu(routes)}}>{routes.meta.title}</Link>
          </Menu.Item>
        )
      }
    }
  }
  return (
    <div className="sidebar-container">
      <div className="scroll-content">
        <Menu
            style={{width: '200px'}}
            mode={'inline'}
            theme={'dark'}
            selectedKeys={selectMenu}
          >
            {
              routes.map(items => {
                return childrenMenu(items)
              })
            }
          </Menu>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Antmenu)
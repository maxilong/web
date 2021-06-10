import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Select, Menu, Dropdown, Avatar, Breadcrumb } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getUserData, removeToken, removeUserData, removeVenueData, removeVenueId, setVenueData, setVenueId, getVenueId } from '@/utils/auth'
import { getEmployeeVenue } from '@/api/user'
import { useHistory, useLocation } from 'react-router-dom'
import routes from '@/routes'
import './index.less'
const mapStateToProps = (state) => {
  return {
    venueId: state.venueId,
    menuData: state.menu,
    venueData: state.venueData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeVenueId: (id) => {
      dispatch({
        type: 'CHANGE_VENUEID',
        venueId: id
      })
    },
    changeVenueData: (data) => {
      dispatch({
        type: 'CHANGE_VENUEDATA',
        venueData: data
      })
    }
  }
}
function Navbar(props) {
  const { pathname } = useLocation()
  const userData = getUserData()
  const history = useHistory()
  const [breadData, setBreadData] = useState([])
  function handleChange(value) {
    props.changeVenueId(value)
    setVenueId(value)
  }
  const logout = () => {
    removeToken()
    removeUserData()
    removeVenueData()
    removeVenueId()
    props.changeVenueId('')
    props.changeVenueData([])
    history.push('/login')
  }
  const routeFilter = (route) => {
    if (route.children && route.children.length > 0) {
      route.children.map(item => {
        if (item.path === pathname) {
          setBreadData(prev =>  [...prev, route.meta.title])
          setBreadData(prev => [...prev, item.meta.title])
        }
        routeFilter(item)
      })
    }
  }
  async function _getEmployeeVenue() {
    let current = 0
    getEmployeeVenue().then(res => {
      if (res.code == 1) {
        const { data } = res 
        props.changeVenueData(data)
        if (getVenueId()) {
          props.changeVenueId(getVenueId())
        } else {
          data.map(item => {
            if (item.id == getVenueId()) {
              current++
            }
          })
          if (!current) {
            setVenueData(data)
            setVenueId(data[0].id)
            props.changeVenueId(data[0].id)
          }
        }
      }
    })
  }
  useEffect(() => {
    if (pathname !== '/') {
      setBreadData([])
      routes.map(route => {
        if (pathname === route.path) {
          setBreadData(prev => [...prev, route.meta.title])
        }
        routeFilter(route)
      })
    }
  }, [pathname])
  useEffect(() => {
    if (pathname !== '/') {
      _getEmployeeVenue()
    }
  }, [pathname])
  const userConfig = (
    <Menu>
      <Menu.Item>
        <span onClick={logout}>退出</span>
      </Menu.Item>
    </Menu>
  )
  return (
      <div className="navbar">
        <div className="left-menu">
          <Breadcrumb className="mlr20">
            {
              breadData.map((item, index) => {
                return (
                  <Breadcrumb.Item key={index}>{ item }</Breadcrumb.Item>
                )
              })
            }
          </Breadcrumb>
        </div>
        <div className="right-menu">
          <div className="right-menu-item">
            <Select className="w200" value={props.venueId} onChange={handleChange}>
              {
                props.venueData.map((item, index) => {
                  return (
                    <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                  )
                })
              }
            </Select>
            <Dropdown className="mlr20 hand" overlay={userConfig} trigger={['click']} arrow>
              <span>
                <Avatar className="" style={{backgroundColor: '#1890ff'}}>{userData.realname}</Avatar>
                <DownOutlined className="ml10" />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

import React, { useState, useEffect } from 'react'
import { useSelector, connect, useDispatch } from 'react-redux'
import { Row, Col } from 'antd'
import CountTo from 'react-count-to'
import SvgIcon from '@/components/SvgIcon'
import './index.less'
import { workbenchEntryData, workbenchSalesData, workbenchClassData, workbenchMemberAlert } from '@/api/workbench'
function PanelGroup(props) {
  const [showUp, setShowUp] = useState('day')
  const [showData, setShowData] = useState({number: 0, potential: 0, formal: 0})
  const [sales, setSales] = useState('day')
  const [salesData, setSalesData] = useState({revenue: 0, card: 0, class: 0})
  const [classs, setClasss] = useState('day')
  const [classData, setClassData] = useState({private: 0, group: 0})
  const [memberAler, setMemberAler] = useState('day')
  const [memberAlertData, setMemberAlerData] = useState({list: [], number: 0})
  const venueId = useSelector(state => state.venueId)

  // 监听场馆变换从而获取请求1
  useEffect(() => {
    if (venueId) {
      getentryData()
      getsalesData()
      getclassData()
      getAlertData()
    }
  }, [venueId])

  // 到场
  const showTab = (type) => {
    setShowUp(type)
    getentryData(type)
  }
  const getentryData = (type) => {
    const data = { venue_id: venueId, type: type }
    workbenchEntryData(data).then(res => {
      setShowData(res.data)
    })
  }

  // 营收
  const salesTab = (type) => {
    setSales(type)
    getsalesData(type)
  }
  const getsalesData = (type) => {
    const data = { venue_id: venueId, type: type }
      workbenchSalesData(data).then(res => {
        setSalesData(res.data)
      })
  }

  // 上课私课团课
  const classTab = (type) => {
    setClasss(type)
    getclassData(type)
  }

  const getclassData = (type) => {
    const data = { venue_id: venueId, type: type }
    workbenchClassData(data).then(res => {
      setClassData(res.data)
    })
  }

  // 生日会员
  const memberAlerTab = (type) => {
    setMemberAler(type)
    getAlertData(type)
  }
  const getAlertData = (type) => {
    const data = { venue_id: venueId, type: type }
    workbenchMemberAlert(data).then(res => {
      setMemberAlerData(res.data)
      console.log(res.data)
    })
  }
  return (
    <div className="panel-group">
      <Row gutter="20">
        <Col xs={12} sm={12} lg={6} className="card-panel-col">
          <div className="card-panel">
            <div className="card-panel-icon-wrapper icon-people">
              <SvgIcon iconClass="peoples" className="card-panel-icon" />
            </div>
            <div className="card-panel-description">
              <div className="card-panel-text ft-sz14 text-right">
                <span className={showUp === 'day' ? 'icon-money': ''} onClick={() => showTab('day')}>日</span>
                <span> / </span>
                <span className={showUp === 'month' ? 'icon-money': ''} onClick={() => showTab('month')}>月</span>
              </div>
              <div className="card-panel-text ft-sz14">
                <span>今{ showUp === 'day' ? '日' : '月' }到场</span>
                <CountTo from={0} to={showData.number} speed={2600} className="icon-people" />
              </div>
              <div className="card-panel-text ft-sz14">
                <span className="icon-message">潜在客户</span>
                <CountTo from={0} to={showData.potential} speed={2600} />
              </div>
              <div className="card-panel-text ft-sz14">
                <span className="icon-shopping">正式会员</span>
                <CountTo from={0} to={showData.formal} speed={2600} />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} lg={6} className="card-panel-col">
          <div className="card-panel">
            <div className="card-panel-icon-wrapper icon-message">
              <SvgIcon iconClass="money" className="card-panel-icon" />
            </div>
            <div className="card-panel-description">
              <div className="card-panel-text ft-sz14 text-right">
                <span className={sales === 'day' ? 'icon-money': ''} onClick={() => salesTab('day')}>日</span>
                <span> / </span>
                <span className={sales === 'month' ? 'icon-money': ''} onClick={() => salesTab('month')}>月</span>
              </div>
              <div className="card-panel-text ft-sz14">
                <span>今{ sales === 'day' ? '日' : '月' }营收</span>
                <CountTo from={0} to={salesData.revenue} speed={2600} className="icon-people" />
              </div>
              <div className="card-panel-text ft-sz14">
                <span className="icon-message">今{ sales === 'day' ? '日' : '月' }售卡</span>
                <CountTo from={0} to={salesData.card} speed={2600} />
              </div>
              <div className="card-panel-text ft-sz14">
                <span className="icon-shopping">今{ sales === 'day' ? '日' : '月' }售课</span>
                <CountTo from={0} to={salesData.class} speed={2600} />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} lg={6} className="card-panel-col">
          <div className="card-panel">
            <div className="card-panel-icon-wrapper icon-money">
              <SvgIcon iconClass="table" className="card-panel-icon" />
            </div>
            <div className="card-panel-description">
              <div className="card-panel-text ft-sz14 text-right">
                <span className={classs === 'day' ? 'icon-money': ''} onClick={() => classTab('day')}>日</span>
                <span> / </span>
                <span className={classs === 'month' ? 'icon-money': ''} onClick={() => classTab('month')}>月</span>
              </div>
              <div className="card-panel-text" style={{padding: '6px'}} />
              <div className="card-panel-text ft-sz14">
                <span className="icon-message">今{ classs === 'day' ? '日' : '月' }私课</span>
                <CountTo from={0} to={classData.private} speed={2600} />
              </div>
              <div className="card-panel-text ft-sz14">
                <span className="icon-shopping">今{ classs === 'day' ? '日' : '月' }团课</span>
                <CountTo from={0} to={classData.group} speed={2600} />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} lg={6} className="card-panel-col">
          <div className="card-panel">
            <div className="card-panel-icon-wrapper icon-shopping">
              <SvgIcon iconClass="chart" className="card-panel-icon" />
            </div>
            <div className="card-panel-description">
              <div className="card-panel-text ft-sz14 text-right">
                <span className={memberAler === 'day' ? 'icon-money': ''} onClick={() => memberAlerTab('day')}>日</span>
                <span> / </span>
                <span className={memberAler === 'month' ? 'icon-money': ''} onClick={() => memberAlerTab('month')}>月</span>
              </div>
              <div className="card-panel-text ft-sz14">
                <span className="icon-shopping">今{ memberAler === 'day' ? '日' : '月' }生日会员</span>
                <CountTo from={0} to={memberAlertData.number} speed={2600} />
              </div>
              <div>
                  {
                    memberAlertData.list.map((item, index) => {
                      return (
                        <div className="card-panel-text ft-sz14" key={index}>
                          <span className="icon-shopping">{ item.name }</span>
                          <span className="icon-message"> { item.birthday }</span>
                        </div>
                      )
                    })
                  }
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default PanelGroup

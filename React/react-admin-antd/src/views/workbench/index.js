import React, { useState, useEffect } from 'react'
import { useSelector, connect, useDispatch } from 'react-redux'
import { Input, Row, Col, Card, Table, Button } from 'antd'
import PanelGroup from './components/PanelGroup'
import { orderList, getApprovalIndex } from '@/api/workbench'

import potentialImg from '@/assets/images/potential.png'
import visitImg from '@/assets/images/visit.png'
import leagueImg from '@/assets/images/league.png'
import buyImg from '@/assets/images/buy.png'
import depositImg from '@/assets/images/deposit.png'
import cabinetImg from '@/assets/images/cabinet.png'
import './index.less'
// const mapStateToProps = (state) => {
//   return state
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     bindBtn: () => {
//       dispatch({
//         type: 'CHANGE_VENUEID'
//       });
//     }
//   };
// }
const { Column }  = Table
function Workbench(props) {
  const venueId = useSelector(state => state.venueId)
  // const dispatch = useDispatch()
  // dispatch({type: 'CHANGE_VENUEID', venueId: '1'})
  const [orderData, setOrderData] = useState([])
  const [approvaliData, setApprovaliData] = useState([{approval_type: 'xxx', mobile: '范德萨', status: '2' }])
  const statusObj = { 1: '审批中', 2: '已审核', 3: '已拒绝', 4: '已撤销' }
  // 监听场馆变化来控制页面渲染
  useEffect(() => {
    getOrderList()
    getApprovali()
  }, [venueId])
  // 获取订单
  const getOrderList = () => {
    const data = { venue_id: venueId, page: 1, limit: 3 }
    orderList(data).then(res => {
      const { items } = res.data
      setOrderData(items)
    })
  }
  // 获取审核
  const getApprovali = () => {
    const data = { venue_id: venueId, tab_type: '4', pages: 1, limit: 3 }
    getApprovalIndex(data).then(res => {
      const { items } = res.data
      setApprovaliData(items)
    })
  }
  const backData = [
    {
      key: 'potential',
      name: '新增潜在',
      image: potentialImg
    },
    {
      key: 'visit',
      name: '新增到访',
      image: visitImg
    },
    {
      key: 'league',
      name: '约团课',
      image: leagueImg
    },
    {
      key: 'buy',
      name: '购买签单',
      image: buyImg
    },
    {
      key: 'deposit',
      name: '定金',
      image: depositImg
    },
    {
      key: 'cabinet',
      name: '租柜',
      image: cabinetImg
    }
  ]
  const bindSearch = () => {
    console.log(1)
  }
  const shortcutBtn = (item) => {
    switch (item.key) {
      case 'potential':
        console.log(item.name)
        break
      case 'visit':
        console.log(item.name)
        break
      case 'league':
        console.log(item.name)
        break
      case 'buy':
        console.log(item.name)
        break
      case 'deposit':
        console.log(item.name)
        break
      case 'cabinet':
        console.log(item.name)
        break
      default:
    }
  }
  return (
    <div className="pd20">
      <PanelGroup />
      <Row gutter="20">
        <Col sm={24} md={24} xl={18}>
          <div className="mt10 pd16">
            <Row>
              <Col span={24} className="text-center">
                <Input.Search placeholder="请输入手机号或卡号" onSearch={bindSearch} enterButton="搜索" style={{width: '66%', borderRadius: "50px"}}></Input.Search>
              </Col>
            </Row>
          </div>
          <div className="bgWhite mt20 pd20">
            <Row>
              <Col span={24}>
                <h3>业务快捷入口：</h3>
              </Col>
            </Row>
            <Row className="mt20" gutter="20">
              {
                backData.map((item, index) => {
                  return (
                    <Col xs={24} sm={12} lg={6} key={index}>
                      <div className="entry-class text-center pointer" onClick={() => shortcutBtn(item)}>
                        <img src={item.image} alt="" style={{width: 74, height: 74}} />
                        <p className="mt10">{ item.name }</p>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </div>
        </Col>
        <Col sm={24} md={24} xl={6}>
          <div className="chart-wrapper">
            <Card title="订单流水" extra={<a>更多</a>}>
              <Table dataSource={orderData} pagination={false}>
                <Column title="类型" ellipsis align="center" width="25%" render={(value, row, index) => (
                  <span>{row.info.type_name}</span>
                )} />
                <Column title="会员" ellipsis align="center" width="25%" render={(value, row, index) => (
                  <span>{row.member.name}</span>
                )} />
                <Column title="状态" ellipsis align="center" width="25%" render={(value, row, index) => (
                  <span>{row.info.status_name}</span>
                )} />
                <Column title="操作" align="center" width="25%" render={(value, row, index) => (
                  <Button type="link" size="small">详情</Button>
                )} />
              </Table>
            </Card>
          </div>
          <div className="chart-wrapper mt10">
            <Card title="审批列表" extra={<a>更多</a>}>
              <Table dataSource={approvaliData} pagination={false}>
                <Column title="类型" ellipsis align="center" width="25%" dataIndex="approval_type" />
                <Column title="会员" ellipsis align="center" width="25%" dataIndex="mobile" />
                <Column title="状态" ellipsis align="center" width="25%" render={(value, row, index) => (
                  <span>{statusObj[row.status]}</span>
                )} />
                <Column title="操作" align="center" width="25%" render={(value, row, index) => (
                  <Button type="link" size="small">详情</Button>
                )} />
              </Table>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}
// export default connect(mapStateToProps, mapDispatchToProps)(Workbench)
export default Workbench

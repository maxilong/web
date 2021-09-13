import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useSelector, connect, useDispatch } from 'react-redux'
import { Modal, Image, Button, Row, Col, Tag } from 'antd'
import './index.less'

import { getCustomerDetail, cardStatus, getCardList } from '@/api/admin'
import { parseTime, getUndefined, residue } from '@/utils/index'
import noImg from '@/assets/images/noImage.png'

function TestCard(props, ref) {
  const statusText = { 1: '未激活', 2: '正常', 3: '冻结', 4: '请假', 5: '挂起', 6: '异常', 7: '已到期' }
  const statusClass = { 1: '', 2: 'success', 3: 'danger', 4: 'danger', 5: 'danger', 6: 'danger', 7: 'info' }
  const venueId = useSelector(state => state.venueId)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [cardId, setCardId] = useState('')
  const [nowCardStatus, setNowCardStatus] = useState('')
  const [memberData, setMemberData] = useState({})
  const [cardData, setCardData] = useState([])
  const [statusData, setStatusData] = useState({})

  const memberId = props.memberId

  useEffect(() => {
    if (isModalVisible) {
      setCardId(props.cardId)
      getMember()
      getCardStatus()
      getCard()
    }
  }, [isModalVisible])

  // 用于父级调用的方法包裹
  useImperativeHandle(ref, () => ({
    showModel: () => {
      setIsModalVisible(true)
    }
  }))

  // 获取会员信息
  const getMember = () => {
    getCustomerDetail(memberId).then(res => {
      if (res.code === 1) {
        setMemberData(res.data)
      }
    })
  }

  // 获取卡信息
  const getCard = () => {
    const data = { venue_id: venueId, member_id: memberId, status: 0 }
    getCardList(data).then(res => {
      if (res.code === 1) {
        console.log(res)
        setCardData(res.data)
      }
    })
  }

  const getCardStatus = () => {
    cardStatus().then(res => {
      const data = res.data
      let statusObj = {}
      data.forEach(item => {
        statusObj[item.value] = item.name
      })
      setStatusData(statusObj)
    })
  }

  /* 选择卡 */
  const handleCurrentChange = (item) => {
    setCardId(item.id)
    setNowCardStatus(item.status)
  }

  const closeModel = () => {
    setIsModalVisible(false)
  }
  const submitForm = () => {
    if (nowCardStatus !== '1') {
      return
    }
    console.log('submit')
  }
  return (
    <div>
      <Modal
        title="验卡"
        width="40%"
        visible={isModalVisible}
        onCancel={closeModel}
        onOk={submitForm}
        footer={[
          <Button key="submit" type="primary" loading={btnLoading} disabled={!cardId} onClick={submitForm}>入场</Button>
        ]}
      >
        <div className="itemCenter">
          <div className="mr20">
            <Image src={memberData.pic ? memberData.pic : 'error'} fallback={noImg} style={{width: '148px', height: '148px', borderRadius:'50%'}}></Image>
          </div>
          <div className="wB100">
            <Row gutter={10}>
              <Col className="mb20" span={10}>
                姓名: { memberData.name || '暂无' }
              </Col>
              <Col className="mb20" span={10}>
                性别: { {0:'未知',1:'先生',2:'女士'}[memberData.sex] || '未知' }
              </Col>
              <Col className="mb20" span={10}>
                手机号: { memberData.mobile }
              </Col>
              <Col className="mb20" span={10}>
                生日: { memberData.birthday || '暂无' }
              </Col>
            </Row>
          </div>
        </div>
        <div className="mt20">
          {
            cardData.map(item => {
              return (
                <div className={cardId === item.id ? 'card-item selected' : 'card-item' } onClick={() => handleCurrentChange(item)}>
                  <div className="justifyBetween">
                    <div>
                      <Tag color="processing">{ item.cate_name }</Tag>
                      <span className="ml10">{ item.name }</span>
                      <span className="ml10">状态: { statusData[item.status] }</span>
                      <span className="ml20">卡号:{ item._sn }</span>
                    </div>
                  </div>
                  <div class="justifyBetween mt20">
                    <span>剩余额度：{ item.card.times_surplus }</span>
                    <span>剩余有效期限：{ residue(item.card.invalid_at)}</span>
                    <span>到期日期：{ getUndefined(parseTime('{y}-{m}-{d}', item.card.invalid_at)) }</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Modal>
    </div>
  )
}

export default forwardRef(TestCard)
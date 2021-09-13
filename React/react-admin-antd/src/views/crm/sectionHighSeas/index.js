import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Select, Button, Table, ConfigProvider, Empty, Modal, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { statusOptions, statusObj, intentionOptions, intentionObj } from '@/utils/data'
import { parseTime } from '@/utils/index'
import { getConfigDetail, getDepartmentIndex, departmentSeasDel } from '@/api/crm'
import AllocationModal from './components/AllocationModal'

const { Column }  = Table
const { confirm } = Modal
function SectionHighSeas() {
  const venueId = useSelector(state => state.venueId)
  const [tableLoading, setTableLoding] = useState(false)
  const [sourceOptions, setSourceOptions] = useState([]) // 来源列表
  const [page, setPage] = useState(1) // 来源列表
  const [limit, setLimit] = useState(10) // 来源列表
  const [total, setTotal] = useState(0) // 来源列表
  const statusSelectList = statusOptions() // 所有状态列表
  const intentionSelectList = intentionOptions()  // 意向列表
  const statusList = statusObj()  // 状态数组
  const intentionList = intentionObj() // 意向数组
  const [resetStatus, setResetStatus] = useState(0) // 重置状态
  const [userIdList, setUserIdList] = useState([]) // 选择的用户ID数组
  const [userDataList, setUserDataList] = useState([]) // 选择的用户数据数组
  const [filterInfo, setFilterInfo] = useState({ mobile: undefined, source: undefined, status: undefined, grade: undefined })
  const [tableData, setTableData] = useState([])
  const allocationModal = useRef()

  useEffect(() => {
    getSource()
    getList()
  }, [venueId])

  useEffect(() => {
    getList()
  }, [page, limit])

  useEffect(() => {
    if (resetStatus === 1) {
      getList()
    }
  }, [resetStatus])

  // 获取来源
  const getSource = () => {
    getConfigDetail({ type: 1 }).then(res => {
      setSourceOptions(res.data)
    })
  }
  // 筛选数据
  const filterData = () => {
    getList()
  }
  // 重置
  const reset = () => {
    setFilterInfo({ mobile: undefined, source: undefined, status: undefined, grade: undefined })
    setResetStatus(1)
  }
  // table  row 配置 包括选择
  const rowSelection = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      setUserIdList(selectedRowKeys)
      setUserDataList(selectedRows)
    }
  }

  // 分页配置
  const pagination = {
    current: page,
    pageSize: limit,
    total: total,
    pageSizeOptions: [10, 20, 30, 50],
    onChange: (page, limit) => {
      setPage(page)
      setLimit(limit)
    }
  }

  // 获取列表数据
  const getList = () => {
    setTableLoding(true)
    getDepartmentIndex({page: page, limit: limit, venue_id: venueId, ...filterInfo}).then(res => {
      setTableLoding(false)
      const {
        items,
        _meta
      } = res.data
      setTableData(items)
      setTotal(_meta.totalCount)
      setResetStatus(0)
    }, () => {
      setTableLoding(false)
    })
  }

  // 分配客户
  const allocationBtn = () => {
    allocationModal.current.showModel()
  }

  const closeAllocationModel = (flag) => {
    console.log(flag)
  }

  // 删除按钮
  const deleteBtn = (item) => {
    let ids = []
      if (item.id) {
        ids.push(item.id)
      } else {
        ids = userIdList
      }
    confirm({
      title: '提示',
      content: '确认要删除吗？',
      cancelText: '取消',
      okText: '确定',
      icon: '',
      onOk() {
        const data = { ids: ids }
        departmentSeasDel(data).then(res => {
          message.success(res.message)
          getList()
        })
      }
    });
  }
  return (
    <div className="pd20">
      <div className="filterData">
        <Input className="w200 mr20" value={filterInfo.mobile} maxLength="11" onChange={event => setFilterInfo({...filterInfo, mobile: event.target.value})} placeholder="输入手机号" />
        <Select className="w200 mr20" value={filterInfo.source} onChange={value => setFilterInfo({...filterInfo, source: value})} placeholder="选择来源">
          {
            sourceOptions.map((item, index) => {
              return (
                <Select.Option value={item.id} key={index}>{item.value}</Select.Option>
              )
            })
          }
        </Select>
        <Select className="w200 mr20" value={filterInfo.status} onChange={value => setFilterInfo({...filterInfo, status: value})} placeholder="选择状态">
          {
            statusSelectList.map((item, index) => {
              return (
                <Select.Option value={item.key} key={index}>{item.label}</Select.Option>
              )
            })
          }
        </Select>
        <Select className="w200 mr20" value={filterInfo.grade} onChange={value => setFilterInfo({...filterInfo, grade: value})} placeholder="选择状态">
          {
            intentionSelectList.map((item, index) => {
              return (
                <Select.Option value={item.key} key={index}>{item.label}</Select.Option>
              )
            })
          }
        </Select>
        <div className="mt20">
          <Button className="mr20" type="primary" icon={<SearchOutlined />} onClick={filterData}>搜索</Button>
          <Button className="mr20" onClick={reset}>重置</Button>
        </div>
      </div>
      <div className="operationData">
        <Button className="mr20" type="primary">添加</Button>
        <Button className="mr20" disabled={userIdList.length === 0} onClick={allocationBtn}>分配客户</Button>
        <Button className="mr20" disabled={userIdList.length === 0} onClick={deleteBtn}>删除</Button>
      </div>
      <div className="contentData">
        <ConfigProvider renderEmpty={() => Empty({description: false})}>
          <Table bordered={true} rowSelection={rowSelection} dataSource={tableData} rowKey="id" loading={tableLoading} pagination={pagination}>
            <Column align="center" title="客户名" render={(value, row, index) => (
              <div>
                <div>{ {1:'个人',2:'企业',3:'学生/儿童'}[row.type] }</div>
                <span>{ row.name }</span>
              </div>
            )} />
            <Column align="center" title="手机号" dataIndex="mobile" />
            <Column align="center" title="客户状态" render={(value, row, index) => (
              <span>{ statusList[row.status] }</span>
            )} />
            <Column align="center" title="意向" render={(value, row, index) => (
              <span>{ intentionList[row.grade] }</span>
            )} />
            <Column align="center" title="客户来源" render={(value, row, index) => (
              sourceOptions.map((item, index) => {
                if (item.id === row.source) {
                  return (<span key={index}>{ item.value }</span>)
                }
              })
            )} />
            <Column align="center" title="前销售" render={(value, row, index) => (
              row.former_follower && (
                <div>
                  <div>
                    <span>{ row.former_follower.department_name }</span>
                    <span> / </span>
                    <span>{ row.former_follower.name }</span>
                  </div>
                  <div>
                    <span>{ row.former_follower.num + '次' }</span>
                    <span> / </span>
                    <span>{ row.former_follower.day + '天' }</span>
                  </div>
                  <div>
                    <span>{ parseTime(row.former_follower.last_time, '{y}-{m}-{d}') }</span>
                  </div>
                </div>
              )
            )} />
            <Column align="center" title="操作" render={(value, row, index) => (
              <div>
                <Button type="link">编辑</Button>
                <Button type="link" onClick={() => deleteBtn(row)}>删除</Button>
              </div>
            )} />
          </Table>
        </ConfigProvider>
      </div>
      <AllocationModal ref={allocationModal} closeModel={closeAllocationModel} userIdList={userIdList} />
    </div>
  )
}
export default SectionHighSeas
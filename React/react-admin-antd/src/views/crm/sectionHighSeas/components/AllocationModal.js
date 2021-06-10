import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { getEmployeeList, departmentAllocation } from '@/api/crm'
import { Input, Select, Modal, message, Form } from 'antd'

const { Item } = Form
const { TextArea } = Input
function AllocationModal(props, ref) {
  const [form] = Form.useForm()
  const [employeeList, setEmployeeList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (isModalVisible) {
      _getEmployeeList()
    }
  }, [isModalVisible])

  const _getEmployeeList = () => {
    getEmployeeList().then(res => {
      const { data } = res
      setEmployeeList(data)
    })
  }

  // 用于父级调用的方法包裹
  useImperativeHandle(ref, () => ({
    showModel: () => {
      setIsModalVisible(true)
    }
  }))

  const handleOk = () => {
    // validateFields 判断验证正确
    form.validateFields().then((data) => {
      // 返回的值为 from表单中的数据
      departmentAllocation({ids: props.userIdList, ...data}).then(res => {
        if (res.code == 1) {
          message.success(res.message)
        }
        handleCancel(1)
      })
        .catch(() => {
          setIsModalVisible(false)
        })
    })
  }
  
  const handleCancel = (flag) => {
    form.setFieldsValue({employee_id: '', remarks: ''})
    setIsModalVisible(false)
    props.closeModel(flag)
  }
  return (
    <div>
      <Modal title="分配客户" width={500} visible={isModalVisible} okText="保存" cancelText="取消" onOk={handleOk} onCancel={() => handleCancel(0)}>
        <Form
          form={form}
          labelCol={{span: 4}}
        >
          <Item
            label="接收对象:"
            name="employee_id"
            rules={[{ required: true, message: '请选择员工' }]}>
              <Select className="w200">
                  {
                    employeeList.map((item, index) => {
                      return (
                        <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                      )
                    })
                  }
              </Select>
          </Item>
          <Item
            label="备注:"
            name="remarks">
              <TextArea autoSize={{minRows: 4, maxRows: 6}}  className="w200" />
          </Item>
        </Form>
      </Modal>
    </div>
  )
}

// 子级必须用forwardRef 包裹才能父级调用方法
export default forwardRef(AllocationModal)
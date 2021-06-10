import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Input, Select, Modal, message, Form } from 'antd'
const { Item } = Form
function AddPotential(props, ref) {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  // 用于父级调用的方法包裹
  useImperativeHandle(ref, () => ({
    showModel: () => {
      setIsModalVisible(true)
    }
  }))

  return (
    <div>aa</div>
  )
}
export default forwardRef(AddPotential)
import React, {useState, useEffect} from 'react'
import { Form, Input, Button } from 'antd';
import { login } from '@/api/user'
import { setToken, setUserData } from '@/utils/auth'
import { message } from 'antd';
import { useHistory } from 'react-router-dom'
import { clearBlank } from '@/utils/index'
import './index.less'
/**
 * const [form] = Form.useForm();
 * from 中 form.setFieldsValue({password: 'xxx'}) 设置值  不会影响from中其他值
 * from 中 form.getFieldsValue() 获取值
 * form.validateFields().then(data => { console.log(data) })  通过promise用来验证from表单 其中resolve中 data是写的from里的数据
 * 
 */
function Login () {
  const [form] = Form.useForm();
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState(false)
  const onFinish = () => {
    console.log('验证成功回调')
  }
  const onFinishFailed = () => {
    console.log('验证失败回调')
  }
  const passwordValidator = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输入密码'))
    } else{
      if (value.length >= 6) {
        callback();
      } else {
        callback('密码长度不能小于6位');
      }
    } 
  }
  // 清空空格
  const clearBlankChange = ({target}) => {
    form.setFieldsValue({password: clearBlank(target.value)})
  }
  const onSubmit = () => {
    // validateFields 判断验证正确
    form.validateFields().then((data) => {
      // 返回的值为 from表单中的数据
      setBtnLoading(true)
      login(data).then(async res => {
        if (res.code == 1) {
          const data = res.data
          setToken(data.access_token)
          setUserData(data)
          message.success(res.message);
          setBtnLoading(false)
          history.push('/')
        }
      })
        .catch(() => {
          setBtnLoading(false)
        })
    })
  }
  return (
    <div className="login">
      <div className="loginBox">
        <div className="title-container">
          <h3 className="title">幸福里智能健身管理平台</h3>
        </div>
        <Form
          className="login-form"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号', validateTrigger: 'blur' }]}
          >
            <Input placeholder="账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, validator: passwordValidator, validateTrigger: 'blur', whitespace: true }]}
          >
            <Input.Password placeholder="密码" onChange={clearBlankChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{width: '100%'}} loading={btnLoading} onClick={onSubmit}>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
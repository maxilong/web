import { Button } from 'antd'
import React from 'react'

function Antbutton (props, state) {
  return (
    <div>
        <Button type="primary" onClick={props.onClick}>{props.name}</Button>
    </div>
  )
}

export default Antbutton
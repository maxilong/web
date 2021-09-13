import React from 'react'
import { isExternal } from '@/utils/validate'
import './index.less'
function SvgIcon(props = {className: ''}) {
  const { iconClass, className } = props
  const iconName = () => {
    return `#icon-${iconClass}`
  }
  const svgClass = () => {
    if (className) {
      return 'svg-icon ' + className
    } else {
      return 'svg-icon'
    }
  }
  const styleExternalIcon = () => {
    return {
      mask: `url(${iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`
    }
  }
  return (
    <>
      {
        isExternal(iconClass)
        ? 
        <div style={ styleExternalIcon } className="svg-external-icon svg-icon"></div>
        :
        <svg className={ svgClass() } aria-hidden="true">
          <use xlinkHref={ iconName() } />
        </svg>
      }
    </>
  )
}

export default SvgIcon
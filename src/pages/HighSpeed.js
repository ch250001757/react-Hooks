import React, { memo } from 'react'
import propTypes from 'prop-types'

import './HighSpeed.css'

export default function HightSpeed(props) {
  const { highSpeed, toggleHighSpeed } = props

  return (
    <div className='high-speed'>
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" >
        <input type="hidden" name="highSpeed" value={highSpeed} />
        <div className="high-speed-track" onClick={() => toggleHighSpeed()}>
          <span className="high-speed-handle"></span>
        </div>
      </div>
    </div>
  )
}

HightSpeed.propTypes = {
  highSpeed: propTypes.bool.isRequired,
  toggleHighSpeed: propTypes.func.isRequired
}

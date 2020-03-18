import React, { useState } from 'react';
import styles from './index.less';
import classNames from 'classnames';

const LayerSelector = props => {
  const [type, setType] = useState('street')
  const { active, night, terrain, satellite, street } = styles
  return (
    <div className={props.style}>
      <div className={styles.box}>
        <a
          className={classNames(night, {
            [`${active}`]: type === 'night',
          })}
          onClick={() => { props.onClick('night'), setType('night') }}>
          <span className={styles.status}>夜 间</span>
        </a>
        <a
          className={classNames(terrain, {
            [`${active}`]: type === 'terrain',
          })}
          onClick={() => { props.onClick('terrain'), setType('terrain') }}>
          <span className={styles.status}>地 形</span>
        </a>
        <a
          className={classNames(satellite, {
            [`${active}`]: type === 'satellite',
          })}
          onClick={() => { props.onClick('satellite'), setType('satellite') }}>
          <span className={styles.status}>卫 星</span>
        </a>
        <a
          className={classNames(street, {
            [`${active}`]: type === 'street',
          })}
          onClick={() => { props.onClick('street'), setType('street') }}>
          <span className={styles.status}>标 准</span>
        </a>
      </div>
    </div >
  )
}

export default LayerSelector
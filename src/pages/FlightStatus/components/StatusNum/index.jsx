import React, { useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import styles from './index.less';
import classNames from 'classnames';

const StatusNum = props => {
  return (
    <Card style={{ ...props.style,width: 200 }}>
      <Row>
        <Col span={16}>在飞数量</Col>
        <Col span={8}>{props.flying}</Col>
      </Row>
    </Card>
  )
}

export default StatusNum
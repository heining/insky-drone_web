// @ts-ignore

import * as React from 'react';
import { Descriptions, message, Row, Col, Card, Statistic, Divider } from 'antd';
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from "bizcharts";
import DataSet from "@antv/data-set";
// import styles from './index.less'

export default class DataCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      //
    }
  }

  componentWillUnmount() {
    //
  }

  async componentDidMount() {
    // this.clickId = ''
    const that = this
  }

  render() {
    return (
      <div style={{ margin: 24 }}>
        <Row gutter={24}>
          <Col span={6}>
            <Card bodyStyle={{ padding: '24px 24px 8px' }}>
              <Statistic
                title="累计飞行时长"
                value={1988}
                precision={0}
                valueStyle={{ fontSize: 30 }}
                suffix="min"
              />
              <Divider style={{ margin: '6px 0' }} />
              <p style={{ margin: 0 }}>今日飞行时长 <span style={{fontSize:16, fontWeight: '600'}}> {'68'} </span> min</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card bodyStyle={{ padding: '24px 24px 8px' }}>
              <Statistic
                title="累计飞行里程"
                value={888}
                precision={0}
                valueStyle={{ fontSize: 30 }}
                suffix="km"
              />
              <Divider style={{ margin: '6px 0' }} />
              <p style={{ margin: 0 }}>今日飞行时长 <span style={{fontSize:16, fontWeight: '600'}}> {'68'} </span> min</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card bodyStyle={{ padding: '24px 24px 8px' }}>
              <Statistic
                title="照片存储量"
                value={12}
                precision={2}
                valueStyle={{ fontSize: 30 }}
                suffix="G"
              />
              <Divider style={{ margin: '6px 0' }} />
              <p style={{ margin: 0 }}>今日飞行时长 <span style={{fontSize:16, fontWeight: '600'}}> {'68'} </span> min</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card bodyStyle={{ padding: '24px 24px 8px' }}>
              <Statistic
                title="视频存储量"
                value={28}
                precision={2}
                valueStyle={{ fontSize: 30 }}
                suffix="G"
              />
              <Divider style={{ margin: '6px 0' }} />
              <p style={{ margin: 0 }}>今日飞行时长 <span style={{fontSize:16, fontWeight: '600'}}> {'68'} </span> min</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

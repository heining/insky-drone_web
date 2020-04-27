import React, { useState } from 'react';
import { message, Table, Row, Col, Button } from 'antd';

message.config({
  top: 100
})

const WaypointsPanel = props => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'Number',
      align: 'center'
    },
    {
      title: '经度',
      dataIndex: 'lon',
      align: 'center'
    },
    {
      title: '纬度',
      dataIndex: 'lat',
      align: 'center'
    },
    {
      title: '相对起飞高度',
      dataIndex: 'relHeight',
      align: 'center'
    },
    {
      title: '巡航速度',
      dataIndex: 'speed',
      align: 'center'
    },
    {
      title: '悬停时间',
      dataIndex: 'hoverTime',
      align: 'center'
    },
    {
      title: '飞行动作',
      dataIndex: 'flyAction',
      align: 'center'
    },
    {
      title: '自动继续',
      dataIndex: 'autoContinue',
      align: 'center'
    },
    {
      title: '是否必经点',
      dataIndex: 'mustPass',
      align: 'center'
    },
    {
      title: '载荷动作',
      dataIndex: 'loadAtion',
      align: 'center'
    },
  ];
  return (
    <div
      style={{ ...props.style, backgroundColor: '#fff', borderRadius: 8 }}
      onClick={() => {
        //
      }}
    >
      <Row gutter={[0, 20]} style={{ backgroundColor: '#e6f7ff' }}>
        <Col span={24} offset={1}>航点信息面板（单击鼠标左键选择航点，双击处结束绘制）</Col>
      </Row>
      <Row gutter={[0, 10]}>
        <Col span={4} offset={1}>航线长度：{props.lineLength} km</Col>
        <Col span={4}>航点个数：{props.pointNum} 个</Col>
        <Col span={2} offset={9}>
          <Button
            type="primary"
            onClick={() => {
              const key = 'save'
              if (props.pointNum) {
                message.loading({ content: '航线保存中', key });
                setTimeout(() => {
                  message.success({ content: '航线已保存', key, duration: 2 });
                }, 1000);
              }
            }}
          >保存航线</Button>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            onClick={() => {
              const key = 'send'
              if (props.pointNum) {
                message.loading({ content: '航线发送中', key });
                setTimeout(() => {
                  message.success({ content: '航线已发送', key, duration: 2 });
                }, 1000);
              }
            }}
          >传给设备</Button>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            href="https://inskylab-1300438841.cos.ap-shanghai.myqcloud.com/image/20200427/704373472922435584.geojson"
          >导出航线</Button>
        </Col>
      </Row>
      <Row>
        <Col span={23} offset={1}>
          <Table columns={columns} dataSource={props.data} size="small" pagination={false} rowKey='Number' scroll={{ y: 240 }} />
        </Col>
      </Row>
    </div>
  );
};

export default WaypointsPanel;
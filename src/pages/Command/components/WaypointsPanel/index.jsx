import { Table } from 'antd';
import React, { useState } from 'react';

const WaypointsPanel = props => {
  const [data,setData] = useState([]);
  const columns = [
    {
      title: '序号',
      dataIndex: 'Number',
    },
    {
      title: '经度',
      dataIndex: 'longitude',
    },
    {
      title: '纬度',
      dataIndex: 'latitude',
    },
    {
      title: '相对起飞高度',
      dataIndex: 'relHeight',
    },
    {
      title: '巡航速度',
      dataIndex: 'speed',
    },
    {
      title: '悬停时间',
      dataIndex: 'hoverTime',
    },
    {
      title: '飞行动作',
      dataIndex: 'flyAction',
    },
    {
      title: '自动继续',
      dataIndex: 'autoContinue',
    },
    {
      title: '是否必经点',
      dataIndex: 'mustPass',
    },
    {
      title: '载荷动作',
      dataIndex: 'loadAtion',
    },
  ];
  return (
    <div
      style={props.style}
      onClick={() => {
        //
      }}
    >
      <Table columns={columns} dataSource={data} size="small" pagination={false} />
    </div>
  );
};

export default WaypointsPanel;
import { Tabs, Form } from 'antd';
import React, { useState } from 'react';
import useMergeValue from 'use-merge-value';

const ToolsBar = props => {
  const [layerShow, setLayerShow] = useState(true);
  return (
    <div
      style={{
        position: 'absolute',
        right: 48,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        backgroundColor: '#47caff',
        borderRadius: 8,
      }}
      onClick={() => {
        props.onClick(layerShow), setLayerShow(!layerShow);
      }}
    >
      <img src={require('../../../../assets/layer_icon.png')} style={{ width: 32, height: 32 }} />
    </div>
  );
};

export default ToolsBar;
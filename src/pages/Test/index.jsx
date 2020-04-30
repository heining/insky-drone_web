// @ts-ignore

import * as React from 'react';
import { LineLayer, Scene, Scale, Zoom, Popup, Marker, MarkerLayer, PointLayer } from '@antv/l7';
import { Descriptions, message } from 'antd';
// import * as Cesium from 'cesium';
// import styles from './index.less'

// const Cesium = require('cesium')

export default class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      pointNum: 0,
      lineLength: 0,
      points: []
    }
  }

  componentWillUnmount() {
    //
  }

  componentDidMount() {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OWU4YjJlNi02ZmEwLTRhNDYtOTYxZi04YjQwNzNkNmI2ZDAiLCJpZCI6MjY3NzIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODgyMzA3NDB9.Q-Jmip4jm7skykuWM293UPgxQrYROWrxqwekDQx78Ak';
    const viewer = new Cesium.Viewer('cesiumContainer', {
      // imageryProvider: new Cesium.TileMapServiceImageryProvider({
      //   url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
      // }),
      bottomContainer: false,
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      sceneModePicker: false,
      homeButton: false,
      infoBox: false,
      geocoder: false,
      navigationHelpButton: false,
    });
  }

  render() {
    const { points, pointNum, lineLength } = this.state
    return (
      <div style={{ display: 'flex',height:'100%' }}>
        <div
          id="cesiumContainer"
          style={{
            // position: 'absolute',
            // paddingTop: 64,
            width: '100%',
            height: window.innerHeight - 64,
          }}
        />
      </div>
    );
  }
}

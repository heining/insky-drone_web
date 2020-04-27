// @ts-ignore
/**
 * devices      --所有设备的点集合
 * drones       --所有工作设备的集合
 * lines        --所有工作设备的轨迹集合
 */

import * as React from 'react';
import { LineLayer, Scene, Scale, Zoom, Popup, Marker, MarkerLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import AMapLoader from '@amap/amap-jsapi-loader';
import { Descriptions, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import WaypointsPanel from './components/WaypointsPanel'
// import styles from './index.less'

export default class Command extends React.Component {
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

  async componentDidMount() {
    // this.clickId = ''
    const that = this
    let map
    await AMapLoader.load({
      "key": "4ce6d31bb6e3a28c30920cd644d1a85f",   // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [
        'AMap.Scale',
        'AMap.MouseTool',
        'AMap.PolylineEditor'
      ]  //插件列表
    }).then((AMap) => {
      map = new AMap.Map('map', {
        // viewMode: '3D',
        // pitch: 0,
        // center: center,
        resizeEnable: true,
        // zoom: 19,
      });
    }).catch(e => {
      console.log(e);
    })

    const mouseTool = new AMap.MouseTool(map)
    mouseTool.polyline({
      strokeColor: '#096dd9',
      strokeWeight: 5,
      // lineCap: 'round'
      //同Polyline的Option设置
    });
    mouseTool.on('draw', (e) => {
      console.log(e.obj)
      let lineLength = Math.round(AMap.GeometryUtil.distanceOfLine(e.obj.$x[0])) / 1000
      let points = []
      e.obj.$x[0].forEach((v, i) => {
        console.log(v)
        let point = {
          Number: i + 1,
          lon: v[0],
          lat: v[1],
          relHeight: '-',
          speed: '-',
          hoverTime: '-',
          flyAction: '-',
          autoContinue: '-',
          mustPass: '-',
          loadAtion: '-',
        }
        points.push(point)
      })
      that.setState({
        lineLength,
        points,
        pointNum: points.length
      })
      const polyEditor = new AMap.PolylineEditor(map, e.obj)
      polyEditor.setTarget(e.obj)
      console.log(lineLength)
      polyEditor.open()
      polyEditor.on('addnode', data => {
        lineLength = Math.round(AMap.GeometryUtil.distanceOfLine(data.target.$x[0])) / 1000
        const _points = []
        data.target.$x[0].forEach((v, i) => {
          console.log(v)
          let point = {
            Number: i + 1,
            lon: v[0],
            lat: v[1],
            relHeight: '-',
            speed: '-',
            hoverTime: '-',
            flyAction: '-',
            autoContinue: '-',
            mustPass: '-',
            loadAtion: '-',
          }
          _points.push(point)
        })
        that.setState({
          lineLength,
          points: _points,
          pointNum: _points.length
        })
      })
      polyEditor.on('adjust', data => {
        lineLength = Math.round(AMap.GeometryUtil.distanceOfLine(data.target.$x[0])) / 1000
        const _points = []
        data.target.$x[0].forEach((v, i) => {
          console.log(v)
          let point = {
            Number: i + 1,
            lon: v[0],
            lat: v[1],
            relHeight: '-',
            speed: '-',
            hoverTime: '-',
            flyAction: '-',
            autoContinue: '-',
            mustPass: '-',
            loadAtion: '-',
          }
          _points.push(point)
        })
        that.setState({
          lineLength,
          points: _points,
          pointNum: _points.length
        })
      })
      polyEditor.on('removenode', data => {
        lineLength = Math.round(AMap.GeometryUtil.distanceOfLine(data.target.$x[0])) / 1000
        const _points = []
        data.target.$x[0].forEach((v, i) => {
          console.log(v)
          let point = {
            Number: i + 1,
            lon: v[0],
            lat: v[1],
            relHeight: '-',
            speed: '-',
            hoverTime: '-',
            flyAction: '-',
            autoContinue: '-',
            mustPass: '-',
            loadAtion: '-',
          }
          _points.push(point)
        })
        that.setState({
          lineLength,
          points: _points,
          pointNum: _points.length
        })
      })
      mouseTool.close()
    })

    // 比例尺空间展示
    var scale = new AMap.Scale({});
    map.addControl(scale);

    // 监听鼠标位置经纬度
    map.on('mousemove', e => {
      this.setState({
        lng: e.lnglat.lng,
        lat: e.lnglat.lat,
      })
    })

    // 监听地图缩放级别
    map.on('zoomchange', () => {
      this.setState({
        zoom: map.getZoom()
      })
    });
  }

  renderLnglat = () => {
    const { zoom, lng, lat } = this.state
    return <div style={{ position: 'absolute', display: 'flex', bottom: 3, left: '24%', color: '#001529', fontWeight: '600', textShadow: '#fff 2px 0 0,#fff 0 2px 0,#fff -2px 0 0,#fff 0 -2px 0' }}>
      {lng ?
        <div style={{ width: 130 }}>经度：{lng}</div> : <div></div>
      }
      {lat ?
        <div style={{ width: 130 }}>纬度：{lat}</div> : <div></div>
      }
      <div style={{ width: 130 }}>缩放级别：{zoom}</div>
    </div>
  }

  renderLayerSelector() {
    return (
      <LayerSelector style={styles.layerSelector} onClick={value => this.handleChangeLayer(value)}></LayerSelector>
    )
  }

  render() {
    const { points, pointNum, lineLength } = this.state
    return (
      <div>
        <div
          id="map"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        />
        {/* <div
          style={{ position: 'absolute', right: 48, marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, backgroundColor: '#47caff', borderRadius: 8 }}
          onClick={() => { }}
        >
          <img src={require('../../assets/line.png')} style={{ width: 32, height: 32 }} />
        </div> */}
        <WaypointsPanel style={{ position: 'absolute', bottom: 0, right: 0, width: '60%' }} data={points} pointNum={pointNum} lineLength={lineLength} />
      </div>
    );
  }
}

// @ts-ignore
/**
 * devices      --所有设备的点集合
 * drones       --所有工作设备的集合
 * lines        --所有工作设备的轨迹集合
 */

import * as React from 'react';
import { LineLayer, Scene, Scale, Zoom, Popup, Marker, MarkerLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import { Descriptions, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import sdk, { Client } from 'urtc-sdk';
import { RouteIcon } from '@/components/InskyIcon';
import { getDevice, wss } from './service';
import styles from './index.less'
import { MediaPlayer, LayerSelector, StatusNum } from './components/index';

const markerColors = ['ger5', 'b4p4', 'c4o6', 'gep4', 'l6v5', 'm4ge', 'y6ge', 'm4ge', 'l6v5']
const colors = {
  red5: '#ff4d4f',
  volcano5: '#ff7a45',
  orange6: '#fa8c16',
  gold6: '#faad14',
  yellow6: '#fadb14',
  lime6: '#a0d911',
  green4: '#95de64',
  cyan4: '#5cdbd3',
  blue4: '#69c0ff',
  geek6: '#2f54eb',
  purple4: '#b37feb',
  magenta4: '#ff85c0',
  gray6: '#bfbfbf'
}
const AppId = 'urtc-pynapzli'
const AppKey = '384d6fc6b005a8d2897f6225c18f30c9'
const UserId = 'afnyhnizq9l4l9ev_camera3008352352352352'
// const RoomId = '123'

export default class FlightStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: {},
      clickedId: '',
      userId: UserId,
      isJoinedRoom: false,
      remoteStream: null,
      enlarge: false,
      zoom: '',
      lng: '',
      lat: '',
      flying:0,
    }
  }

  componentWillUnmount() {
    if (this.ws && this.scene) {
      this.scene.destroy();
      this.ws.close()
    }
    this.handleLeaveRoom();
    // clearTimeout(this.time)
  }

  async componentDidMount() {
    // this.clickId = ''
    const that = this

    //创建地图，并传入L7
    const map = new AMap.Map('map', {
      // viewMode: '3D',
      // pitch: 0,
      // center: center,
      resizeEnable: true,
      // zoom: 19,
    })
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        mapInstance: map,
      }),
      logoVisible: false
    });
    this.map = map
    this.scene = scene
    this.setState({
      zoom: map.getZoom()
    })

    const satellite = new AMap.TileLayer.Satellite()
    map.add(satellite)
    satellite.hide()
    this.satellite = satellite

    map.on('click', (e) => {
      if (this.infoWindow.getIsOpen()) {
        this.infoWindow.close()
      }
    })

    const geoJSON_xzm = require('../../assets/airport_xzm.json')
    const geoJSON_jkq = require('../../assets/airport_jkq.json')
    // 禁飞区
    const geojson_xzm = new AMap.GeoJSON({
      geoJSON: geoJSON_xzm,
      // 还可以自定义getMarker和getPolyline
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          strokeOpacity: 0,
          strokeWeight: 0,
          fillColor: 'red',
          fillOpacity: 0.5
        });
      }
    });
    const geojson_jkq = new AMap.GeoJSON({
      geoJSON: geoJSON_jkq,
      // 还可以自定义getMarker和getPolyline
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          strokeOpacity: 0,
          strokeWeight: 0,
          fillColor: 'grey',
          fillOpacity: 0.4
        });
      }
    });
    map.add(geojson_xzm)
    map.add(geojson_jkq)

    // let ws = new WebSocket('wss://api.inskydrone.cn/websocket')

    // 获取设备数据信息
    const res = await getDevice()
    if (res.status) return
    const _data = res.data
    console.log(_data)

    // const data = this.dataParse(_data)
    const data = _data

    // 初始化设备信息、轨迹
    let markers = []
    let devices = {}
    let lines = {}
    let points = {}
    for (let i in data) {
      // const lng = data[i].gps.longitude
      // const lat = data[i].gps.latitude
      const marker = this.createDrone(markerColors[i], data[i])
      const line = this.createLine()
      devices[data[i].id] = marker
      lines[data[i].id] = line
      points[data[i].id] = []
      markers.push(marker)
    }
    this.devices = devices
    this.lines = lines
    this.points = points

    // 创建自定义窗体
    let infoWindow = new AMap.InfoWindow({
      isCustom: true,  //使用自定义窗体
      // content: this.createInfoWindow(),
      // closeWhenClickMap: true,
      offset: new AMap.Pixel(0, -20),
      autoMove: true
    });
    this.infoWindow = infoWindow

    let opened = false

    // 新建websocket连接
    // let ws = new WebSocket('wss://api.inskydrone.cn/websocket')
    let ws = new WebSocket('ws://localhost:8888')
    this.ws = ws
    // 连接成功就会执行回调函数
    ws.onopen = function (params) {
      console.log('客户端连接成功')
    }
    // 必须用属性的方式监听事件，监听函数的参数是事件对象
    ws.onmessage = function (e) {
      // let _data = unescape(e.data)
      // _data = _data.substring(0, _data.lastIndexOf('=')) + ''
      // 返回[]和{}做区分
      try {
        const point = JSON.parse(e.data)
        // const point = JSON.parse(_data)
        let statusData = []
        console.log(point)
        if (Object.prototype.toString.call(point) === '[object Object]') {
          console.log('many')
          statusData.push(point)
        } else {
          statusData = point
        }
        that.setState({ flying: statusData.length })
        statusData.forEach((item) => {
          console.log(item)
          const _point = new AMap.LngLat(Number(item.gps.longitude).toFixed(6), Number(item.gps.latitude).toFixed(6))//Number只在Mock时需要
          points[item.deviceId].push(_point)
          devices[item.deviceId].setPosition(_point)
          devices[item.deviceId].setExtData(item)
          map.add(devices[item.deviceId])
          if (that.state.clickedId === item.deviceId) {
            infoWindow.setPosition(_point)
            infoWindow.setContent(that.createInfoWindow(item))
          }
          lines[item.deviceId].setPath(points[item.deviceId])
        })
        // console.log(_data)
        // const lnglat = GPS.gcj_encrypt((point.gps.latitude).toFixed(6), (point.gps.longitude).toFixed(6))
        // const _point = new AMap.LngLat(lnglat[0], lnglat[1])
        // const _point = new AMap.LngLat(Number(point.gps.longitude).toFixed(6), Number(point.gps.latitude).toFixed(6))//Number只在Mock时需要
        // points[point.deviceId].push(_point)
        // devices[point.deviceId].setPosition(_point)
        // devices[point.deviceId].setExtData(point)
        // map.add(devices[point.deviceId])
        // if (that.state.clickedId === point.deviceId) {
        //   infoWindow.setPosition(_point)
        //   infoWindow.setContent(that.createInfoWindow(point))
        // }
        // lines[point.deviceId].setPath(points[point.deviceId])
      } catch (error) {
        return
      }
    }

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
      console.log(map.getZoom())
    });
  }

  // websocket数据格式转换
  dataParse = (data) => {
    console.log(data)
    const _data = JSON.parse(JSON.stringify(data))
    for (const v of _data) {
      for (let i in v) {
        if (v[i].includes('{')) {
          v[i] = JSON.parse(v[i])
        }
      }
    }
    console.log(_data)
    return _data
  }

  // 创建机场障碍物限制面图层
  createXZM = () => {
    const geoJSON_xzm = require('../../assets/airport_xzm.json')
    const geojson_xzm = new AMap.GeoJSON({
      geoJSON: geoJSON_xzm,
      getPolygon: (geojson, lnglats) => {
        return new AMap.Polygon({
          path: lnglats,
          strokeOpacity: 0,
          strokeWeight: 0,
          fillColor: 'red',
          fillOpacity: 0.5
        })
      }
    })
    this.map.add(geojson_xzm)
  }

  // 创建机场净空区图层
  createJKQ = () => {
    const geoJSON_jkq = require('../../assets/airport_jkq.json')
    const geojson_jkq = new AMap.GeoJSON({
      geoJSON: geoJSON_jkq,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          strokeOpacity: 0,
          strokeWeight: 0,
          fillColor: 'grey',
          fillOpacity: 0.5
        });
      }
    });
    this.map.add(geojson_jkq)
  }

  // 修改地图图层
  handleChangeLayer = (v) => {
    if (v === 'satellite') {
      this.satellite.show()
      this.map.setMapStyle('')
    } else if (v === 'street') {
      this.map.setMapStyle('amap://styles/normal')
      this.satellite.hide()
    } else if (v === 'night') {
      this.map.setMapStyle('amap://styles/15ae9e43eacdbb1285bb6297d3414c44')
      this.satellite.hide()
    }
  }

  // 创建自定义信息展示窗口
  createInfoWindow(data) {
    console.log(data)
    const that = this
    const info = document.createElement("div")
    info.className = styles.info
    const infoWin = document.createElement('div')
    infoWin.className = styles.infoWin
    // 创建顶部型号
    const top = document.createElement('div')
    top.className = styles.top
    top.innerHTML = `型号：${data.deviceId}`
    infoWin.appendChild(top)
    // 创建中部设备信息
    const middle = document.createElement('div')
    middle.className = styles.middle
    const middle_l = document.createElement('div')
    middle_l.className = styles.middle_l
    middle_l.innerHTML = `地面速度：${(data.speed.groundSpeed).toFixed(2)} m/s</br>爬升速度：${(data.speed.climbSpeed).toFixed(2)} m/s</br>高度：${(data.gps.altitude).toFixed(2)}`
    const middle_r = document.createElement('div')
    middle_r.className = styles.middle_r
    middle_r.innerHTML = `经度：${Number(data.gps.longitude).toFixed(6)}</br>纬度：${Number(data.gps.latitude).toFixed(6)}</br>电量：${(data.battery.current).toFixed(2)}%`//正式环境不使用Number
    middle.appendChild(middle_l)
    middle.appendChild(middle_r)
    infoWin.appendChild(middle)
    // 创建底部展示轨迹button
    const bottom = document.createElement('div')
    bottom.className = styles.bottom
    const btnLine = document.createElement('button')
    btnLine.className = styles.btn
    btnLine.innerHTML = '显示/隐藏轨迹'
    btnLine.onclick = () => {
      this.changeLine(data)
    }
    // 创建底部实时画面button
    const btnLive = document.createElement('button')
    btnLive.className = styles.btn
    btnLive.innerHTML = '实时画面'
    btnLive.onclick = () => {
      if (this.state.isJoinedRoom) {
        this.handleLeaveRoom()
      } else {
        console.log(this.state.clickedId)
        this.createURTC(AppId, AppKey, this.state.clickedId, UserId)
        this.handleJoinRoom()
      }
    }
    bottom.appendChild(btnLine)
    bottom.appendChild(btnLive)
    infoWin.appendChild(bottom)
    info.appendChild(infoWin)
    return info
  }

  changeLine(data) {
    let line = this.lines[data.deviceId]
    if (line.extData) {
      line.hide()
      line.extData = false
    } else {
      line.show()
      line.extData = true
    }
  }

  // 创建设备飞行轨迹
  createLine(color) {
    let polyline = new AMap.Polyline({
      strokeColor: 'red', // 线条颜色(多条须不同颜色)
      lineJoin: 'round', // 折线拐点连接处样式
      extData: false
    });
    polyline.hide()
    this.map.add(polyline)
    return polyline
  }

  // 创建自定义图标设备
  createDrone(img, data) {
    // const gps = data.gps
    // const position = GPS.gcj_encrypt(gps.latitude, gps.longitude)
    // const position = [gps.longitude, gps.latitude]
    // const position = [121.606803, 31.203302]
    const that = this
    const icon = new AMap.Icon({
      image: require(`../../assets/icons/drone_${img}.png`),
      size: new AMap.Size(28, 28),
      imageSize: new AMap.Size(28, 28)
    });
    let marker = new AMap.Marker({
      offset: new AMap.Pixel(-14, -14),
      icon: icon,
      extData: data
    });
    marker.on('click', (e) => {
      // console.log(e)
      // e.domEvent.stopPropagation()
      // that.setState({
      //   clickdeId: data.deviceId
      // })
      that.state.clickedId = data.id
      that.changeInfoWin(data)
    })
    return marker
  }

  // 改变自定义窗体的状态
  changeInfoWin(_data) {
    console.log(_data)
    const { clicked, remoteStream } = this.state
    const data = this.devices[_data.id].getExtData()
    let gps = data.gps
    const isOpen = this.infoWindow.getIsOpen()
    // if(!gps.longitude){
    //   gps = JSON.parse(gps)
    // }
    // console.log(data.gps)
    // const lnglat = GPS.gcj_encrypt(gps.latitude, gps.longitude)
    // const _point = new AMap.LngLat(lnglat[0], lnglat[1])
    const _point = new AMap.LngLat(gps.longitude, gps.latitude)
    if (isOpen) {
      console.log(clicked.deviceId, data.deviceId)
      if (clicked.deviceId === data.deviceId) {
        this.infoWindow.close()
      } else {
        this.handleLeaveRoom()
        this.infoWindow.setPosition(_point)
        this.infoWindow.setContent(this.createInfoWindow(data))
        this.setState({
          clicked: data
        })
      }
      // this.handleLeaveRoom()
    } else {
      if (clicked.deviceId !== data.deviceId && remoteStream) {
        this.handleLeaveRoom()
      }
      this.infoWindow.setContent(this.createInfoWindow(data))
      this.infoWindow.open(this.map, _point)
      this.setState({
        clicked: data
      })
    }
  }

  // 创建URTC的client
  createURTC = (appId, appKey, roomId, userId) => {
    const token = sdk.generateToken(appId, appKey, String(roomId), userId);
    this.client = new Client(appId, token);
    this.client.on('stream-added', (remoteStream) => {
      console.info('stream-added: ', remoteStream);
      // 自动订阅
      this.client.subscribe(remoteStream.sid, (err) => {
        console.error('自动订阅失败：', err);
      });
      this.setState({ remoteStream });
    });
    // this.client.on('stream-published', (localStream) => {
    //   console.info('stream-published: ', localStream);
    //   const { localStreams } = this.state;
    //   localStreams.push(localStream);
    //   this.setState({ localStreams });
    // });
    this.client.on('stream-subscribed', (remoteStream) => {
      console.info('stream-subscribed: ', remoteStream);
      this.setState({ remoteStream });
    });
    this.client.on('stream-removed', (remoteStream) => {
      console.info('stream-removed: ', remoteStream);
      this.handleLeaveRoom()
    });
  }

  // 进入画面房间
  handleJoinRoom() {
    console.log(this.client)
    const { clicked, userId, isJoinedRoom } = this.state;
    if (isJoinedRoom) {
      alert('已经加入了房间');
      return;
    }
    this.client.joinRoom('1248148100363587585', userId, () => {
      message.config({
        top: 100,
      });
      console.info('加入房间成功', this.state.remoteStream);
      this.setState({ isJoinedRoom: true });
      this.time = setTimeout(() => {
        console.log(this.state.remoteStream)
        if (!this.state.remoteStream) {
          message.warning('暂无实时画面，请稍后再试', 2)
          this.handleLeaveRoom()
        }
        this.time = null
      }, 500);
    }, (err) => {
      console.error('加入房间失败： ', err);
    });
  }
  // 离开画面房间
  handleLeaveRoom() {
    const { isJoinedRoom } = this.state;
    if (!isJoinedRoom) {
      return;
    }
    this.client.leaveRoom(() => {
      console.info('离开房间成功');
      this.setState({
        remoteStream: null,
        isJoinedRoom: false,
      });
      this.client = null
    }, (err) => {
      console.error('离开房间失败：', err);
    });
  }
  // 视频订阅
  handleSubscribe = () => {
    const { remoteStream } = this.state;
    if (remoteStream) {
      this.client.subscribe(remoteStream.sid, (err) => {
        console.error('订阅失败：', err);
      });
    }
  }
  // 取消视频订阅
  handleUnsubscribe = () => {
    const { remoteStream } = this.state;
    if (remoteStream) {
      this.client.unsubscribe(remoteStream.sid, (stream) => {
        console.info('取消订阅成功：', stream);
      }, (err) => {
        console.error('订阅失败：', err);
      });
    }
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

  renderRemoteStream() {
    const { remoteStream, enlarge } = this.state;
    return remoteStream && !enlarge
      ? <div className={styles.box} onClick={(e) => { this.setState({ enlarge: true }) }}>
        <div className={styles.closer} onClick={(e) => { e.stopPropagation(), this.handleLeaveRoom() }}>
          <CloseOutlined />
        </div>
        <MediaPlayer style={{ width: 360 }} key={remoteStream.sid} client={this.client} stream={remoteStream} />
      </div>
      : <div></div>
  }

  renderVideoLarge() {
    const { remoteStream, enlarge } = this.state
    return remoteStream && enlarge
      ? <div className={styles.videoLarge} onClick={() => { this.setState({ enlarge: false }) }}>
        <MediaPlayer style={{ width: document.body.clientWidth * 40 / 100 }} key={remoteStream.sid} client={this.client} stream={remoteStream} />
      </div> : <div></div>
  }

  renderLayerSelector() {
    return (
      <LayerSelector style={styles.layerSelector} onClick={value => this.handleChangeLayer(value)}></LayerSelector>
    )
  }

  render() {
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
        {this.renderRemoteStream()}
        {this.renderLnglat()}
        {this.renderLayerSelector()}
        {this.renderVideoLarge()}
        <StatusNum style={{ position: 'absolute', right: 0, top: '50%' }} flying={this.state.flying} />
      </div>
    );
  }
}

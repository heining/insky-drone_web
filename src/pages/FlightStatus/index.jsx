// @ts-ignore
/**
 * devices      --所有设备的点集合
 * drones       --所有工作设备的集合
 * lines        --所有工作设备的轨迹集合
 */

import * as React from 'react';
import { LineLayer, Scene, Scale, Zoom, Popup, Marker, MarkerLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import { Descriptions } from 'antd';
import sdk, { Client } from 'urtc-sdk';
import { RouteIcon } from '@/components/InskyIcon';
import { getDeviceData, getDeviceDataId } from './service';
import styles from './FlightStatus.less'
import MediaPlayer from './components/MediaPlayer';

const markerColors = ['ger5', 'b4p4', 'c4o6', 'gep4', 'l6v5', 'm4ge']
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
const UserId = 'afnyhnizq9l4l9ev_camera3' + Math.floor(Math.random() * 1000000).toString();
const RoomId = '123'

export default class FlightStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: {},
      clickedId: '',
      roomId: '123',
      userId: UserId,
      isJoinedRoom: false,
      remoteStream: null,
    }
  }

  componentWillUnmount() {
    this.scene.destroy();
    this.ws.close()
  }

  async componentDidMount() {
    // this.clickId = ''
    const that = this
    //创建地图，并传入L7
    const map = new AMap.Map('map', {
      // viewMode: '3D',
      // pitch: 0,
      center: [121.56131744384767, 31.231298103688736],
      resizeEnable: true,
      zoom: 12,
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

    // 获取设备数据信息
    const res = await getDeviceData()
    if (res.status) return
    const data = res.data
    console.log(data)

    // 初始化设备信息、轨迹
    let markers = []
    let devices = {}
    let lines = {}
    let points = {}
    for (let i in data) {
      const lng = data[i].gps.longitude
      const lat = data[i].gps.latitude
      const marker = this.createDrone(markerColors[i], lng, lat, data[i])
      const line = this.createLine()
      devices[data[i].deviceId] = marker
      lines[data[i].deviceId] = line
      points[data[i].deviceId] = []
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
    let ws = new WebSocket('ws://localhost:8089/websocket')
    this.ws = ws
    // 连接成功就会执行回调函数
    ws.onopen = function (params) {
      console.log('客户端连接成功')
    }
    // 必须用属性的方式监听事件，监听函数的参数是事件对象
    ws.onmessage = function (e) {
      // 返回[]和{}做区分
      try {
        const point = JSON.parse(e.data)
        // console.log(point.gps.longitude, point.gps.latitude)
        const _point = new AMap.LngLat(point.gps.longitude, point.gps.latitude)
        points[point.deviceId].push(_point)
        devices[point.deviceId].setPosition(_point)
        devices[point.deviceId].setExtData(point)
        console.log(that.state.clickdeId, point.deviceId)
        if (that.state.clickedId === point.deviceId) {
          infoWindow.setPosition(_point)
          infoWindow.setContent(that.createInfoWindow(point, that.ts))
        }
        lines[point.deviceId].setPath(points[point.deviceId])
      } catch (error) {
        return
      }
      // points.push(point)
    }

    map.add(markers);

    // 创建地图类型切换插件
    // var type = new AMap.MapType({
    //   defaultType: 0 //使用2D地图
    // });
    // map.addControl(type);

    // 比例尺空间展示
    var scale = new AMap.Scale({});
    map.addControl(scale);

    // 监听鼠标位置经纬度
    // map.on('mousemove',e => {console.log(e)})

  }

  // 创建自定义信息展示窗口
  createInfoWindow(data) {
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
    middle_l.innerHTML = `地面速度：${'25m/s'}</br>爬升速度：${'3m/s'}</br>姿态角：${'3m/s'}`
    const middle_r = document.createElement('div')
    middle_r.className = styles.middle_r
    middle_r.innerHTML = `经度：${data.gps.longitude}</br>纬度：${data.gps.latitude}</br>电量：${data.battery.current}%`
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
      this.createURTC(AppId, AppKey, RoomId, UserId)
    }
    bottom.appendChild(btnLine)
    bottom.appendChild(btnLive)
    infoWin.appendChild(bottom)
    info.appendChild(infoWin)
    return info
  }

  changeLine(data) {
    console.log(data)
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
    polyline.setMap(this.map)
    return polyline
  }

  // 创建自定义图标设备
  createDrone(img, lng, lat, data) {
    const that = this
    const icon = new AMap.Icon({
      image: require(`../../assets/icons/drone_${img}.png`),
      size: new AMap.Size(28, 28),
      imageSize: new AMap.Size(28, 28)
    });
    let marker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
      offset: new AMap.Pixel(-14, -14),
      icon: icon,
      extData: data
    });
    AMap.event.addListener(marker, 'click', (e) => {
      console.log(e)
      that.state.clickedId = data.deviceId
      that.changeInfoWin(data)
    })
    return marker
  }

  // 改变自定义窗体的状态
  changeInfoWin(_data) {
    const data = this.devices[_data.deviceId].getExtData()
    const isOpen = this.infoWindow.getIsOpen()
    const _point = new AMap.LngLat(data.gps.longitude, data.gps.latitude)
    if (isOpen) {
      console.log(this.state.clicked.deviceId, data.deviceId)
      if (this.state.clicked.deviceId === data.deviceId) {
        this.infoWindow.close()
      } else {
        this.infoWindow.setPosition(_point)
        this.infoWindow.setContent(this.createInfoWindow(data))
        this.state.clicked = data
      }
    } else {
      console.log('noOpen')
      this.infoWindow.setContent(this.createInfoWindow(data))
      this.infoWindow.open(this.map, _point)
      this.state.clicked = data
    }
  }

  // 创建URTC的client
  createURTC = (AppId, AppKey, RoomId, UserId) => {
    const token = sdk.generateToken(AppId, AppKey, RoomId, UserId);
    console.log(token)
    this.client = new Client(AppId, token);
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
      this.setState({ remoteStream: null });
    });
    this.handleJoinRoom()
  }

  // 进入画面房间
  handleJoinRoom = () => {
    const { userId, isJoinedRoom } = this.state;
    if (isJoinedRoom) {
      alert('已经加入了房间');
      return;
    }
    this.client.joinRoom(RoomId, userId, () => {
      console.info('加入房间成功');
      this.setState({ isJoinedRoom: true });
    }, (err) => {
      console.error('加入房间失败： ', err);
    });
  }

  renderRemoteStream() {
    const { remoteStream } = this.state;
    return remoteStream
      ? <div style={{ position: 'absolute', right: 20, bottom: 20 }}>
        <MediaPlayer style={{ width: 320 }} key={remoteStream.sid} client={this.client} stream={remoteStream} />
      </div>
      : <div></div>
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
        {
          this.renderRemoteStream()
        }
      </div>
    );
  }
}

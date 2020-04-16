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
import { GPS } from '@/utils/gpstogd'
import { getDevice } from './service';
import styles from './index.less'
import { MediaPlayer, LayerSelector } from './components/index';

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
    }
  }

  componentWillUnmount() {
    if(this.ws && this.scene){
      this.scene.destroy();
      this.ws.close()
    }
    this.handleLeaveRoom();
    // clearTimeout(this.time)
  }

  async componentDidMount() {
    // this.clickId = ''
    const that = this

    // 获取所在位置中心坐标
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：5s
      buttonPosition: 'LB',    //定位按钮的停靠位置
      buttonOffset: new AMap.Pixel(10, 30),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
    })
    let center
    geolocation.getCurrentPosition((status, res) => {
      if (status === 'complete') {
        center = res.position
        console.log(res.position)
      } else {
        center = [113.57131744384767, 22.271298103688736]
      }
    })
    
    //创建地图，并传入L7
    const map = new AMap.Map('map', {
      // viewMode: '3D',
      // pitch: 0,
      center: center,
      resizeEnable: true,
      showIndoorMap: false,
      zoom: 18,
    })
    map.addControl(geolocation)
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
    satellite.setMap(map)
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
    geojson_xzm.setMap(map)
    geojson_jkq.setMap(map)

    // let ws = new WebSocket('wss://api.inskydrone.cn/websocket')

    // 获取设备数据信息
    const res = await getDevice()
    if (res.status) return
    const _data = res.data

    const data = this.dataParse(_data)

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
    // let ws = new WebSocket('ws://localhost:8888')
    // let ws = new WebSocket('wss://api.inskydrone.cn/websocket')
    let ws = new WebSocket('ws://127.0.0.1:8089/websocket')
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
        console.log(point)
        const lnglat = GPS.gcj_encrypt(point.gps.latitude, point.gps.longitude)
        console.log(lnglat)
        const _point = new AMap.LngLat(lnglat[0], lnglat[1])
        points[point.deviceId].push(_point)
        devices[point.deviceId].setPosition(_point)
        devices[point.deviceId].setExtData(point)
        devices[point.deviceId].setMap(map)
        console.log(that.state.clickdeId, point.deviceId)
        if (that.state.clickedId === point.deviceId) {
          infoWindow.setPosition(_point)
          infoWindow.setContent(that.createInfoWindow(point))
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

  //
  dataParse = (data) => {
    const _data = JSON.parse(JSON.stringify(data))
    for(const v of _data){
      for(let i in v){
        if(typeof(v[i]) === 'string'){
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
    geojson_xzm.setMap(this.map)
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
    geojson_jkq.setMap(this.map)
  }

  // 修改地图图层
  handleChangeLayer = (v) => {
    if (v === 'satellite') {
      this.satellite.show()
      this.map.setMapStyle('')
    } else if (v === 'street') {
      this.map.setMapStyle('')
      this.satellite.hide()
    } else if (v === 'night') {
      this.map.setMapStyle('amap://styles/15ae9e43eacdbb1285bb6297d3414c44')
      this.satellite.hide()
    }
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
    middle_l.innerHTML = `地面速度：${(data.speed.groundSpeed).toFixed(2)} m/s</br>爬升速度：${(data.speed.climbSpeed).toFixed(2)} m/s</br>姿态角：${data.gps.altitude}`
    const middle_r = document.createElement('div')
    middle_r.className = styles.middle_r
    middle_r.innerHTML = `经度：${(data.gps.longitude).toFixed(6)}</br>纬度：${(data.gps.latitude).toFixed(6)}</br>电量：${(data.battery.current).toFixed(2)}%`
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
        this.createURTC(AppId, AppKey, '1248148100363587585', UserId)
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
    polyline.setMap(this.map)
    return polyline
  }

  // 创建自定义图标设备
  createDrone(img, data) {
    const gps = data.gps
    const position = GPS.gcj_encrypt(gps.latitude, gps.longitude)
    const that = this
    const icon = new AMap.Icon({
      image: require(`../../assets/icons/drone_${img}.png`),
      size: new AMap.Size(28, 28),
      imageSize: new AMap.Size(28, 28)
    });
    let marker = new AMap.Marker({
      position,
      offset: new AMap.Pixel(-14, -14),
      icon: icon,
      extData: data
    });
    AMap.event.addListener(marker, 'click', (e) => {
      // console.log(e)
      // e.domEvent.stopPropagation()
      // that.setState({
      //   clickdeId: data.deviceId
      // })
      that.state.clickedId = data.deviceId
      that.changeInfoWin(data)
    })
    return marker
  }

  // 改变自定义窗体的状态
  changeInfoWin(_data) {
    const { clicked, remoteStream } = this.state
    const data = this.devices[_data.deviceId].getExtData()
    let gps = data.gps
    const isOpen = this.infoWindow.getIsOpen()
    // if(!gps.longitude){
    //   gps = JSON.parse(gps)
    // }
    // console.log(data.gps)
    const lnglat = GPS.gcj_encrypt(gps.latitude, gps.longitude)
    const _point = new AMap.LngLat(lnglat[0], lnglat[1])
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
      <div style={{ width: 100 }}>缩放级别：{zoom}</div>
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
      </div>
    );
  }
}

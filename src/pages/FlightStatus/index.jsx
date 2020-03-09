// @ts-ignore
/**
 * devices      --所有设备的点集合
 * drones       --所有工作设备的集合
 * lines        --所有工作设备的轨迹集合
 */

import { LineLayer, Scene, Scale, Zoom, Popup, Marker, MarkerLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import * as React from 'react';
import { Descriptions } from 'antd';
import { Client } from 'urtc-sdk';
import { RouteIcon } from '@/components/InskyIcon';
import { getDeviceData, getDeviceDataId } from './service';
import styles from './FlightStatus.less'

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

export default class FlightStatus extends React.Component {

  //模拟websocket请求
  getData() {
    let ws = new WebSocket('ws://localhost:8089/websocket')
    // 连接成功就会执行回调函数
    ws.onopen = function (params) {
      console.log('客户端连接成功')
    }
    // 必须用属性的方式监听事件，监听函数的参数是事件对象
    ws.onmessage = function (e) {
      console.log('收到服务器响应', JSON.parse(e.data))
      try {
        points.push(JSON.parse(e.data))
      } catch (error) {
        return
      }
    }
  }

  componentWillUnmount() {
    this.scene.destroy();
    this.ws.close()
    // clearInterval(this.time)
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
      autoMove: false
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
        console.log(that.clickId, point.deviceId)
        if (that.clickId === point.deviceId) {
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
      //
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
      that.clickId = data.deviceId
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
      console.log(this.clicked.deviceId, data.deviceId)
      if (this.clicked.deviceId === data.deviceId) {
        this.infoWindow.close()
      } else {
        this.infoWindow.setPosition(_point)
        this.infoWindow.setContent(this.createInfoWindow(data))
        this.clicked = data
      }
    } else {
      console.log('noOpen')
      this.infoWindow.setContent(this.createInfoWindow(data))
      this.infoWindow.open(this.map, _point)
      this.clicked = data
    }
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
      </div>
    );
  }
}

const points = []
const _points = [
  { "gps": { "longitude": 121.56131744384767, "latitude": 31.231298103688736 } },
  { "gps": { "longitude": 121.56131744384767, "latitude": 31.233646625044802 } },
  { "gps": { "longitude": 121.56063079833983, "latitude": 31.235114421248575 } },
  { "gps": { "longitude": 121.55857086181639, "latitude": 31.23687574659226 } },
  { "gps": { "longitude": 121.55582427978514, "latitude": 31.23804994524463 } },
  { "gps": { "longitude": 121.5523910522461, "latitude": 31.240104757766613 } },
  { "gps": { "longitude": 121.55033111572266, "latitude": 31.240985378021307 } },
  { "gps": { "longitude": 121.5468978881836, "latitude": 31.243040126686836 } },
  { "gps": { "longitude": 121.54483795166014, "latitude": 31.244801304249997 } },
  { "gps": { "longitude": 121.54312133789062, "latitude": 31.24656244897016 } },
  { "gps": { "longitude": 121.54106140136719, "latitude": 31.248323560846238 } },
  { "gps": { "longitude": 121.53831481933595, "latitude": 31.249497617183085 } },
  { "gps": { "longitude": 121.53282165527342, "latitude": 31.251258674316755 } },
  { "gps": { "longitude": 121.53041839599611, "latitude": 31.251258674316755 } },
  { "gps": { "longitude": 121.52981758117676, "latitude": 31.251332050984484 } },
  { "gps": { "longitude": 121.52904510498045, "latitude": 31.25184568606204 } },
  { "gps": { "longitude": 121.52827262878417, "latitude": 31.252285942475925 } },
  { "gps": { "longitude": 121.52767181396483, "latitude": 31.252799572364033 } },
  { "gps": { "longitude": 121.52681350708008, "latitude": 31.25331319945781 } },
  { "gps": { "longitude": 121.52621269226074, "latitude": 31.253533324499745 } },
  { "gps": { "longitude": 121.52518272399904, "latitude": 31.253533324499745 } },
  { "gps": { "longitude": 121.52449607849123, "latitude": 31.253606699399647 } },
  { "gps": { "longitude": 121.52363777160643, "latitude": 31.253680074242528 } },
  { "gps": { "longitude": 121.52243614196776, "latitude": 31.253900198429022 } },
  { "gps": { "longitude": 121.52123451232912, "latitude": 31.253900198429022 } },
  { "gps": { "longitude": 121.52063369750977, "latitude": 31.253900198429022 } },
  { "gps": { "longitude": 121.5201187133789, "latitude": 31.253900198429022 } },
  { "gps": { "longitude": 121.51908874511717, "latitude": 31.253459949542798 } },
  { "gps": { "longitude": 121.5183162689209, "latitude": 31.252799572364033 } },
  { "gps": { "longitude": 121.51771545410155, "latitude": 31.25235931834531 } },
  { "gps": { "longitude": 121.51702880859374, "latitude": 31.251698933467875 } },
  { "gps": { "longitude": 121.51668548583984, "latitude": 31.250818413112672 } },
  { "gps": { "longitude": 121.51651382446288, "latitude": 31.25008463987724 } },
  { "gps": { "longitude": 121.51651382446288, "latitude": 31.2493508609393 } },
  { "gps": { "longitude": 121.51651382446288, "latitude": 31.248543697521345 } },
  { "gps": { "longitude": 121.51651382446288, "latitude": 31.247369629323753 } },
  { "gps": { "longitude": 121.51677131652832, "latitude": 31.246635829287413 } },
  { "gps": { "longitude": 121.51677131652832, "latitude": 31.245681880715527 } },
  { "gps": { "longitude": 121.51677131652832, "latitude": 31.244654540707472 } },
  { "gps": { "longitude": 121.5164279937744, "latitude": 31.243920719573723 } },
  { "gps": { "longitude": 121.5164279937744, "latitude": 31.243113509741022 } },
  { "gps": { "longitude": 121.51608467102051, "latitude": 31.242159525589464 } },
  { "gps": { "longitude": 121.51591300964354, "latitude": 31.24135230070429 } },
  { "gps": { "longitude": 121.51556968688965, "latitude": 31.24069183884865 } },
  { "gps": { "longitude": 121.51531219482423, "latitude": 31.239957986925965 } },
  { "gps": { "longitude": 121.51522636413573, "latitude": 31.23944428718776 } },
  { "gps": { "longitude": 121.51479721069336, "latitude": 31.238783811990814 } },
  { "gps": { "longitude": 121.51411056518555, "latitude": 31.238416879330384 } },
  { "gps": { "longitude": 121.51402473449707, "latitude": 31.237462847742812 } },
  { "gps": { "longitude": 121.51376724243163, "latitude": 31.236362030092458 } },
  { "gps": { "longitude": 121.51376724243163, "latitude": 31.23562814453258 } },
  { "gps": { "longitude": 121.5138530731201, "latitude": 31.234967642654343 } },
  { "gps": { "longitude": 121.51402473449707, "latitude": 31.234233746262717 } },
  { "gps": { "longitude": 121.51402473449707, "latitude": 31.233353063067668 } },
  { "gps": { "longitude": 121.51445388793944, "latitude": 31.23269254528419 } },
  { "gps": { "longitude": 121.51471138000488, "latitude": 31.23173845588948 } },
  { "gps": { "longitude": 121.51548385620117, "latitude": 31.23012382112059 } },
  { "gps": { "longitude": 121.51634216308594, "latitude": 31.229683461395265 } },
  { "gps": { "longitude": 121.51659965515138, "latitude": 31.229243099617822 } },
  { "gps": { "longitude": 121.51720046997069, "latitude": 31.228582553103937 } },
  { "gps": { "longitude": 121.51762962341309, "latitude": 31.22814218619626 } },
  { "gps": { "longitude": 121.51762962341309, "latitude": 31.227628422210365 } },
  { "gps": { "longitude": 121.51771545410155, "latitude": 31.226967864410142 } },
  { "gps": { "longitude": 121.51780128479002, "latitude": 31.226307301992847 } },
  { "gps": { "longitude": 121.51805877685547, "latitude": 31.225646734958584 } },
  { "gps": { "longitude": 121.51814460754395, "latitude": 31.225499941657286 } },
  { "gps": { "longitude": 121.51891708374023, "latitude": 31.224619177061744 } },
  { "gps": { "longitude": 121.51968955993651, "latitude": 31.223738404258437 } },
  { "gps": { "longitude": 121.52140617370605, "latitude": 31.22322461633284 } },
  { "gps": { "longitude": 121.52166366577147, "latitude": 31.222490628737308 } },
  { "gps": { "longitude": 121.52235031127928, "latitude": 31.221756635442144 } },
  { "gps": { "longitude": 121.52320861816408, "latitude": 31.221242836744313 } },
  { "gps": { "longitude": 121.52389526367188, "latitude": 31.22094923623453 } },
  { "gps": { "longitude": 121.52406692504883, "latitude": 31.220362032479237 } },
  { "gps": { "longitude": 121.52423858642578, "latitude": 31.219701423894513 } },
  { "gps": { "longitude": 121.52483940124512, "latitude": 31.21867380136463 } },
  { "gps": { "longitude": 121.52509689331053, "latitude": 31.217866375826173 } },
  { "gps": { "longitude": 121.52578353881835, "latitude": 31.216765329887743 } },
  { "gps": { "longitude": 121.52604103088379, "latitude": 31.21625150406156 } },
  { "gps": { "longitude": 121.52621269226074, "latitude": 31.215737675442902 } },
  { "gps": { "longitude": 121.52655601501465, "latitude": 31.21537065329133 } },
  { "gps": { "longitude": 121.52689933776854, "latitude": 31.214489794314737 } },
  { "gps": { "longitude": 121.52810096740723, "latitude": 31.214049361749087 } },
  { "gps": { "longitude": 121.52913093566896, "latitude": 31.213829144696938 } },
  { "gps": { "longitude": 121.53050422668457, "latitude": 31.21375573889891 } },
  { "gps": { "longitude": 121.53127670288086, "latitude": 31.21375573889891 } },
  { "gps": { "longitude": 121.5333366394043, "latitude": 31.213682333043916 } },
  { "gps": { "longitude": 121.53436660766603, "latitude": 31.213829144696938 } },
  { "gps": { "longitude": 121.53496742248534, "latitude": 31.214049361749087 } },
  { "gps": { "longitude": 121.53616905212401, "latitude": 31.213975956122024 } },
  { "gps": { "longitude": 121.53676986694335, "latitude": 31.213975956122024 } },
  { "gps": { "longitude": 121.53745651245116, "latitude": 31.21390255043799 } },
  { "gps": { "longitude": 121.53865814208984, "latitude": 31.213535521162918 } },
  { "gps": { "longitude": 121.53977394104004, "latitude": 31.213462115136963 } },
  { "gps": { "longitude": 121.541748046875, "latitude": 31.21258123838038 } },
  { "gps": { "longitude": 121.54269218444823, "latitude": 31.21214079692485 } },
  { "gps": { "longitude": 121.54329299926758, "latitude": 31.21214079692485 } },
  { "gps": { "longitude": 121.54397964477538, "latitude": 31.21214079692485 } },
  { "gps": { "longitude": 121.54475212097167, "latitude": 31.21214079692485 } },
  { "gps": { "longitude": 121.54569625854492, "latitude": 31.212214203976572 } },
  { "gps": { "longitude": 121.54655456542969, "latitude": 31.212214203976572 } },
  { "gps": { "longitude": 121.5475845336914, "latitude": 31.212361017909032 } },
  { "gps": { "longitude": 121.54878616333006, "latitude": 31.21280145833882 } },
  { "gps": { "longitude": 121.54955863952637, "latitude": 31.21272805174301 } },
  { "gps": { "longitude": 121.55118942260742, "latitude": 31.212507831613586 } },
  { "gps": { "longitude": 121.5519618988037, "latitude": 31.212067389816134 } },
  { "gps": { "longitude": 121.5523910522461, "latitude": 31.21140672327351 } },
  { "gps": { "longitude": 121.55316352844238, "latitude": 31.210966276347424 } },
  { "gps": { "longitude": 121.55367851257324, "latitude": 31.2102321935786 } },
  { "gps": { "longitude": 121.55496597290039, "latitude": 31.210085376341038 } },
  { "gps": { "longitude": 121.55573844909668, "latitude": 31.210011967636778 } },
  { "gps": { "longitude": 121.55633926391602, "latitude": 31.210085376341038 } },
  { "gps": { "longitude": 121.55694007873535, "latitude": 31.210379010588234 } },
  { "gps": { "longitude": 121.55728340148924, "latitude": 31.210525827369935 } },
  { "gps": { "longitude": 121.55771255493164, "latitude": 31.210892868326983 } },
  { "gps": { "longitude": 121.55857086181639, "latitude": 31.2111130922174 } },
  { "gps": { "longitude": 121.55882835388184, "latitude": 31.211700353417864 } },
  { "gps": { "longitude": 121.55942916870117, "latitude": 31.212214203976572 } },
  { "gps": { "longitude": 121.56011581420898, "latitude": 31.21265464509018 } },
  { "gps": { "longitude": 121.56063079833983, "latitude": 31.213315302914065 } },
  { "gps": { "longitude": 121.5608024597168, "latitude": 31.21375573889891 } },
  { "gps": { "longitude": 121.56131744384767, "latitude": 31.214416389029594 } },
  { "gps": { "longitude": 121.56131744384767, "latitude": 31.215297248690035 } },
  { "gps": { "longitude": 121.56251907348631, "latitude": 31.215517462322936 } },
  { "gps": { "longitude": 121.56320571899413, "latitude": 31.215957888049985 } },
  { "gps": { "longitude": 121.5644073486328, "latitude": 31.21603129213837 } },
  { "gps": { "longitude": 121.56543731689453, "latitude": 31.216104696169765 } },
  { "gps": { "longitude": 121.56620979309082, "latitude": 31.216104696169765 } },
  { "gps": { "longitude": 121.56715393066405, "latitude": 31.21522384403177 } },
  { "gps": { "longitude": 121.56732559204102, "latitude": 31.213608927131904 } },
  { "gps": { "longitude": 121.56732559204102, "latitude": 31.212361017909032 } },
  { "gps": { "longitude": 121.56732559204102, "latitude": 31.21162694596725 } },
  { "gps": { "longitude": 121.56732559204102, "latitude": 31.210819460249517 } },
  { "gps": { "longitude": 121.56732559204102, "latitude": 31.20979174118209 } },
  { "gps": { "longitude": 121.56749725341797, "latitude": 31.208617191429184 } },
  { "gps": { "longitude": 121.56732559204102, "latitude": 31.207809680012264 } },
  { "gps": { "longitude": 121.56732559204102, "latitude": 31.206781928237312 } },
  { "gps": { "longitude": 121.56741142272949, "latitude": 31.205680753228233 } },
  { "gps": { "longitude": 121.56749725341797, "latitude": 31.205093454648008 } },
  { "gps": { "longitude": 121.56749725341797, "latitude": 31.204285913146016 } },
  { "gps": { "longitude": 121.56775474548338, "latitude": 31.20318470907827 } },
  { "gps": { "longitude": 121.56758308410645, "latitude": 31.20259739500032 } },
  { "gps": { "longitude": 121.56758308410645, "latitude": 31.20178983218925 } },
  { "gps": { "longitude": 121.56758308410645, "latitude": 31.200908846714693 } },
  { "gps": { "longitude": 121.56766891479491, "latitude": 31.200027853035934 } },
  { "gps": { "longitude": 121.56766891479491, "latitude": 31.19892659940056 } },
  { "gps": { "longitude": 121.56766891479491, "latitude": 31.198412676650566 } },
  { "gps": { "longitude": 121.56766891479491, "latitude": 31.197237985596526 } },
  { "gps": { "longitude": 121.56766891479491, "latitude": 31.196650634600406 } },
  { "gps": { "longitude": 121.56784057617186, "latitude": 31.195696181455425 } },
  { "gps": { "longitude": 121.56784057617186, "latitude": 31.195108820888557 } },
  { "gps": { "longitude": 121.5680980682373, "latitude": 31.1943746150529 } },
  { "gps": { "longitude": 121.5680980682373, "latitude": 31.193199873866835 } },
  { "gps": { "longitude": 121.56826972961426, "latitude": 31.19224538591511 } },
  { "gps": { "longitude": 121.56826972961426, "latitude": 31.191290888336383 } },
  { "gps": { "longitude": 121.56826972961426, "latitude": 31.190116108870125 } },
  { "gps": { "longitude": 121.56826972961426, "latitude": 31.18930843952816 } },
  { "gps": { "longitude": 121.56826972961426, "latitude": 31.188574188690865 } },
  { "gps": { "longitude": 121.56861305236816, "latitude": 31.187766506190865 } },
  { "gps": { "longitude": 121.56998634338379, "latitude": 31.187839932157498 } },
  { "gps": { "longitude": 121.57084465026855, "latitude": 31.18806020971558 } },
  { "gps": { "longitude": 121.57161712646483, "latitude": 31.188500763293852 } },
  { "gps": { "longitude": 121.5721321105957, "latitude": 31.188941314821538 } },
  { "gps": { "longitude": 121.57376289367674, "latitude": 31.189161589816393 } },
  { "gps": { "longitude": 121.57530784606934, "latitude": 31.1893818642986 } },
  { "gps": { "longitude": 121.57676696777344, "latitude": 31.189528713668594 } },
  { "gps": { "longitude": 121.57779693603517, "latitude": 31.18989583609677 } },
  { "gps": { "longitude": 121.578311920166, "latitude": 31.19004268466931 } },
  { "gps": { "longitude": 121.57934188842773, "latitude": 31.19063007668095 } },
  { "gps": { "longitude": 121.58011436462402, "latitude": 31.191290888336383 } },
  { "gps": { "longitude": 121.58045768737793, "latitude": 31.19187827260103 } },
  { "gps": { "longitude": 121.58080101013184, "latitude": 31.192612497805065 } },
  { "gps": { "longitude": 121.58123016357422, "latitude": 31.193493560530538 } },
  { "gps": { "longitude": 121.58157348632811, "latitude": 31.19452145667578 } },
  { "gps": { "longitude": 121.58191680908203, "latitude": 31.195769601269927 } },
  { "gps": { "longitude": 121.58217430114745, "latitude": 31.196356957735073 } },
  { "gps": { "longitude": 121.58226013183592, "latitude": 31.197017729400248 } },
  { "gps": { "longitude": 121.58226013183592, "latitude": 31.197898751108983 } },
  { "gps": { "longitude": 121.58243179321289, "latitude": 31.199660769915113 } },
  { "gps": { "longitude": 121.58243179321289, "latitude": 31.200541767012233 } },
  { "gps": { "longitude": 121.58251762390137, "latitude": 31.201569586589738 } },
  { "gps": { "longitude": 121.58260345458984, "latitude": 31.20281763820686 } },
  { "gps": { "longitude": 121.58286094665526, "latitude": 31.204506152421185 } },
  { "gps": { "longitude": 121.58371925354005, "latitude": 31.205974401150872 } },
  { "gps": { "longitude": 121.58397674560547, "latitude": 31.207736269541574 } },
  { "gps": { "longitude": 121.58371925354005, "latitude": 31.20869060121611 } },
  { "gps": { "longitude": 121.58371925354005, "latitude": 31.209498105111447 } },
  { "gps": { "longitude": 121.58389091491699, "latitude": 31.210966276347424 } },
  { "gps": { "longitude": 121.58466339111328, "latitude": 31.211847168148132 } },
  { "gps": { "longitude": 121.58595085144043, "latitude": 31.213388709053987 } },
  { "gps": { "longitude": 121.58698081970216, "latitude": 31.21434298368746 } },
  { "gps": { "longitude": 121.58732414245605, "latitude": 31.216104696169765 } },
  { "gps": { "longitude": 121.58775329589844, "latitude": 31.217572764829725 } },
  { "gps": { "longitude": 121.58809661865233, "latitude": 31.219774825076357 } },
  { "gps": { "longitude": 121.5886116027832, "latitude": 31.221683235799155 } },
  { "gps": { "longitude": 121.58921241760254, "latitude": 31.223151217829788 } },
  { "gps": { "longitude": 121.58998489379883, "latitude": 31.22483936898011 } },
  { "gps": { "longitude": 121.59092903137208, "latitude": 31.226013717214293 } },
  { "gps": { "longitude": 121.59110069274902, "latitude": 31.22740823678995 } },
  { "gps": { "longitude": 121.59152984619139, "latitude": 31.228068791512136 } },
  { "gps": { "longitude": 121.59187316894531, "latitude": 31.228729341617147 } },
  { "gps": { "longitude": 121.59221649169923, "latitude": 31.229243099617822 } },
  { "gps": { "longitude": 121.59255981445312, "latitude": 31.229756854825336 } },
  { "gps": { "longitude": 121.59290313720705, "latitude": 31.230710964228813 } },
  { "gps": { "longitude": 121.59350395202635, "latitude": 31.23159167205059 } },
  { "gps": { "longitude": 121.59367561340332, "latitude": 31.232472371663587 } },
  { "gps": { "longitude": 121.59367561340332, "latitude": 31.232986109313597 } },
  { "gps": { "longitude": 121.59401893615721, "latitude": 31.233940186109823 } },
  { "gps": { "longitude": 121.5937614440918, "latitude": 31.234527305503477 } },
  { "gps": { "longitude": 121.5933322906494, "latitude": 31.235554755663017 } },
  { "gps": { "longitude": 121.5933322906494, "latitude": 31.23643541833489 } },
  { "gps": { "longitude": 121.59324645996094, "latitude": 31.23687574659226 } },
  { "gps": { "longitude": 121.59316062927246, "latitude": 31.23715095071089 } },
  { "gps": { "longitude": 121.59281730651854, "latitude": 31.23727937902522 } }
]
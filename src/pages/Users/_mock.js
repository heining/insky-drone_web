const createDevices = (current, pageSize) => {
  const devices = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    devices.push({
      id: parseInt(Math.random() * 100000),
      model: `model${index}`,
      name: `insky${index}`,
      sn: `${parseInt(Math.random() * 100000000)}`,
      type: `type${index}`,
    });
  }
  return devices;
};

let devices = createDevices(1, 100);

const deviceData = [
  {
    "deviceId": 'insky760001',
    "battery": {
      "voltage": 100,
      "current": 88,
      "remaining": 20
    },
    "gps": {
      "latitude": 31.231298103688736,
      "longitude": 121.56131744384767,
      "altitude": 0
    },
    "speed": {
      "groundSpeed": 0,  //地面速度
      "climbSpeed": 0   //爬升速度             
    },
    "attitude": {
      "roll": 0,
      "pitch": 0,
      "yaw": 0
    },
    "status": {
      "connected": false,
      "armed": false,
      "manualInput": false,
      "mode": "drone",
      "systemStatus": false
    },
    "mavlink": "",
    "timestamp": new Date().valueOf()
  },
  {
    "deviceId": '10001',
    "battery": {
      "voltage": 100,
      "current": 36,
      "remaining": 20
    },
    "gps": {
      "latitude": 31.23269254528419,
      "longitude": 121.51445388793944,
      "altitude": 0
    },
    "speed": {
      "groundSpeed": 0,  //地面速度
      "climbSpeed": 0   //爬升速度             
    },
    "attitude": {
      "roll": 0,
      "pitch": 0,
      "yaw": 0
    },
    "status": {
      "connected": false,
      "armed": false,
      "manualInput": false,
      "mode": "drone",
      "systemStatus": false
    },
    "mavlink": "",
    "timestamp": new Date().valueOf()
  },
  {
    "deviceId": '10003',
    "battery": {
      "voltage": 100,
      "current": 62,
      "remaining": 20
    },
    "gps": {
      "latitude": 31.19004268466931,
      "longitude": 121.578311920166,
      "altitude": 0
    },
    "speed": {
      "groundSpeed": 0,  //地面速度
      "climbSpeed": 0   //爬升速度             
    },
    "attitude": {
      "roll": 0,
      "pitch": 0,
      "yaw": 0
    },
    "status": {
      "connected": false,
      "armed": false,
      "manualInput": false,
      "mode": "drone",
      "systemStatus": false
    },
    "mavlink": "",
    "timestamp": new Date().valueOf()
  }
]

function addDevice(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const body = (b && b.body) || req.body;
  const { method, name, sn, type, model } = body;

  const add = [body];
  const newArr = add.concat(devices)

  res.send({
    code: 200,
    data: newArr,
    message: "操作成功",
    timestamp: new Date().valueOf()
  })
}

function updateDevice(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const body = (b && b.body) || req.body;
  const { method, name, sn, type, model } = body;

  const add = [body];
  const newArr = add.concat(devices)
}

// mock device
export default {
  '/api/v1/device': (req, res) => {
    res.send({
      code: 200,
      data: devices,
      message: "操作成功",
      timestamp: new Date().valueOf()
    })
  },
  'POST /api/v1/device': addDevice,
  'http://api.inskylab.cn/drone/v1/device': (req, res) => {
    res.send({
      code: 200,
      data: deviceData,
      message: "操作成功",
      timestamp: new Date().valueOf()
    })
  },
};

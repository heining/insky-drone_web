
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
        "deviceId": '10002',
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

// mock device
export default {
    '/drone/v1/device/data': (req, res) => {
        res.send({
            code: 200,
            data: deviceData,
            message: "操作成功",
            timestamp: new Date().valueOf()
        })
    },
    'http://api.inskylab.cn/drone/v1/device/data': (req, res) => {
        res.send({
            code: 200,
            data: deviceData,
            message: "操作成功",
            timestamp: new Date().valueOf()
        })
    },
};

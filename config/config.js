import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

// const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
// const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

// if (isAntDesignProPreview) {
//   // 针对 preview.pro.ant.design 的 GA 统计代码
//   plugins.push([
//     'umi-plugin-ga',
//     {
//       code: 'UA-72788897-6',
//     },
//   ]);
//   plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
// }

export default {
  // base: 'http://api.inskylab.cn/api',
  plugins,
  // hash: true,
  // history: 'hash',
  // publicPath: "/dist/",
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/login',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/login',
          component: './Login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/flightstatus',
            },
            {
              name: 'flightstatus',
              icon: 'global',
              path: '/flightstatus',
              component: './FlightStatus',
            },
            {
              path: '/resources',
              name: 'resources',
              icon: 'crown',
              routes: [
                {
                  path: '/resources/devices',
                  name: 'devices',
                  icon: 'crown',
                  routes: [
                    { path: '/resources/devices/aircrafts', name: 'aircrafts', component: './Devices' },
                    { path: '/resources/devices/aircraftsbox', name: 'aircraftsbox', component: './DeviceBox' },
                    { path: '/resources/devices/cameras', name: 'cameras', component: './DeviceCamera' },
                    { path: '/resources/devices/remotecontrol', name: 'remotecontrol', component: './DeviceControl' },
                  ],
                },
                {
                  path: '/resources/personnel',
                  name: 'personnel',
                  icon: 'user',
                  routes: [
                    { path: '/resources/personnel/users', name: 'users', component: './Users' },
                    { path: '/resources/personnel/pilots', name: 'pilots', component: './UserDrivers' },
                  ],
                },
              ]
            },
            {
              name: 'flightplan',
              icon: 'file-add',
              path: '/flightplan',
              routes: [
                {
                  path: '/flightplan/planapplication',
                  name: 'planapplication',
                  routes: [
                    { path: '/flightplan/planapplication/planapply', name: 'planapply', component: './Planapply' },
                    { path: '/flightplan/planapplication/planlist', name: 'planlist', component: './PlanList' }
                  ]
                },
                {
                  path: '/flightplan/command',
                  name: 'command',
                  routes: [
                    { path: '/flightplan/command/routeplan', name: 'routeplan', component: './Command' },
                    { path: '/flightplan/command/routemanage', name: 'routemanage', component: './RouteManage' },
                  ]
                },
                {
                  path: '/flightplan/fastcommand',
                  name: 'fastcommand',
                  component: './Welcome'
                },
              ],
            },
            {
              name: 'dataserver',
              icon: 'file-add',
              path: '/dataserver',
              routes: [
                { path: '/dataserver/fileupload', name: 'fileupload', component: './FileUpload' },
                { path: '/dataserver/announcement', name: 'announcement', component: './Announcement' },
              ],
            },
            {
              name: 'datacenter',
              icon: 'global',
              path: '/datacenter',
              component:'./DataCenter'
            },
            {
              name: '3dmap',
              icon: 'global',
              path: '/3dmap',
              component:'./Test'
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    // ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      // ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8089',
      // target: 'https://api.inskydrone.cn',
      pathRewrite: {'^/drone' : ''},
      changeOrigin: true,
      secure: false
    },
    '/authentication': {
      target: 'http://127.0.0.1:8089',
      // target: 'https://api.inskydrone.cn',
      changeOrigin: true,
      secure: false
    },
    '/code': {
      target: 'http://127.0.0.1:8089',
      // target: 'https://api.inskydrone.cn',
      changeOrigin: true,
      secure: false
    },
    // '/websocket': {
    //   target: 'ws://122.51.223.137:8089/websocket',
    //   // target: 'https://api.inskydrone.cn',
    //   changeOrigin: true,
    //   ws: true,
    //   secure: false
    // },
  },
  // module: {
  //   unknownContextCritical: true,
  // },
};

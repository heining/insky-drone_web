(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"2n1B":function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("lUTK");var r=n(a("BvKs")),l=a("RBnf"),u=a("Y2fQ"),d=n(a("q1tI")),c=n(a("TSYQ")),o=n(a("6Wvd")),f=n(a("Kkfi")),i=function(e){var t=e.className,a=(0,u.getLocale)(),n=function(e){var t=e.key;return(0,u.setLocale)(t)},i=["zh-CN","en-US"],s={"zh-CN":"\u7b80\u4f53\u4e2d\u6587","en-US":"English"},p={"zh-CN":"\ud83c\udde8\ud83c\uddf3","en-US":"\ud83c\uddfa\ud83c\uddf8"},m=d.default.createElement(r.default,{className:f.default.menu,selectedKeys:[a],onClick:n},i.map(function(e){return d.default.createElement(r.default.Item,{key:e},d.default.createElement("span",{role:"img","aria-label":s[e]},p[e])," ",s[e])}));return d.default.createElement(o.default,{overlay:m,placement:"bottomRight"},d.default.createElement("span",{className:(0,c.default)(f.default.dropDown,t)},d.default.createElement(l.GlobalOutlined,{title:"\u8bed\u8a00"})))},s=i;t.default=s},5:function(e,t){},"57a1":function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5Dmo");var r=n(a("3S7+")),l=a("RBnf"),u=n(a("q1tI")),d=a("Hg0r"),c=n(a("kaFD")),o=n(a("ojHk")),f=n(a("2n1B")),i=n(a("h3zL")),s=function(e){var t=e.theme,a=e.layout,n=i.default.right;return"dark"===t&&"topmenu"===a&&(n="".concat(i.default.right,"  ").concat(i.default.dark)),u.default.createElement("div",{className:n},u.default.createElement(o.default,{className:"".concat(i.default.action," ").concat(i.default.search),placeholder:"\u7ad9\u5185\u641c\u7d22",defaultValue:"umi ui",options:[{label:u.default.createElement("a",{href:"https://umijs.org/zh/guide/umi-ui.html"},"umi ui"),value:"umi ui"},{label:u.default.createElement("a",{href:"next.ant.design"},"Ant Design"),value:"Ant Design"},{label:u.default.createElement("a",{href:"https://protable.ant.design/"},"Pro Table"),value:"Pro Table"},{label:u.default.createElement("a",{href:"https://prolayout.ant.design/"},"Pro Layout"),value:"Pro Layout"}]}),u.default.createElement(r.default,{title:"\u4f7f\u7528\u6587\u6863"},u.default.createElement("a",{target:"_blank",href:"https://pro.ant.design/docs/getting-started",rel:"noopener noreferrer",className:i.default.action},u.default.createElement(l.QuestionCircleOutlined,null))),u.default.createElement(c.default,null),u.default.createElement(f.default,{className:i.default.action}))},p=(0,d.connect)(function(e){var t=e.settings;return{theme:t.navTheme,layout:t.layout}})(s);t.default=p},"6Wvd":function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("qVdP");var r=n(a("jsC+")),l=n(a("jehZ")),u=n(a("Y/ft")),d=n(a("q1tI")),c=n(a("TSYQ")),o=n(a("QyDn")),f=function(e){var t=e.overlayClassName,a=(0,u.default)(e,["overlayClassName"]);return d.default.createElement(r.default,(0,l.default)({overlayClassName:(0,c.default)(o.default.container,t)},a))},i=f;t.default=i},Bib1:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var r=n(a("kLXV"));a("5NDa");var l=n(a("5rEg")),u=n(a("d6i3")),d=n(a("1l/V")),c=n(a("qIgq"));a("y8nQ");var o=n(a("Vl3Y")),f=n(a("q1tI")),i=o.default.Item,s=function(e){var t=o.default.useForm(),a=(0,c.default)(t,1),n=a[0],s=e.modalVisible,p=e.onSubmit,m=e.onCancel,v=function(){var e=(0,d.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.validateFields();case 2:t=e.sent,n.resetFields(),p(t);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return f.default.createElement(r.default,{destroyOnClose:!0,title:"\u6dfb\u52a0\u7528\u6237",visible:s,onOk:v,onCancel:function(){return m()}},f.default.createElement(o.default,{form:n},f.default.createElement(i,{labelCol:{span:6},wrapperCol:{span:15},label:"\u7528\u6237\u6635\u79f0",name:"nickname",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u6635\u79f0\uff01"}]},f.default.createElement(l.default,{placeholder:"\u8bf7\u8f93\u5165"})),f.default.createElement(i,{labelCol:{span:6},wrapperCol:{span:15},label:"\u8d26\u53f7\u540d",name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8d26\u53f7\u540d\uff01"}]},f.default.createElement(l.default,{placeholder:"\u8bf7\u8f93\u5165"})),f.default.createElement(i,{labelCol:{span:6},wrapperCol:{span:15},label:"\u5bc6\u7801",name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"}]},f.default.createElement(l.default,{placeholder:"\u8bf7\u8f93\u5165"})),f.default.createElement(i,{labelCol:{span:6},wrapperCol:{span:15},label:"\u624b\u673a\u53f7",name:"phone",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7\uff01"}]},f.default.createElement(l.default,{placeholder:"\u8bf7\u8f93\u5165"}))))},p=s;t.default=p},G3lK:function(e,t,a){e.exports={headerSearch:"antd-pro-components-header-search-index-headerSearch",input:"antd-pro-components-header-search-index-input",show:"antd-pro-components-header-search-index-show"}},JO4A:function(e,t,a){"use strict";var n=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("qVdP");var l=r(a("jsC+"));a("lUTK");var u=r(a("BvKs"));a("+L6B");var d=r(a("2/Rp"));a("P2fV");var c=r(a("NJEC"));a("/zsF");var o=r(a("PArb")),f=r(a("qIgq")),i=r(a("d6i3"));a("miYZ");var s=r(a("tsqr")),p=r(a("1l/V")),m=a("RBnf"),v=n(a("q1tI")),h=a("Hx5s"),g=r(a("Qiat")),E=r(a("LC44")),b=r(a("YIiE")),y=a("hfs5"),w=function(){var e=(0,p.default)(i.default.mark(function e(t){var a,n;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=s.default.loading("\u6b63\u5728\u6dfb\u52a0"),e.prev=1,e.next=4,(0,y.addDevice)(t);case 4:return n=e.sent,console.log(n),a(),s.default.success("\u6dfb\u52a0\u6210\u529f"),e.abrupt("return",!0);case 11:return e.prev=11,e.t0=e["catch"](1),a(),s.default.error("\u6dfb\u52a0\u5931\u8d25\u8bf7\u91cd\u8bd5\uff01"),e.abrupt("return",!1);case 16:case"end":return e.stop()}},e,null,[[1,11]])}));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=(0,p.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=s.default.loading("\u6b63\u5728\u4fee\u6539"),console.log(t),e.prev=2,e.next=5,(0,y.updateDevice)(t);case 5:return a(),s.default.success("\u4fee\u6539\u6210\u529f"),e.abrupt("return",!0);case 10:return e.prev=10,e.t0=e["catch"](2),a(),s.default.error("\u4fee\u6539\u5931\u8d25\u8bf7\u91cd\u8bd5\uff01"),e.abrupt("return",!1);case 15:case"end":return e.stop()}},e,null,[[2,10]])}));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=(0,p.default)(i.default.mark(function e(t,a){var n;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=s.default.loading("\u6b63\u5728\u5220\u9664"),e.prev=1,e.next=4,(0,y.deleteDevice)(t.id);case 4:return n(),s.default.success("\u5220\u9664\u6210\u529f"),a.current&&a.current.reload(),e.abrupt("return",!0);case 10:return e.prev=10,e.t0=e["catch"](1),console.log(e.t0),n(),s.default.error("\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5"),e.abrupt("return",!1);case 16:case"end":return e.stop()}},e,null,[[1,10]])}));return function(t,a){return e.apply(this,arguments)}}(),C=function(){var e=(0,v.useState)({}),t=(0,f.default)(e,2),a=t[0],n=t[1],r=(0,v.useState)(!1),s=(0,f.default)(r,2),C=s[0],q=s[1],I=(0,v.useState)(!1),S=(0,f.default)(I,2),O=S[0],D=S[1],P=(0,v.useState)({}),V=(0,f.default)(P,2),T=V[0],R=V[1],N=(0,v.useRef)(),_=[{title:"\u8bbe\u5907ID",dataIndex:"id"},{title:"\u8bbe\u5907\u6635\u79f0",dataIndex:"name"},{title:"\u8bbe\u5907\u7f16\u53f7",dataIndex:"code"},{title:"\u8bbe\u5907\u578b\u53f7",dataIndex:"type"},{title:"\u673a\u578b",dataIndex:"model"},{title:"\u64cd\u4f5c",dataIndex:"option",valueType:"option",render:function(e,t){return v.default.createElement(v.default.Fragment,null,v.default.createElement("a",{onClick:function(){D(!0),R(t)}},"\u4fee\u6539"),v.default.createElement(o.default,{type:"vertical"}),v.default.createElement(c.default,{title:"\u786e\u5b9a\u5220\u9664\u8be5\u8bbe\u5907\u5417\uff1f",onConfirm:function(){return x(t,N)},okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},v.default.createElement("a",{href:""},"\u5220\u9664")))}}];return v.default.createElement(h.PageHeaderWrapper,{style:{margin:0}},v.default.createElement(g.default,{headerTitle:"\u67e5\u8be2\u8bbe\u5907",actionRef:N,rowKey:"id",onChange:function(e,t,a){n("".concat(a.field,"_").concat(a.order))},params:{sorter:a},toolBarRender:function(e,t){var a=t.selectedRows;return[v.default.createElement(d.default,{type:"primary",onClick:function(){return q(!0)}},v.default.createElement(m.PlusOutlined,null)," \u6dfb\u52a0"),a&&a.length>0&&v.default.createElement(l.default,{overlay:v.default.createElement(u.default,{onClick:function(){var t=(0,p.default)(i.default.mark(function t(n){return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if("remove"!==n.key){t.next=4;break}return t.next=3,x(a);case 3:e.reload();case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),selectedKeys:[]},v.default.createElement(u.default.Item,{key:"remove"},"\u6279\u91cf\u5220\u9664"),v.default.createElement(u.default.Item,{key:"approval"},"\u6279\u91cf\u5ba1\u6279"))},v.default.createElement(d.default,null,"\u6279\u91cf\u64cd\u4f5c ",v.default.createElement(m.DownOutlined,null)))]},tableAlertRender:function(e,t){return v.default.createElement("div",null,"\u5df2\u9009\u62e9"," ",v.default.createElement("a",{style:{fontWeight:600}},e.length)," ","\u9879\xa0\xa0")},request:function(e){return(0,y.getDevice)({limit:e.pageSize,page:e.current,sort:e.sorter})},columns:_,rowSelection:{}}),v.default.createElement(E.default,{onSubmit:function(){var e=(0,p.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,w(t);case 2:a=e.sent,a&&(q(!1),N.current&&N.current.reload());case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),onCancel:function(){return q(!1)},modalVisible:C}),T&&Object.keys(T).length?v.default.createElement(b.default,{onSubmit:function(){var e=(0,p.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,k(t);case 3:a=e.sent,a&&(D(!1),R({}),N.current&&N.current.reload());case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),onCancel:function(){D(!1),R({})},updateModalVisible:O,values:T}):null)},q=C;t.default=q},Kkfi:function(e,t,a){e.exports={menu:"antd-pro-components-select-lang-index-menu",dropDown:"antd-pro-components-select-lang-index-dropDown"}},LC44:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var r=n(a("kLXV"));a("5NDa");var l=n(a("5rEg")),u=n(a("d6i3")),d=n(a("1l/V")),c=n(a("qIgq"));a("y8nQ");var o=n(a("Vl3Y")),f=n(a("q1tI")),i=o.default.Item,s=function(e){var t=o.default.useForm(),a=(0,c.default)(t,1),n=a[0],s=e.modalVisible,p=e.onSubmit,m=e.onCancel,v=function(){var e=(0,d.default)(u.default.mark(function e(){var t;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.validateFields();case 2:t=e.sent,n.resetFields(),p(t);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return f.default.createElement(r.default,{destroyOnClose:!0,title:"\u6dfb\u52a0\u8bbe\u5907",visible:s,onOk:v,onCancel:function(){return m()}},f.default.createElement(o.default,{form:n},f.default.createElement(i,{labelCol:{span:6},wrapperCol:{span:15},label:"\u8bbe\u5907\u6635\u79f0",name:"name",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bbe\u5907\u6635\u79f0\uff01"}]},f.default.createElement(l.default,{placeholder:"\u8bf7\u8f93\u5165"})),f.default.createElement(i,{labelCol:{span:6},wrapperCol:{span:15},label:"\u8bbe\u5907\u7f16\u53f7",name:"code",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bbe\u5907\u7f16\u53f7\uff01"}]},f.default.createElement(l.default,{placeholder:"\u8bf7\u8f93\u5165"})),f.default.createElement(i,{labelCol:{span:6},wrapperCol:{span:15},label:"\u8bbe\u5907\u578b\u53f7",name:"type",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bbe\u5907\u578b\u53f7\uff01"}]},f.default.createElement(l.default,{placeholder:"\u8bf7\u8f93\u5165"})),f.default.createElement(i,{labelCol:{span:6},wrapperCol:{span:15},label:"\u673a\u578b",name:"model",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u673a\u578b\uff01"}]},f.default.createElement(l.default,{placeholder:"\u8bf7\u8f93\u5165"}))))},p=s;t.default=p},QyDn:function(e,t,a){e.exports={container:"antd-pro-components-header-dropdown-index-container"}},Rxp4:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.getUser=c,t.addUser=f,t.updateUser=s,t.deleteUser=m,t.deleteUsers=h;var r=n(a("p0pE")),l=n(a("d6i3")),u=n(a("1l/V")),d=n(a("t3Un"));function c(e){return o.apply(this,arguments)}function o(){return o=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/drone/v1/user",{}));case 1:case"end":return e.stop()}},e)})),o.apply(this,arguments)}function f(e){return i.apply(this,arguments)}function i(){return i=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/drone/v1/user",{method:"POST",data:(0,r.default)({},t)}));case 1:case"end":return e.stop()}},e)})),i.apply(this,arguments)}function s(e){return p.apply(this,arguments)}function p(){return p=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/drone/v1/user",{method:"PUT",data:(0,r.default)({},t)}));case 1:case"end":return e.stop()}},e)})),p.apply(this,arguments)}function m(e){return v.apply(this,arguments)}function v(){return v=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.abrupt("return",(0,d.default)("drone/v1/user/".concat(t),{method:"DELETE"}));case 2:case"end":return e.stop()}},e)})),v.apply(this,arguments)}function h(e){return g.apply(this,arguments)}function g(){return g=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.abrupt("return",(0,d.default)("drone/v1/user/batch",{method:"DELETE",data:t}));case 2:case"end":return e.stop()}},e)})),g.apply(this,arguments)}},YIiE:function(e,t,a){"use strict";var n=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var l=r(a("kLXV")),u=r(a("jehZ"));a("+L6B");var d=r(a("2/Rp"));a("5NDa");var c=r(a("5rEg")),o=r(a("d6i3")),f=r(a("p0pE")),i=r(a("1l/V")),s=r(a("qIgq"));a("y8nQ");var p=r(a("Vl3Y")),m=n(a("q1tI")),v=p.default.Item,h={labelCol:{span:7},wrapperCol:{span:13}},g=function(e){var t=(0,m.useState)({name:e.values.name,code:e.values.code,id:e.values.id,type:e.values.type,model:e.values.model}),a=(0,s.default)(t,2),n=a[0],r=a[1],g=p.default.useForm(),E=(0,s.default)(g,1),b=E[0],y=e.onSubmit,w=e.onCancel,k=e.updateModalVisible,x=e.values,C=function(){var e=(0,i.default)(o.default.mark(function e(){return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,b.validateFields();case 2:e.sent,r((0,f.default)({},n)),y(n);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),q=function(){return m.default.createElement(m.default.Fragment,null,m.default.createElement(v,{name:"name",label:"\u8bbe\u5907\u6635\u79f0",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bbe\u5907\u6635\u79f0\uff01"}]},m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})),m.default.createElement(v,{name:"code",label:"\u8bbe\u5907\u7f16\u53f7",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bbe\u5907\u7f16\u53f7\uff01"}]},m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})),m.default.createElement(v,{name:"type",label:"\u8bbe\u5907\u578b\u53f7",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8bbe\u5907\u578b\u53f7\uff01"}]},m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})),m.default.createElement(v,{name:"model",label:"\u673a\u578b",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u673a\u578b\uff01"}]},m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})))},I=function(){return m.default.createElement(m.default.Fragment,null,m.default.createElement(d.default,{onClick:function(){return w(!1,x)}},"\u53d6\u6d88"),m.default.createElement(d.default,{type:"primary",onClick:function(){return C()}},"\u786e\u8ba4"))};return m.default.createElement(l.default,{width:640,bodyStyle:{padding:"32px 40px 48px"},destroyOnClose:!0,title:"\u8bbe\u5907\u4fee\u6539",visible:k,footer:I(),onCancel:function(){return w(!1,x)},afterClose:function(){return w()}},m.default.createElement(p.default,(0,u.default)({},h,{form:b,initialValues:{name:n.name,code:n.code,id:n.id,type:n.type,model:n.model},onValuesChange:function(e,t){return r(t)}}),q()))},E=g;t.default=E},h3zL:function(e,t,a){e.exports={menu:"antd-pro-components-global-header-index-menu",right:"antd-pro-components-global-header-index-right",action:"antd-pro-components-global-header-index-action",search:"antd-pro-components-global-header-index-search",account:"antd-pro-components-global-header-index-account",avatar:"antd-pro-components-global-header-index-avatar",dark:"antd-pro-components-global-header-index-dark",name:"antd-pro-components-global-header-index-name"}},hfs5:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.getDevice=c,t.addDevice=f,t.updateDevice=s,t.deleteDevice=m,t.getDeviceDataId=h;var r=n(a("p0pE")),l=n(a("d6i3")),u=n(a("1l/V")),d=n(a("t3Un"));function c(e){return o.apply(this,arguments)}function o(){return o=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/drone/v1/device",{}));case 1:case"end":return e.stop()}},e)})),o.apply(this,arguments)}function f(e){return i.apply(this,arguments)}function i(){return i=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/drone/v1/device",{method:"POST",data:(0,r.default)({},t)}));case 1:case"end":return e.stop()}},e)})),i.apply(this,arguments)}function s(e){return p.apply(this,arguments)}function p(){return p=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("/drone/v1/device",{method:"PUT",data:(0,r.default)({},t)}));case 1:case"end":return e.stop()}},e)})),p.apply(this,arguments)}function m(e){return v.apply(this,arguments)}function v(){return v=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.abrupt("return",(0,d.default)("drone/v1/device/".concat(t),{method:"DELETE"}));case 2:case"end":return e.stop()}},e)})),v.apply(this,arguments)}function h(){return g.apply(this,arguments)}function g(){return g=(0,u.default)(l.default.mark(function e(){return l.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.default)("http://122.51.223.137:8089/drone/v1/device"));case 1:case"end":return e.stop()}},e)})),g.apply(this,arguments)}},iUf1:function(e,t,a){e.exports={pre:"antd-pro-pages-welcome-pre"}},kaFD:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var r=n(a("W9HT"));a("Telt");var l=n(a("Tckk"));a("lUTK");var u=n(a("BvKs")),d=n(a("2Taf")),c=n(a("vZ4D")),o=n(a("l4Ni")),f=n(a("ujKo")),i=n(a("MhPg")),s=a("RBnf"),p=n(a("q1tI")),m=a("Hg0r"),v=a("ArA+"),h=n(a("6Wvd")),g=n(a("h3zL")),E=function(e){function t(){var e,a;(0,d.default)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return a=(0,o.default)(this,(e=(0,f.default)(t)).call.apply(e,[this].concat(r))),a.onMenuClick=function(e){var t=e.key;if("logout"!==t)v.router.push("/account/".concat(t));else{var n=a.props.dispatch;n&&n({type:"login/logout"})}},a}return(0,i.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){var e=this.props,t=e.currentUser,a=void 0===t?{avatar:"",name:""}:t,n=e.menu,d=p.default.createElement(u.default,{className:g.default.menu,selectedKeys:[],onClick:this.onMenuClick},n&&p.default.createElement(u.default.Item,{key:"center"},p.default.createElement(s.UserOutlined,null),"\u4e2a\u4eba\u4e2d\u5fc3"),n&&p.default.createElement(u.default.Item,{key:"settings"},p.default.createElement(s.SettingOutlined,null),"\u4e2a\u4eba\u8bbe\u7f6e"),n&&p.default.createElement(u.default.Divider,null),p.default.createElement(u.default.Item,{key:"logout"},p.default.createElement(s.LogoutOutlined,null),"\u9000\u51fa\u767b\u5f55"));return a&&a.name?p.default.createElement(h.default,{overlay:d},p.default.createElement("span",{className:"".concat(g.default.action," ").concat(g.default.account)},p.default.createElement(l.default,{size:"small",className:g.default.avatar,src:a.avatar,alt:"avatar"}),p.default.createElement("span",{className:g.default.name},a.name))):p.default.createElement(r.default,{size:"small",style:{marginLeft:8,marginRight:8}})}}]),t}(p.default.Component),b=(0,m.connect)(function(e){var t=e.user;return{currentUser:t.currentUser}})(E);t.default=b},maEh:function(e,t,a){"use strict";var n=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=r(a("jehZ")),u=r(a("gWZ8")),d=r(a("p0pE"));a("J+/v");var c=r(a("MoRW"));a("+L6B");var o=r(a("2/Rp")),f=n(a("Hx5s")),i=a("Y2fQ"),s=n(a("q1tI")),p=a("ArA+"),m=a("Hg0r"),v=a("RBnf"),h=r(a("HZnN")),g=r(a("57a1")),E=a("+n12"),b=r(a("zwU1")),y=s.default.createElement(c.default,{status:"403",title:"403",subTitle:"Sorry, you are not authorized to access this page.",extra:s.default.createElement(o.default,{type:"primary"},s.default.createElement(p.Link,{to:"/user/login"},"Go Login"))}),w=function e(t){return t.map(function(t){var a=(0,d.default)({},t,{children:t.children?e(t.children):[]});return h.default.check(t.authority,a,null)})},k=(s.default.createElement(f.DefaultFooter,{copyright:"2019 \u8682\u8681\u91d1\u670d\u4f53\u9a8c\u6280\u672f\u90e8\u51fa\u54c1",links:[{key:"Ant Design Pro",title:"Ant Design Pro",href:"https://pro.ant.design",blankTarget:!0},{key:"github",title:s.default.createElement(v.GithubOutlined,null),href:"https://github.com/ant-design/ant-design-pro",blankTarget:!0},{key:"Ant Design",title:"Ant Design",href:"https://ant.design",blankTarget:!0}]}),function(e){var t=e.dispatch,a=e.children,n=e.settings,r=e.location,d=void 0===r?{pathname:"/"}:r;(0,s.useEffect)(function(){t&&t({type:"user/fetchCurrent"})},[]);var c=function(e){t&&t({type:"global/changeLayoutCollapsed",payload:e})},o=(0,E.getAuthorityFromRouter)(e.route.routes,d.pathname||"/")||{authority:void 0};return s.default.createElement(f.default,(0,l.default)({logo:b.default,formatMessage:i.formatMessage,menuHeaderRender:function(e,t){return s.default.createElement(p.Link,{to:"/"},e,t)},onCollapse:c,menuItemRender:function(e,t){return e.isUrl||e.children||!e.path?t:s.default.createElement(p.Link,{to:e.path},t)},breadcrumbRender:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return[{path:"/",breadcrumbName:"\u9996\u9875"}].concat((0,u.default)(e))},itemRender:function(e,t,a,n){var r=0===a.indexOf(e);return r?s.default.createElement(p.Link,{to:n.join("/")},e.breadcrumbName):s.default.createElement("span",null,e.breadcrumbName)},menuDataRender:w,contentStyle:{margin:0},rightContentRender:function(){return s.default.createElement(g.default,null)}},e,n),s.default.createElement(h.default,{authority:o.authority,noMatch:y},a))}),x=(0,m.connect)(function(e){var t=e.global,a=e.settings;return{collapsed:t.collapsed,settings:a}})(k);t.default=x},ojHk:function(e,t,a){"use strict";var n=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("O3gP");var l=r(a("lrIw"));a("5NDa");var u=r(a("5rEg")),d=r(a("eHn4")),c=r(a("qIgq")),o=r(a("Y/ft")),f=a("RBnf"),i=r(a("yUgw")),s=n(a("q1tI")),p=r(a("TSYQ")),m=r(a("G3lK")),v=function(e){var t=e.className,a=e.defaultValue,n=e.onVisibleChange,r=e.placeholder,v=(e.open,e.defaultOpen),h=(0,o.default)(e,["className","defaultValue","onVisibleChange","placeholder","open","defaultOpen"]),g=(0,s.useRef)(null),E=(0,i.default)(a,{value:e.value,onChange:e.onChange}),b=(0,c.default)(E,2),y=b[0],w=b[1],k=(0,i.default)(v||!1,{value:e.open,onChange:n}),x=(0,c.default)(k,2),C=x[0],q=x[1],I=(0,p.default)(m.default.input,(0,d.default)({},m.default.show,C));return s.default.createElement("div",{className:(0,p.default)(t,m.default.headerSearch),onClick:function(){q(!0),C&&g.current&&g.current.focus()},onTransitionEnd:function(e){var t=e.propertyName;"width"!==t||C||n&&n(C)}},s.default.createElement(f.SearchOutlined,{key:"Icon",style:{cursor:"pointer"}}),s.default.createElement(l.default,{key:"AutoComplete",className:I,value:y,style:{height:28,marginTop:-6},options:h.options,onChange:w},s.default.createElement(u.default,{ref:g,size:"middle",defaultValue:a,"aria-label":r,placeholder:r,onKeyDown:function(e){"Enter"===e.key&&h.onSearch&&h.onSearch(y)},onBlur:function(){q(!1)}})))},h=v;t.default=h},paSq:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=n(a("bx4M"));a("fOrg");var l=n(a("+KLJ"));a("tU7J");n(a("wFql"));var u=n(a("q1tI")),d=a("Hx5s"),c=(a("8ml+"),a("6Pbx"),n(a("iUf1")),function(){return u.default.createElement(d.PageHeaderWrapper,{style:{margin:0}},u.default.createElement(r.default,null,u.default.createElement(l.default,{message:"\u529f\u80fd\u5f00\u53d1\u4e2d~",type:"warning",showIcon:!0,banner:!0,style:{margin:-12}})))});t.default=c},qB3S:function(e,t,a){"use strict";var n=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var l=r(a("kLXV")),u=r(a("jehZ"));a("+L6B");var d=r(a("2/Rp"));a("5NDa");var c=r(a("5rEg")),o=r(a("d6i3")),f=r(a("p0pE")),i=r(a("1l/V")),s=r(a("qIgq"));a("y8nQ");var p=r(a("Vl3Y")),m=n(a("q1tI")),v=p.default.Item,h={labelCol:{span:7},wrapperCol:{span:13}},g=function(e){var t=(0,m.useState)({nickname:e.values.nickname,username:e.values.username,id:e.values.id,phone:e.values.phone,password:e.values.password}),a=(0,s.default)(t,2),n=a[0],r=a[1],g=p.default.useForm(),E=(0,s.default)(g,1),b=E[0],y=e.onSubmit,w=e.onCancel,k=e.updateModalVisible,x=e.values,C=function(){var e=(0,i.default)(o.default.mark(function e(){return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,b.validateFields();case 2:e.sent,r((0,f.default)({},n)),y(n);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),q=function(){return m.default.createElement(m.default.Fragment,null,m.default.createElement(v,{name:"nickname",label:"\u7528\u6237\u6635\u79f0",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u6635\u79f0\uff01"}]},m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})),m.default.createElement(v,{name:"username",label:"\u8d26\u6237\u540d",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8d26\u6237\u540d\uff01"}]},m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})),m.default.createElement(v,{name:"password",label:"\u5bc6\u7801",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"}]},m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})),m.default.createElement(v,{name:"phone",label:"\u624b\u673a\u53f7",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7\uff01"}]},m.default.createElement(c.default,{placeholder:"\u8bf7\u8f93\u5165"})))},I=function(){return m.default.createElement(m.default.Fragment,null,m.default.createElement(d.default,{onClick:function(){return w(!1,x)}},"\u53d6\u6d88"),m.default.createElement(d.default,{type:"primary",onClick:function(){return C()}},"\u786e\u8ba4"))};return m.default.createElement(l.default,{width:640,bodyStyle:{padding:"32px 40px 48px"},destroyOnClose:!0,title:"\u7528\u6237\u4fee\u6539",visible:k,footer:I(),onCancel:function(){return w(!1,x)},afterClose:function(){return w()}},m.default.createElement(p.default,(0,u.default)({},h,{form:b,initialValues:{nickname:n.nickname,phone:n.phone,id:n.id,username:n.username,password:n.password},onValuesChange:function(e,t){return r(t)}}),q()))},E=g;t.default=E},"t/qQ":function(e,t,a){"use strict";var n=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("qVdP");var l=r(a("jsC+"));a("lUTK");var u=r(a("BvKs"));a("+L6B");var d=r(a("2/Rp"));a("P2fV");var c=r(a("NJEC"));a("/zsF");var o=r(a("PArb")),f=r(a("qIgq")),i=r(a("d6i3"));a("miYZ");var s=r(a("tsqr")),p=r(a("1l/V")),m=a("RBnf"),v=n(a("q1tI")),h=a("Hx5s"),g=r(a("Qiat")),E=r(a("Bib1")),b=r(a("qB3S")),y=a("Rxp4"),w=function(){var e=(0,p.default)(i.default.mark(function e(t){var a,n;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=s.default.loading("\u6b63\u5728\u6dfb\u52a0"),e.prev=1,e.next=4,(0,y.addUser)(t);case 4:return n=e.sent,console.log(n),a(),s.default.success("\u6dfb\u52a0\u6210\u529f"),e.abrupt("return",!0);case 11:return e.prev=11,e.t0=e["catch"](1),a(),s.default.error("\u6dfb\u52a0\u5931\u8d25\u8bf7\u91cd\u8bd5\uff01"),e.abrupt("return",!1);case 16:case"end":return e.stop()}},e,null,[[1,11]])}));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=(0,p.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=s.default.loading("\u6b63\u5728\u4fee\u6539"),console.log(t),e.prev=2,e.next=5,(0,y.updateUser)(t);case 5:return a(),s.default.success("\u4fee\u6539\u6210\u529f"),e.abrupt("return",!0);case 10:return e.prev=10,e.t0=e["catch"](2),a(),s.default.error("\u4fee\u6539\u5931\u8d25\u8bf7\u91cd\u8bd5\uff01"),e.abrupt("return",!1);case 15:case"end":return e.stop()}},e,null,[[2,10]])}));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=(0,p.default)(i.default.mark(function e(t,a){var n,r,l,u,d,c,o,f,p;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=s.default.loading("\u6b63\u5728\u5220\u9664"),e.prev=1,"[object Array]"!==Object.prototype.toString.call(t)){e.next=29;break}for(r=[],l=!0,u=!1,d=void 0,e.prev=7,c=t[Symbol.iterator]();!(l=(o=c.next()).done);l=!0)f=o.value,r.push(f.id);e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](7),u=!0,d=e.t0;case 15:e.prev=15,e.prev=16,l||null==c.return||c.return();case 18:if(e.prev=18,!u){e.next=21;break}throw d;case 21:return e.finish(18);case 22:return e.finish(15);case 23:return p=r.join(),console.log(p),e.next=27,(0,y.deleteUsers)(p);case 27:e.next=31;break;case 29:return e.next=31,(0,y.deleteUser)(t.id);case 31:return n(),s.default.success("\u5220\u9664\u6210\u529f"),a.current&&a.current.reload(),e.abrupt("return",!0);case 37:return e.prev=37,e.t1=e["catch"](1),console.log(e.t1),n(),s.default.error("\u5220\u9664\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5"),e.abrupt("return",!1);case 43:case"end":return e.stop()}},e,null,[[1,37],[7,11,15,23],[16,,18,22]])}));return function(t,a){return e.apply(this,arguments)}}(),C=function(){var e=(0,v.useState)({}),t=(0,f.default)(e,2),a=t[0],n=t[1],r=(0,v.useState)(!1),s=(0,f.default)(r,2),C=s[0],q=s[1],I=(0,v.useState)(!1),S=(0,f.default)(I,2),O=S[0],D=S[1],P=(0,v.useState)({}),V=(0,f.default)(P,2),T=V[0],R=V[1],N=(0,v.useRef)(),_=[{title:"\u7528\u6237ID",dataIndex:"id"},{title:"\u7528\u6237\u6635\u79f0",dataIndex:"nickname"},{title:"\u8d26\u53f7",dataIndex:"username"},{title:"\u5bc6\u7801",dataIndex:"password"},{title:"\u624b\u673a\u53f7\u7801",dataIndex:"phone"},{title:"\u64cd\u4f5c",dataIndex:"option",valueType:"option",render:function(e,t){return v.default.createElement(v.default.Fragment,null,v.default.createElement("a",{onClick:function(){D(!0),R(t)}},"\u4fee\u6539"),v.default.createElement(o.default,{type:"vertical"}),v.default.createElement(c.default,{title:"\u786e\u5b9a\u5220\u9664\u8be5\u7528\u6237\u5417\uff1f",onConfirm:function(){return x(t,N)},okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},v.default.createElement("a",{href:""},"\u5220\u9664")))}}];return v.default.createElement(h.PageHeaderWrapper,{style:{margin:0}},v.default.createElement(g.default,{headerTitle:"\u67e5\u8be2\u8bbe\u5907",actionRef:N,rowKey:"id",onChange:function(e,t,a){n("".concat(a.field,"_").concat(a.order))},params:{sorter:a},toolBarRender:function(e,t){var a=t.selectedRows;return[v.default.createElement(d.default,{type:"primary",onClick:function(){return q(!0)}},v.default.createElement(m.PlusOutlined,null)," \u6dfb\u52a0"),a&&a.length>0&&v.default.createElement(l.default,{overlay:v.default.createElement(u.default,{onClick:function(){var t=(0,p.default)(i.default.mark(function t(n){return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if("remove"!==n.key){t.next=4;break}return t.next=3,x(a,N);case 3:e.reload();case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),selectedKeys:[]},v.default.createElement(u.default.Item,{key:"remove"},"\u6279\u91cf\u5220\u9664"))},v.default.createElement(d.default,null,"\u6279\u91cf\u64cd\u4f5c ",v.default.createElement(m.DownOutlined,null)))]},tableAlertRender:function(e,t){return v.default.createElement("div",null,"\u5df2\u9009\u62e9"," ",v.default.createElement("a",{style:{fontWeight:600}},e.length)," ","\u9879\xa0\xa0")},request:function(e){return(0,y.getUser)({limit:e.pageSize,page:e.current,sort:e.sorter})},columns:_,rowSelection:{}}),v.default.createElement(E.default,{onSubmit:function(){var e=(0,p.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,w(t);case 3:a=e.sent,a&&(q(!1),N.current&&N.current.reload());case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),onCancel:function(){return q(!1)},modalVisible:C}),T&&Object.keys(T).length?v.default.createElement(b.default,{onSubmit:function(){var e=(0,p.default)(i.default.mark(function e(t){var a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,k(t);case 3:a=e.sent,a&&(D(!1),R({}),N.current&&N.current.reload());case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),onCancel:function(){D(!1),R({})},updateModalVisible:O,values:T}):null)},q=C;t.default=q},zwU1:function(e,t,a){e.exports=a.p+"static/logo.e84a33a6.png"}}]);
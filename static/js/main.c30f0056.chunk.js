(this["webpackJsonpreact-default"]=this["webpackJsonpreact-default"]||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},106:function(e,t,n){"use strict";n.r(t);var c=n(19),o=n.n(c),s=n(3),r=n(4),i=n(0),a=(n(99),n(100),n(101),n(6)),u=function(e){var t=e.todos,n=e.chooseItem;return Object(a.jsx)("ul",{className:"list",children:t.map((function(e){return Object(a.jsxs)("li",{className:"list__item",onClick:function(){var c=t.find((function(t){return t.id===e.id}));void 0!==c&&n(c)},children:[Object(a.jsx)("h3",{children:e.id}),Object(a.jsx)("div",{children:e.title})]},e.id)}))})},l=function(e){var t=e.todos,n=e.chooseItem;return Object(a.jsx)("div",{className:"sidebar",children:Object(a.jsx)(u,{todos:t,chooseItem:n})})},d=n(1),j=n(108),b=n(49),O=n(52),f=j.a.confirm,h=function(e){var t=e.currentItem,n=e.deleteItem,c=e.editItem,o=Object(i.useState)(!1),s=Object(r.a)(o,2),u=s[0],l=s[1],h=Object(i.useState)(t.userId),p=Object(r.a)(h,2),v=p[0],m=p[1],x=Object(i.useState)(t.title),g=Object(r.a)(x,2),k=g[0],I=g[1];return Object(a.jsx)("div",{className:"workspace",children:t&&Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{children:t.userId}),Object(a.jsx)("div",{children:t.title}),Object(a.jsxs)("div",{className:"workspace__buttons",children:[Object(a.jsx)(b.a,{type:"primary",onClick:function(){l(!0)},children:"Edit"}),Object(a.jsxs)(j.a,{title:"Edit",visible:u,onOk:function(){l(!1),c(Object(d.a)(Object(d.a)({},t),{},{userId:v,title:k}))},onCancel:function(){l(!1)},children:[Object(a.jsx)("input",{type:"number",value:v,placeholder:"id",onChange:function(e){m(Number(e.target.value))}}),Object(a.jsx)("input",{type:"text",value:k,placeholder:"title",onChange:function(e){I(e.target.value)}})]}),Object(a.jsx)(b.a,{onClick:function(){f({title:"Are you sure delete this task?",icon:Object(a.jsx)(O.a,{}),okText:"Yes",okType:"danger",cancelText:"No",onOk:function(){n(t.id)}})},type:"dashed",children:"Delete"})]})]})})},p=function(){var e=Object(i.useState)([]),t=Object(r.a)(e,2),n=t[0],c=t[1],o=Object(i.useState)(null),u=Object(r.a)(o,2),d=u[0],O=u[1],f=Object(i.useState)(!0),p=Object(r.a)(f,2),v=p[0],m=p[1],x=Object(i.useState)(!1),g=Object(r.a)(x,2),k=g[0],I=g[1],y=Object(i.useState)(1),S=Object(r.a)(y,2),C=S[0],N=S[1],w=Object(i.useState)(""),_=Object(r.a)(w,2),A=_[0],E=_[1],q=Object(i.useRef)();Object(i.useEffect)((function(){var e=indexedDB.open("tasks",1);e.onupgradeneeded=function(){console.log("open db - onupgradeneeded"),q.current=e.result,q.current.objectStoreNames.contains("tasks")||q.current.createObjectStore("tasks",{keyPath:"task",autoIncrement:!0})},e.onerror=function(){console.log("open db request - onerror")},e.onsuccess=function(e){console.log("open db request - onsuccess"),q.current=e.target.result;var t=e.target.result.transaction(["tasks"]).objectStore("tasks");t.getAll.onsuccess=function(e){console.log(t.getAll()),c(e.target.value)}}}),[]);var T=function(){var e,t=(null===(e=q.current)||void 0===e?void 0:e.transaction("tasks","readwrite")).objectStore("tasks"),o={userId:C,id:n.length+1,title:A,completed:!1},r=t.add(o);c([].concat(Object(s.a)(n),[o])),r.onsuccess=function(){console.log("\u0417\u0430\u043f\u0438\u0441\u0430\u043d\u043e")},r.onerror=function(){console.log("\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u043f\u0438\u0441\u0438")}};return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(l,{todos:n,chooseItem:function(e){O(e),m(!0)}}),Object(a.jsxs)("div",{className:"App__work",children:[Object(a.jsx)(j.a,{title:"\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u043c\u0435\u0442\u043a\u0430",visible:k,onOk:function(){I(!1),T()},onCancel:function(){I(!1)},children:Object(a.jsxs)("form",{action:"#",method:"GET",children:[Object(a.jsx)("input",{type:"number",value:C,placeholder:"userId",onChange:function(e){N(+e.target.value)},required:!0}),Object(a.jsx)("input",{type:"text",value:A,placeholder:"\u0417\u0430\u043c\u0435\u0442\u043a\u0430",onChange:function(e){E(e.target.value)},required:!0})]})}),Object(a.jsx)(b.a,{type:"primary",onClick:function(){I(!0)},children:"\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u043c\u0435\u0442\u043a\u0430"}),d&&v&&Object(a.jsx)(h,{currentItem:d,deleteItem:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;c(n.filter((function(t){return t.id!==e}))),m(!1)},editItem:function(e){var t=n.findIndex((function(t){return t.id===e.id}));c(n.map((function(n,c){return t===c?e:n}))),O(e)}})]})]})};n(105);o.a.render(Object(a.jsx)(p,{}),document.getElementById("root"))},99:function(e,t,n){}},[[106,1,2]]]);
//# sourceMappingURL=main.c30f0056.chunk.js.map
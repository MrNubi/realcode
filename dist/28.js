"use strict";(self.webpackChunksleact_ts_front=self.webpackChunksleact_ts_front||[]).push([[28],{16815:(n,e,t)=>{t.d(e,{Z:()=>b});var r=t(67294),o=t(93379),a=t.n(o),i=t(7795),s=t.n(i),l=t(90569),c=t.n(l),d=t(3565),u=t.n(d),p=t(19216),m=t.n(p),g=t(44589),f=t.n(g),h=t(43061),x={};x.styleTagTransform=f(),x.setAttributes=u(),x.insert=c().bind(null,"head"),x.domAPI=s(),x.insertStyleElement=m(),a()(h.Z,x),h.Z&&h.Z.locals&&h.Z.locals;const b=function(n){return r.createElement("div",{style:{marginBottom:"0.8rem",width:"100%"}},r.createElement("input",{type:n.type,style:{width:"100%",height:"13.6%",border:"1px",borderColor:"black",borderStyle:"solid",borderRadius:"15px",textAlign:"center",transitionDuration:"200ms"},placeholder:n.placeholder,value:n.value,onChange:function(e){console.log("글자입력",e.target.value),console.log("글자입력",n.value),n.setValue(e.target.value)}}))}},50028:(n,e,t)=>{t.r(e),t.d(e,{default:()=>g});var r=t(9669),o=t.n(r),a=t(67294),i=t(16550),s=t(73727),l=t(66187),c=t(83757),d=t(16815),u=t(36216);function p(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,o,a=[],i=!0,s=!1;try{for(t=t.call(n);!(i=(r=t.next()).done)&&(a.push(r.value),!e||a.length!==e);i=!0);}catch(n){s=!0,o=n}finally{try{i||null==t.return||t.return()}finally{if(s)throw o}}return a}}(n,e)||function(n,e){if(n){if("string"==typeof n)return m(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?m(n,e):void 0}}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}const g=function(){var n=(0,c.ZP)("tocken",u.Z),e=n.data,t=n.mutate,r=p((0,a.useState)(!1),2),m=(r[0],r[1],p((0,a.useState)(""),2)),g=m[0],f=m[1],h=p((0,a.useState)(""),2),x=h[0],b=h[1],v=(0,a.useCallback)((function(n){n.preventDefault(),y(n)}),[g,x]),y=function(n){n.preventDefault(),console.log("로그인 체크",g+" @@ "+x),o().post("https://memolucky.run.goorm.io/users/dj-rest-auth/login/",{username:g,password:x},{withCredentials:!0}).then((function(n){var r=JSON.stringify(n);return sessionStorage.setItem("tocken",n.data.access_token),sessionStorage.setItem("username",n.data.user.username),sessionStorage.setItem("pk",n.data.user.pk),sessionStorage.setItem("nickname",n.data.user.nickname),sessionStorage.setItem("MyData",r),t(n.data.access_token,!1),console.log("clear : ",n),console.log("clear2 : ",e),a.createElement(i.l_,{to:"/Memoworkspace"})})).catch((function(n){console.log("testAxios:  ",n)}))},w=sessionStorage.getItem("tocken");return console.log("tk",w),null!=w?(console.log("datacheck login in: ",w),a.createElement(i.l_,{to:"/Memoworkspace"})):a.createElement("div",{id:"container",style:{display:"flex",justifyContent:"center",alignItems:"center",background:"pink"}},a.createElement(l.QD,null,a.createElement(l.tw,null,a.createElement(l.h4,null,"MEMOP"),a.createElement("form",{onSubmit:v},a.createElement(d.Z,{className:" mb-3",placeholder:"ID",value:g,setValue:f}),a.createElement(d.Z,{className:" mb-3\r ",type:"password",placeholder:"PW",value:x,setValue:b}),a.createElement(l.Th,{type:"submit"},"LogIn")),a.createElement("div",{style:{display:"flex",justifyContent:"center"}},a.createElement(s.rU,{style:{color:"transparent"},to:"/memoSignup"},a.createElement("small",{style:{color:"#626262",marginRight:"15px"}},"아이디 찾기")),a.createElement(s.rU,{style:{color:"transparent"},to:"/memoSignup"},a.createElement("small",{style:{color:"#626262"}},"비밀qjsgh찾기"))))))}},66187:(n,e,t)=>{t.d(e,{QD:()=>x,Th:()=>y,h4:()=>h,sH:()=>v,tw:()=>b});var r,o,a,i,s,l,c,d,u,p,m,g=t(5996);function f(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var h=g.Z.header(r||(r=f(["\n  margin-bottom: 0.6rem;\n  text-align: center;\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 700;\n"]))),x=g.Z.div(o||(o=f(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 80vh;\n\n  height: 100vh;\n  padding: 24px;\n"]))),b=g.Z.div(a||(a=f(["\n  display: felx;\n  overflow: hidden\n  align-items: center;\n  justify-contents: center;\n  min-height: 250px;\n  min-width:300px;\n  width: 75%;\n  height: 40%;\n  background-color: white;\n  padding: 12px;\n  padding-left: 50px;\n  padding-right: 50px;\n  border-radius: 0.75rem;\n  margin-left: auto;\n  margin-right: auto;\n  @media all and (min-width: 768px) {\n    .md:w-96 {\n      width: 384px;\n    }\n  }\n"],["\n  display: felx;\n  overflow: hidden\n  align-items: center;\n  justify-contents: center;\n  min-height: 250px;\n  min-width:300px;\n  width: 75%;\n  height: 40%;\n  background-color: white;\n  padding: 12px;\n  padding-left: 50px;\n  padding-right: 50px;\n  border-radius: 0.75rem;\n  margin-left: auto;\n  margin-right: auto;\n  @media all and (min-width: 768px) {\n    .md\\:w-96 {\n      width: 384px;\n    }\n  }\n"]))),v=g.Z.div(i||(i=f(["\n  display: felx;\n  overflow: hidden\n  align-items: center;\n  justify-contents: center;\n  min-height: 250px;\n  min-width:300px;\n  width: 100%;\n  height: 60%;\n  background-color: white;\n  padding: 12px;\n  padding-left: 50px;\n  padding-right: 50px;\n  border-radius: 0.75rem;\n  margin-left: auto;\n  margin-right: auto;\n  @media all and (min-width: 768px) {\n    .md:w-96 {\n      width: 384px;\n    }\n  }\n"],["\n  display: felx;\n  overflow: hidden\n  align-items: center;\n  justify-contents: center;\n  min-height: 250px;\n  min-width:300px;\n  width: 100%;\n  height: 60%;\n  background-color: white;\n  padding: 12px;\n  padding-left: 50px;\n  padding-right: 50px;\n  border-radius: 0.75rem;\n  margin-left: auto;\n  margin-right: auto;\n  @media all and (min-width: 768px) {\n    .md\\:w-96 {\n      width: 384px;\n    }\n  }\n"]))),y=g.Z.button(s||(s=f(["\n  text-align: center;\n  width: 100%;\n\n  color: rgba(var(--sk_primary_foreground, 255, 255, 255), 1);\n  background-color: rgba(var(--sk_primary_background, 83, 83, 83), 1);\n  cursor: pointer;\n  border-radius: 15px;\n  padding: 5px;\n\n  font-family: 'Inter';\n  font-style: normal;\n  font-size: 15px;\n  &:focus {\n    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);\n    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);\n  }\n"])));g.Z.label(l||(l=f(["\n  margin-bottom: 16px;\n  & > span {\n    display: block;\n    text-align: left;\n    padding-bottom: 8px;\n    font-size: 15px;\n    cursor: pointer;\n    line-height: 1.46666667;\n    font-weight: 700;\n  }\n"]))),g.Z.input(c||(c=f(["\n  border-radius: 4px;\n  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);\n  border: 1px solid var(--saf-0);\n  transition: border 80ms ease-out, box-shadow 80ms ease-out;\n  box-sizing: border-box;\n  margin: 0 0 20px;\n  width: 100%;\n  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);\n  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);\n  padding: 12px;\n  height: 44px;\n  padding-top: 11px;\n  padding-bottom: 13px;\n  font-size: 18px;\n  line-height: 1.33333333;\n  &:focus {\n    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);\n    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);\n  }\n"]))),g.Z.button(d||(d=f(["\n  margin-bottom: 12px;\n  width: 100%;\n  max-width: 100%;\n  color: #fff;\n  background-color: #4a154b;\n  border: none;\n  font-size: 18px;\n  font-weight: 900;\n  height: 44px;\n  min-width: 96px;\n  padding: 0 16px 3px;\n  transition: all 80ms linear;\n  user-select: none;\n  outline: none;\n  cursor: pointer;\n  border-radius: 4px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);\n  &:hover {\n    background-color: rgba(74, 21, 75, 0.9);\n    border: none;\n  }\n  &:focus {\n    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);\n    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);\n  }\n"]))),g.Z.div(u||(u=f(["\n  color: #e01e5a;\n  margin: 8px 0 16px;\n  font-weight: bold;\n"]))),g.Z.div(p||(p=f(["\n  color: #2eb67d;\n  font-weight: bold;\n"]))),g.Z.p(m||(m=f(["\n  font-size: 13px;\n  color: #616061;\n  margin: 0 auto 8px;\n  width: 400px;\n  max-width: 400px;\n  & a {\n    color: #1264a3;\n    text-decoration: none;\n    font-weight: 700;\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n"])))},36216:(n,e,t)=>{t.d(e,{Z:()=>r});const r=function(){var n=sessionStorage.getItem("tocken");return n?(console.log("fetcherMemoLocal : tocken",n),n):(console.log("fetcherMemoLocal : non-tocken",n),"non-tocken")}},43061:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(87537),o=t.n(r),a=t(23645),i=t.n(a)()(o());i.push([n.id,"@tailwind base;\r\n@tailwind components;\r\n@tailwind utilities;\r\n","",{version:3,sources:["webpack://./components/MemoInput/style.module.css"],names:[],mappings:"AAAA,cAAc;AACd,oBAAoB;AACpB,mBAAmB",sourcesContent:["@tailwind base;\r\n@tailwind components;\r\n@tailwind utilities;\r\n"],sourceRoot:""}]),i.locals={};const s=i},23645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(i[l]=!0)}for(var c=0;c<n.length;c++){var d=[].concat(n[c]);r&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),e.push(d))}},e}},87537:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */"),i=t.sources.map((function(n){return"/*# sourceURL=".concat(t.sourceRoot||"").concat(n," */")}));return[e].concat(i).concat([a]).join("\n")}return[e].join("\n")}},93379:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],s=0;s<n.length;s++){var l=n[s],c=r.base?l[0]+r.base:l[0],d=a[c]||0,u="".concat(c," ").concat(d);a[c]=d+1;var p=t(u),m={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(m);else{var g=o(m,r);r.byIndex=s,e.splice(s,0,{identifier:u,updater:g,references:1})}i.push(u)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var s=t(a[i]);e[s].references--}for(var l=r(n,o),c=0;c<a.length;c++){var d=t(a[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}a=l}}},90569:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},19216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},3565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},7795:n=>{n.exports=function(n){var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},44589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}}]);
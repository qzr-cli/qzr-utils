(()=>{var e={999:()=>{}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var a=r[n]={exports:{}};return e[n](a,a.exports,t),a.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";function e(e,r,t,n,o,a,u){try{var i=e[a](u),c=i.value}catch(e){return void t(e)}i.done?r(c):Promise.resolve(c).then(n,o)}function r(r){return function(){var t=this,n=arguments;return new Promise((function(o,a){var u=r.apply(t,n);function i(r){e(u,o,a,i,c,"next",r)}function c(r){e(u,o,a,i,c,"throw",r)}i(void 0)}))}}var n={};n.get=function(){var e=r(regeneratorRuntime.mark((function e(r){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,cookieStore.get(r);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),n.getAll=function(){var e=r(regeneratorRuntime.mark((function e(r){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,cookieStore.getAll({domain:r});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),n.set=function(){var e=r(regeneratorRuntime.mark((function e(r){var t,n,o,a,u,i,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.key,n=void 0===t?"":t,o=r.val,a=void 0===o?"":o,u=r.domain,i=void 0===u?null:u,e.next=3,cookieStore.set({name:n,value:a,domain:i});case 3:return c=e.sent,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),n.del=function(){var e=r(regeneratorRuntime.mark((function e(r){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,cookieStore.delete(r);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),n.addEventListener=function(e){cookieStore.addEventListener("change",(function(r){return e(r)}))},n.clearAll=function(e){var r=document.cookie.match(/[^ =;]+(?==)/g);if(r)for(var t=r.length;t--;)document.cookie=r[t]+"=0;path=/;expires="+new Date(0).toUTCString(),document.cookie=r[t]+"=0;path=/;domain="+document.domain+";expires="+new Date(0).toUTCString(),document.cookie=r[t]+"=0;path=/;domain="+e+";expires="+new Date(0).toUTCString()};var o=t(999);t.n(o)()})()})();
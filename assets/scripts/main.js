!function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";function n(e,t){return[e.slice(0,2),t,e.slice(2)].join("")}s.r(t),$.fn.chunk=function(e){var t,s=[];for(t=0;t<this.length;t+=e)s.push(this.slice(t,t+e));return this.pushStack(s,"chunk",e)},$.urlParam=function(e){var t=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.href);return null==t?null:t[1]||0};var i;const o=function(e){var t=$(e).find("sessao");const s=[];return t.each((function(e,t){var i=$(t),o={},r=i.find("idfilme").text(),a=i.find("sala").text(),l=i.find("formato").text()?i.find("formato").text():"2d",c=i.find("genero").text(),d=i.find("classeetaria").text(),u=i.find("titulo").text().split("(")[0].trim(),f=i.find("titulo").text().split("(")[1],p="";f&&((f=f.toLowerCase()).indexOf("dob")>=0?p="dob":f.indexOf("leg")>=0&&(p="leg"));var m=n(i.find("horainicio").text(),":"),v=n(i.find("horafim").text(),":"),h=s.find((function(e){return e.title==u&&e.lang==p}));if(h){var x=s.indexOf(h);s[x].sessions[a]?s[x].sessions[a].push({format:l,startTime:m,endTime:v}):s[x].sessions[a]=[{format:l,startTime:m,endTime:v}]}else o.id=r,o.title=u,o.lang=p,o.type=c,o.target=d,o.sessions={},o.sessions[a]=[{format:l,startTime:m,endTime:v}],s.push(o)})),s}((i="../data/bload2.xml",$.ajax({type:"GET",url:i,cache:!1,dataType:"xml",async:!1,contentType:"Content-type: text/plain; charset=iso-8859-1",beforeSend:function(e){e.overrideMimeType("text/html;charset=iso-8859-1")}}).responseText));var r=function(e){let t="";return $.each(e,(function(e,s){let n="";const i=s,o=Object.keys(i.sessions).length;$.each(i.sessions,(function(e,t){let s="",o=!1;$.each(t,(function(e,t){const n=new Date;let i="";var r=new Date(moment(t.startTime,"HH:mm").format()),a=new Date(moment(r).add("900","seconds"));o?i="":n>r&&n<a?(i=" -active",o=!0):n<r?(i=" -active",o=!0):i="",s+='<li class="slots-session'+i+'"> <div class="slots-session__start">'+t.startTime+'</div><div class="slots-session__end">'+t.endTime+"</div></li>"})),n+='<div class="session-row"> <div class="session-room">'+t[0].format+"<span>Sala "+e+'</span></div><ul class="session-slots">'+s+'</ul> <div class="session-detail"> <div class="session-detail__type">'+i.type+'</div><div class="session-detail__target">'+i.target+"</div></div></div>"})),t+='<section class="poster container container--fixed" data-sessions="'+o+'"><div class="poster__image" style="background-color: rgba(255,0,'+Math.floor(255*Math.random())+')"></div><div class="poster__sessions"> <div class="sessions-wrapper double-sessions"> '+n+"</div></div></section>"})),t}(o);console.log(r),$(".posters")&&$(".posters").css({backgroundColor:"hotpink"}).empty().html(r)}]);
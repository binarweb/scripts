/* Simple Analytics - Privacy friendly analytics (docs.simpleanalytics.com/script; 2020-02-21; 8574) */

!function(o,n){if(o){function c(){return Math.random().toString(36).slice(2)}var s,u="https:",t="error",r=o.console,e="doNotTrack",i=o.navigator,f=o.location,p=o.document,h=f.hostname,a="Not sending requests ",d=encodeURIComponent,l=decodeURIComponent,m=JSON.stringify,v=o.addEventListener,y="https://queue."+n,g=undefined,w=function(e){r&&r.warn&&r.warn("Simple Analytics:",e)},E=function(e){return Math.round((Date.now()-(e||0))/1e3)};try{s=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(ie){}v(t,function(e){e.filename&&-1<e.filename.indexOf(n)&&re(e.message)},!1);function b(e,n){return e&&e.getAttribute("data-"+n)}var O,x,S="pushState",T=o.dispatchEvent,q=Date.now(),M=0,B=p.querySelector('script[src*="'+n+'"]'),D=b(B,"mode"),_="true"==b(B,"skip-dnt"),k=b(B,"sa-global")||"sa";if(!_&&e in i&&"1"==i[e])return w(a+"when "+e+" is enabled");if(-1==h.indexOf("."))return w(a+"from localhost");try{function I(e){var n=f.search.match(new RegExp("[?&]("+e+")=([^?&]+)","gi")),t=n?n.map(function(e){return e.split("=")[1]}):[];if(t&&t[0])return t[0]}function $(){for(var e={},n=0;n<arguments.length;n++){var t=arguments[n];if(t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}var j,N,R={},A=c(),C={version:0,hostname:h},F="(utm_)?",L={source:I(F+"source|source|ref"),medium:I(F+"medium"),campaign:I(F+"campaign"),referrer:(p.referrer||"").replace(/^https?:\/\/((m|l|w{2,3}([0-9]+)?)\.)?([^?#]+)(.*)$/,"$4").replace(/^([^/]+)\/$/,"$1")||g},U=0;o.addEventListener("visibilitychange",function(){p.hidden?N=Date.now():U+=Date.now()-N},!1);function z(e,n){var t={type:"beacon",original_id:n?e:A};t.duration=E(q+U),q=U=0,t.scrolled=Math.max(0,M,Z());var r=$(C,t);n?te(r):i[H](y+"/append",m(r))}var H="sendBeacon";H in i&&v("unload",z,!1);var J="scroll",P=p.body||{},W=p.documentElement||{},Z=function(){try{var e="Height",n=J+e,t="offset"+e,r="client"+e,i=W[r]||0,a=Math.max(P[n]||0,P[t]||0,W[r]||0,W[n]||0,W[t]||0);return Math.min(100,5*Math.round(100*((W.scrollTop||0)+i)/a/5))}catch(o){return 0}};v("load",function(){M=Z(),v(J,function(){M<Z()&&(M=Z())},!1)});function G(e){var n=l(f.pathname);if("hash"==D&&f.hash&&(n+=f.hash.split("?")[0]),j!=n){var t={path:j=n},r=o.performance,i="navigation",a=r&&r.getEntriesByType&&r.getEntriesByType(i)[0]&&r.getEntriesByType(i)[0].type?-1<["reload","back_forward"].indexOf(r.getEntriesByType(i)[0].type):r&&r[i]&&-1<[1,2].indexOf(r[i].type);t.unique=!e&&!a&&(!p.referrer||p.referrer.split("/")[2]!=h),R=t,function(e,n){e&&z(""+A,!0),A=c(),R.id=A,te($(R,C,n?null:L,{https:f.protocol==u,timezone:s,width:o.innerWidth,type:"pageview"}))}(e,e||a)}}var K=o.history;if((K?K.pushState:g)&&Event&&T){K.pushState=(x=K[O=S],function(){var e,n=x.apply(this,arguments);return"function"==typeof Event?e=new Event(O):(e=document.createEvent("Event")).initEvent(O,!0,!0),e.arguments=arguments,T(e),n}),v(S,function(){G(1)},!1),v("popstate",function(){G(1)},!1)}"hash"==D&&"onhashchange"in o&&v("hashchange",function(){G(1)},!1),G();function Q(e){try{e=""+e instanceof Function?e():e}catch(n){w("in your event function: "+n.message),e="event_errored"}te($(C,L,{type:"event",event:e,event_id:X}))}function V(e){Q(e)}var X=c();o[k]||(o[k]=V);var Y=o[k],ee=Y&&Y.q?Y.q:[];for(var ne in o[k]=V,ee)Q(ee[ne])}catch(ie){re(ie)}}function te(n){n.time=E(),(new Image).src=y+"/simple.gif?"+Object.keys(n).map(function(e){return n[e]!=g?d(e)+"="+d(n[e]):""}).join("&")}function re(e){e=e.message||e,w(e),te({type:t,error:e,url:h+f.pathname})}}(window,"simpleanalyticscdn.com");
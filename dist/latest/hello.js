/* Simple Analytics - Privacy friendly analytics (docs.simpleanalytics.com/script; 2020-02-29; ac43) */

!function(o,n){if(o){function c(){var n=o.crypto||o.msCrypto,e=[1e7]+-1e3+-4e3+-8e3+-1e11;return n?e.replace(/[018]/g,function(e){return(e^n.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)}):e.replace(/[018]/g,function(e){var n=16*Math.random()|0;return(e<2?n:3&n|8).toString(16)})}var s,u="https:",t="error",r=o.console,e="doNotTrack",a=o.navigator,p=o.location,f=o.document,i="Not sending requests ",h=encodeURIComponent,l=decodeURIComponent,d=JSON.stringify,m=o.addEventListener,v="https://queue."+n,y=undefined,g={version:0},w=function(e){r&&r.warn&&r.warn("Simple Analytics:",e)},E=Date.now,O=function(){for(var e={},n=0;n<arguments.length;n++){var t=arguments[n];if(t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e};try{s=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(ae){}m(t,function(e){e.filename&&-1<e.filename.indexOf(n)&&re(e.message)},!1);function _(e,n){return e&&e.getAttribute("data-"+n)}var b,S,x="pushState",T=o.dispatchEvent,q=E(),M=0,B=f.querySelector('script[src*="'+n+'"]'),$=_(B,"mode"),k="true"==_(B,"skip-dnt"),I=_(B,"hostname")||p.hostname,R=_(B,"sa-global")||"sa_event";if(g.hostname=I,!k&&e in a&&"1"==a[e])return w(i+"when "+e+" is enabled");if(-1==p.hostname.indexOf("."))return w(i+"from "+p.localhost);try{function j(e){var n=p.search.match(new RegExp("[?&]("+e+")=([^?&]+)","gi")),t=n?n.map(function(e){return e.split("=")[1]}):[];if(t&&t[0])return t[0]}var A,C,N={},U=c(),z="(utm_)?",D={source:j(z+"source|source|ref"),medium:j(z+"medium"),campaign:j(z+"campaign"),referrer:(f.referrer||"").replace(/^https?:\/\/((m|l|w{2,3}([0-9]+)?)\.)?([^?#]+)(.*)$/,"$4").replace(/^([^/]+)\/$/,"$1")||y},F=0;o.addEventListener("visibilitychange",function(){f.hidden?C=E():F+=E()-C},!1);function L(e,n){var t={type:"append",original_id:n?e:U};t.duration=Math.round((E()-q+F)/1e3),F=0,q=E(),t.scrolled=Math.max(0,M,W()),!n&&H in a?a[H](v+"/append",d(O(g,t))):te(t)}var H="sendBeacon";m("unload",L,!1);var J="scroll",P=f.body||{},V=f.documentElement||{},W=function(){try{var e="Height",n=J+e,t="offset"+e,r="client"+e,a=V[r]||0,i=Math.max(P[n]||0,P[t]||0,V[r]||0,V[n]||0,V[t]||0);return Math.min(100,5*Math.round(100*((V.scrollTop||0)+a)/i/5))}catch(o){return 0}};m("load",function(){M=W(),m(J,function(){M<W()&&(M=W())},!1)});function Z(e){var n=l(p.pathname);if("hash"==$&&p.hash&&(n+=p.hash.split("?")[0]),A!=n){var t={path:A=n},r=o.performance,a="navigation",i=r&&r.getEntriesByType&&r.getEntriesByType(a)[0]&&r.getEntriesByType(a)[0].type?-1<["reload","back_forward"].indexOf(r.getEntriesByType(a)[0].type):r&&r[a]&&-1<[1,2].indexOf(r[a].type);t.unique=!e&&!i&&(!f.referrer||f.referrer.split("/")[2]!=p.hostname),N=t,function(e,n){e&&L(""+U,!0),U=c(),N.id=U,te(O(N,n?null:D,{https:p.protocol==u,timezone:s,width:o.innerWidth,type:"pageview"}))}(e,e||i)}}var G=o.history;if((G?G.pushState:y)&&Event&&T){G.pushState=(S=G[b=x],function(){var e,n=S.apply(this,arguments);return"function"==typeof Event?e=new Event(b):(e=f.createEvent("Event")).initEvent(b,!0,!0),e.arguments=arguments,T(e),n}),m(x,function(){Z(1)},!1),m("popstate",function(){Z(1)},!1)}"hash"==$&&"onhashchange"in o&&m("hashchange",function(){Z(1)},!1),Z();function K(e){try{e=""+(e instanceof Function?e():e)}catch(n){w("in your event function: "+n.message),e="event_errored"}te(O(D,{type:"event",event:e.replace(/[^a-z0-9]+/gi,"_").replace(/(^_|_$)/g,""),session_id:X}))}function Q(e){K(e)}var X=c();o[R]||(o[R]=Q);var Y=o[R],ee=Y&&Y.q?Y.q:[];for(var ne in o[R]=Q,ee)K(ee[ne])}catch(ae){re(ae)}}function te(n){n=O(g,n),(new Image).src=v+"/simple.gif?"+Object.keys(n).filter(function(e){return n[e]!=y}).map(function(e){return h(e)+"="+h(n[e])}).join("&")}function re(e){e=e.message||e,w(e),te({type:t,error:e,url:I+p.pathname})}}(window,"simpleanalyticscdn.com");
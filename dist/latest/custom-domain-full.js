/* Simple Analytics - Privacy friend analytics (docs.simpleanalytics.com/script) 2020-01-16 */

!function(s){if(s){function e(e){o&&o.warn&&o.warn("Simple Analytics: "+e)}function t(e,t){return e&&e.getAttribute("data-"+t)}var n,r,a="https:",i=a+"//",c=i+"<!--# echo var="http_host" default="" -->/v2/",o=s.console,u="doNotTrack",h="pageviews",p="events",d=s.navigator,l=d.userAgent,f=s.location,m=s.document,v=f.hostname,g="Not sending requests ",y="localhost",w="pushState",E=s.dispatchEvent,T=Date.now(),b=0,q=m.querySelector('script[src="'+i+'<!--# echo var="http_host" default="" -->/app.js"]'),S=t(q,"mode"),x="true"===t(q,"skip-dnt"),D=t(q,"sa-global")||"sa";if(!x&&u in d&&"1"===d[u])return e(g+"when "+u+" is enabled");if(v===y||"file:"===f.protocol)return e(g+"from "+y);if(!l||-1<l.search(/(bot|spider|crawl)/gi))return e(g+"because bot detected");try{function M(e){var t=f.search.match(new RegExp("[?&]("+e+")=([^?&]+)","gi")),n=t?t.map(function(e){return e.split("=")[1]}):[];if(n&&n[0])return n[0]}var B;try{B=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(Q){}var O="(utm_)?",R={version:2,hostname:v,https:f.protocol===a,timezone:B,width:s.innerWidth,source:{source:M(O+"source|source|ref"),medium:M(O+"medium"),campaign:M(O+"campaign"),referrer:(m.referrer||"").replace(/^https?:\/\/((m|l|w{2,3}([0-9]+)?)\.)?([^?#]+)(.*)$/,"$4").replace(/^([^/]+)\/$/,"$1")||undefined},pageviews:[]},$=0,k=null;s.addEventListener("visibilitychange",function(){m.hidden?k=Date.now():$+=Date.now()-k},!1);function A(e){return Math.round((Date.now()-(e||0))/1e3)}var H,I="sendBeacon",L=s.addEventListener,N=JSON.stringify,_=I in d&&!1===/ip(hone|ad)(.*)os\s([1-9]|1[0-2])_/i.test(l);_&&L("unload",function(){var e=R[h][R[h].length-1];e.duration=A(T+$),$=0;var t=Math.max(0,b,z());t&&(e.scrolled=t),R.time=A(),d[I](c+"post",N(R))},!1);var C="scroll",F=m.body,U=m.documentElement,z=function(){var e="Height",t=C+e,n="offset"+e,r="client"+e,a=Math.max(F[t],F[n],U[r],U[t],U[n]);return Math.min(100,5*Math.round(100*(U.scrollTop+U[r])/a/5))};L("load",function(){b=z(),L(C,function(){b<z()&&(b=z())})});function J(e,t,n){var r=R[h],a=r.length,i=a?r[a-1]:null;if(e===h?(a&&(i.duration=A(T+$),i.scrolled=b),r.push(t)):i&&(i[p]?i[p].push(t):i[p]=[t]),_)return T=Date.now(),$=0,void(b=s.setTimeout(z,500));var o=new XMLHttpRequest;o.open("POST",c+e,!0),n&&delete R.source,R.time=A(),o.setRequestHeader("Content-Type","text/plain; charset=UTF-8"),o.send(N(R))}function P(e){var t=f.pathname;if("hash"===S&&f.hash&&(t+=f.hash.split("?")[0]),H!==t){var n={path:H=t,added:A()};try{var r=s.performance,a="navigation",i=r&&r.getEntriesByType&&r.getEntriesByType(a)[0]&&r.getEntriesByType(a)[0].type?-1<["reload","back_forward"].indexOf(r.getEntriesByType(a)[0].type):r&&r[a]&&-1<[1,2].indexOf(r[a].type);n.unique=!e&&!i&&(!m.referrer||m.referrer.split("/")[2]!==v)}catch(o){n.error=o.message}J(h,n,e)}}var W=s.history;if((W?W.pushState:null)&&Event&&E){W.pushState=(r=W[n=w],function(){var e=r.apply(this,arguments),t=new Event(n);return t.arguments=arguments,E(t),e}),L(w,function(){P(1)}),s.onpopstate=function(){P(1)}}"hash"===S&&"onhashchange"in s&&(s.onhashchange=function(){P(1)}),P();function X(e){J(p,e)}s[D]||(s[D]=X);var Z=s[D],j=Z&&Z.q?Z.q:[];for(var G in s[D]=X,j)J(p,j[G])}catch(Q){e(Q.message);var K=c+"image.gif";Q.message&&(K=K+"?error="+encodeURIComponent(Q.message)),(new Image).src=K}}}(window);
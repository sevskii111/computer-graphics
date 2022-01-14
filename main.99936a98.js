parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZCfc":[function(require,module,exports) {
var t=this&&this.__extends||function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])})(n,e)};return function(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}(),n=this&&this.__spreadArray||function(t,n,e){if(e||2===arguments.length)for(var r,o=0,i=n.length;o<i;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return t.concat(r||Array.prototype.slice.call(n))},e=function(t,n){return t.map(function(e,r){return t[r]*n[r]}).reduce(function(t,n){return t+n})},r=function(){function t(t,n){this.x=t,this.y=n}return t.prototype.rotateAround=function(t,n){var e=Math.PI/180*n,r=Math.cos(e),o=Math.sin(e),i=r*(this.x-t.x)+o*(this.y-t.y)+t.x,a=r*(this.y-t.y)-o*(this.x-t.x)+t.y;this.x=i,this.y=a},t.prototype.add=function(n){return new t(this.x+n.x,this.y+n.y)},t.prototype.diff=function(n){return new t(n.x-this.x,n.y-this.y)},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.multiply=function(n){return new t(this.x*n,this.y*n)},t.prototype.flipX=function(){return new t(-this.x,this.y)},t.prototype.flipY=function(){return new t(this.x,-this.y)},t.zero=new t(0,0),t.unit=new t(1,1),t}();function o(t,n){var e=t.b.x-t.a.x,r=t.b.y-t.a.y,o=n.b.x-n.a.x,i=n.b.y-n.a.y,a=(-r*(t.a.x-n.a.x)+e*(t.a.y-n.a.y))/(-o*r+e*i),s=(o*(t.a.y-n.a.y)-i*(t.a.x-n.a.x))/(-o*r+e*i);return a>=0&&a<=1&&s>=0&&s<=1}var i=function(){function t(n,e,r,o){void 0===o&&(o=!1),this.position=n,this.rotation=e,this.scale=r,o||(this.zInd=t.nextZInd++)}return t.prototype.addPosition=function(n){this.add(new t(n,0,r.zero))},t.prototype.addRotation=function(n){for(this.add(new t(r.zero,n,r.zero));this.rotation<0;)this.add(new t(r.zero,360,r.zero));for(;this.rotation>=360;)this.add(new t(r.zero,-360,r.zero))},t.prototype.addScale=function(n){this.add(new t(r.zero,0,n)),this.scale.x<.1&&this.add(new t(r.zero,0,new r(.1-this.scale.x,0))),this.scale.y<.1&&this.add(new t(r.zero,0,new r(0,.1-this.scale.y)))},t.prototype.add=function(t){this.position=this.position.add(t.position),this.rotation=this.rotation+t.rotation,this.scale=this.scale.add(t.scale)},t.prototype.setZInd=function(t){this.zInd=t},t.nextZInd=0,t.default=new t(r.zero,0,r.unit),t.zero=new t(r.zero,0,r.zero),t}(),a=function(){return function(t){this.transform=t,this.selected=!1}}(),s=function(e){function i(t,n,o){void 0===n&&(n=null),void 0===o&&(o=!0);var i=e.call(this,t)||this;if(i.drawPoints=[],n)if(o){var a=n.reduce(function(t,n,e,o){return new r(t.x+n.x/o.length,t.y+n.y/o.length)},new r(0,0));i.points=n.map(function(t){return a.diff(t).multiply(50)})}else i.points=n;return i}return t(i,e),i.prototype.draw=function(t){var n=this,e=this.transform;this.drawPoints=this.points.map(function(t){var o=new r(n.transform.position.x+t.x*e.scale.x,n.transform.position.y+t.y*e.scale.y);return o.rotateAround(new r(e.position.x,e.position.y),n.transform.rotation),o});var o=t.strokeStyle;this.selected?t.strokeStyle="red":t.strokeStyle="black",t.beginPath(),t.moveTo(this.drawPoints[0].x,this.drawPoints[0].y);for(var i=1;i<this.drawPoints.length;i++)t.lineTo(this.drawPoints[i].x,this.drawPoints[i].y);t.lineTo(this.drawPoints[0].x,this.drawPoints[0].y),t.stroke(),t.strokeStyle=o},i.prototype.getPoints=function(){var t=this,n=this.transform;return this.drawPoints=this.points.map(function(e){var o=new r(t.transform.position.x+e.x*n.scale.x,t.transform.position.y+e.y*n.scale.y);return o.rotateAround(new r(n.position.x,n.position.y),t.transform.rotation),o}),this.drawPoints},i.prototype.getLines=function(){for(var t=this.getPoints(),n=[],e=0;e<t.length;e++)n.push({a:t[e],b:t[(e+1)%t.length]});return n},i.prototype.triangulate=function(){for(var t=[],e=n([],this.points,!0),r=e.length;e.length>3;){for(var o=0;o<e.length;o++){var a=0==o?e.length-1:o-1,s=o,u=(o+1)%e.length,l=[e[a],e[s],e[u]],f=Math.atan2(l[2].y-l[1].y,l[2].x-l[1].x)-Math.atan2(l[0].y-l[1].y,l[0].x-l[1].x);if(!(Math.abs(f)>=Math.PI)){for(var c=new i(this.transform,l,!1),h=0;h<e.length;h++)h!=a&&h!=s&&h!=u&&c.isPointInside(e[h]);t=t.concat(c),e.splice(o,1);break}}if(e.length==r)break;r=e.length}return t.push(new i(this.transform,[e[0],e[1],e[2]],!1)),t},i.prototype.isPointInside=function(t){for(var n=t.x,e=t.y,r=!1,o=0,i=this.drawPoints.length-1;o<this.drawPoints.length;i=o++){var a=this.drawPoints[o].x,s=this.drawPoints[o].y,u=this.drawPoints[i].x,l=this.drawPoints[i].y;s>e!=l>e&&n<(u-a)*(e-s)/(l-s)+a&&(r=!r)}return r},i.prototype.isIntersecting=function(t){if(!(t instanceof i))throw"Not implemented";for(var n=t,e=[],r=0;r<this.drawPoints.length;r++)e.push({a:this.drawPoints[r],b:this.drawPoints[(r+1)%this.drawPoints.length]});var a=[];for(r=0;r<n.drawPoints.length;r++)a.push({a:n.drawPoints[r],b:n.drawPoints[(r+1)%n.drawPoints.length]});for(var s=0,u=e;s<u.length;s++)for(var l=u[s],f=0,c=a;f<c.length;f++){if(o(l,c[f]))return!0}return!1},i}(a);function u(t,n,e){var r=m.strokeStyle,o=m.lineWidth;m.strokeStyle=e,m.lineWidth=1,m.beginPath(),m.moveTo(t.x,t.y),m.lineTo(n.x,n.y),m.stroke(),m.strokeStyle=r,m.lineWidth=o}function l(t,n,e){var r=m.fillStyle;m.fillStyle=e,m.rect(t.x-n/2,t.y-n/2,n,n),m.fill(),m.fillStyle=r}function f(t,n){for(var e=t.b.diff(t.a),o=[],i=n.getPoints(),a=0;a<i.length;a++){var s=i[(a+1)%i.length],u=i[a],l=u.y-s.y,f=s.x-u.x;o.push(new r(l,f))}var c=0,h=1;for(a=0;a<i.length;a++){var d=o[a].dot(e);if(0!=d){var w=t.a.diff(i[a]),p=o[a].dot(w)/-d;d<0?c=Math.max(c,p):h=Math.min(h,p)}else{var y=i[a],v=i[(a+1)%i.length],x=t.a;(v.x-y.x)*(x.y-y.y)-(v.y-y.y)*(x.x-y.x)<0&&(c=1,h=-1)}}if(c>h)return[{a:t.a,b:t.b,o:t.o}];var g=t.a.add(t.a.diff(t.b).multiply(c)),m=t.a.add(t.a.diff(t.b).multiply(h));return 0==c&&1==h?[]:0==c?[{a:m,b:t.b,o:t.o}]:1==h?[{a:t.a,b:g,o:t.o}]:[{a:t.a,b:g,o:t.o},{a:m,b:t.b,o:t.o}]}var c,h,d,w=function(n){function e(t,e,o){var i=n.call(this,o)||this;i.points=[];var a=t/2,s=e/2;return i.points.push(new r(-a,+s)),i.points.push(new r(+a,+s)),i.points.push(new r(+a,-s)),i.points.push(new r(-a,-s)),i}return t(e,n),e}(s),p=function(n){function e(t,r,o){var i=n.call(this,e.SIZE,e.SIZE,t)||this;return i.glyph=r,i.clickCallback=o,i}return t(e,n),e.prototype.draw=function(t){n.prototype.draw.call(this,t),t.font=.8*e.SIZE+"px FontAwesome",t.textBaseline="middle",t.textAlign="center",t.fillText(this.glyph,this.transform.position.x,this.transform.position.y)},e.SIZE=40,e}(w);!function(t){t[t.Create=0]="Create",t[t.Edit=1]="Edit"}(c||(c={})),function(t){t[t.Move=0]="Move",t[t.Rotate=1]="Rotate",t[t.Scale=2]="Scale",t[t.Tabulate=3]="Tabulate"}(h||(h={})),function(t){t[t.Square=0]="Square",t[t.Triangle=1]="Triangle",t[t.Arrow=2]="Arrow",t[t.Star=3]="Star"}(d||(d={}));var y=c.Edit,v=h.Move,x=d.Square,g=document.querySelector("canvas");g.width=800,g.height=800;var m=g.getContext("2d"),b=[];function P(){return b.sort(function(t,n){return n.transform.zInd-t.transform.zInd})}function S(t){for(var n=0,e=P();n<e.length;n++){var r=e[n];if(r.isPointInside(t))return r}return null}function k(t){for(var n=0,e=D;n<e.length;n++){var r=e[n];if(r.isPointInside(t))return r}return null}function I(t,n){J&&(J.selected=!1,J=null),y=t,Y.forEach(function(t){return t.selected=!1}),n.selected=!0,G()}var z=new p(new i(new r(75,25),0,r.unit),"",function(){return I(c.Create,z)}),E=new p(new i(new r(25,25),0,r.unit),"",function(){return I(c.Edit,E)});function T(t,n){J&&(J.selected=!1,J=null),v=t,B.forEach(function(t){return t.selected=!1}),n.selected=!0,G()}E.selected=!0;var M=new p(new i(new r(25,75),0,r.unit),"",function(){return T(h.Move,M)});M.selected=!0;var A=new p(new i(new r(75,75),0,r.unit),"",function(){return T(h.Rotate,A)}),_=new p(new i(new r(125,75),0,r.unit),"",function(){return T(h.Scale,_)}),C=new p(new i(new r(175,75),0,r.unit),"",function(){return T(h.Tabulate,C)});function Z(t,n){x=t,X.forEach(function(t){return t.selected=!1}),n.selected=!0,G()}var R=new p(new i(new r(25,75),0,r.unit),"",function(){return Z(d.Square,R)});R.selected=!0;var L=new p(new i(new r(75,75),0,r.unit),"",function(){return Z(d.Triangle,L)}),q=new p(new i(new r(125,75),0,r.unit),"",function(){return Z(d.Arrow,q)}),O=new p(new i(new r(175,75),0,r.unit),"",function(){return Z(d.Star,O)}),j=null,W=null,Y=[z,E],B=[M,A,_,C],X=[R,L,q,O],D=[],F=!1;function N(){F=!F,G()}function G(){m.clearRect(0,0,800,800),D=Y;for(var t=0,n=D=y==c.Create?D.concat(X):D.concat(B);t<n.length;t++){n[t].draw(m)}var e=P().reverse();if(e.length>0){for(var r=[],o=0;o<e.length;o++){for(var i=0,a=e[o].triangulate();i<a.length;i++){var s=a[i];if(F)s.getLines().forEach(function(t){return u(t.a,t.b,"blue")});for(var h=[],d=0,w=r;d<w.length;d++){var p=w[d],v=f(p,s);if(h=h.concat(v),F)for(var x=0,g=v;x<g.length;x++){(I=g[x]).a!=p.a&&l(I.a,5,"red"),I.b!=p.b&&l(I.b,5,"red")}}r=h}var b=e[o].getLines();if(e[o].selected)for(var S=0,k=b;S<k.length;S++){var I;(I=k[S]).o=!0}r=r.concat(b)}for(var z=0,E=r;z<E.length;z++){var T=E[z];u(T.a,T.b,T.o?"red":"black")}}}function H(t){var n=g.getBoundingClientRect();return new r(t.clientX-n.left,t.clientY-n.top)}globalThis.switchDebug=N;var J=null;g.addEventListener("mousedown",function(t){var n=H(t),e=k(n);if(e)e.clickCallback();else{if(y==c.Edit){var o=S(n);if(v==h.Tabulate){if(o)if(null===J)(J=o).selected=!0;else{var a=o.transform.zInd;o.transform.setZInd(J.transform.zInd),J.transform.setZInd(a),J.selected=!1,J=null}}else o&&(j=o,W=n)}else{if(n.x<200&&n.y<100)return;switch(x){case d.Square:b.push(new s(new i(n,0,r.unit),[new r(1,-1),new r(1,1),new r(-1,1),new r(-1,-1)]));break;case d.Triangle:b.push(new s(new i(n,0,r.unit),[new r(1,1),new r(-1,1),new r(0,-1)]));break;case d.Arrow:b.push(new s(new i(n,0,r.unit),[new r(0,-1),new r(2,-2),new r(1,0),new r(1,-1)]));break;case d.Star:b.push(new s(new i(n,0,r.unit),[new r(0,-2.5),new r(.9,-.5),new r(3,-.5),new r(1.35,.5),new r(2.25,2.5),new r(0,1.5),new r(-2.25,2.5),new r(-1.35,.5),new r(-3,-.5),new r(-.9,-.5)].map(function(t){return t.multiply(.5)})))}}G()}}),g.addEventListener("mouseup",function(){j=null,W=null}),g.addEventListener("mouseleave",function(){j=null,W=null}),g.addEventListener("mousemove",function(t){if(j){var n=H(t),e=W.diff(n);switch(W=n,v){case h.Move:j.transform.addPosition(e);break;case h.Rotate:j.transform.addRotation(e.y);break;case h.Scale:j.transform.addScale(e.multiply(.01).flipY())}G()}}),G(),setTimeout(G,3e3),setTimeout(G,1e4);
},{}]},{},["ZCfc"], null)
//# sourceMappingURL=main.99936a98.js.map
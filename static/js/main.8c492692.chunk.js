(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,n){t.exports=n(16)},16:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),i=n(3),u=n.n(i),l=n(7),o=n(4),c=n(5),s=n(8),f=n(6),v=n(9),b=(n(2),function(t,e){return new Array(e).fill(t).map(function(t){return new Array(t).fill(0)})}),d=function(t,e){var n=p([16,16],t),r=m.bind(null,e);return n.filter(r).length},h=function(t){return t[0]>=0&&t[1]>=0},m=function(t,e){return 0!==t[e[0]][e[1]]},p=function(t,e){return function(t,e,n){var r=t.filter(function(t){return function(t,e){return!(t[0]===e[0]&&t[1]===e[1])}(e,t)});r=r.filter(h);var a=function(t,e){return e[0]<t[0]&&e[1]<t[1]}.bind(null,n);return r=r.filter(a),r}(function(t,e){for(var n=[],r=0;r<t.length;r++)for(var a=0;a<e.length;a++)n.push([t[r],e[a]]);return n}([e[0]-1,e[0],e[0]+1],[e[1]-1,e[1],e[1]+1]),e,t)},k=function(t){function e(t){var n;Object(o.a)(this,e),(n=Object(s.a)(this,Object(f.a)(e).call(this,t))).size=+t.size;var r=b(n.size+1,n.size+1);return n.state={board:r,bounds:{topLeft:0,bottomRight:n.size+1}},n.time=1e3,n}return Object(v.a)(e,t),Object(c.a)(e,[{key:"makeCellLive",value:function(t){var e=t.target.id.split("_"),n=Object(l.a)(e,2),r=n[0],a=n[1],i=this.state.board.slice();i[r][a]=1-i[r][a],this.setState({board:i})}},{key:"start",value:function(){var t=this;this.timerId=setInterval(function(){var e=function(t){for(var e=t.map(function(t){return t.slice()}),n=0;n<t.length;n++)for(var r=0;r<t[0].length;r++){var a=d([n,r],t),i=[0,0,t[n][r],1,0,0,0,0,0][a];e[n][r]=i}return e}(t.state.board);t.setState({board:e})},this.time)}},{key:"stop",value:function(){clearInterval(this.timerId)}},{key:"generateTable",value:function(){var t=this;return this.state.board.map(function(e,n){var r=e.map(function(e,r){var i="alive";0===e&&(i="dead");var u=n+"_"+r;return a.a.createElement("td",{id:u,className:i,onClick:t.makeCellLive.bind(t)})});return a.a.createElement("tr",null,r)})}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("table",null,a.a.createElement("tbody",null,this.generateTable())),a.a.createElement("button",{onClick:this.start.bind(this)},"start"),a.a.createElement("button",{onClick:this.stop.bind(this)},"stop"))}}]),e}(a.a.Component);u.a.render(a.a.createElement(k,{size:"15"}),document.getElementById("root"))},2:function(t,e,n){}},[[10,1,2]]]);
//# sourceMappingURL=main.8c492692.chunk.js.map
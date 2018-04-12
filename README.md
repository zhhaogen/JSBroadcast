# javascript 实现广播Broadcast监听功能

javascript Broadcast-Receiver 功能，主要用于不同页面和标签页之间的通信，保持它们的数据内容一致,比如场景:购物车,后台数据添加后的列表刷新，网页聊天等。

实现方式:

1. 通过服务器保持内容一致，比如ajax,websocket等，这种方式优点是兼容性好、不同终端都能保存一致，缺点也需要耗费服务器资源。
2. 监听(循环查询)web本地储存(cookies,sessionStorage,localStorage等)的变化，来实现广播监听功能 ，缺点是耗费客户端资源
3. 通过SharedWorker进行不同页面通信，优点耗费客户端资源少而且能够实时性，缺点SharedWorker并没有断开的监听事件需要做额外的处理

这里实现方式为第3种

demo 例子 <https://zhhaogen.github.io/JSBroadcast/>

使用方法
1. 引入js文件
```
<script src="broadcast.js" charset="utf-8" type="text/javascript" ></script>
```
2. 监听广播事件
```
broadcast.on("simpleevent",function(e,data){
	//todo 做一些事情
});
```
3. 发送广播事件
```
//todo 需要传送的数据
var data;//...
broadcast.send(type,data);
```

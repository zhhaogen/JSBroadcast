console.log(new Date(),"初始化worker");
let PORTS=new Set();//全局储存
function sendAll(data)
{
	console.log(new Date(),"当前页面数",PORTS.size);
	PORTS.forEach(function(port) 
	{
		 port.postMessage(data); 
	}); 
}
//监听前台页面连接
onconnect = function(e) 
{
	console.log(new Date(),"已连接",e.ports);
    let port = e.ports[0]; 
	PORTS.add(port); 
	//接收前台页面消息
    port.onmessage = function(evt) 
	{ 
		console.log(new Date(),"后台接收消息",evt); 
		//发送消息给前台页面
		if(evt.data.type!="ondisconnect")
		{
			sendAll(evt.data);
		}else
		{ 
			 PORTS.delete(port);
			 console.log(new Date(),"断开连接",PORTS.size); 
		}
    };

    port.start();
};
ondisconnect=function(e)//不存在api,断开删除PORTS
{
	console.log(new Date(),"已断开",e.ports);
	//
	 var port = e.ports[0]; 
	 PORTS.delete(port);
};
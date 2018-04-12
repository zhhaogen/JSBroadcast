(function(){
	let listeners={};
	let myWorker;
	let on=function()
	{
		//console.log(arguments);
		if(arguments.length<2)
		{
			throw new Error("参数必须至少两个");
		}
		let callback=arguments[arguments.length-1];
		if(typeof(callback)!="function")
		{
			throw new Error("最后一个参数必须为处理方法");
		}
		for(let i=0;i<arguments.length-1;i++)
		{
			let type=arguments[i];
			listeners[type]=callback;
		}
		//console.log(listeners);
	}; 
	let send=function(type,data)
	{
		if(type==null)
		{
			throw new Error("type不能为null");
		}
		if(type=="ondisconnect")
		{
			throw new Error("ondisconnect为内部使用");
		}
		if(myWorker!=null)
		{
			myWorker.port.postMessage({type,data});//发送消息
		}else
		{
			console.warn("SharedWorker未初始化");
		}
	};
	window.broadcast={on,send};
	
	window.addEventListener( "load", function(evt) 
	{
		myWorker = new SharedWorker('worker.js'); 
		myWorker.onerror = function(e) 
		{
			console.log("worker异常",e);
		};
		//接收消息
		myWorker.port.onmessage = function(e) 
		{
		  console.log("worker 消息",e);
		  let callback=listeners[e.data.type];
		  if(callback!=null)
		  {
			callback(e.data,e.data.data);
		  }
		};
		//开启worker
		myWorker.port.start();
	});
	window.addEventListener('beforeunload', function(evt) 
	{
		if(myWorker!=null)
		{
			myWorker.port.postMessage({type:"ondisconnect"});//发送消息
		} 
	});
})();
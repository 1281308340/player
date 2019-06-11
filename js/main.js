var lrcJSON = {
						"[00:00.81]":"路过人间 - 郁可唯",
						"[00:03.80]":"词：施人诚",
						"[00:06.30]":"曲：张简君伟",
						"[00:15.10]":"嘿 意不意外 她背影 那么轻快",						
						"[00:29.33]":"嘿 要明白 人会来 就会离开",
						"[00:43.57]":"世上唯一不变 是人都善变",
						"[00:48.03]":"路过人间 爱都有期限",
						"[00:51.74]":"天可怜见 心碎在所难免",
						"[00:58.15]":"为痛过几回 多了些修炼",
						"[01:02.78]":"路过人间 就懂得防卫",
						"[01:06.53]":"说来惭愧 人只要有机会 就又沦陷",
						"[01:17.74]":"嘿 别再猜 她可曾 想过回来",
						"[01:32.13]":"嘿 醒过来 你很好 她也不坏",
						"[01:46.20]":"快快抹干眼泪 看昙花多美",
						"[01:50.83]":"路过人间 无非一瞬间",
						"[01:54.51]":"每段并肩 都不过是擦肩",
						"[02:01.03]":"曾经辜负哪位 这才被亏欠",
						"[02:05.57]":"路过人间 一直这轮回",
						"[02:09.28]":"幸运一点 也许最后和谁 都不相欠",
						"[02:23.04]":"都不相欠",
						"[02:31.33]":"Woo woo",
						"[02:46.23]":"Ha a Ha a",
						"[03:00.24]":"人对爱和永远 应该有幻觉",
						"[03:04.70]":"路过人间 也才几十年",
						"[03:08.44]":"却为了爱 勇于蹉跎岁月",
						"[03:15.73]":"相遇离别 贪瞋爱痴怨",
						"[03:19.42]":"路过人间 就忙着这些",
						"[03:23.11]":"谁有意见 莫非是心里面 渺无人烟",
						"[03:36.68]":"无人可恋 来这人间 有多浪费",
		};
		
		
		var lrcTime = [];//歌词对应的时间数组
		var ul = $("#lrclist")[0];//获取ul
		
		var i = 0;
		$.each(lrcJSON, function(key, value) {//遍历lrc
			lrcTime[i++] = parseFloat(key.substr(1,3)) * 60 + parseFloat(key.substring(4,10));//00:00.000转化为00.000格式
			ul.innerHTML += "<li><p>"+lrcJSON[key]+"</p></li>";//ul里填充歌词
		});
		lrcTime[lrcTime.length] = lrcTime[lrcTime.length-1] + 3;//如不另加一个结束时间，到最后歌词滚动不到最后一句
		
		
		var $li = $("#lrclist>li");//获取所有li
		
		var currentLine = 0;//当前播放到哪一句了
		var currentTime;//当前播放的时间
		var audio = document.getElementById("audio");
		var ppxx;//保存ul的translateY值
		
		audio.ontimeupdate = function() {//audio时间改变事件
			currentTime = audio.currentTime;
			for (j=currentLine, len=lrcTime.length; j<len; j++){
				if (currentTime<lrcTime[j+1] && currentTime>lrcTime[j]){
					currentLine =  j;
					ppxx = 250-(currentLine*32);
					ul.style.transform = "translateY("+ppxx+"px)";
					$li.get(currentLine-1).className="";
					console.log("on"+currentLine);
					$li.get(currentLine).className="on";
					break;
				}
			}
		};
		
		audio.onseeked = function() {//audio进度更改后事件
			currentTime = audio.currentTime;
			console.log("  off"+currentLine);
			$li.get(currentLine).className="";
			for (k=0, len=lrcTime.length; k<len; k++){
				if (currentTime<lrcTime[k+1] && currentTime<lrcTime[k]){
					currentLine =  k;
					break;
				}
			}
		};

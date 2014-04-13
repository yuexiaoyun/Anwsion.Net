var OFFSET = 5;
var page = 1;
var PAGESIZE = 20;

var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
var maxScrollY = 0;

var hasMoreData = false;

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', function() {
	$(document).ready(function() {
		loaded();
	});
}, false);

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	hasMoreData = false;
	 $("#thelist").hide();
	$("#pullUp").hide();

	pullDownEl.className = 'loading';
	pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在努力加载...';

	page = 1;
	$.post(
		"/home/getitem", {
			"page": page,
			"pagesize": PAGESIZE
		},
		function(response, status) {
			if (status == "success") {
				$("#thelist").show();

				if (response.list.length < PAGESIZE) {
					hasMoreData = false;
					$("#pullUp").hide();
				} else {
					hasMoreData = true;
					$("#pullUp").show();
				}

				// document.getElementById('wrapper').style.left = '0';

				myScroll = new iScroll('wrapper', {
					useTransition: true,
					topOffset: pullDownOffset,
					onRefresh: function() {
						if (pullDownEl.className.match('loading')) {
							pullDownEl.className = 'idle';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新提问';
							this.minScrollY = -pullDownOffset;
						}
						if (pullUpEl.className.match('loading')) {
							pullUpEl.className = 'idle';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
						}
					},
					onScrollMove: function() {
						if (this.y > OFFSET && !pullDownEl.className.match('flip')) {
							pullDownEl.className = 'flip';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开即可更新';
							this.minScrollY = 0;
						} else if (this.y < OFFSET && pullDownEl.className.match('flip')) {
							pullDownEl.className = 'idle';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉更新提问';
							this.minScrollY = -pullDownOffset;
						} 
						if (this.y < (maxScrollY - pullUpOffset - OFFSET) && !pullUpEl.className.match('flip')) {
							if (hasMoreData) {
								this.maxScrollY = this.maxScrollY - pullUpOffset;
								pullUpEl.className = 'flip';
								pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载更多';
							}
						} else if (this.y > (maxScrollY - pullUpOffset - OFFSET) && pullUpEl.className.match('flip')) {
							if (hasMoreData) {
								this.maxScrollY = maxScrollY;
								pullUpEl.className = 'idle';
								pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
							}
						}
					},
					onScrollEnd: function() {
						if (pullDownEl.className.match('flip')) {
							pullDownEl.className = 'loading';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在努力加载...';
							// pullDownAction(); // Execute custom function (ajax call?)
							refresh();
						}
						if (hasMoreData && pullUpEl.className.match('flip')) {
							pullUpEl.className = 'loading';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在努力加载...';
							// pullUpAction(); // Execute custom function (ajax call?)
							nextPage();
						}
					}
				});

				$("#thelist").empty();
				$.each(response.list, function(key, value) {
				    $("#thelist").append('<li><img src="http://img1.ciwong.net/uidimg_default/80010/50" class="img48" /><div class="info"><p class="name"><span class="blue">岳小云</span><span>男</span><span class="right">40秒前</span></p><p class="text">船、客船、潜水艇、汽艇、水上自行车、渔船、货船、水上飞机、帆船、木筏、木帆船、轮船、快艇、核潜艇、船舶、潜</p><p><span>初一 数学</span><span>2回答</span></p></div><div class="clearfix"></div></li>');
				});
				// $("#thelist").listview("refresh");
				myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
				// pullDownEl.className = 'idle';
				// pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				// this.minScrollY = -pullDownOffset;

				if (hasMoreData) {
					myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
				} else {
					myScroll.maxScrollY = myScroll.maxScrollY;
				}
				maxScrollY = myScroll.maxScrollY;
			};
		},
		"json");
}

function refresh() {
	page = 1;
	$.post(
		"/home/getitem", {
			"page": page,
			"pagesize": PAGESIZE
		},
		function(response, status) {
			if (status == "success") {
				$("#thelist").empty();

				myScroll.refresh();

				if (response.list.length < PAGESIZE) {
					hasMoreData = false;
					$("#pullUp").hide();
				} else {
					hasMoreData = true;
					$("#pullUp").show();
				}

				$.each(response.list, function(key, value) {
				    //$("#thelist").append('<li>' + value.name + '\t' + value.time + '</li>');
				    $("#thelist").append('<li><img src="http://img1.ciwong.net/uidimg_default/80010/50" class="img48" /><div class="info"><p class="name"><span class="blue">岳小云</span><span>男</span><span class="right">40秒前</span></p><p class="text">船、客船、潜水艇、汽艇、水上自行车、渔船、货船、水上飞机、帆船、木筏、木帆船、轮船、快艇、核潜艇、船舶、潜</p><p><span>初一 数学</span><span>2回答</span></p></div><div class="clearfix"></div></li>');
				});
				// $("#thelist").listview("refresh");
				myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)

				if (hasMoreData) {
					myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
				} else {
					myScroll.maxScrollY = myScroll.maxScrollY;
				}
				maxScrollY = myScroll.maxScrollY;
			};
		},
		"json");
}

function nextPage() {
	page++;
	$.post(
		"/home/getitem", {
			"page": page,
			"pagesize": PAGESIZE
		},
		function(response, status) {
			if (status == "success") {
				if (response.list.length < PAGESIZE) {
					hasMoreData = false;
					$("#pullUp").hide();
				} else {
					hasMoreData = true;
					$("#pullUp").show();
				}

				$.each(response.list, function(key, value) {
				    //$("#thelist").append('<li>' + value.name + '\t' + value.time + '</li>');
				    $("#thelist").append('<li><img src="http://img1.ciwong.net/uidimg_default/80010/50" class="img48" /><div class="info"><p class="name"><span class="blue">岳小云</span><span>男</span><span class="right">40秒前</span></p><p class="text">船、客船、潜水艇、汽艇、水上自行车、渔船、货船、水上飞机、帆船、木筏、木帆船、轮船、快艇、核潜艇、船舶、潜</p><p><span>初一 数学</span><span>2回答</span></p></div><div class="clearfix"></div></li>');
				});
				// $("#thelist").listview("refresh");
				myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
				if (hasMoreData) {
					myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
				} else {
					myScroll.maxScrollY = myScroll.maxScrollY;
				}
				maxScrollY = myScroll.maxScrollY;
			};
		},
		"json");
}
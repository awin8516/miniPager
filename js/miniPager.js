(function(){
	var scripts = document.getElementsByTagName('script');
	var current = scripts[scripts.length-1];
	var path = current.src.match(/^.*[\/]/)[0];
	document.writeln('<style>'+
						'html,body{width:100%; height:100%; overflow:hidden;}'+
						'.pages{position:relative; width:100%; height:100%; overflow:hidden;}'+
						'.page{position:absolute;width:100%; height:100%;left:0;top:0;z-index:0;transform: translate(100%, 0);}'+
						'.page-inside {height: 100%;position: relative;}'+
						'.page-middle:before,.page-middle:after {content: ""; display: inline-block; vertical-align: middle; height: 100%;}'+
						'.page-middle > * {display: inline-block; vertical-align: middle; }'+
						'.page.prev {transform:translate(-100%, 0);transition:transform 500ms;}'+
						'.page.back {left:-200%;transform:translate(200%, 0);transition:transform 500ms;}'+
						'.page.active {transform:translate(0, 0);transition:transform 500ms;}'+
						'.page.next {transform:translate(100%, 0);transition:transform 500ms;}'+
						'.page.no-transition {left:0;transition:transform 0ms;}'+
					'</style>');
})()

miniPager = function(selecter){
	var that = this;
	this.pages = $(selecter);
	this.page = {};
	this.pageTransitionend = null;
	this.html = $('html');
	this.pages.each(function(){
		that.page[this.id] = $(this);			
		$(this).on('transitionend webkitTransitionEnd oTransitionEnd mozTransitionEnd', function(e){
			e.target === this && that.pageTransitionend(e);
		});
	});
	this.to = function(id, callback){
		if(that.page[id].hasClass('active')) return;
		that.pageTransitionend = function(e){
			var self = e.target;
			var $this = $(self);
			if(self == that.page[id][0] && $this.hasClass('active')){
				//!$this.hasClass('initialized') && pageInit[id] && pageInit[id]($this),$this.addClass('initialized');
				callback && callback($this);
				$this.siblings('.prev').removeClass('prev');
			};
		};
		
		if(that.pages.filter('.active').length){
			that.page[id].addClass('active').siblings('.active,.back').removeClass('active back').addClass('prev');
		}else{
			that.page[id].addClass('active no-transition');
			setTimeout(function(){
				that.page[id].removeClass('no-transition');						
			}, 16);
		}
		that.html.attr('class', id);
	};
	this.back = function(id, callback){
		if(that.page[id].hasClass('back')) return;
		that.pageTransitionend = function(e){
			var self = e.target;
			var $this = $(self);
			if(self == that.page[id][0] && $this.hasClass('back')){
				//!$this.hasClass('initialized') && pageInit[id] && pageInit[id]($this),$this.addClass('initialized');
				callback && callback($this);
				$this.addClass('no-transition active').removeClass('back').siblings('.next').removeClass('next')
				setTimeout(function(){
					$this.removeClass('no-transition');						
				}, 16);
			};
		};
		that.page[id].addClass('back').siblings('.active,.back').removeClass('active back').addClass('next');
		that.html.attr('class', id);
	};
}
/*判断是否开始滚动，是否滚动结束*/
(function(){
	var special = jQuery.event.special,
		uid1 = 'D' + (+new Date()),
		uid2 = 'D' + (+new Date() + 1);

		special.scrollstart = {
            setup: function(){
				var timer,
				handler = function(evt) {
					var _self = this,
					_args = arguments;

					if(timer) {
						clearTimeout(timer);
					} else {
						evt.type = 'scrollstart';
						jQuery.event.dispatch.apply(_self,_args);
						//jQuery.event.handle.apply(_self,_args);修改掉了，不知道这个代码还会不会起效果，下同
					}

					timer = setTimeout(function(){
						timer = null;
					},special.scrollstop.latency);
				};
				jQuery(this).bind('scroll',handler).data(uid1,handler);    
            },
            teardown: function(){
				jQuery(this).unbind('scroll',jQuery(this).data(uid1));
            }
		};

		special.scrollstop = {
            latency: 300,
            setup: function(){
				var timer,
				handler = function(evt) {
                    var _self = this,
                        _args = arguments;

                    if(timer) {
						clearTimeout(timer);
                    }

                    timer = setTimeout(function(){
						timer = null;
						evt.type = 'scrollstop';
						jQuery.event.dispatch.apply(_self,_args);
                    },special.scrollstop.latency);
				};
				jQuery(this).bind('scroll',handler).data(uid2,handler);    
            },
            teardown: function() {
				jQuery(this).unbind('scroll',jQuery(this).data(uid2));
            }
		};
})();
$(function(){
   //the element inside of which we want to scroll
  // var contentWrap = $("#wrapper");
   var btns = $("#aside-icon div");
   //show the buttons
   btns.fadeIn("slow");
   //whenever we scroll fade out both buttons
   $(window).bind("scrollstart",function(){
		btns.stop().animate({"opacity":"0.2"});
   });
   //...and whenever we stop scrolling fade in both buttons
   $(window).bind("scrollstop",function(){
		btns.stop().animate({"opacity":"1"});
   });
   $(window).scroll(function () {
		var scrollValue = $(window).scrollTop();
		var viewHeight = document.documentElement.clientHeight;
		scrollValue > viewHeight ? $('#aside-icon').css('top','-'+viewHeight*.4+'px') : $('#aside-icon').css('top','-900px');
	});
   //clicking the "goToBottom" button will make the page scroll to the contentWrap's height
   // $("#goToBottom").click(function(e){
		// $("html,body").animate({scrollTop:contentWrap.height()},800);
   // });
   //clicking the "goToTop" button will make the page scroll to the top of the page
   $("#backToTop").click(function(e){
		$("html,body").animate({scrollTop:"0px"},800);
   });
});
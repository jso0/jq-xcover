(function ( $ ) {
    // body...
    $.fn.XCover = function(options){

        var opts = $.fn.XCover.options = $.extend( {} , $.fn.XCover.defaults , options );
        opts.target=this.selector;//log(opts)

        this.css({width:"100%",margin:0,padding:0});
        $(opts.card).css({
            position:"absolute",
            "z-index":99998,
            top:opts.cardTop+"px"
        });

        var startPos={x:0,y:0};
        var endPos={x:0,y:0};
        opts.debug && $("body").append('<div style="position:absolute;top:'+opts.effectY+'px;min-height:2px;background-color:#f00;z-index:99999;width:100%;"></div>');

        $("body").on('touchstart',function(event){
            var oriEvent=event.originalEvent.touches[0];
            // startPos.x=oriEvent.screenX
            if (oriEvent[opts.xy]<=opts.effectY) {
                startPos.y=oriEvent[opts.xy];
            }
        })
        .on('touchend',function(event){
            var scale = 1;
            var top = $("body").scrollTop();
            scale += (endPos.y-startPos.y)/1000;

            if (startPos.y!==0 && top===0) {
	            animation($(opts.card).css("top").replace("px",""),opts.cardTop,opts.delay,UpAnimation);
	            // $(opts.target).css("-webkit-transform","none");//todo animate
	            animation(scale,1,opts.delay,scaleAnimation);
            } else {
            	;
            }
            startPos = {x:0,y:0};
        })

        $([opts.target,opts.card].join(',')).on('touchmove',function(event){
            var oriEvent=event.originalEvent.touches[0];
            var top = $("body").scrollTop();
            var scale = 1;console.log($("body").get(0).scrollTop)
            if ($("body").get(0).scrollTop<0) {
            	// $("body").get(0).scrollTop=1;
            	event.preventDefault();
            } else {
            	;
            }
            endPos.y = oriEvent[opts.xy]
            if(startPos.y !==0 && startPos.y<oriEvent[opts.xy] && startPos.y<opts.effectY && top<opts.noEffectY && top===0) {//边界值法
                scale+=(oriEvent[opts.xy]-startPos.y)/1000;
                //console.log((100+(10*scale)-2))
                $(opts.card).css("top",(opts.cardTop+(oriEvent[opts.xy]-startPos.y)*opts.scaleP)+"px");
                event.preventDefault();
            } else {
                //todo   归位
                if (oriEvent[opts.xy]<opts.effectY+100) {
                    event.preventDefault();
                }
            }
            $(opts.target).css("-webkit-transform","scale("+scale+","+scale+")");
        });
        function UpAnimation(idx, from, to, delay) {
        	var step = ((from-to)/delay)*idx;
        	var val = from - step;
        	// console.log(val)
            $(opts.card).css("top", (val) +"px");
        }
        function scaleAnimation(idx, from, to, delay) {
        	var step = ((from-to)/delay)*idx;
        	var scale = from-step;
        	// console.log(scale)
            $(opts.target).css("-webkit-transform","scale("+scale+","+scale+")");
        }
        function animation(from, to, delay, fn, e) {
        	var xp = 10;
            var sp_delay = parseInt(delay/xp);//sp
            for(var i = 0;i <= sp_delay ; i++){
                setTimeout((function(idx){
                    return function(){
                        fn(idx, from, to, sp_delay);
                    }
                })(i),i*xp)
            }
        }
    };

    //defaults pram

    $.fn.XCover.defaults = {
        card:"#card",
        cardTop:150,
        effectY:150,//360,
        noEffectY:10,
        scaleP:0.3,
        xy:"pageY",
        debug:false,
        delay:300
    }

})(jQuery)
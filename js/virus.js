(function(w){
	var FRAME_RATE = 2,	//精灵表播放速度
		COUNT = 7,			//序列帧每行图片数
		ITEM_SCALE = 0.5;	//缩放比例

	var ITEM = function(s, mark, img){
		this.sigleX = img.width/COUNT;
		this.sigleY = img.height;
		this.x = Math.random()*(C_W-this.sigleX*ITEM_SCALE);
		this.y = 0;
		this.mark = mark;
		this.speed = s;
		this.state = "normal";
		this.init(img);
	}

	ITEM.prototype = {
		init:function(img){
			//动作序列设置
			var spriteSheet = new createjs.SpriteSheet({
				"images":[img],
				"frames":{"regX":0,"regY":1,"width":this.sigleX,"height":this.sigleY,"count":COUNT},
				"animations":{
					"normal":{
						frames:[0,1,2],
						speed:0.1
					},
					"boom":{
						frames:[3,4,5,6],
						speed:0.1,
						next:"end"
					},
					"end":{
						frames:[7]
					}
				}
			});
			this.sprite = new createjs.Sprite(spriteSheet , this.state);
			this.sprite.framerate = FRAME_RATE;
			this.sprite.setTransform(this.x, this.y, ITEM_SCALE, ITEM_SCALE);
			this.child = stage.addChild(this.sprite);
		},

		update:function(){
			if(this.sprite.currentAnimation=="normal"){
				this.sprite.y += this.speed;
			}else if(this.sprite.currentAnimation=="end"){
				this.reset();
				this.sprite.gotoAndPlay("normal");
			}
		},

		reset:function(){
			this.sprite.x = Math.random()*(C_W-this.sigleX);
			this.sprite.y = 0;
		},

		picsize:function(){
			return {
				w:this.sigleX*ITEM_SCALE,
				h:this.sigleY*ITEM_SCALE
			}
		}
	}

	w.createVirus = function(s, mark, img){
		return new ITEM(s, mark, img)
	};
})(window)
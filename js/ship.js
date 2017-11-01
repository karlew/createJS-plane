(function(w){
	var FRAME_RATE = 1,	//精灵表播放速度
		COUNT = 2,			//序列帧每行图片数
		ITEM_SCALE = 0.4;	//缩放比例

	var ITEM = function(img){
		this.sigleX = img.width/COUNT;
		this.sigleY = img.height;
		this.x = (C_W-this.sigleX*ITEM_SCALE)/2;
		this.y = C_H-this.sigleY*ITEM_SCALE-50;
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
						frames:[0,1],
						speed:0.8
					}
				}
			});
			this.sprite = new createjs.Sprite(spriteSheet , this.state);
			this.sprite.framerate = FRAME_RATE;
			this.sprite.setTransform(this.x, this.y, ITEM_SCALE, ITEM_SCALE);
			this.child = stage.addChild(this.sprite);
		},

		update:function(){
			
		},

		reset:function(){
			this.sprite.x = (C_W-this.sigleX*ITEM_SCALE)/2;
			this.sprite.y = C_H-this.sigleY*ITEM_SCALE-50;
		},

		picsize:function(){
			return {
				w:this.sigleX*ITEM_SCALE,
				h:this.sigleY*ITEM_SCALE
			}
		}
	}

	w.createShip = function(img){
		return new ITEM(img)
	};
})(window)
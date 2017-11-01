(function(w){
	var FRAME_RATE = 1,	//精灵表播放速度
		SPEED = 16,		//上升速度
		ITEM_SCALE = 0.4;	//缩放比例

	var ITEM = function(x , y , w , img){
		this.sigleX = img.width;
		this.sigleY = img.height;
		this.x = x + (w-this.sigleX*ITEM_SCALE)/2;
		this.y = y - this.sigleY*ITEM_SCALE;
		this.init(img);
	}

	ITEM.prototype = {
		init:function(img){
			this.shape = new createjs.Shape();
			this.shape.graphics.beginBitmapFill(img).drawRect(0, 0, this.sigleX, this.sigleY);
			this.shape.setTransform(this.x, this.y, ITEM_SCALE, ITEM_SCALE);
			this.child = stage.addChild(this.shape);
		},

		update:function(){
			this.shape.y -= SPEED;
		},

		picsize:function(){
			return {
				w:this.sigleX*ITEM_SCALE,
				h:this.sigleY*ITEM_SCALE
			}
		}
	}

	w.createFire = function(x , y , w , img){
		return new ITEM(x , y , w , img)
	};
})(window)
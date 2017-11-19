### 1.引入商品
**function loadAllItems( )**
- output:Array [{id: String,name: String,price: Number},{ }...]

### 2.引入优惠信息
**function loadPromotions()**
- output:Array [{type:String}, {type:String,items:[String,string]}];

### 3.列出购买商品形成的数组对象
**function listItemArr()**
- input:Array[String,String,String...]
- output:Array[{id: String,name: String,price: Number,count:Number},{ }...]

### 4.将购买商品的形成的数组对象转换成订单明细
**function listItemsInfo()**
- input:Array[{id: String,name: String,price: Number,count:Number},{ }...]
- output:String

### 5.计算优惠
**function listPromotion()**
- input:Array[{id: String,name: String,price: Number,count:Number},{ }...]
- output:Object

### 6.返回优惠明细
**function listPromotionInfo()**
- input:Array[{id: String,name: String,price: Number,count:Number},{ }...]
- output:String

### 7.列出总计
**function listTotalInfo()**
- input:Object
- output:String

### 8.列出最终订单信息
**function bestCharge()**
- input:Array[String,String,String...]
- output:String

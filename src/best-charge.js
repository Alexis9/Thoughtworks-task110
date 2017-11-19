//引入商品信息
function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}


//引入优惠信息
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

//列出购买商品的形成的数组对象
function listItemArr(arr) {
  let resultArr = [];
  arr.forEach(function(item, index, array) {
    let barcode = item.slice(0, 8);
    let count = item[item.length - 1];
    count = Number(count);
    for (let i = 0; i < loadAllItems().length; i++) {
      if (barcode === loadAllItems()[i].id) {
        resultArr.push({
          id: loadAllItems()[i].id,
          name: loadAllItems()[i].name,
          price: loadAllItems()[i].price,
          count: count
        });
      }
    }
  });
  return resultArr;
}


//将购买商品的形成的数组对象转换成订单明细
function listItemsInfo(arr) {
  let resultArr = [];
  arr.forEach(function(item, index, array) {
    let str = item.name + " x " + item.count + " = " + item.price * item.count + "元" + "\n";
    resultArr.push(str);
  });
  return resultArr.join("");
}


//计算优惠
function listPromotion(arr) {
  let promotionsResult;
  let total = 0;
  let halfPriceTotal = 0;
  let halfPriceName = [];
  let promotionsArr = loadPromotions()[1].items;
  arr.forEach(function(item, index, array) {
    total += item.price * item.count;
    for (let i = 0; i < promotionsArr.length; i++) {
      if (item.id === promotionsArr[i]) {
        halfPriceName.push(item.name);
        halfPriceTotal += (item.price / 2) * item.count;
      }
    }
  });
  if ((total >= 30) && (halfPriceTotal <= 6)) {
    promotionsResult = {
      promotionsType: loadPromotions()[0].type,
      promotionsMoney: 6
    }
  } else if ((total >= 30) && (halfPriceTotal > 6)) {
    promotionsResult = {
      promotionsType: loadPromotions()[1].type,
      promotionsName: halfPriceName,
      promotionsMoney: halfPriceTotal
    }
  } else if ((total < 30) && (halfPriceTotal > 0)) {
    promotionsResult = {
      promotionsType: loadPromotions()[1].type,
      promotionsName: halfPriceName,
      promotionsMoney: halfPriceTotal
    }
  } else {
    promotionsResult = {
      promotionsMoney: 0
    }
  }
  promotionsResult.total = total - promotionsResult.promotionsMoney;
  return promotionsResult;
}

// 返回优惠明细
function listPromotionInfo(arr) {
  let listPromotionInfo;
  if ((listPromotion(arr) != undefined) && (listPromotion(arr).promotionsName != undefined)) {
    listPromotionInfo = listPromotion(arr).promotionsType + "(" + listPromotion(arr).promotionsName + ")" + "，" + "省" + listPromotion(arr).promotionsMoney + "元";
  }
  if ((listPromotion(arr) != undefined) && (listPromotion(arr).promotionsName === undefined)) {
    listPromotionInfo = listPromotion(arr).promotionsType + "，" + "省" + listPromotion(arr).promotionsMoney + "元";
  }
  if ((listPromotion(arr).promotionsMoney === 0)) {
    listPromotionInfo = "无优惠";
  }
  return listPromotionInfo;
}

//列出总计
function listTotalInfo(obj) {
  let total = obj.total;
  return "总计：" + total + "元";
}

//列出最终订单信息
function bestCharge(selectedItems) {
  let resultInfo;
  let itemArr = listItemArr(selectedItems);
  let itemsInfo = listItemsInfo(itemArr); //订单明细
  let promotionsItem = listPromotion(itemArr);
  let promotionsInfo = listPromotionInfo(itemArr) //优惠明细
  let totalInfo = listTotalInfo(promotionsItem); //总计明细
  if (promotionsInfo === "无优惠") {
    resultInfo =
      "============= 订餐明细 =============" + "\n" +
      itemsInfo +
      "-----------------------------------" + "\n" +
      totalInfo + "\n" +
      "==================================="
  } else {
    resultInfo =
      "============= 订餐明细 =============" + "\n" +
      itemsInfo +
      "-----------------------------------" + "\n" +
      "使用优惠:"+"\n"+
      promotionsInfo + "\n" +
      "-----------------------------------" + "\n" +
      totalInfo + "\n" +
      "==================================="
  }
  resultInfo = resultInfo.replace(/\,/g, "，");
  return resultInfo;
}

module.exports = bestCharge;

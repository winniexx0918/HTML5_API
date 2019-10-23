//ajax > server > json
var products = [{ "ProductID": 1, "ModelNumber": "AGB00104", "ModelName": "eSony Cyber-shot DSC-T5", "UnitCost": 7000.0000, "ProductImage": "AGB00104.jpg" },
                     { "ProductID": 2, "ModelNumber": "AGB00097", "ModelName": "Sony Cyber-shot DSC T7 ", "UnitCost": 12980.0000, "ProductImage": "AGB00097.jpg" },
                     { "ProductID": 3, "ModelNumber": "AGB00099", "ModelName": "SONY DSC-P200", "UnitCost": 12980.0000, "ProductImage": "AGB00099.jpg" },
                     { "ProductID": 4, "ModelNumber": "AGB00098", "ModelName": "SONY DSC-H1 ", "UnitCost": 15980.0000, "ProductImage": "AGB00098.jpg" },
                     { "ProductID": 5, "ModelNumber": "AFH00027", "ModelName": "BenQ E43 雪片機", "UnitCost": 7900.0000, "ProductImage": "AFH00027.jpg" },
                     { "ProductID": 6, "ModelNumber": "AFH00037", "ModelName": "BenQ DC E510 防炫塗丫機", "UnitCost": 10490.0000, "ProductImage": "AFH00037.jpg" },
                     { "ProductID": 7, "ModelNumber": "AFH00034", "ModelName": "BenQ DC E41 音樂塗鴉機", "UnitCost": 5990.0000, "ProductImage": "AFH00034.jpg" },
                     { "ProductID": 8, "ModelNumber": "AFV00058", "ModelName": "Casio EX-Z110", "UnitCost": 9900.0000, "ProductImage": "AFV00058.jpg" },
                     { "ProductID": 9, "ModelNumber": "AFV00059", "ModelName": "CASIO EX-Z500 ", "UnitCost": 11900.0000, "ProductImage": "AFV00059.jpg" },
                     { "ProductID": 10, "ModelNumber": "AFV00057", "ModelName": "Casio EX-S500 ", "UnitCost": 13900.0000, "ProductImage": "AFV00057.jpg" },
                     { "ProductID": 11, "ModelNumber": "AFV00054", "ModelName": "CASIO Exilim PRO EX-P505 ", "UnitCost": 9900.0000, "ProductImage": "AFV00054.jpg" },
                     { "ProductID": 12, "ModelNumber": "AFJ00190", "ModelName": "CANON PowerShot S80 ", "UnitCost": 20900.0000, "ProductImage": "AFJ00190.jpg" },
                     { "ProductID": 14, "ModelNumber": "DGBC01-A900577YY", "ModelName": "Canon EOS 100D 雪白KIT組 公司貨", "UnitCost": 19900.0000, "ProductImage": "DGBC01-A900577YY.jpg" }];
//顯示資料
showCart()

//載入產品資料
var eleProducts = document.querySelector("#products");
for (var i = 0, max = products.length; i < max; i++) {

    var eleProductName = document.createElement("p");
    var txtProductName = document.createTextNode(products[i].ModelName);
    eleProductName.appendChild(txtProductName);

    var elePrice = document.createElement("p");
    elePrice.innerHTML = "<span>價格：</span><span>" + commafy(products[i].UnitCost) + "</span>";

    var eleDiv = document.createElement("div");
    eleDiv.appendChild(eleProductName);
    eleDiv.appendChild(elePrice);

    var eleImg = document.createElement("img");
    eleImg.setAttribute("src", "ProductImages/" + products[i].ProductImage);

    var eleA = document.createElement("div");
    eleA.setAttribute("id", products[i].ModelNumber);
    eleA.setAttribute("draggable", "true");
    eleA.setAttribute("class", "item");

    eleA.appendChild(eleImg);
    eleA.appendChild(eleDiv);

    eleA.addEventListener("mouseover", function () {
        this.getElementsByTagName("div")[0].style.display = 'block';
    }, false);
    eleA.addEventListener("mouseout", function () {
        this.getElementsByTagName("div")[0].style.display = 'none';
    }, false);

    //to do 對於eleA的div元素設定dragstart事件
    //在dragstart的事件中，透過this.id，將eleA的id存到(setData)dataTransfer物件中
    eleA.addEventListener('dragstart',function(event){
        //console.log(this.id)
        event.dataTransfer.setData("text/plain",this.id)
    })
 

    var eleLi = document.createElement("li");
    eleLi.appendChild(eleA);

    eleProducts.appendChild(eleLi);

}

//將數字轉成千分位
function commafy(num) {
    num = num + "";
    var re = /(-?\d+)(\d{3})/
    while (re.test(num)) {
        num = num.replace(re, "$1,$2")
    }
    return num;
}
//解除千分位 value.replace(/[,]+/g,"");

//購物車區
var cart = document.getElementById("cart");
//要將商品拖曳到購物車區
//to do 對於cart的ul元素設定dragover事件
//在dragover事件中，使用preventDefault()防止預設動作發生
cart.addEventListener('dragover',function(event){
    event.preventDefault();
})

//to do 對於cart的ul元素設定drop事件
//在drop事件中，呼叫addToCart function
cart.addEventListener('drop',addToCart)

function addToCart(event) {
    //to do 使用preventDefault()防止預設動作發生   
    event.preventDefault();
    //to do 使用stopPropagation()防止事件氣泡現象
    event.stopPropagation();
  
    
    //to do 從dataTransfer物件中取出(getData)之前存進去的產品Id
    //將產品Id存放到id變數中
    var id = event.dataTransfer.getData('text/plain')

    //todo 讀出商品
    var item = document.querySelector('#' + id);
    //找到item下的第一個P標籤
    //取出此標籤的商品名稱
    var itemName = item.querySelector('p:first-Child').textContent;
    var price = item.querySelector('p:nth-child(2)>span:nth-child(2)').firstChild.nodeValue;
    //判斷購物車是否已購買此項產品
    //noCartItem(id, itemName);

    //將購物的資料放進localStorage中儲存
    //key:value 
    //ModelNumber:{"itemName":"eSony Cyber-shot DSC-T5","price":12000,"qty":1}

    //JSON String vs JSON Object
    //var obj = {"itemName":"eSony Cyber-shot DSC-T5","price":12000,"qty":1}
    //var str = '{"itemName":"eSony Cyber-shot DSC-T5","price":12000,"qty":1}'
    //JSON.parse(str)
    //JSON.stringify(obj)

    //如果localStorage有買個此產品
    var theValue = localStorage.getItem(id)
    if(theValue){
        //數量加1
        var product = JSON.parse(theValue)
        var qty= product.qty + 1;
        var item = {"itemName":product.itemName,"price":product.price,"qty":qty}
        localStorage.setItem(id,JSON.stringify(item));
    }else{
        //否則就新增一筆資料到localStorage中
        var item = {"itemName":itemName,"price":price.replace(/[,]+/g,""),"qty":1}
        localStorage.setItem(id,JSON.stringify(item));
    }
    
   //顯示資料
   showCart()
}

//新增購物車資料
function showCart() {
    // var item = document.querySelector('#' + id);
    // var itemName = item.querySelector('p:first-Child').textContent;

    // var itemPrice = item.querySelector('p:nth-child(2)>span:nth-child(2)').textContent;
    // itemPrice = itemPrice.replace(/[,]+/g, "");

    

    var theUl = document.querySelector('#cart>ul');
    //清除畫面上的內容
    while(theUl.hasChildNodes()){
        theUl.removeChild(theUl.lastChild);
    }
   var total = 0;
    //從localStorage中讀出資料
        for(var i=0,max=localStorage.length;i<max;i++){
           var keyName = localStorage.key(i);
           if(keyName.substr(0,4) != "note"){
                var product = JSON.parse(localStorage.getItem(keyName));
                // console.log(product.itemName)
                // console.log(product.price)
                // console.log(product.qty)


    var qty = document.createTextNode(product.qty);
    var qtySpan = document.createElement("span");
    qtySpan.appendChild(qty);
    qtySpan.className = "quantity";

    var price = document.createTextNode('$' + commafy(product.price));
    var priceSpan = document.createElement("span");
    priceSpan.appendChild(price);
    priceSpan.className = "price";

    var name = document.createTextNode(product.itemName);
    var nameSpan = document.createElement("span");
    nameSpan.appendChild(name);

    var qtyLi = document.createElement("li");
    qtyLi.appendChild(priceSpan);
    qtyLi.appendChild(qtySpan);
    qtyLi.appendChild(nameSpan);

    theUl.appendChild(qtyLi);

   //總計
   var subTotal = product.price * product.qty
   total += subTotal;
           }
          
       }

       document.querySelector('#total>span').firstChild.nodeValue = commafy(total)


    
   
}

//修改購買數量
// function updateCart(item) {
//     //更新購買數量
//     var qty = parseInt(item.previousSibling.firstChild.nodeValue) + 1;
//     item.previousSibling.firstChild.nodeValue = qty;

//     //重新計算
//     total();

// }

//判斷購物車是否有此項產品
// function noCartItem(id, itemName) {
//     var items = document.querySelectorAll('#cart>ul>li');
//     var flag = true;
//     for (var i = 0, max = items.length; i < max; i++) {
//         //找到產品名稱
//         var item = items[i].querySelector('span:nth-child(3)'); //document.querySelector('#cart>ul>li>span:nth-child(3)');
//         //判斷購物車是否有此項產品
//         if (itemName == item.firstChild.nodeValue) {
//             //如果有就更新數量
//             updateCart(item);
//             flag = false;
//             break;
//         }
//     }
//     if (flag) {
//         //如果沒有就將此產品新增到購物車
//         showCart(id);
//     }

// }

//計算購物車購買總價
// function total() {
//     var items = document.querySelectorAll('#cart>ul>li');
//     var total = 0;
//     for (var i = 0, max = items.length; i < max; i++) {
//         var price = items[i].querySelector('span:nth-child(1)').firstChild.nodeValue.split('$')[1];
//         price = price.replace(/[,]+/g,"")
//         var qty = items[i].querySelector('span:nth-child(2)').firstChild.nodeValue;        
//         total = total + (price * qty);
//     }

//     document.querySelector('#total>span').firstChild.nodeValue = commafy(total);
// }

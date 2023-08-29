const priceElement = document.getElementById("product");
// ↑↑ID:productを　HTMLから取得
const numberElement = document.getElementById("number");
// ↑↑ID:numberを　HTMLから取得
let purchases = [];
// ↑↑purchases　関数を作成


const products = [
{
  id:1,
  name:"オリジナルブレンド２００g",
  money:500,
},
{
  id:2,
  name:"オリジナルブレンド５００g",
  money:900,
},
{
  id:3,
  name:"スペシャルブレンド２００g",
  money:700,
},
{
  id:4,
  name:"スペシャルブレンド５００g",
  money:1200,
}]
// ↑↑products　のitemを作成

console.log(products[1].name);
// ↑↑ここまでエラーなくできているかの確認


function add() {
  // ↑↑add関数作成
  const htmlId = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);
  // ↑↑htmlから取得してきたID、購入数をparseIntにて整数にして変換、代入。
  const product = products.find((item) => item.id == htmlId);
  // ↑findはテキストになかった。
  // ↑↑productsの中のitemの中のID と　HTMLのprodctID　が一致しているitmeを　product とする
 
   let purchase = {
    product:product,
    number: number,
  };
  // ↑↑　これまでに取り出した　product（products item の中からhtmlで呼び出されたitem） と　number(htmlで指定された購入数)　をpurchaseとして作成
  
  const newpurchase = purchases.findIndex((item) => item.product.id === purchase.product.id)
  // purchasesの中のitem.product.id と purchase.product.id が一致している　index　を　newpurchase とする
  if(purchases.length < 1 || newpurchase === -1){
    purchases.push(purchase)
    // ↑↑もし　purchases　が１文字以上　もしくは　newpurchase　が　−1（←これがわからない） ならば　purchases をpurchases に追加
  }else{
    purchases[newpurchase].number += purchase.number
  }

  window.alert(`${display()}\n小計${subtotal()}円`);
  priceElement.value = "";
  numberElement.value = "";

}

function display() {
  const hoge = purchases.map(purchase => {
    return `${purchase.product.name} ${purchase.product.money}円:${purchase.number}点\n`;
  }).join("")
  return hoge
};

// function display() {
//   let string = "";
//   for(let i=0; i<purchases.length; i++){
//     string += `${purchases[i].name} ${purchases[i].money}円が${purchases[i].number}点\n`;
//   }
//   return string;
// }

function subtotal() {
  const hoge = purchases.reduce((sum, purchase) => {
    return sum + purchase.product.money * purchase.number;
  }, 0)
  // sum=0 purchase=purchasesのitemが順番に入っていく
  return hoge
}

// function subtotal() {
//   let sum = 0;
//     for(let i=0; i<purchases.length; i++){
//     sum += purchases[i].price * purchases[i].number;
//   }
//   return sum;
// }

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 1000){
   return 500;
  } else {
   return 250;
  }
}
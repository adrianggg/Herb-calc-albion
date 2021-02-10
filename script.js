'use strict'
// let herbT4Price , herbT5Price , herbT6Price , herbT7Price , herbT8Price , milkT6Price , milkT8Price , alkT6Price , alkT7Price , alkT8Price , eggsPrice;
const start = document.querySelectorAll('button')[0];
let justTest = 0;
let countP;
start.addEventListener('click', ()=>{
    countP =0;
    if(justTest==1)test();
    const potionsName = ["#herbT4","#herbT5","#herbT6","#herbT7","#herbT8","#milkT6","#milkT8","#alkT6","#alkT7" ,"#alkT8","#eggs"];
    let potionsPrices = [];
    for(let i=0 ; i!=potionsName.length ;i++){
        potionsPrices.push(countPrice(potionsName[i]));
    }
    let marketPrice = [...document.querySelectorAll('#market')];
    // for(let i=0;i!=marketPrice.length;i++){
    //    console.log(marketPrice[i].value);
    // } 
    // let poisonTest = [
    //     namePoisonTest = "Poison T8",
    //     cost = potionsPrices[0],
    //     build = [0,36,0,36,72,0,18,0,0,18,0],
    // ]
    const poisonT8=[0,36,0,36,72,0,18,0,0,18,0];
    wstaw(profit(poisonT8,potionsPrices,marketPrice[0].value)[1],"Posion T8");

});
function profit(potions,prices,marketPrice){
    let craftCost=0;
    for(let i=0;i!=potions.length;i++){
        craftCost += potions[i]*prices[i];
    }
    console.log(craftCost);
    const profit = []; 
    const fee = Math.floor(marketPrice*.07);

    profit[0]= craftCost;
    profit[1] =Math.floor((marketPrice*5-marketPrice*.09-fee*5-craftCost*.53)/5);
    return profit;
}
function countPrice(name){
    let tempArray = document.querySelectorAll(`${name}`);
    let tempPrice=[];
    tempPrice[0]=9999;
    let tempPriceItem;
    tempArray.forEach(e=> {
        tempPriceItem = parseInt(`${e.value}`,10);
            if(tempPrice[0]>tempPriceItem && tempPriceItem>0){
                tempPrice[0]=tempPriceItem;
                tempPrice[1] = e.classList.value;
            }
            if(e.classList.value=="MT"){
                countP++
            }
        });
        tempPrice[0] = tempPrice[0] >= 999 ? 0 : tempPrice[0];
        document.querySelectorAll('p')[countP].innerHTML = tempPrice[0]; 
        document.querySelectorAll('p')[countP].classList.value = tempPrice[1]; 
    return tempPrice[0];   
}
const buttonTest = document.querySelectorAll('button')[1];
buttonTest.addEventListener('click', ()=>{
    justTest = !justTest;
    buttonTest.innerHTML = justTest;
})
function test(){
    const items = document.querySelectorAll('input');    
    items.forEach(e=>{
        e.value = Math.floor(Math.random()*(900+0));
    });
}
function wstaw(priceResult,name){
// <tr>
//     <td>Poison T8</td>
//     <td><h4></h4></td>
//     <td id="temp"></td>
// </tr>
    const tableResults = document.querySelector('.table_result');
    tableResults.innerHTML += `
    <tr>
        <td>${name}</td>
        <td><h4></h4></td>
        <td>${priceResult}</td>
     </tr>`



}
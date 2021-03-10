'use strict'
// let herbT4Price , herbT5Price , herbT6Price , herbT7Price , herbT8Price , milkT6Price , milkT8Price , alkT6Price , alkT7Price , alkT8Price , eggsPrice;
const start = document.querySelector('.start');
const requestURL = 
['https://www.albion-online-data.com/api/v2/stats/prices/T8_YARROW,T7_MULLEIN,T6_FOXGLOVE,T5_TEASEL,T4_BURDOCK,T3_COMFREY.json?locations=Caerleon,Bridgewatch,Martlock,FortSterling,Lymhurst,Thetford&qualities=0',
'https://www.albion-online-data.com/api/v2/stats/prices/T6_MILK,T8_MILK,T6_ALCOHOL,T7_ALCOHOL,T8_ALCOHOL,T5_EGG.json?locations=Caerleon,Bridgewatch,Martlock,FortSterling,Lymhurst,Thetford&qualities=0',
'https://www.albion-online-data.com/api/v2/stats/prices/T4_POTION_COOLDOWN,T6_POTION_COOLDOWN,T8_POTION_COOLDOWN,T6_POTION_HEAL,T6_POTION_ENERGY,T7_POTION_STONESKIN,T7_POTION_REVIVE,T8_POTION_CLEANSE.json?locations=FortSterling&qualities=0'];

let dataArray = [];
async function getData(){
    for(let i=0;i<requestURL.length;i++){
        console.log(requestURL[i]);
        const response = await fetch(requestURL[i]);
        const data = await response.json();
        dataArray[i]=data;
    }
    for(let i=0;i<requestURL.length;i++){
        console.log(dataArray[i]);
    }
    console.log(dataArray[0][6].item_id);
    console.log(typeof(dataArray[0][6].sell_price_min));
    console.log(dataArray[0][6].sell_price_min);
}
getData();
let justTest = 0;
let countP;

start.addEventListener('click', ()=>{
    countP=0;
    if(justTest==1)test();
    const potionsName = ["#herbT3","#herbT4","#herbT5","#herbT6","#herbT7","#herbT8","#milkT6","#milkT8","#alkT6","#alkT7" ,"#alkT8","#eggs"];
    let herbsPrices = [];
    for(let i=0 ; i!=potionsName.length ;i++){
        herbsPrices.push(countPrice(potionsName[i]));
    }
    let marketPrice = [...document.querySelectorAll('#market')];
    const poisonT4 = {
        name: "Poison T4",
        cost: marketPrice[0].value,
        build: [4,8,'T5','T6','T7','T8','T6','T8','T6','T7','T8','EG'],
    }
    const poisonT6 = {
        name: "Poison T6",
        cost: marketPrice[1].value,
        build: [12,'T4',12,24,'T7','T8',6,'T8','T6','T7','T8','EG'],
    }
    const mana = {
        name: "Mana",
        cost: marketPrice[2].value,
        build: ['T3','T4','T5',72,'T7','T8',18,'T8',18,'T7','T8','EG'],
    }
    const healing = {
        name: "Healing",
        cost: marketPrice[3].value,
        build: ['T3','T4','T5',72,'T7','T8','T6','T8',18,'T7','T8',18],
    }
    const gigantify = {
        name: "Gigantify",
        cost: marketPrice[4].value,
        build: ['T3','T4','T5',36,72,'T8','T6','T8','T6',18,'T8',18],
    }
    const resistance = {
        name: "Resistance",
        cost: marketPrice[5].value,
        build: ['T3',36,'T5',36,72,'T8',18,'T8','T6',18,'T8','EG'],
    }
    const invisible = {
        name: "Invisible",
        cost: marketPrice[6].value,
        build: ['T3','T4',36,'T6','36',72,'T6',18,'T6','T7',18,'EG'],
    }
    const poisonT8 = {
        name: "Poison T8",
        cost: marketPrice[7].value,
        build: ['T3','T4',36,'T6',36,72,'T6',18,'T6','T7',18,'EG'],
    }
    wstaw(poisonT4,herbsPrices);
    wstaw(poisonT6,herbsPrices);
    wstaw(poisonT8,herbsPrices);
    wstaw(healing,herbsPrices);
    wstaw(mana,herbsPrices);
    wstaw(resistance,herbsPrices);
    wstaw(gigantify,herbsPrices);
    wstaw(invisible,herbsPrices);

});
function profit(potions,prices,marketPrice){
    let craftCost=0;
    for(let i=0;i!=potions.length;i++){
        if(potions[i]>0){
            craftCost += potions[i]*prices[i];
        }
    }
    console.log(craftCost);
    const profit = []; 
    const fee = Math.floor(marketPrice*.09);

    profit[0]= craftCost * .52;
    console.log(` koszt wynosi ${craftCost} , market price to ${marketPrice}`);
    profit[1] =Math.floor((marketPrice*5-marketPrice*.09-fee*5-craftCost*.52)/5);
    console.log(`profit to ${profit[1]}`);
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
            if(e.classList.value=="TF"){
                countP++
            }
        });
        tempPrice[0] = tempPrice[0] >= 999 ? 0 : tempPrice[0];
        document.querySelectorAll('p')[countP].innerHTML = tempPrice[0]; 
        document.querySelectorAll('p')[countP].classList.value = tempPrice[1]; 
    return tempPrice[0];   
}
const buttonTest = document.querySelector('.test');
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

const buttonFetchData = document.querySelector('.data');
buttonFetchData.addEventListener('click',()=>{
    insertElements();
})
function insertElements(){
    const inputHandle = [...document.querySelectorAll('input')];
    for(let i=0;i<6;i++){
        for(let j=0;j<12;j++){
            if(j<6){
         
                inputHandle[i*12+j].value=dataArray[0][j+6*i].sell_price_min;
            }else{
   
                inputHandle[i*12+j].value=dataArray[1][j+6*i-6].sell_price_min;
            }
        }
    }
   for(let i=0;i<8;i++){
       inputHandle[i+72].value = dataArray[2][i].sell_price_min >30000 ?0:dataArray[2][i].sell_price_min;
   }
}
function wstaw(ob,herbsP){
const tempProfit = profit(ob.build,herbsP,ob.cost);
    const tableResults = document.querySelector('.table_result');
    tableResults.innerHTML += `
    <tr>
        <td>${ob.name}</td>
        <td>${tempProfit[0]}</td>
        <td>${tempProfit[1]}</td>
     </tr>`
}
//TODO: Zmieniłem kolejnosc herbsów i materiałów dzieki czemu profit liczy nieprawidłowo 
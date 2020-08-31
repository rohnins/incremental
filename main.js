var saveGame = localStorage.getItem('cashCollectSave')
var gameData = {
    cash: 0,
    cashPerBottle: 0.25,

    cashSellOnline: 0,
    costSellOnline: 5,

    cashSellDrugs: 0,
    costSellDrugs: 100,
    lastTick: Date.now()
}

function update(id, content) {
    document.getElementById(id).innerHTML = content;
  }

function BottleCollect() {
    gameData.cash += gameData.cashPerBottle
    update("cashCollected", gameData.cash + " cash")
}

function buySellOnline() {
    if (gameData.cash >= gameData.costSellOnline) {
        gameData.cash -= gameData.costSellOnline
        gameData.cashSellOnline += 2
        gameData.costSellOnline *=1.5
        update("cashCollected", gameData.cash + " cash")
        update("SellOnlineUpgrade", "Sell Online (+2cash/s)" + gameData.costSellOnline + "cash")
    }
}

function buySellDrugs() {
    if (gameData.cash >= gameData.costSellDrugs) {
        gameData.cash -= gameData.costSellDrugs
        gameData.cashSellDrugs += 10
        gameData.costSellDrugs *=1.5
        update("cashCollected", gameData.cash + " cash")
        update("SellDrugsUpgrade", "Sell Drugs (+10cash/s)" + gameData.costSellDrugs + "cash")
    }
}


function GenerateCash(){
    gameData.cash = gameData.cash + gameData.cashSellOnline + gameData.cashSellDrugs
    update("cashCollected", gameData.cash + " cash")
}

var mainGameLoop = window.setInterval(function() {
    GenerateCash()
  }, 1000)


var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("cashCollectSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("cashCollectSave"))
if (savegame !== null) {
  gameData = savegame
}

if (typeof saveGame.cash !== "undefined") gameData.cash = saveGame.cash;
if (typeof saveGame.cashSellOnline !== "undefined") gameData.cashSellOnline = saveGame.cashSellOnline;
if (typeof saveGame.costSellOnline !== "undefined") gameData.costSellOnline = saveGame.costSellOnline;
if (typeof saveGame.cashSellDrugs !== "undefined") gameData.cashSellDrugs = saveGame.cashSellDrugs;
if (typeof saveGame.costSellDrugs !== "undefined") gameData.costSellDrugs = saveGame.costSellDrugs;
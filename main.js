var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    lastTick: Date.now()
}
function mineGold(){
    gameData.gold += gameData.goldPerClick
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
}

function buyGoldPerClick() {
    if (gameData.gold >= gameData.goldPerClickCost) {
        gameData.gold -= gameData.goldPerClickCost
        gameData.goldPerClick += 1
        gameData.goldPerClickCost *=2
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold"
    }

}

var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now() // DOn't forget to update lastTick.
    gameData.gold += gameData.goldPerClick * (diff / 1000) //divide by how often (ms) mainGameLoop is ran
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
}, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
  }, 1500)

var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
  if (savegame !== null) {
    gameData = savegame
  }
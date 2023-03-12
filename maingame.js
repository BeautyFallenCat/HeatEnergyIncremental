var player;
var tmp = {};
var tab = {
    normal: "Wood",
    options: "Setting",
    stone: "generator",
}
var newstime
const tabs = {
    normal: {
        Options() { return true },
        Wood() { return true },
        Stone() { return player.energy.gte(4.13e21)||player.totalstone.gte(1) },
    },
    options:
    {
        Setting() {return true},
        Changelog() {return true},
    },
    stone:
    {
        Generator() {return true},
        Upgrades() {return true},
    }
}
function showTab(name, type) { if (tabs[type][name]()) tab[type] = name }
//游戏各种大小标签页以及是否解锁判定
function getUnlockText() {
    if (!tabs.normal.Stone()) return "Reach 4130 EJ to unlock stone.("+format(player.energy.add(1).log10().div(new Decimal(4.13e21).log10()).mul(100))+"%)"
    else return "Endgame: get 4 stone upgrades."
}
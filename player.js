//初始player对象值和存档
var storageName = "Energy";
intervals = {}
var gameData = {
	started: false,
	newsMsg: "",
	newsMarj: -1000000,
	newsLength: 0,
	newsRS: false,
	newsCooldown: 0,
};
function getStartPlayer() {
	let p = {
    currTime: new Date().getTime(),
	currGameTime: new Date().getTime(),
	energy: new Decimal(0),
	wood: new Decimal(0),
	upgs: [],
	totalwood: new Decimal(0),
	stone: new Decimal(0),
	totalstone: new Decimal(0),
	stoneEng: new Decimal(0),
	time: new Decimal(83000),
	upg2s: [],
	upg2sAmt: [null,new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
	};
	return p;
}

function fixPlayer() {
	let start = getStartPlayer();
	addNewV(player, start);
	for (let i=1;i<=TOTAL_UPGS;i++) player.upgs[i] = new Decimal(player.upgs[i]||0);
	for (let i=1;i<=TOTAL_2UPGS;i++) player.upg2s[i] = new Decimal(player.upg2s[i]||0);
}
//检查player对象中是否有未定义对象，如果有替换为player初始值中的对应值，方便进一步游戏开发
//真是的，谁愿意游戏开发过程中加变量后一个个定义数值啊啊啊啊啊
//所以加入这个
//==系统提示：作者由于废话被禁言15min==
function addNewV(obj, start) {
	for (let x in start) {
		if (obj[x] === undefined) obj[x] = start[x]
		else if (typeof start[x] == "object" && !(start[x] instanceof Decimal)) addNewV(obj[x], start[x])
		else if (start[x] instanceof Decimal) obj[x] = new Decimal(obj[x])
	}
}
//加载游戏(网页body完成加载后运行)
function loadGame() {
	let g = localStorage.getItem(storageName);
    if (g !== null) player = JSON.parse(atob(g));
	else player = getStartPlayer();//玩家没玩过
	
	fixPlayer();//很重要!!!没了容易出事
	updateTemp();//加载各种二级变量
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	loadVue();//加载vue
	intervals.game = setInterval(function() { gameLoop(0)}, 30) //30毫秒一个tick
	intervals.save = setInterval(function() { save(); }, 2500) //2.5秒一保存
}
function save() {
	localStorage.setItem(storageName, btoa(JSON.stringify(player)));
}
//导入存档
function importSave() {
	let data = prompt("粘贴你的存档: ")
	if (data===undefined||data===null||data=="") return;
	try {
		player = JSON.parse(atob(data));
		save()
		window.location.reload();
	} catch(e) {
		console.log("导入失败!请检查你的存档的复制过程中是否有遗漏!");
		console.error(e);
		return;
	}
}
//导出存档(导出方式为*下载文件*)
function exportSave() {
	let data = btoa(JSON.stringify(player))
	const a = document.createElement('a');
	a.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
	a.setAttribute('download', "Energy Incremental_"+new Date()+".txt");
	a.setAttribute('id', 'downloadSave');

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}
//重置游戏
function hardReset() {
	if (!confirm("Do you really want to reset the game? This won't give you any bonuses!")) return;
	player = getStartPlayer();
	save();
	window.location.reload();
}

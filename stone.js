function getStoneGain()
{
    let gain = player.energy.max(4.13e21).div(4.13e21).pow(0.2).floor()
    return gain
}
function stonePrestige()
{
    if(player.energy.lt(4.13e21)) return
    let gain = getStoneGain()
    player.energy = new Decimal(0)
    player.wood = new Decimal(0)
    for(let i=1;i<=7;i++){player.upgs[i]=new Decimal(0)}
    updateTemp()
    updateTemp()
    player.stone = player.stone.add(gain)
    player.totalstone = player.totalstone.add(gain)
}
const TOTAL_2UPGS = 10
var UPG2_DATA = {
	rows: 2,
    	rowData: {
		1: [1,2,3],
        2: [4,5,6],
        3: [7,8,9,10]
	},
	1: {
		title() { return "Generate Stone energy per second. " },
		pref: "/sec",
		cost(x) { return Decimal.pow(5,Math.floor(x / 10)).floor() },
		targ(r) { return new Decimal(1) },
		eff(n) {return player.upg2sAmt[1].mul(0.1).mul(Decimal.pow(2,player.upg2s[1].div(10).floor()))},
	},
	2: {
		title() { return "Generate 1st stone generator every second." },
		pref: "/sec",
		cost(x) { return Decimal.mul(Decimal.pow(200,Math.floor(x / 10)),10).floor() },
		targ(r) { return new Decimal(1) },
		eff(n) {return player.upg2sAmt[2].mul(0.1).mul(Decimal.pow(2,player.upg2s[2].div(10).floor()))},
	},
	3: {
		title() { return "Generate 2nd stone generator every second." },
		pref: "/sec",
		cost(x) { return Decimal.mul(Decimal.pow(100000,Math.floor(x / 10)),1000).floor() },
		targ(r) { return new Decimal(1) },
		eff(n) {return player.upg2sAmt[3].mul(0.1).mul(Decimal.pow(2,player.upg2s[3].div(10).floor()))},
	},
	4: {
		title() { return "Generate 3rd stone generator every second." },
		pref: "/sec",
		cost(x) { return Decimal.mul(Decimal.pow(2500000000,Math.floor(x / 10)),1000000).floor() },
		targ(r) { return new Decimal(1) },
		eff(n) {return player.upg2sAmt[4].mul(0.1).mul(Decimal.pow(2,player.upg2s[4].div(10).floor()))},
	},
	5: {
		title() { return "Generate 4th stone generator every second." },
		pref: "/sec",
		cost(x) { return Decimal.mul(Decimal.pow(4.12e15,Math.floor(x / 10)),1e12).floor() },
		targ(r) { return new Decimal(1) },
		eff(n) {return player.upg2sAmt[5].mul(0.1).mul(Decimal.pow(2,player.upg2s[5].div(10).floor()))},
	},
    6: {
		title() { return "Generate 5th stone generator every second." },
		pref: "/sec",
		cost(x) { return Decimal.mul(Decimal.pow(6.12e30,Math.floor(x / 10)),1e20).floor() },
		targ(r) { return new Decimal(1) },
		eff(n) {return player.upg2sAmt[6].mul(0.1).mul(Decimal.pow(2,player.upg2s[6].div(10).floor()))},
	},
    7: {
		title() { return "Heat energy boosts itself gain." },
		pref: "x",
		cost(x) { return new Decimal(100) },
		targ(r) { return new Decimal(1) },
		eff(n) {let eff = player.energy.div(1e21).pow(0.4).add(1.5)
        eff = softcap(eff,1e6,1.5)
        eff = softcap(eff,1e12,2)
        eff = softcap(eff,1e36,3)
        eff = softcap(eff,1e144,4)
        eff = softcap(eff,"1e720",4)
        return eff
        },
	},
    8: {
		title() { return "You can buy as many wood furnaces as you can." },
		pref: "",
		cost(x) { return new Decimal(10000) },
		targ(r) { return new Decimal(1) },
		eff(n) {return "Bulk purchase is the best ~ I feel the universe is getting warmer!"
        },
	},
    9: {
		title() { return "Your stone gain on stone reset boosts heat energy gain." },
		pref: "x",
		cost(x) { return new Decimal(1e6) },
		targ(r) { return new Decimal(1) },
		eff(n) {let eff = Decimal.pow(getStoneGain(),0.75).mul(2.5).add(10)
        eff = softcap(eff,1e6,1.5)
        eff = softcap(eff,1e12,2)
        eff = softcap(eff,1e36,3)
        eff = softcap(eff,1e144,4)
        eff = softcap(eff,"1e720",4)
        return eff
        },
	},
    10: {
		title() { return "Automatically max-upgrades your Wood furnaces for you every tick." },
		pref: "",
		cost(x) { return new Decimal(1e8) },
		targ(r) { return new Decimal(1) },
		eff(n) {return "Hands free!"
        },
	},
}

function softcap(x,sc,scp)
{
    if(x.gte(sc)) x = (x.div(sc).root(scp)).mul(sc)
    return x
}

function Preset2Upgs()
{
	for (let i=1;i<=TOTAL_2UPGS;i++) {
		tmp.c2[i] = get2UpgCost(i);
		tmp.u2[i] = get2UpgEff(i);
		tmp.x2[i] = getExtra2Upgs(i);
	}
}

function get2UpgCost(x) { return UPG2_DATA[x].cost(player.upg2s[x]) }

function get2UpgEff(x) { return UPG2_DATA[x].eff(player.upg2s[x]) }

function get2UpgBulk(x) {
	return 1
}

function buy2Upg(x) {
	let c = get2UpgCost(x);
	if (x<=6&&player.stone.lt(c)) return;
    if (x>=7&&(player.stoneEng.lt(c)||player.upg2s[x].toNumber()==1)) return; //买不起升级
	if (x<=6) player.upg2s[x] = Decimal.add(player.upg2s[x]||0, new Decimal(get2UpgBulk(x)));
    if (x>=7) player.upg2s[x] = new Decimal(1)
    if (x<=6) player.upg2sAmt[x] = Decimal.add(player.upg2sAmt[x]||0, new Decimal(get2UpgBulk(x)));
    if (x<=6) player.stone = player.stone.sub(c); //买得起升级
    if (x>=7) player.stoneEng = player.stoneEng.sub(c)
}

function getExtra2Upgs(x) {
	let extra = new Decimal(0);
	return extra;
}//额外升级数量(真的会有吗...)
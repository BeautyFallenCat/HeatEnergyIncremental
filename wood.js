function getEnergyGain()
{
    let gain = new Decimal(1)
    for(var i = 1;i<=6;i++){
        gain = gain.mul(tmp.u[i]||1)
    }
	if(player.upg2s[7].gt(0)) gain = gain.mul(tmp.u2[7])
	if(player.upg2s[9].gt(0)) gain = gain.mul(tmp.u2[9])
    return gain
}
function getWoodGain()
{
    let gain = player.energy.max(10).div(10).sqrt().floor()
	if(player.stoneEng.gt(0)) gain = gain.mul(tmp.stone.stoneEff)
    return gain
}
function woodPrestige()
{
    if(player.energy.lt(10)) return
    let gain = getWoodGain()
    player.energy = new Decimal(0)
    updateTemp()
    updateTemp()
    player.wood = player.wood.add(gain)
    player.totalwood = player.totalwood.add(gain)
}
const TOTAL_UPGS = 7
var UPG_DATA = {
	rows: 3,
	rowData: {
		1: [1,2,3],
        2: [4,5,6],
		3: [7]
	},
	1: {
		title() { return "Speeds up energy gain. " },
		pref: "x",
		cost(x) { return Decimal.pow(1.12,x).div(tmp.u[7]).floor() },
		targ(r) { return new Decimal(1) },
		eff(n) 
		{   eff = Decimal.add(n,1)
			return eff
	    },
	},
	2: {
		title() { return "Speeds up energy gain. Much stronger than previous upgrade." },
		pref: "x",
		cost(x) { return Decimal.mul(Decimal.pow(1.2,x),15).div(tmp.u[7]).floor() },
		targ(r) { return new Decimal(10) },
		eff(n) 
		{   eff = Decimal.pow(Decimal.add(n,1),2)
			return eff
	    },
	},
	3: {
		title() { return "Speeds up energy gain. Much stronger than previous upgrade." },
		pref: "x",
		cost(x) { return Decimal.mul(Decimal.pow(3,x),200).div(tmp.u[7]).floor() },
		targ(r) { return new Decimal(150) },
		eff(n) 
		{   eff = Decimal.pow(Decimal.add(n,1),3)
			return eff
	    },
	},
	4: {
		title() { return "Speeds up energy gain. Much stronger than previous upgrade." },
		pref: "x",
		cost(x) { return Decimal.mul(Decimal.pow(20,x),15000).div(tmp.u[7]).floor() },
		targ(r) { return new Decimal(10000) },
		eff(n) 
		{   eff = Decimal.pow(Decimal.add(n,1),4)
			return eff
	    },
	},
	5: {
		title() { return "Speeds up energy gain. Much stronger than previous upgrade." },
		pref: "x",
		cost(x) { return Decimal.mul(Decimal.pow(120,x),1.2e6).div(tmp.u[7]).floor() },
		targ(r) { return new Decimal(1e6) },
		eff(n) 
		{   eff = Decimal.pow(Decimal.add(n,1),5)
			return eff
	    },
	},
    6: {
		title() { return "Speeds up energy gain. This is the last energy upgrade." },
		pref: "x",
		cost(x) { return Decimal.mul(Decimal.pow(413,x),6.12e8).div(tmp.u[7]).floor() },
		targ(r) { return new Decimal(1e8) },
		eff(n) 
		{   eff = Decimal.pow(Decimal.add(n,1),6)
			return eff
	    },
	},
    7: {
		title() { return "Decrease the cost of all previous upgrades but lost all previous progress." },
		pref: "/",
		cost(x) { return Decimal.mul(4e7,Decimal.pow(413,x.add(1).pow(1.75))) },
		targ(r) { return new Decimal(1e10) },
		eff(n) 
		{   eff = Decimal.pow(413,n)
			return eff
	    },
	},
}

function PresetUpgs()
{
	for (let i=1;i<=TOTAL_UPGS;i++) {
		tmp.c[i] = getUpgCost(i);
		tmp.u[i] = getUpgEff(i);
		tmp.x[i] = getExtraUpgs(i);
	}
}

function getUpgCost(x) { return UPG_DATA[x].cost(player.upgs[x]) }

function getUpgEff(x) { return UPG_DATA[x].eff(player.upgs[x].plus(tmp["x"][x])) }

function getUpgBulk(x) {
	if(!player.upg2s[8].gt(0)) return 1
	for(var bulk = 0; bulk < 99999999; bulk++)
	{
       if(UPG_DATA[x].cost(player.upgs[x].add(bulk)).gte(player.wood)) break
	}
	return bulk
}

function buyUpg(x) {
	let c = getUpgCost(x);
	if (player.wood.lt(c)) return; //买不起升级
	player.upgs[x] = Decimal.add(player.upgs[x]||0, new Decimal(getUpgBulk(x)));
	player.wood = player.wood.sub(c); //买得起升级
    if(x==7) {for(let i=1;i<=6;i++){player.upgs[i]=new Decimal(0)};player.wood = new Decimal(10); player.energy = new Decimal(10);updateTemp()}
}

function getExtraUpgs(x) {
	let extra = new Decimal(0);
	return extra;
}//额外升级数量(真的会有吗...)
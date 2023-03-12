function gameLoop(diff) {
	player.currTime = new Date().getTime();
	updateTemp();
	if (!gameLooping()) return;//游戏暂停时不再增长diff
	diff = NaNCheck(Math.max((player.currTime - player.currGameTime), 0));//获取时间差，得出该帧停留时间，从而生产资源(这玩意绝对不能低于0啊啊啊啊)
	doWoodDiff(diff)
	doStoneDiff(diff)
	newsTick(diff)
	player.currGameTime = new Date().getTime();
}

function gameLooping() {
	return true
}//游戏是否被暂停，真的会被暂停吗...
function doWoodDiff(diff)
{
	player.energy = player.energy.add(Decimal.mul(diff/1000,getEnergyGain()))
	player.time = player.time.sub(diff/1000)
	if(player.upg2s[10].gt(0)) autoWood()
}
function doStoneDiff(diff)
{
	for(var i=1; i<=5; i++)
	{
		player.upg2sAmt[i] = player.upg2sAmt[i].add(get2UpgEff(i+1).mul(diff/1000))
	}
	player.stoneEng = player.stoneEng.add(get2UpgEff(1).mul(diff/1000))
}
function autoWood()
{
	for (var i=1; i<=6; i++)
	{
        buyUpg(i)
	}
}
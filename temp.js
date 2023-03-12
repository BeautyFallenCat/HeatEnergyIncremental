function updateTemp() {
	updateTempWood();
}
//更新所有游戏内二级变量的数值
function updateTempWood()
{
    if (!tmp.stone) tmp.stone = {}
    if (!tmp.c) tmp.c = {};
	if (!tmp.x) tmp.x = {};
	if (!tmp.u) tmp.u = {};
	if (!tmp.c2) tmp.c2 = {};
	if (!tmp.x2) tmp.x2 = {};
	if (!tmp.u2) tmp.u2 = {};
	PresetUpgs()
	Preset2Upgs()
	tmp.stone.stoneEff = player.stoneEng.pow(0.5)
}
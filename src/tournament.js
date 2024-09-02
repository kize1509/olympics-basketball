const { simulateGroupStage } = require("./services/GroupService");
const { simulateKnockout } = require("./services/KnockoutService");
const { prepareKnockout } = require("./services/PrepService");
const { printHats, printEliminationPh } = require("./utils/TextUtils");
const { TextUtils } = require("./utils/TextUtils");
const txtUtil = new TextUtils();

async function startTournament() {
  try {
    //group stage simultaion
    groups = await simulateGroupStage();
    //rankig the teams from 1 to 9, but only 8 will pass to the next stage
    const [pairs, hats] = await prepareKnockout(groups);

    for (let group of groups) {
      console.log(group.toString());
    }
    let pairs1 = pairs[0];
    let pairs2 = pairs[1];
    txtUtil.printHats(hats[0], hats[1], hats[2], hats[3]);
    txtUtil.printEliminationPh(pairs1, pairs2);

    //elimination stage
    await simulateKnockout(pairs, hats);
  } catch (e) {
    console.log(e);
  }
}

module.exports = startTournament;
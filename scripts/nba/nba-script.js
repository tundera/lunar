#!/usr/bin/env node

require('dotenv').config();

const NBA = require('nba');
const curry = NBA.findPlayer('Stephen Curry');
console.log(curry);

NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);

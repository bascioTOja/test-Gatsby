"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessGames = (games) => games.map((game) => (Object.assign(Object.assign({}, game), { game_id: game.id, id: game.id.toString(), team: null })));
exports.default = ProcessGames;

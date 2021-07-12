"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _token, _reporter, _client, _fetchTeams, _fetchMatches, _fetchPlayers, _fetchGames, _fetchCalendar, _fetchTrainings, _fetchAllEndpoints;
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const extractors_1 = __importDefault(require("./extractors"));
const moment_1 = __importDefault(require("moment"));
const axios_retry_1 = __importDefault(require("axios-retry"));
class PTUCreator {
    constructor(apiURL, reporter) {
        _token.set(this, void 0);
        _reporter.set(this, void 0);
        _client.set(this, void 0);
        this.init = async (PTULogin, PTUPassword) => {
            try {
                const { data } = await __classPrivateFieldGet(this, _client).post(`${this.apiURL}/auth/login`, {
                    login: PTULogin,
                    password: PTUPassword,
                });
                __classPrivateFieldSet(this, _token, data.token);
            }
            catch (err) {
                console.log(err);
                throw Error("gatsby-source-protrainup: Your authentication went wrong");
            }
        };
        _fetchTeams.set(this, async () => __classPrivateFieldGet(this, _client).get(`${this.apiURL}/diary/teams?_with=annualSeasons,systemClub,members.user.profile,members.season`));
        _fetchMatches.set(this, async () => __classPrivateFieldGet(this, _client).get(`${this.apiURL}/diary/matches?_with=participants.stats,matchPlayers.stats,participants.matchTeam.systemClub,events,matchPlayers.player.user,season`));
        _fetchPlayers.set(this, async () => __classPrivateFieldGet(this, _client).get(`${this.apiURL}/diary/players?_with=user,season&_appends=match_stats_summary`));
        _fetchGames.set(this, () => __classPrivateFieldGet(this, _client).get(`${this.apiURL}/diary/games?_with=season`));
        _fetchCalendar.set(this, () => __classPrivateFieldGet(this, _client).get(`${this.apiURL}/calendar`, {
            data: {
                from: moment_1.default().subtract(1, "years").format("YYYY-MM-DD"),
                to: moment_1.default().add(1, "years").format("YYYY-MM-DD"),
            },
        }));
        _fetchTrainings.set(this, () => __classPrivateFieldGet(this, _client).get(`${this.apiURL}/diary/trainings?_with=staff.user,subFacility`));
        _fetchAllEndpoints.set(this, async () => {
            try {
                const [{ data: teamsData }, { data: matchesData }, { data: playersData }, { data: gamesData }, { data: eventsData }, { data: trainingsData },] = await axios_1.default.all([
                    __classPrivateFieldGet(this, _fetchTeams).call(this),
                    __classPrivateFieldGet(this, _fetchMatches).call(this),
                    __classPrivateFieldGet(this, _fetchPlayers).call(this),
                    __classPrivateFieldGet(this, _fetchGames).call(this),
                    __classPrivateFieldGet(this, _fetchCalendar).call(this),
                    __classPrivateFieldGet(this, _fetchTrainings).call(this),
                ]);
                return {
                    teamQueryData: teamsData,
                    matchesQueryData: matchesData,
                    playersQueryData: playersData,
                    gamesQueryData: gamesData,
                    eventsData: eventsData,
                    trainingsData: trainingsData,
                };
            }
            catch (err) {
                console.log(err.response.status);
                throw Error("gatsby-source-protrainup: Sorry something went wrong during catching data from PTU");
            }
        });
        this.fetchPTUData = async () => {
            try {
                const startTime = moment_1.default();
                __classPrivateFieldGet(this, _client).defaults.headers.common = {
                    Authorization: `Bearer ${__classPrivateFieldGet(this, _token)}`,
                };
                __classPrivateFieldGet(this, _client).defaults.baseURL = this.apiURL;
                const fetchedData = await __classPrivateFieldGet(this, _fetchAllEndpoints).call(this);
                const duration = moment_1.default.duration(moment_1.default().diff(startTime)).asSeconds();
                __classPrivateFieldGet(this, _reporter).success(`gatsby-source-protrainup: Finished fetching data in: ${duration}s`);
                return await extractors_1.default(fetchedData, __classPrivateFieldGet(this, _client));
            }
            catch (err) {
                console.log(err);
                throw Error(err.message);
            }
        };
        this.apiURL = apiURL;
        __classPrivateFieldSet(this, _reporter, reporter);
        __classPrivateFieldSet(this, _token, "");
        __classPrivateFieldSet(this, _client, axios_1.default.create({ baseURL: this.apiURL }));
        axios_retry_1.default(__classPrivateFieldGet(this, _client), {
            retries: 3,
            shouldResetTimeout: true,
            retryDelay: (retryCount) => {
                __classPrivateFieldGet(this, _reporter).warn(`retry attempt: ${retryCount}`);
                return retryCount * 2000;
            },
            retryCondition: (error) => error.code === "ENOTFOUND" || error.code === "ETIMEDOUT",
        });
    }
}
_token = new WeakMap(), _reporter = new WeakMap(), _client = new WeakMap(), _fetchTeams = new WeakMap(), _fetchMatches = new WeakMap(), _fetchPlayers = new WeakMap(), _fetchGames = new WeakMap(), _fetchCalendar = new WeakMap(), _fetchTrainings = new WeakMap(), _fetchAllEndpoints = new WeakMap();
exports.default = PTUCreator;

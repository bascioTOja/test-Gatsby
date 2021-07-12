import axios, { AxiosResponse, AxiosInstance } from "axios";
import ExtractAll, { MainQueriesExtractorProps } from "./extractors";
import moment from "moment";
import { Reporter } from "gatsby";
import axiosRetry from "axios-retry";
import { QueryTeamProps } from "../types/queries/team";
import { QueryMatchProps } from "../types/queries/match";
import { QueryPlayerProps } from "../types/queries/player";
import { QueryGameProps } from "../types/queries/game";
import { EventProps } from "../types";
import { QueryTrainingProps } from "../types/queries/training";

export type AxiosResultProps = {
  teamQueryData: Array<QueryTeamProps>;
  matchesQueryData: Array<QueryMatchProps>;
  playersQueryData: Array<QueryPlayerProps>;
  gamesQueryData: Array<QueryGameProps>;
  eventsData: Array<EventProps>;
  trainingsData: Array<QueryTrainingProps>;
};

class PTUCreator {
  #token: string;
  #reporter: Reporter;
  #client: AxiosInstance;

  protected apiURL: string;

  constructor(apiURL: string, reporter: Reporter) {
    this.apiURL = apiURL;
    this.#reporter = reporter;
    this.#token = "";
    this.#client = axios.create({ baseURL: this.apiURL });
    axiosRetry(this.#client, {
      retries: 3,
      shouldResetTimeout: true,
      retryDelay: (retryCount) => {
        this.#reporter.warn(`retry attempt: ${retryCount}`);
        return retryCount * 2000;
      },
      retryCondition: (error) =>
        error.code === "ENOTFOUND" || error.code === "ETIMEDOUT",
    });
  }

  init = async (PTULogin: string, PTUPassword: string): Promise<void> => {
    try {
      const { data } = await this.#client.post(`${this.apiURL}/auth/login`, {
        login: PTULogin,
        password: PTUPassword,
      });
      this.#token = data.token;
    } catch (err) {
      console.log(err);
      throw Error("gatsby-source-protrainup: Your authentication went wrong");
    }
  };

  #fetchTeams = async (): Promise<AxiosResponse<Array<QueryTeamProps>>> =>
    this.#client.get<Array<QueryTeamProps>>(
      `${this.apiURL}/diary/teams?_with=annualSeasons,systemClub,members.user.profile,members.season`
    );

  #fetchMatches = async (): Promise<AxiosResponse<Array<QueryMatchProps>>> =>
    this.#client.get<Array<QueryMatchProps>>(
      `${this.apiURL}/diary/matches?_with=participants.stats,matchPlayers.stats,participants.matchTeam.systemClub,events,matchPlayers.player.user,season`
    );

  #fetchPlayers = async (): Promise<AxiosResponse<Array<QueryPlayerProps>>> =>
    this.#client.get<Array<QueryPlayerProps>>(
      `${this.apiURL}/diary/players?_with=user,season&_appends=match_stats_summary`
    );

  #fetchGames = (): Promise<AxiosResponse<Array<QueryGameProps>>> =>
    this.#client.get<Array<QueryGameProps>>(
      `${this.apiURL}/diary/games?_with=season`
    );

  #fetchCalendar = (): Promise<AxiosResponse<Array<EventProps>>> =>
    this.#client.get<Array<EventProps>>(`${this.apiURL}/calendar`, {
      data: {
        from: moment().subtract(1, "years").format("YYYY-MM-DD"),
        to: moment().add(1, "years").format("YYYY-MM-DD"),
      },
    });

  #fetchTrainings = (): Promise<AxiosResponse<Array<QueryTrainingProps>>> =>
    this.#client.get<Array<QueryTrainingProps>>(
      `${this.apiURL}/diary/trainings?_with=staff.user,subFacility`
    );

  #fetchAllEndpoints = async (): Promise<AxiosResultProps> => {
    try {
      const [
        { data: teamsData },
        { data: matchesData },
        { data: playersData },
        { data: gamesData },
        { data: eventsData },
        { data: trainingsData },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] = await axios.all<any>([
        this.#fetchTeams(),
        this.#fetchMatches(),
        this.#fetchPlayers(),
        this.#fetchGames(),
        this.#fetchCalendar(),
        this.#fetchTrainings(),
      ]);

      return {
        teamQueryData: teamsData,
        matchesQueryData: matchesData,
        playersQueryData: playersData,
        gamesQueryData: gamesData,
        eventsData: eventsData,
        trainingsData: trainingsData,
      };
    } catch (err) {
      console.log(err.response.status);
      throw Error(
        "gatsby-source-protrainup: Sorry something went wrong during catching data from PTU"
      );
    }
  };

  // Run every plugin actions right here
  fetchPTUData = async (): Promise<MainQueriesExtractorProps> => {
    try {
      const startTime = moment();
      this.#client.defaults.headers.common = {
        Authorization: `Bearer ${this.#token}`,
      };
      this.#client.defaults.baseURL = this.apiURL;
      const fetchedData = await this.#fetchAllEndpoints();
      const duration = moment.duration(moment().diff(startTime)).asSeconds();
      this.#reporter.success(
        `gatsby-source-protrainup: Finished fetching data in: ${duration}s`
      );

      return await ExtractAll(fetchedData, this.#client);
    } catch (err) {
      console.log(err);
      throw Error(err.message);
    }
  };
}

export default PTUCreator;

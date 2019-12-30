import { AccountResource, LeaderboardResource, StatisticResource, FriendResource } from "resource-api";
import { Token } from "domain-api";

/**
 * Represents the Epic Games API.
 */
export namespace EpicGames {
	export interface Fortnite {
		close(): any
		
		account: AccountResource
		leaderboard: LeaderboardResource
		statistic: StatisticResource
		friend: FriendResource
		session: Token
	}
}
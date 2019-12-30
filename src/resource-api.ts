import { Account, FriendRequest, Platform, PartyType, LeaderboardEntry, FilterableStatic } from "domain-api"

namespace Resource {
    export interface AccountResource {
        FindOneByDisplayName(displayName: string): Account | undefined
        FindOneBySessionAccountId(): Account | undefined
        FindAllByAccountIds(...accountIds: Array<string>): Array<Account> | undefined
    }
    export interface FriendResource {
        FindAllRequestsBySessionAccountId(): Array<FriendRequest> | undefined
        FindAllNonPendingRequestsBySessionAccountId(): Array<FriendRequest> | undefined
        DeleteOneByAccountId(accountId: string): any
        AddOneByAccountId(accountId: string): any
    }
    export interface LeaderboardResource {
        FindHighestWinnersByPlatformAndByPartyTypeForCurrentSeason(platform: Platform, partyType: PartyType, maxEntries: number): Array<LeaderboardEntry> | undefined
    }
    export interface StatisticResource {
        FindAllByAccountIdForAllTime(accountId: string): FilterableStatic | undefined
        FindAllBySeasonAccountIdForAllTime(): FilterableStatic | undefined
        FindAllByAccountIdForCurrentSeason(accountId: String): FilterableStatic | undefined
        FindAllBySessionAccountIdForCurrentSeason(): FilterableStatic | undefined
    }
}

export = Resource
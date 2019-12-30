namespace Domain {

    // ENUMERATIONS
    export enum InputType {
        KEYBOARD_AND_MOUSE = "keyboardmouse",
        GAMEPAD = "gamepad",
        TOUCH = "touch"
    }
    export enum PartyType {
        SOLO = "p2",
        DUO = "p10",
        SQUAD = "p9"
    }
    export enum Platform {
        PC = "pc",
        PS4 = "ps4",
        XB1 = "xb1"
    }
    
    // INTERFACES
    export interface Account {
        AccountId: string
        DisplayName: string
    }
    export interface Statistic {
        Wins: number
        Matches: number
        Kills: number
        Score: number
        TimesPlacedTop10: number
        TimesPlacedTop25: number
        TimesPlacedTop5: number
        TimesPlacedTop12: number
        TimesPlacedTop3: number
        TimesPlacedTop6: number
        TimeLastModified: string
        PlayersOutlived: number
        MinutesPlayed: number
    }
    export interface Token {
        AccessToken: string
        AccessTokenExpirationTime: string
        RefreshToken: string
        RefreshTokenExpirationTime: string
        AccountId: string
    }
    export interface FriendRequest {
        AccountId: string
        Status: string
        Direction: string
        CreatedAt: string
        IsFavorite: boolean
    }
    export interface LeaderboardEntry {
        AccountId:string,
        value:number
    }
    export interface PlatformFilterableStatistic extends Statistic {
        byPlatform(platform: Platform): Statistic
    }
    export interface PartyTypeFilterableStatistic extends Statistic {
        byPartyType(partyType: PartyType): Statistic
    }
    export interface FilterableStatic extends PlatformFilterableStatistic, PartyTypeFilterableStatistic {
        byPartyType(partyType: PartyType): PartyTypeFilterableStatistic
        byPlatform(platform: Platform): PlatformFilterableStatistic
    }
    export interface FilterableStaticV2 extends Statistic {
        byInputTypes(...inputs: InputType[]): FilterableStaticV2
        byModes(...modes: string[]): FilterableStaticV2
    }
}

export = Domain
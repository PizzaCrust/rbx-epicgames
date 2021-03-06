import { HttpService as HS } from "@rbxts/services"
import { Token } from "domain-api"

// device id required!!
let DefaultHeaders: HttpHeaders = { "X-Epic-Device-ID": "" }

export namespace Auth {

    interface TokenResponse {
        accessToken: string
        accessTokenExpiryTime: string
        refreshToken: string
        refreshTokenExpiryTime: string
        accountId: string
    }

    class DefaultToken implements Token {
        AccessToken: string
        AccessTokenExpirationTime: string
        RefreshToken: string
        RefreshTokenExpirationTime: string
        AccountId: string
        
        constructor(response: TokenResponse) {
            this.AccessToken = response.accessToken
            this.AccessTokenExpirationTime = response.accessTokenExpiryTime
            this.RefreshToken = response.refreshToken
            this.RefreshTokenExpirationTime = response.refreshTokenExpiryTime
            this.AccountId = response.accountId
        }

    }

    const AuthEndpoint = "https://account-public-service-prod03.ol.epicgames.com/account/api/oauth"

    function urlEncoded(map: Map<string, string>): string {
        let val = ""
        let first = true
        for (let [key, mapVal] of map) {
            let keyEncoded = HS.UrlEncode(key)
            let valEncoded = HS.UrlEncode(mapVal)
            if (first) {
               val = `${keyEncoded}=${valEncoded}`
               first = false
            } else {
               val = val + `&${keyEncoded}=${valEncoded}`
            }
        }
        return val
    }

    function combineHeaders(header1: HttpHeaders, header2: HttpHeaders): HttpHeaders {
        let headers: HttpHeaders = {}
        let map1 = Object.keys(header1).map( key => header1[key])
        let map2 = Object.keys(header2).map ( key => header2[key])
        for (let [key, val] of map1) {
            headers[key] = val
        }
        for (let [key, val] of map2) {
            headers[key] = val
        }
        return headers
    }

    export function PostForToken(bearerToken: string, value: Map<string, string>): Token | undefined {
        let headers: HttpHeaders = { "Authorization": `basic ${bearerToken}`}
        let response = HS.JSONDecode<TokenResponse>(HS.PostAsync(`${AuthEndpoint}/token`, urlEncoded(value), Enum.HttpContentType.ApplicationUrlEncoded, false, combineHeaders(headers, DefaultHeaders)))
        return new DefaultToken(response)
    }

    export function PasswordGrantedToken(email: string, password: string, token: string): Token | undefined {
        let map = new Map<string, string>()
        map.set("grant_type", "password")
        map.set("username", email)
        map.set("password", password)
        return PostForToken(token, map)
    }

    export function RetireAccessToken(accessToken: string) {
        HS.RequestAsync({
            Url: `${AuthEndpoint}/sessions/kill/${accessToken}`,
            Method: "DELETE", 
            Headers: combineHeaders(DefaultHeaders, { "Authorization": `bearer ${accessToken}` })
        })
    }

}
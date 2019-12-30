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

    const AuthEndpoint = "https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/"

    function urlEncoded(map: Map<string, string>): string {
        let val = ""
        let first = true
        for (let key of map.keys()) {
            let mapVal = map.get(key)!!
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

    export function PostForToken(bearerToken: string, value: Map<string, string>): Token | undefined {
        let headers: HttpHeaders = { "Authorization": `basic ${bearerToken}`}
        let response = HS.JSONDecode<TokenResponse>(HS.PostAsync(`${AuthEndpoint}/token`, urlEncoded(value), Enum.HttpContentType.ApplicationUrlEncoded, false, headers))
        return new DefaultToken(response)
    }
}
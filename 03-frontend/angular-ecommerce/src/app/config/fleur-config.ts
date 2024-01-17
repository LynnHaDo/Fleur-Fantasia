export default {
    oidc: {
        clientId: 'Auth0-client-id',
        apiUrl: 'Auth0-api-url',
        domain: 'Auth0-domain',
        issuer: 'https://{Auth0-domain}/',
        redirectUri: "AWS-web-hosting-link",
        scopes: 'openid profile email read:users read:user_idp_tokens read:current_user',
    }
}

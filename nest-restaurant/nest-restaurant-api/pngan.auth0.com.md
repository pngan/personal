# Auth0.com

This example uses the 'Code Flow' to gain an access token.

This example comes from:
 https://auth0.com/blog/full-stack-typescript-apps-part-1-developing-backend-apis-with-nestjs/

A video that explains the part of the flow:
https://vimeo.com/113604459

## Tenant

#### domain
pngan.auth0.com

#### clientid - the registered application
ttAFdfJ9z1HbYIDmTos2hHbu6Ka7UV9U

#### client secrt
CGRArIrjelcswbvW7FpBDtmwVP0ejSXticQbuICaBkWRTGR54fUc7--WzUMxQ6ca


## Authorization Grant

This is performed in two steps corresponding to the /authorize endpoint and /oauth/token endpoint.

### Perform authentication to /authorize endpoint

The user is prompted to login. The following request asks for an 'authorization code' for long lived access. Alternatively we could have requested an 'id_token' that can be used for authentication, or an access 'token' that can be used immediately.

https://pngan.auth0.com/authorize?audience=http://localhost:3000&scope=SCOPE&response_type=code&client_id=ttAFdfJ9z1HbYIDmTos2hHbu6Ka7UV9U&redirect_uri=http://localhost:4200/login&state=STATE?prompt=none

The application is: Menu angular App. This application is registered as an application belonging to the tenant.

Often the response type is id_token, but in this case we are receiving a code.

#### Admin User 
menuapp.ngan@spamgourmet.com/Password123

#### Normal User
menuapp-user1.ngan@spamgourmet.com/Password123

#### Callback url

The new user is presented with an Auth0 login page. The user should register themselves as a new user. Then login. 

The identity provider then asks the user to provide consent for an application to access a resource on the user's behalf. On giving consent, Auth0 will then call back the application's login page with. The code is the 

http://localhost:4200/login?code=Xt7xY7fx7u4-79cX&state=STATE%3Fprompt%3Dnone



### Perform authorization to /oauth/token endpoint


```
AUTH0_DOMAIN=pngan.auth0.com
AUTH0_CLIENT_ID=ttAFdfJ9z1HbYIDmTos2hHbu6Ka7UV9U
AUTH0_CLIENT_SECRET=CGRArIrjelcswbvW7FpBDtmwVP0ejSXticQbuICaBkWRTGR54fUc7--WzUMxQ6ca
CODE=Xt7xY7fx7u4-79cX

curl -X POST -H 'content-type: application/json' -d '{
  "grant_type": "authorization_code",
  "client_id": "'$AUTH0_CLIENT_ID'",
  "client_secret": "'$AUTH0_CLIENT_SECRET'",
  "code": "'$CODE'",
  "redirect_uri": "http://localhost:4200"
}' https://$AUTH0_DOMAIN/oauth/token
```


#### Returned access token
```
{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqVkNOa1UxUkVOR1JUZEROVU0wUmprMlJEa3pNVVkyUkRBNE9VUkROVGN6T1VOR1FqaEZNUSJ9.eyJodHRwOi8vbG9jYWxob3N0OjMwMDAvcm9sZXMiOlsiYWRtaW4iXSwiaXNzIjoiaHR0cHM6Ly9wbmdhbi5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWJiZDI0OWY1ZTA5MzM0ZDc3OGE4NDZiIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNTM5MTI2NDYzLCJleHAiOjE1MzkyMTI4NjMsImF6cCI6InR0QUZkZko5ejFIYllJRG1Ub3MyaEhidTZLYTdVVjlVIn0.SDhbDuxfF7gtQypbtyP72Bq6m98zcFEKle16T4aVPK_7_mqtNNJz3Iq_NV1EPhjznPH64AVrrBvfidK0KZV5SbL-sbqFoeV9JZzw40ICFatl-vHcLWjiSQRqAqL8uO6LBDjmxlYKsxMlJhDLU4S6LAPG_cPzDoHuLzpWyGxX14vH3hvwr-SYdCR9VU_NvWykBiBDdqsOJ5znEBZwGfpRSMDqr7svrUuvAEgMfAVNZ4HO73PifjSKLLpnfd-RnUtFe7KfpY0gK9JUQzRW3TTiqCOtnyeAksm6e6BVEmB1VYoAI-KIA_feF3GCQMaQcKwdrFw3fwmharhOWB3UbtnWSQ","expires_in":86400,"token_type":"Bearer"}
```
## Create App Rule based on Roles

#### User Email
menuapp.ngan@spamgourmet.com

#### UserId
auth0|5bbd249f5e09334d778a846b


```
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqVkNOa1UxUkVOR1JUZEROVU0wUmprMlJEa3pNVVkyUkRBNE9VUkROVGN6T1VOR1FqaEZNUSJ9.eyJodHRwOi8vbG9jYWxob3N0OjMwMDAvcm9sZXMiOlsiYWRtaW4iXSwiaXNzIjoiaHR0cHM6Ly9wbmdhbi5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWJiZDI0OWY1ZTA5MzM0ZDc3OGE4NDZiIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNTM5MTI2NDYzLCJleHAiOjE1MzkyMTI4NjMsImF6cCI6InR0QUZkZko5ejFIYllJRG1Ub3MyaEhidTZLYTdVVjlVIn0.SDhbDuxfF7gtQypbtyP72Bq6m98zcFEKle16T4aVPK_7_mqtNNJz3Iq_NV1EPhjznPH64AVrrBvfidK0KZV5SbL-sbqFoeV9JZzw40ICFatl-vHcLWjiSQRqAqL8uO6LBDjmxlYKsxMlJhDLU4S6LAPG_cPzDoHuLzpWyGxX14vH3hvwr-SYdCR9VU_NvWykBiBDdqsOJ5znEBZwGfpRSMDqr7svrUuvAEgMfAVNZ4HO73PifjSKLLpnfd-RnUtFe7KfpY0gK9JUQzRW3TTiqCOtnyeAksm6e6BVEmB1VYoAI-KIA_feF3GCQMaQcKwdrFw3fwmharhOWB3UbtnWSQ"

curl -X POST -H 'authorization: Bearer '$TOKEN http://localhost:3000/shopping-cart


```





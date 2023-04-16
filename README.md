# Fanstop
_Share decentralized-yet-private(thanks to IPFS) content with your top fans!_

## What is the private content economy?
There are content creators who want to create very quality content and want only those top fans to access these content who provide direct monetization to them. We are calling the economy around this as the private content economy.

## Problems with the current private content economy?
### Dependency on centralized system
What if the service on which the creator hosted their content goes down? What if the service decides to ban that particular creator for whatever reason? The creator is helpless before such centralized systems!
### High commissions to store content
The centralized services charge a significant portion of the creators' earning as maintenance fee: this leads to lesser income of the creator.
### Not encrypted, prone to leaks
It is not new to hear of news that due to certain vulnerabilities in the centralized system, the content got leaked. On top of it, they rarely care to encrypt the data and then store it.

## Solution: Enters Fanstop 😎
Fanstop is a decentralized-yet-private content sharing platform for creators where they can:
1. Store content on IPFS(so decentralized)
2. Remain worry-free because their content are first encrypted and then stored on IPFS
3. Token-gate their content; so only that fan who possesses a certain NFT can truly access the data (Of course, the NFT would be provided/auctioned by the creator and it would be a guarantee of access to their private content!)
4. **With [Chainsafe](https://chainsafe.io/), 20GB content could be hosted for free!**

### High-level positive flow:
- User has the correct NFT in their wallet.
- User goes to [app][Demo App] and connects his wallet.
- Voila! He is able to view the content!

### High-level negative flow (A):
- User goes to the app but does not connect his wallet and tries to view the content.
- Oops! He is unable to view the content!

### High-level negative flow (B):
- User has a random NFT in their wallet.
- User goes to [app][Demo App] and connects his wallet.
- Oops! He is unable to view the content!

### Technical flow (positive)
- User has the correct NFT in their wallet.
- User goes to [app][Demo App] and connects his wallet.
- They sign a nonce and frontend sends a payload containing the nonce, signature and wallet public address to the backend.
- Backend finds the signature to be valid. It also finds that the wallet public address does contain the correct NFT.
- It generates an access token and sends it to frontend.
- Frontend piggybacks this access token on the request to the backend server that enables the user to view the private content.
- Backend server sees that the frontend is trying to access the private content. It checks if the access token is valid and finds it to be valid.
- Backend server fetches the encrypted content from IPFS, decrypts it using its secret key and sends the decrypted content to the frontend.
- Voila! The user is able to view the content!
- (Note that the creator uploads content to IPFS via the [admin interface][Demo App Admin]. The admin interface sends the content to the backend where it is first encrypted by the backend's secret key and then the encrypted content is uploaded to IPFS.)

### Technical flow (negative)
- In any negative flow, the user won't be having a valid access token. The flow stops here itself and the content is never fetched.

## What is in this repository?
This repository contains 3 sub-projects:
1. [Backend service][Demo Backend]
2. [Frontend][Demo App] for fans.
3. [A simple admin interface][Demo App Admin] for the creator to encrypt-and-upload new content to IPFS. 

The app is based on Jakartanet and the related FA2 smart contract is deployed [here][Demo FA2 Contract] (Contract address: KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY on Jakartanet)
The smart contract is in the `smart-contracts` directory.

## [Data Dao Hackathon 2022][Data Dao Hackathon]
This project is developed as part of the [Data Dao Hackathon][Data Dao Hackathon]. If you are a panelist/judge/reviewer, please check out the following steps.

### For the panelists/judges/reviewers of Data Dao Hackathon 2022
The demo video is here: https://www.youtube.com/watch?v=aCtSajvr0LQ

The app is deployed at https://fanstop-frontend.vercel.app/

The app uses [Chainsafe](https://chainsafe.io/) and its APIs for decentralized storage on IPFS.

The app is based on Jakartanet and the related FA2 smart contract is deployed [here][Demo FA2 Contract] (Contract address: KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY)

<ins><b>Checking happy path:</b></ins>

If you want to interact with the app, you would need a [Temple wallet][Temple wallet] which has [the 'Fanstop' FA2 token][Demo FA2 Contract] (as told in the [demo video][Demo Video]). Here is a list of wallets which contain the [the 'Fanstop' FA2 tokens][Demo FA2 Contract]:
| Public address | Private key |
| ------ | ------ |
| tz1XQQ6a3SdYaarUFFjo5DZq18RSeqTrdaew | edskS66ZbqHyZWuRAk2Js1veaK6h1vju6DoZwMAuxkMP37LgVjXJH8wm7cWCTZiazWaaPG8rDXq4h9v2G8hJUtvx5V38vgiXVi |
| tz1gYnLf4DL6M4kb4dc5cm778bKFJrMCDoHv | edskRqKtAEHfzsL5G8vahwCo1u1De6kNPC5gGv8PU9Rd9nbi6nxkssUCG7HvEBDPVrMy45oVYxG698smijqMqTfZC5vceEAcHV |

The following wallet is also the administrator for [our FA2 smart contract][Demo FA2 Contract]. So, you could also mint new tokens to your desirable wallet and then check the happy path for the app by connecting that wallet.
| Public address | Private key |
| ------ | ------ |
| tz1XQQ6a3SdYaarUFFjo5DZq18RSeqTrdaew | edskS66ZbqHyZWuRAk2Js1veaK6h1vju6DoZwMAuxkMP37LgVjXJH8wm7cWCTZiazWaaPG8rDXq4h9v2G8hJUtvx5V38vgiXVi |

<ins><b>Checking unhappy path</b></ins>

To check the unhappy path, you could just use any random wallet to connect to the app.

<ins><b>Interacting on Admin interface</b></ins>

If you want to upload new content, you can use [the admin interface][Demo App Admin]. You can use any username/password in the browser prompt to remove it and move forward. For testing purpose, it would be a good idea to upload a small file 😅

<ins><b>Interacting with Chainsafe storage used in this demo app</b></ins>

If you want to interact with the Chainsafe storage which is being used in this demo app, you can do via their APIs. Following are the keys that you might need:

- CHAINSAFE_KEY_ID=OYWNOGUSZNWMPGUSQQUI
-  CHAINSAFE_KEY_SECRET=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjI4ODA2NDAsImNuZiI6eyJqa3UiOiIvY2VydHMiLCJraWQiOiI5aHE4bnlVUWdMb29ER2l6VnI5SEJtOFIxVEwxS0JKSFlNRUtTRXh4eGtLcCJ9LCJ0eXBlIjoiYXBpX3NlY3JldCIsImlkIjo4NjA2LCJ1dWlkIjoiM2M1NmYzMjEtYTk5Yi00MzA0LWFlNzEtNzJjNjU0MWM0Y2VhIiwicGVybSI6eyJiaWxsaW5nIjoiKiIsInNlYXJjaCI6IioiLCJzdG9yYWdlIjoiKiIsInVzZXIiOiIqIn0sImFwaV9rZXkiOiJPWVdOT0dVU1pOV01QR1VTUVFVSSIsInNlcnZpY2UiOiJzdG9yYWdlIn0.IDNCAGlNIvtr5T5NnL0IK8VVLXh1WLqvMPupvBWL0HPW2rikuKmURK2zW-tjCz5DDrFaXJlx6dkVhV-4lCsYhg
- CHAINSAFE_BUCKET_URL=https://api.chainsafe.io/api/v1/bucket/12110635-9fce-419a-83ef-4f843965abbc

<ins><b> App testing </b></ins>
The [poc app][Demo App] runs fine on the following platforms:
| Browser | Version | Works in incognito mode too? | Comments |
| ------ | ------ | ------ | ------ |
| Chrome | Version 104.0.5112.81 (Official Build) (64-bit) | ❌ | Chrome tightens on CORS in the incognito mode. This poc app uses different domains to host [frontend][Demo App] and [backend][Demo Backend] and Chrome's incognito mode is not happy about this 😔 |
| Brave | Version 1.42.88 Chromium: 104.0.5112.81 (Official Build) (x86_64) | ✔️ |  |
| Firefox | Version 103.0.2 (64-bit)  | ✔️ |  |
| Edge | Version 104.0.1293.47 (Official build) (64-bit) | ✔️ |  |

You could also choose to run your own instance of the backend and the frontend. You would find the instructions in the respective README files:
- [Running Backend][README Backend]
- [Running Frontend][README Frontend]


[Data Dao Hackathon]: <https://fil-toronto.com/hackathon/>
[README Frontend]: <../main/frontend/README.md>
[README Backend]: <../main/backend/README.md>
[Demo Video]: <https://www.youtube.com/watch?v=aCtSajvr0LQ>
[Demo App]: <https://fanstop-frontend.vercel.app/>
[Demo App Admin]: <https://fanstop-frontend.vercel.app/admin>
[Demo Backend]: <https://fanstop-datadao.herokuapp.com/>
[Demo FA2 Contract]: <https://better-call.dev/jakartanet/KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY/operations>
[Temple wallet]: <https://templewallet.com/>

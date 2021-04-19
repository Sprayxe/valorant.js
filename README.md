# valorant.js
## An API Wrapper for valorant with oauth support
### Warning: Currently in development!

## Example
```js
(async () => {
  const { RiotApiClient, Region } = require("valorant.js");
  
  try {
    const client = new Valorant.Client({
      username: "MY_USERNAME", // your username
      password: "MY_PASSWORD", // your password
      region: Region.MY_REGION, // Available regions: EU, NA, AP
    });
    
    await client.login();
    console.log(client.user);
    
    const balance = await client.userApi.getWallet();
    console.log(balance);
  } catch(err) {
    console.error(err);
  }
})();
```

## Support
* Report Issues/Bugs [here](https://github.com/Sprayxe/valorant.js/issues)
* Join [Discord](https://discord.gg/q37Dfyn) - Ask in #general
* Read [Documentation](https://valorant-js.stoplight.io/docs/valorant-js/docs/Home.md) (OUTDATED, soon)

## Installation
```npm install valorant.js --save```


## Credits
* [Sprayxe](https://twitter.com/Sprayxe_) `@MarcelWRLD#0999`
* [Speeedyyyy](https://twitter.com/Speeedyyyytv) `@Speeedyyyy#6932`
* [RumbleMike](https://twitter.com/RumbleMikee) `@RumbleMike#5406` (API Documentation)
* A small credit in your project would be appreciated (e.g mentioning lib name would be enough)

## Dependencies
* [Axios](https://www.npmjs.com/package/axios)
* [TypeScript](https://www.npmjs.com/package/typescript)
* [QueryString](https://www.npmjs.com/package/querystring)


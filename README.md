# valorant.js
## An API Wrapper for valorant with oauth support
### Warning: Currently in development!

## Example
```js
(async () => {
  
  const Valorant = require("valorant.js");
  
  try {
  
    const client = new Valorant.Client({
      username: "MY_USERNAME", // your username
      password: "MY_PASSWORD", // your password
      region: Valorant.region.MY_REGION, // Available regions: eu, na, ap
      debug: true // wether you want more console output or not
    });
    
    const account_data = await client.login();
    console.log(account_data);
    
    const balance = await client.getWallet();
    console.log(balance);
    
  } catch(err) {
    console.error(err);
  };
  
})();
```

## Support
* Report Issues/Bugs [here](https://github.com/Sprayxe/valorant.js/issues)
* Join [Discord](https://discord.gg/q37Dfyn) - Ask in #general
* Read [Documentation](https://valorant-js.stoplight.io/docs/valorant-js/docs/Home.md)

## Installation
```npm install valorant.js --save```


## Credits
* [Sprayxe](https://twitter.com/Sprayxe_) `@Sprayxe#0742`
* [Speeedyyyy](https://twitter.com/Speeedyyyytv) `@Speeedyyyy#2367`
* [RumbleMike](https://twitter.com/RumbleMikee) `@RumbleMike#5406` (API Documentation)
* A small credit in your project would be appreciated (e.g mentioning lib name would be enough)

## Dependencies
* [Axios](https://www.npmjs.com/package/axios)
* [Colors](https://www.npmjs.com/package/colors)


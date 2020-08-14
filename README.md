# valorant.js
## An API Wrapper for valorant with oauth support
### Warning: This lib is currently in development. Some bugs can occur!

## V1.0.5
In v1.0.5 Oauth has been added and is now available! For now you can only get the user's wallet.\
Don't worry, more is coming soon! Just come back here at a later date and check.

## Support
* Report Issues/Bugs [here](https://github.com/Sprayxe/valorant.js/issues)
* Join [Discord](https://discord.gg/q37Dfyn) - Ask in #general

## Installation
```npm install valorant.js --save```

## Example 
<> = Replace with your value (remove <>)\
Regarding `region`: Choose between `eu` (europe), `na` (north america) and `ap` (asian pacific).\
So:\
europe would be: `Valorant.region.eu`\
north america would be: `Valorant.region.na`\
asia pacific would be: `Valorant.region.ap`\
</br>

```js
(async () => {
  try {

    const Valorant = require("valorant.js");
  
    const valorant = new Valorant.Client({
      username: "<YOUR_USERNAME>",
      password: "<YOUR_PASSWORD>",
      region: Valorant.region.<YOUR_REGION>
    });

    await valorant.login();
    const balance = await valorant.getWallet();
    console.log(balance);

  } catch(err) {
    console.error(err)
  }
})();
```

### Credit
* [Sprayxe](https://twitter.com/Sprayxe_) `@Sprayxe#0742`
* [Speeedyyyy](https://twitter.com/Speeedyyyytv) `@Speeedyyyy#2367`
* [RumbleMike](https://twitter.com/RumbleMikee) `@RumbleMike#5406`
* A small credit in your project would be appreciated (e.g mentioning lib name would be enough)

### Dependencies
* [Axios](https://www.npmjs.com/package/axios)
* [Colors](https://www.npmjs.com/package/colors)


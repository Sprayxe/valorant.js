# Get Started

## Information
In this page, we are going to create our first code which logins and gets the user's wallet.\
We are trying to make this as easy and detailed as possible!\
Incase you do not understand something or need help, join our [Discord](https://discord.gg/q37Dfyn) !

## Prerequisites

* You have [Node.js](https://nodejs.org/) installed
* You set up your workspace folder using `npm init`
* You have atleast a bit of coding knowledge

## Installation
To install the library/module run:\
`npm install valorant.js --save`

## Lets Begin!
When you installed the lib and setup your workspace we can start coding.\
</br>

### Step 1 - Setting up File:
Add this to your created file:
```js
(async () => {
  try {
    
  } catch(err) => {
    console.error(err);
  }:
})();
```
The library is asynchronous, therefore you will need this to use `await` .\
`try {..}catch(err){...}` will catch all your errors, so your application does not crash.
</br>

### Step 2 - Importing library:
Now since your basic stuff is set up, lets import the lib, add to your code:
```js
const Valorant = require("valorant.js");
```
`require` imports everything the library contains into your file, so you can use it's functions and properties.
</br>

### Step 3 - Logging in:
Now we get onto the fun and most important stuff, the login part. Since you required the library, you can make use of it's [Client Constructor](https://valorant-js.stoplight.io/docs/valorant-js/docs/client/Constructor.md).\
What it does: It basically creates a "session" from which you can get data about the account and perform actions.\
Lets create a session, add the following to your code:
```js
  const client = new Valorant.Client({
    username: "<YOUR-USERNAME>",
    password: "<YOUR-PASSWORD>",
    region: Valorant.region.<YOUR-REGION>,
    debug: true
  });
    
  const account_data = await client.login();
  console.log(account_data);
  //example res: { id: "69", displayName: "kek", tagLine: "#0420", balance: {} }
```
(In the login, `balance` is always empty, see step 4, this will fill `balance` automatically)\
</br>
Replace stuff in `<>` with your value! (REMOVE `<>` THOUGH)\
Warning: When choosing your account region, you can choose between `eu`, `na` and `ap` . For this you MUST use the lib's enums.
* `Europe` would be => `region: Valorant.region.eu`
* `North America` would be => `region: Valorant.region.na`
* `Asia Pacific` would be => `region: Valorant.region.ap`
</br>

### Step 4 - Getting user's wallet:
Since you logged in, we can now get the user's wallet.
The library has a function/method for that, called `getWallet()`. It returns an object with properties which values are numbers.
Add the following to your code:
```js
  const balance = await client.getWallet();
  console.log(balance);
  // example result: { Valorant_Points: 0, Radianite_Points: 0 }
```

### Finish
Now you're basic code is finished! It should look like:
```js
(async () => {
  
  const Valorant = require("valorant.js");
  
  try {
  
    const client = new Valorant.Client({
      username: "<YOUR-USERNAME>",
      password: "<YOUR-PASSWORD>",
      region: Valorant.region.<YOUR-REGION>,
      debug: true
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
Have fun! If you need help, join our [Discord](https://discord.gg/q37Dfyn) .


# Constructor
```js
const client = new Valorant.Client({
   password: string,
   username: string,
   region: object,
   debug: boolean
});
```
* `password` - Your account password
* `username` - Your account username
* `region` - Your account region (eu, na, ap)*¹
* `debug` - Set true if you want more console logging (standard: false)

### *¹ Use valorant.js region enums:
 * Europe: `Valorant.region.eu`
 * North America: `Valorant.region.na`
 * Asian Pacific: `Valorant.region.ap`

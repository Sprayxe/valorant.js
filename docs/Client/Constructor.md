# Constructor
Creates a client instance with the provided account credentials

```js
const client = new Valorant.Client({
   password: string,
   username: string,
   region: object,
   debug: boolean
});
```

### Properties
* `password` - Your account password
* `username` - Your account username
* `region` - Your account region (eu, na, ap)*¹
* `debug` - Set true if you want more console logging (standard: false)

### Returns
* Typeof `object`

### *¹ Use valorant.js region enums:
 * Europe: `Valorant.region.eu`
 * North America: `Valorant.region.na`
 * Asian Pacific: `Valorant.region.ap`

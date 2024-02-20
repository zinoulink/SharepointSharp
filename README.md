# SharepointSharp

[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/aymkdn/SharepointSharp.svg)](http://isitmaintained.com/project/aymkdn/SharepointSharp "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/aymkdn/SharepointSharp.svg)](http://isitmaintained.com/project/aymkdn/SharepointSharp "Percentage of issues still open")
[![](https://data.jsdelivr.com/v1/package/npm/SharepointSharp/badge)](https://www.jsdelivr.com/package/npm/SharepointSharp)

SharepointSharp ($SP) is a JavaScript library which offers some extended features for SharePoint entirely on client side (requires no server install). $SP will simplify your interactions with Sharepoint.

## Documentation

Browse the [online documentation here](https://aymkdn.github.io/SharepointSharp/).

## Quick Start

### Node Environment

```sh
npm install SharepointSharp
```

Then:
```javascript
import $SP from 'SharepointSharp'
```

Please, make sure to read [the documentation](https://aymkdn.github.io/SharepointSharp/) to optimize your bundle size.

### Browser Only

To directly use it in a browser:
```html
  <script type="text/javascript" src="//cdn.jsdelivr.net/npm/SharepointSharp/browser/SharepointSharp.js"></script>
```

## Usage / Examples

Update all items with an "Amount" value bigger than 1000:

```javascript
$SP().list('My List Name').update({
  Title:"Too expensive"
}, {
  where:"Amount > 1000"
})
.then(function(res) {
  alert(res.passed.length+" items successfully updated!");
});
```

Get all items with "Requestor" as the current user and with "Default Color" is "pink":

```javascript
$SP().list('ListName').get({
  fields:"Title,Size",
  where:"Requestor = '[Me]' AND Default_x0020_Color = 'pink'",
  orderby:"Size DESC",
  json:true
})
.then(function(data) {
  data.forEach(function(d) {
    console.log("Model = "+d.Title+" (size: "+d.size+")";
  })
});
```

## More information

Please visit the [online documentation](https://aymkdn.github.io/SharepointSharp/) to know more.

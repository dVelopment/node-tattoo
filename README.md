# node-tattoo
Node.js app for displaying text in a very basic, graphic 2-bit encoding.

## Usage

1. clone repo
2. install dependencies `npm install`
3. run `npm start`
4. open browser at [http://localhost:3000](http://localhost:3000)

To render custom texts, just use the query parameter `text`. Either as scalar value or as array. Examples:

* `http://localhost:3000?text=some+text`
* `http://localhost:3000?text[]=some+text&text[]=some+more+text&text[]=even+more+text`

## Modes

There are two modes:

* 7bit (default), which will display the texts in a 7bit ASCII code (using a smaller 1bit-icon on the beginning of each character)
* 8bit – displays text in 8bit ASCII code (prefixing every character with an additional 0 to get to 8 bits)

You can select a mode via GET param `mode`: `http://localhost:3000?mode=8bit`

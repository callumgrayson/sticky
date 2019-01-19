# Gluey Jots
Simple notes app using local storage to save notes across sessions.

Notes can be searched for by title.

## Installation
In your terminal:
1. `git clone https://github.com/callumgrayson/sticky.git`
2. `cd sticky`
3. `npm i`

## Development
In **`src`** open **`index.html`** with your editor's live server to see 'changes on save' as you develop your project. 
- Edit the **`index.html`** file in place.
- If you rename any folders the build will not work unless you also change the relevant names in the **`gulpfile.js`** file.

## Build
- Run **`gulp`** in your terminal. Gulp will transpile, autoprefix and minify your css and javascript files in the **`docs`** folder.
- In the **`docs`** folder, in **`index.html`** add **`.min`** to both tags: 
```html
<link rel="stylesheet" href="./main.min.css">
<script src="./app.min.js"></script>
```
- Upload/deploy the contents of the **`docs`** folder to your site.

See [sticky](https://callumgrayson.github.io/sticky/ "Sticky App") for app demo.


# Day Dream Interfaces

A cheesy screensaver that mimcs the cheesy screens in movies.

![Day Dream Interfaces preview](https://www.dropbox.com/s/cz5zbk95fafdvyo/Capture%20d%27%C3%A9cran%202015-05-22%2018.09.21.png?dl=1)


It is a work in progress, more cheesy modules will come !

It's also not yet a screensaver _per se_, it's a web app. To use it as a screen saver, follow the "instalation" steps below.

Later I plan to bundle it as an actual screensaver.


## Instalation

1. Get a screensaver that can display web pages:
	* For Mac OS: https://github.com/liquidx/webviewscreensaver
2. Clone this repo
3. Run `bower install`
4. Go to the screensaver options and set the url to where index.html is located on your machine. (ie. `file:///Users/foo/Documents/day-dream-interfaces/index.html`)


## Contribute

For developement you need to run `npm install` first.


It's very easy to add you own module, basically you need to:

* Create a new file in `js/modules/` (copy the very simple `FillCharacters.js` as a boilerplate)
* Include it in `template/index.html`

The API to register a module is very simple:

```js
window.DDI.registerModule(Module, suitableShapes, maxUsable);
```

* `Module` is a `function` (your module)
* `suitableShapes` is an `array` describing in which kind of shapes your module can be included. Possible values are:
	* `flat`
	* `tall`
	* `square-small`
	* `square-large`
* `maxUsable` is optional. It's an `Integer` saying how many times this module can be included at most

The app will create `new` instance(s) of your module and call `.start()` to start it.


If your module needs files, put it in `js/modules/<NameOfYourModule>_files/`.

There is a grunt task to build `index.html`, (`CodeScroll` is using it to include some string) execute the grunt task by running `grunt build`

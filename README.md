## Website Performance Optimization portfolio project

### Getting started

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights.
### Methodology

####Part 1: Optimize PageSpeed Insights score for index.html

**Optimize images**
1. Use GIMP to resize images. For example, thumbnails are with width 100px.
1. Use gulp-imagemin to optimize images and save to `dist` folder.

**Avoiding Rendering Blocking CSS**
1. Inlining CSS
1. Use Web Font Loader library to asynchronously load google web font.
1. Use stylesheet with media query, for example `media="print"`

**Optimizing JavaScript**
1. Make Google Analytics asynchronous
2. Use gulp-uglify to minify views/js/main.js

####Part 2: Optimize Frames per Second in pizza.html

**Stop Forced Synchronous Layout**
```
// Move querySelector of for loop
var randomPizzas = document.querySelectorAll(".randomPizzaContainer");
for (var i = 0; i < randomPizzas.length; i++) {
  randomPizzas[i].style.width = newWidth + "%";
}
```
```
function updatePositions() {
  frame++;
  // Read layout property outside for loop
  var constant = document.body.scrollTop / 1250;
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin(constant + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
}
```

**Generate reasonable amount of elements**
```
document.addEventListener('DOMContentLoaded', function() {
  // Calculate maximum number of background pizzas using screen.width and screen.height
  var s = 256;
  var cols = screen.width/256 + 1;
  var noOfPizzas = (cols + 1)* Math.ceil(screen.height/s) + 1;
  // Move querySelector of for loop
  var movingPizzas1 = document.querySelector("#movingPizzas1");
  for (var i = 0; i < noOfPizzas; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "dist/images/bgpizza.png";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    movingPizzas1.appendChild(elem);
  }
  // Save the collections of DOM nodes to items
  items = document.querySelectorAll('.mover');
  updatePositions();
});
```

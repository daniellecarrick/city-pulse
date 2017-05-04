// init Isotope
var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});

msnry.layout();
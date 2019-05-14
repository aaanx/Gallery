const imgService = new ImageService();

////////// Load images data, display ten first images and page loader
document.addEventListener('DOMContentLoaded', function() {
      req=new XMLHttpRequest();
      req.open("GET",'http://www.splashbase.co/api/v1/images/search?query=tree',true);
      req.send();
      req.onload=function(){
        json=JSON.parse(req.responseText);
        imgService.loadData(json.images);

        displayMoreImages();
        showLoader();
      };
  });

////////// Display ten images
function displayMoreImages() {
  setTimeout(function(){
    let nextTen = imgService.getNextTenImages();

    if (nextTen.length === 0) {
       alert('There is no more photos to load');
       hideBtnLoader();
       return;
    }; 

    nextTen.forEach(function(val, index) {
      let img = imgService.buildImage(val, index);
      document.querySelector('.gallery_container').innerHTML += img;
    });
  }, 1500)
};

////////// Display filtered images by category
function filterImages(category) {
   document.querySelector('.gallery_container').innerHTML = '';

    imgService.getFilteredImages(category).forEach(function(val, index) {
      let img = imgService.buildImage(val, index);
      document.querySelector('.gallery_container').innerHTML += img;
    });
};

////////// Display page and button loader
let loadedImagesAmount = 0;
function imageLoaded() {
  loadedImagesAmount++;
  if (loadedImagesAmount >= document.querySelectorAll('img').length) {
      hideLoader();
      hideBtnLoader();
  }
};

function hideLoader() {
  setTimeout(function(){
    document.querySelector('.loader_container').style.display = 'none';
    document.querySelector('.gallery_container').style.display = 'grid';
    document.querySelector('.btn_section').style.display = 'block';
  }, 1500);
};

function showLoader() {
  document.querySelector('.loader_container').style.display = 'block';
  document.querySelector('.gallery_container').style.display = 'none';
  document.querySelector('.btn_section').style.display = 'none';
};

function showBtnLoader() {
  document.querySelector('.showmore_btn').innerHTML = '<img class="imgs_loader" src="svg/btn-loader.svg" alt="Images loading">';
  document.querySelector('.imgs_loader').style.display = 'block';
};

function hideBtnLoader() {
  setTimeout(function() {
    document.querySelector('.showmore_btn').innerHTML = 'Show more';
    document.querySelector('.imgs_loader').style.display = 'none';
  }, 1000);
};

////////// Hover effect on image
function showCategory(el) {
  el.querySelector('div').style.display = 'flex';
};

function hideCategory(el) {
  el.querySelector('div').style.display = 'none';
};

////////// Zoom effect on image
function zoomImage(el) {
  document.querySelector('.zoom_container').style.display = 'block';
  document.querySelector('.zoom_img').setAttribute('src', el.lastChild.currentSrc);
  document.querySelector('.close_btn').onclick = function() {
    document.querySelector('.zoom_container').style.display = 'none';
    document.querySelector('.zoom_img').removeAttribute('src');
  };
};


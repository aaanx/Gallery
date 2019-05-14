const IMAGE_CONTAINER_HTML = '<figure onmouseover="showCategory(this)" onmouseout="hideCategory(this)" onclick="zoomImage(this)" class="gallery__item gallery__item--{index}"><div class="img_category"><span class="img_category-text">#{category_id}</span></div><img src="{src}" class="gallery__img" onload="imageLoaded()"/></figure>';

function ImageService() {

};

ImageService.prototype.loadData = function(jsonData) {
	this.jsonData = jsonData;
	this.index = 0;
};

ImageService.prototype.getNextTenImages = function() {
	let nextIndex = this.index + 10;

	if (nextIndex >= this.jsonData.length) {
		nextIndex = this.jsonData.length;
	};

	if (this.index === nextIndex) {
		return [];
	};

	let tenImages = this.jsonData.slice(this.index, nextIndex);
	this.index = nextIndex;

	return tenImages;
};

ImageService.prototype.buildImage = function(imgData, index) {
	
	return IMAGE_CONTAINER_HTML.replace('{index}',index % 10).replace('{category_id}', imgData.site).replace('{src}', imgData.url);
};

ImageService.prototype.getFilteredImages = function(category) {
	const filteredImages = [];

	for (let i=0; i < this.index; i++) {

		let imgData = this.jsonData[i];

		if (imgData.site === category || category === 'all') {
			filteredImages.push(imgData);
		};	
	};

	return filteredImages;
};
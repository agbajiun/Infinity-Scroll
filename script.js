const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 5;
const apiKey = 'bWoFjQf0hSZxhstHp-OcEocolNSZu83u7dIs0R9BT64';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
//Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//Create element for links & Photos, Add to DOM
function displayPhotos(array) {
    imagesLoaded = 0;
    totalImages = array.length;
    console.log("total images", totalImages);
    //Run function for each object in photosArray
    array.forEach((photo) => {
        //create and a tag to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put image inside the a tag, then put both inside imageContainer element
        item.appendChild(img);
        
        imageContainer.appendChild(item);
    });
}

//Get photos from Unspalsh API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const photosArray = await response.json();
        displayPhotos(photosArray);
    } catch (error) {
        //Catch error here
    }
}

//Check to see if scrolling near bottom of page, Load More photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//On load
getPhotos();
//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(){
	//clear the existing content in the output div
	output.innerHTML = '';

	//create an array of promises to download the images
	const imagePromises = images.map((image)=>{
		return new Promise((resolve, reject)=>{
			const imageElement = new Image()
			imageElement.onload = ()=> resolve(imageElement)
			imageElement.onerror = ()=> reject(new Error(`Failed to load images's URL: $(image.url)`))
			imageElement.src = image.url
		})
	})

	//use promise.all to download images in parallel

	Promise.all(imagePromises).then((images)=>{
		images.forEach((img)=>{
			output.appendChild(img)
		})
	}).catch((error)=>{
		output.textContent = error.message
	})
	
}

btn.addEventListener("click", downloadImage)

















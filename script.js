const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImages() {
  // Clear the existing content in the output div
  output.innerHTML = '';

  // Create an array of promises to download the images
  const imagePromises = images.map((image) => {
    return new Promise((resolve, reject) => {
      const imgElement = new Image();
      imgElement.onload = () => resolve(imgElement);
      imgElement.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
      imgElement.src = image.url;
    });
  });

  // Use Promise.all to download images in parallel
  Promise.all(imagePromises)
    .then((images) => {
      images.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      output.textContent = error.message;
    });
}

btn.addEventListener("click", downloadImages);

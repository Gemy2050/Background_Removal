let fileInput = document.querySelector("#file");
let startBtn = document.querySelector(".start");
let uploadBtn = document.querySelector(".upload");
let downloadBtn = document.querySelector(".download");

let uploadTab = document.querySelector(".upload-tab");
let displayTab = document.querySelector(".ready-tab");
let loadingTab = document.querySelector(".loading-tab");
let downloadTab = document.querySelector(".download-tab");

let imgBefore = document.querySelector(".img-before");
let imgAfter = document.querySelector(".img-after");

const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_Key = "djWWLrN8c35aFViDPimuettk";

let fileReader = new FileReader();
let formData = new FormData();


function setActive(tab) {
  [uploadTab, displayTab, loadingTab, downloadTab].forEach((tab) => {
    tab.style.display='none';
  })
  tab.style.display = "block";
}
setActive(uploadTab);

fileInput.onchange = function() {
  
  fileReader.readAsDataURL(fileInput.files[0]);
  fileReader.onload = ()=> {
    imgBefore.src = fileReader.result;
    formData.append('image_file', fileInput.files[0]);
    setActive(displayTab);
  }
}

startBtn.onclick = function() {
  setActive(loadingTab);
  fetch(API_URL, {
    method: "POST",
    headers: {
      "X-Api-Key": API_Key
    },
    body: formData,
  }).then((res) => res.blob())  // blob => For Files
  .then((file) =>{
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=> {
      imgAfter.src = fileReader.result;
      downloadBtn.href = fileReader.result;
      setActive(downloadTab);
    }
  })
}

uploadBtn.onclick = function() {
  location.reload()
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("find-me").addEventListener("click", geoFindMe);
  document.getElementById("shareBtn").addEventListener("click", share);


})

var googleURL = "";

function geoFindMe() {
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  const iframe = document.querySelector('#iframe');

  mapLink.href = '';
  mapLink.textContent = '';


  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`
    iframe.classList.remove("d-none")

    googleURL = `https://maps.google.com/?q=${latitude},${longitude}`;
  }


  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`
    iframe.classList.remove("d-none")
  }

}


function share() {
  const shareData = {
    title: 'MDN',
    text: 'Learn web development on MDN!',
    url: googleURL
  }

  const btn = document.querySelector('#shareBtn');
  //const resultPara = document.querySelector('.result');

  // Share must be triggered by "user activation"
  btn.addEventListener('click', async () => {
    try {
      await navigator.share(shareData);
      resultPara.textContent = 'MDN shared successfully';
    } catch (err) {
      resultPara.textContent = `Error: ${err}`;
    }
  });
}
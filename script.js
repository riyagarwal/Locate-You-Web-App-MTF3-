const TOKEN = "65533222610545";
async function fetchIP() {
  // Fetching IP
  $.getJSON("https://api.ipify.org?format=json", function (data) {
    console.log(data); //json object
    document.getElementById("ip").textContent = data.ip;
  });
}

//   Making API call
async function apiCall() {
  try{
  document.getElementById("btn").style.display = "none";
  document.getElementById("page2").style.display = "block";
  const IP = document.getElementById("ip").textContent;
  const BASE_URL = `https://ipinfo.io/${IP}/json?token=${TOKEN}`;
  const res = await fetch(BASE_URL);
  const data = await res.json();

  console.log(data);

  //   Storing data
  const [latitude, longitude] = data.loc.split(",");
  const city = data.city;
  const region = data.region;
  const timeZone = data.timezone;
  const org = data.org;
  const pincode = data.postal;
  //   console.log(latitude);
  //   console.log(longitude);

  // Rendering location details on screen
  document.getElementById("lat").innerText = `Latitude: ${latitude}`;
  document.getElementById("long").innerText = `Longitude: ${longitude}`;
  document.getElementById("city").innerText = `City: ${city}`;
  document.getElementById("region").innerText = `Region: ${region}`;
  document.getElementById("org").innerText = `Organization: ${org}`;
  document.getElementById("timezone").innerText = `Time Zone: ${timeZone}`;
  document.getElementById("postal").innerText = `Time Zone: ${pincode}`;
  // document.getElementById("dateTime").innerText = `Time Zone: ${}`;


  // Setting Map
  document.getElementById(
    "map"
  ).src = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed" width="360" height="270" frameborder="0" style="border:0`;

  // Post Office API
  const request_url = `https://api.postalpincode.in/pincode/${pincode}`;
  const postalRes = await fetch(request_url);
  const postalData = await postalRes.json();
  console.log(postalData);
  createPostOfficeUI(postalData);
  }
  catch(error) {
    console.log(error);
  }
}

function createPostOfficeUI(postalData) {
  const numMessage = postalData[0].Message;
  document.getElementById('noOfPincode').innerText = numMessage;

}

document.addEventListener("DOMContentLoaded", fetchIP);

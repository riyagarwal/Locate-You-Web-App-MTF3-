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
  try {
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

    // calculating date and time
    const dateTime = new Date().toLocaleString("en-US", {
      timeZone: `${timeZone}`,
    });

    // Rendering location details on screen
    document.getElementById("lat").innerText = `Latitude: ${latitude}`;
    document.getElementById("long").innerText = `Longitude: ${longitude}`;
    document.getElementById("city").innerText = `City: ${city}`;
    document.getElementById("region").innerText = `Region: ${region}`;
    document.getElementById("org").innerText = `Organization: ${org}`;
    document.getElementById("timezone").innerText = `Time Zone: ${timeZone}`;
    document.getElementById("dateTime").innerText = `Date & Time: ${dateTime}`;
    document.getElementById("postal").innerText = `Pin Code: ${pincode}`;

    // Setting Map
    document.getElementById(
      "map"
    ).src = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;

    // Post Office API
    const request_url = `https://api.postalpincode.in/pincode/${pincode}`;
    const postalRes = await fetch(request_url);
    const postalData = await postalRes.json();
    console.log(postalData);
    createPostOfficeUI(postalData);
  } catch (error) {
    console.log(error);
  }
}

function createPostOfficeUI(postalData) {
  const numMessage = postalData[0].Message;
  document.getElementById("noOfPincode").innerText = numMessage;

  const numOfPostOffice = postalData[0].PostOffice.length;

  for (let i = 0; i < numOfPostOffice; i++) {
    // Reading values
    const name = postalData[0].PostOffice[i].Name;
    const branchType = postalData[0].PostOffice[i].BranchType;
    const deliveryStatus = postalData[0].PostOffice[i].DeliveryStatus;
    const district = postalData[0].PostOffice[i].District;
    const division = postalData[0].PostOffice[i].Division;

    const boxElement = document.createElement("div");
    boxElement.className = "box";
    document.getElementById("postalData").appendChild(boxElement);

    // Creating elements
    const nameElement = document.createElement("p");
    const branchElement = document.createElement("p");
    const deliveryElement = document.createElement("p");
    const districtElement = document.createElement("p");
    const divisionElement = document.createElement("p");

    // Adding text content
    nameElement.textContent = `Name: ${name}`;
    branchElement.textContent = `Branch Type: ${branchType}`;
    deliveryElement.textContent = `Delivery Status: ${deliveryStatus}`;
    districtElement.textContent = `District: ${district}`;
    divisionElement.textContent = `Division: ${division}`;

    // Appending them to the box
    boxElement.appendChild(nameElement);
    boxElement.appendChild(branchElement);
    boxElement.appendChild(deliveryElement);
    boxElement.appendChild(districtElement);
    boxElement.appendChild(divisionElement);
  }
}

document.addEventListener("DOMContentLoaded", fetchIP);

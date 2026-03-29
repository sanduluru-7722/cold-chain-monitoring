const API = "http://localhost:3000"; 
// 🔴 After deploy change to:
// const API = "https://your-app.onrender.com";

async function getData() {
  try {
    const res = await fetch(`${API}/data`);
    const d = await res.json();

    document.getElementById("count").innerText = d.count;
    document.getElementById("in").innerText = d.tempIn;
    document.getElementById("out").innerText = d.tempOut;
    document.getElementById("door").innerText = d.door;
    document.getElementById("lat").innerText = d.lat;
    document.getElementById("lon").innerText = d.lon;

    checkStatus(d);

  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// 🔥 Smart logic
function checkStatus(d) {
  let status = "SAFE";

  if (d.door === "OPEN" && d.tempIn > 35)
    status = "CRITICAL 🚨";
  else if (d.door === "OPEN")
    status = "DOOR OPEN ⚠️";
  else if (d.tempIn > 35)
    status = "HIGH TEMP 🌡️";

  document.getElementById("status").innerText = status;
  const statusEl = document.getElementById("status");

if (status.includes("CRITICAL")) statusEl.style.color = "red";
else if (status.includes("OPEN")) statusEl.style.color = "orange";
else if (status.includes("TEMP")) statusEl.style.color = "blue";
else statusEl.style.color = "green";
}

// 🔁 Reset
async function reset() {
  await fetch(`${API}/reset`);
}

// 🔄 Auto update
setInterval(getData, 2000);
getData();
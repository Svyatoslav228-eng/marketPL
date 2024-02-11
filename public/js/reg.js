async function sendData() {
  const login = document.getElementById("login").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("conf_password").value;
  const response = await fetch("/reg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, username, password, confirm_password }),
  });

  const data = await response.json();
  if (!response.ok) {
    document.getElementById("message").textContent = data.message;
    return;
  }

  document.location.pathname = data.path;
}
async function enter() {
  document.location = "./.enter";
}

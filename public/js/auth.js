async function sendData() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    document.getElementById("message").textContent = data.message;
    return;
  }

  document.location.pathname = data.path;
}
async function registr() {
  document.location = "./.reg";
}

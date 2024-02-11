async function sendData() {
    const img = document.getElementById("IMGsrc").value;
    const annName = document.getElementById("Name").value;
    const someSpec = document.getElementById("specs").value;
    const price = document.getElementById("price").value;
    const username = document.getElementById("username").value;
    const telNum = document.getElementById("telNum").value;

    const response = await fetch("/auth/addAnnoncement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ img, annName, someSpec, price,username, telNum }),
      });
    
      const data = await response.json();
      if (!response.ok) {
        document.getElementById("message").textContent = data.message;
        return;
      }
    
      document.location.pathname = data.path;
}
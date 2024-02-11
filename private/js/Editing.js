async function sendData() {
    const imgSrc = document.getElementById("IMGsrc").value;
    const annName = document.getElementById("Name").value;
    const someSpec = document.getElementById("specs").value;
    const price = document.getElementById("price").value;
 
    const response = await fetch("/auth/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imgSrc, annName, someSpec, price,}),
      });
    
      const data = await response.json();
      if (!response.ok) {
        document.getElementById("message").textContent = data.message;
        return;
      }
    
      document.location.pathname = data.path;
}

async function Delete() {
    const annName = document.getElementById("Name").value;
    
 
    const response = await fetch(`/auth/delete?name=${annName}`, {
        method: "DELETE",
       
      });
    
      const data = await response.json();
      if (!response.ok) {
        document.getElementById("message").textContent = data.message;
        return;
      }
    
      document.location.pathname = data.path;
}
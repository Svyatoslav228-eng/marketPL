async function GetData() {
    
    
    let annObj = JSON.stringify({
      name: search.value,
    })
    senddata=`${annObj}`
    const response = await fetch(`/search?name=${search.value}`,{
        method: "GET",
    })
    
}
  
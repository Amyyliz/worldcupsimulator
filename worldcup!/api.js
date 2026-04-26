async function getTeams() {
   const response = await fetch("https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams",
   {
    headers: {
        "git-user": "Amyyliz",
   },
}
);
   return await response.json();
}
    
async function sendChampion(data) {
    await fetch(
        "https://development-internship-api.geopostenergy.com/WorldCup/FinalResult",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "git-user": "Amyyliz",
            },
            body: JSON.stringify(data),
        }
    );
}

if (!response.ok) {
  throw new Error("Erro na API: " + response.status);
}
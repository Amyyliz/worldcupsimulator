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
    await sendChampion({
        equipeA: finalMatch.teamA.id,
        equipeB: finalMatch.teamB.id,
        golsEquipeA: finalMatch.goalsA,
        golsEquipeB: finalMatch.goalsB,
        golsPenaltyEquipeA: finalMatch.penaltyA,
        golsPenaltyEquipeB: finalMatch.penaltyB
});
}

if (!response.ok) {
  throw new Error("Erro na API: " + response.status);
}

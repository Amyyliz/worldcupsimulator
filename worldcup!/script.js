function shuffle(array){
    return array.sort(() => Math.random()- 0.5);
}

function createGroups(teams) { //create groups
    const shuffled = shuffle([...teams]);
    const groups = {};
    const names = ["A","B","C","D","E","F","G","H"];

    names.forEach((name = i) => {
        groups[name]= shuffled.slice(i*4, i*4+4).map(t=> ({
            ...t,
            points:0 ,
            goalsFor:0,
            goalsAgainst:0
        }));
    });

    return groups;
}

function playMatch(a, b) { //simulate match
  const gA = Math.floor(Math.random() * 5);
  const gB = Math.floor(Math.random() * 5);

  a.goalsFor += gA;
  a.goalsAgainst += gB;
  b.goalsFor += gB;
  b.goalsAgainst += gA;

  if (gA > gB) a.points += 3;
  else if (gB > gA) b.points += 3;
  else {
    a.points += 1;
    b.points += 1;
  }
}

function simulateGroup(group) { //group rounds
  playMatch(group[0], group[1]);
  playMatch(group[2], group[3]);

  playMatch(group[0], group[2]);
  playMatch(group[1], group[3]);

  playMatch(group[0], group[3]);
  playMatch(group[1], group[2]);

  return group.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;

    const saldoA = a.goalsFor - a.goalsAgainst;
    const saldoB = b.goalsFor - b.goalsAgainst;

    if (saldoB !== saldoA) return saldoB - saldoA;

    return Math.random() - 0.5;
  });
}

function knockout(a, b) { //knockout
  let gA = Math.floor(Math.random() * 5);
  let gB = Math.floor(Math.random() * 5);

  let pA = 0, pB = 0;

  if (gA === gB) {
    pA = Math.floor(Math.random() * 5);
    pB = Math.floor(Math.random() * 5);

    while (pA === pB) {
      pA += Math.floor(Math.random() * 2);
      pB += Math.floor(Math.random() * 2);
    }
  }

  return (gA > gB || pA > pB) ? a : b;
}

async function start() { 
  const teams = await getTeams();

  const groups = createGroups(teams);

  // simulate groups
  Object.keys(groups).forEach(g => {
    groups[g] = simulateGroup(groups[g]);
  });

  renderGroups(groups);

  // qualified
  let qualified = [];
  Object.values(groups).forEach(g => {
    qualified.push(g[0], g[1]);
  });

  // knockout
  while (qualified.length > 1) {
    const next = [];

    for (let i = 0; i < qualified.length; i += 2) {
      next.push(knockout(qualified[i], qualified[i + 1]));
    }

    qualified = next;
  }

  const champion = qualified[0];

  renderChampion(champion);

  await sendChampion({
    winner: champion.name
  });
}

function renderGroups(groups) { //render
  const div = document.getElementById("groups");
  div.innerHTML = "";

  for (let g in groups) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "group";

    groupDiv.innerHTML = `<h3>Grupo ${g}</h3>`;

    groups[g].forEach(t => {
      groupDiv.innerHTML += `
        <div class="team">
          ${t.name} - ${t.points} pts
        </div>
      `;
    });

    div.appendChild(groupDiv);
  }
}

function renderChampion(team) {
  const div = document.getElementById("champion");
  div.innerHTML = `<div class="champion"> ${team.name}</div>`;
}

document.getElementById("runBtn").addEventListener("click", start);
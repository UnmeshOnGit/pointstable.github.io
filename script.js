let teams = [];
let selectedTeams = [];
let pointsTable = [];

function generateTeamInputs() {
const totalTeams = document.getElementById('total-teams').value;
const teamNamesDiv = document.getElementById('team-names');
teamNamesDiv.innerHTML = '';
teams = [];

for (let i = 0; i < totalTeams; i++) {
const input = document.createElement('input');
input.type = 'text';
input.placeholder = `Team ${i + 1} Name`;
input.id = `team-${i}`;
teamNamesDiv.appendChild(input);
teamNamesDiv.appendChild(document.createElement('br'));
}

const button = document.createElement('button');
button.type = 'button';
button.innerText = 'Add Teams';
button.className = 'initial-form-btn';
button.onclick = addTeams;
teamNamesDiv.appendChild(button);
}

function addTeams() {
document.querySelector(".initial-form").classList.remove("initial-form-active");
const totalTeams = document.getElementById('total-teams').value;
const teamButtonsDiv = document.getElementById('team-buttons');
teamButtonsDiv.innerHTML = '';

for (let i = 0; i < totalTeams; i++) {
const teamName = document.getElementById(`team-${i}`).value;
teams.push(teamName);

const button = document.createElement('button');
button.classList.add("team-name");
button.type = 'button';
button.innerText = teamName;
button.onclick = () => selectTeam(teamName);
teamButtonsDiv.appendChild(button);

pointsTable.push({
    name: teamName,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesLost: 0,
    points: 0,
    nrr: 0  // Placeholder for NRR
});
}

updatePointsTable();
}

function selectTeam(teamName) {
if (selectedTeams.length < 2 && !selectedTeams.includes(teamName)) {
selectedTeams.push(teamName);
updateSelectedTeams();
}
}

function updateSelectedTeams() {
const selectedTeamsDiv = document.getElementById('selected-teams');
selectedTeamsDiv.innerHTML = '';

selectedTeams.forEach(team => {
const button = document.createElement('button');
button.type = 'button';
button.innerText = team;
button.onclick = () => removeSelectedTeam(team);
selectedTeamsDiv.appendChild(button);
});
}

function removeSelectedTeam(teamName) {
selectedTeams = selectedTeams.filter(team => team !== teamName);
updateSelectedTeams();
}

function updateMatchResult() {
    document.querySelector(".add-match-form").classList.remove("add-match-form-active");
if (selectedTeams.length !== 2) {
alert('Please select two teams.');
return;
}

const result = document.querySelector('input[name="result"]:checked').value;
const [team1, team2] = selectedTeams;

const team1Data = pointsTable.find(team => team.name === team1);
const team2Data = pointsTable.find(team => team.name === team2);

team1Data.matchesPlayed++;
team2Data.matchesPlayed++;

if (result === 'team1-win') {
team1Data.matchesWon++;
team2Data.matchesLost++;
team1Data.points += 2;
} else if (result === 'team2-win') {
team2Data.matchesWon++;
team1Data.matchesLost++;
team2Data.points += 2;
} else {
team1Data.points++;
team2Data.points++;
}

// Recalculate NRR (dummy calculation here, replace with actual NRR logic if needed)
team1Data.nrr = (team1Data.matchesWon - team1Data.matchesLost) / team1Data.matchesPlayed;
team2Data.nrr = (team2Data.matchesWon - team2Data.matchesLost) / team2Data.matchesPlayed;

selectedTeams = [];
updateSelectedTeams();
updatePointsTable();
}

function updatePointsTable() {
// Sort the pointsTable in descending order based on points, then by (matchesWon - matchesLost)
pointsTable.sort((a, b) => {
if (b.points !== a.points) {
    return b.points - a.points;
} else {
    return (b.matchesWon - b.matchesLost) - (a.matchesWon - a.matchesLost);
}
});

const tableBody = document.getElementById('points-table').querySelector('tbody');
tableBody.innerHTML = '';

pointsTable.forEach(team => {
const row = document.createElement('tr');
row.innerHTML = `
    <td>${team.name}</td>
    <td>${team.matchesPlayed}</td>
    <td>${team.matchesWon}</td>
    <td>${team.matchesLost}</td>
    <td>${team.points}</td>
    <td>${team.nrr.toFixed(2)}</td>  <!-- Display NRR to 2 decimal places -->
`;
tableBody.appendChild(row);
});
}


document.getElementById('form-btn').addEventListener('click', () => {
    document.querySelector(".initial-form").classList.toggle("initial-form-active");
    
})

document.getElementById('match-btn').addEventListener('click', () => {
    document.querySelector(".add-match-form").classList.toggle("add-match-form-active");
    
})
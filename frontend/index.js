const datapage = document.querySelector('#result');
const form = document.getElementById('form');

form.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetch('https://final-final-final-app.herokuapp.com/data', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        To: document.getElementById('box1').value,
        From: document.getElementById('box2').value,
        Departure_date: document.getElementById('box3').value,
        Results_Count: document.getElementById('box4').value,
      }),
    }).then(
      setTimeout(() => {
        document.location.reload();
      },3000)
    );
  }
});

fetch('https://skiplagged.com//api/search.php?from=SEA&to=LAX&depart=2023-01-01',{mode: 'no-cors'})
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data[data.length - 1]; i++) {
      console.log(data);
      datapage.insertAdjacentHTML(
        'beforeend',
        `<tr>
<td>${i + 1}</td>
<td>${data[0][i]}</td>
<td>${data[1][i]}</td>
<td>${data[2][i]}</td>
<td>${data[3][i]}</td>
</tr>`
      );
    }
  })
  .catch((err) => window.alert('Error Loading your Data'));

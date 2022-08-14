const datapage = document.querySelector('#result');
const form = document.getElementById('form');

fetch('http://localhost:6000/')
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

form.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetch('http://localhost:6000/data', {
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
      }, 2000)
    );
  }
});

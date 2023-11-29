const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/search?key=' + TA_API_KEY + '&language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
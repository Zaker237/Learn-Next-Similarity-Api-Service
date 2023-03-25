export const nodejs = `const axios = require("axios");
const options = {
    method: 'POST',
    url: 'https://similarityapi.alexwalker.tech/api/v1/similarity',
    params: {
      text1: 'First text',
      text2: 'Second text'
    },
    headers: {
      'Authorization': 'YOUR_API_KEY',
    }
  };
  
axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});`

export const python = `import requests
url = 'https://similarityapi.alexwalker.tech/api/v1/similarity'
api_key = 'YOUR_API_KEY'
text1 = 'First text'
text2 = 'Second text'
headers = {
    'Authorization': api_key
}
payload = {
    'text1': text1,
    'text2': text2
}
response = requests.post(url, headers=headers, json=payload)
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Request failed with status code {response.status_code}')`

export const curl = `curl -X GET \\
> -H "Authorization: Bearer YOUR-API-KEY" \\
> -H "Content-Type: application/json" \\
> -d "data={'text1': 'First text', 'text2': 'Second text'}" \\
> https://similarityapi.alexwalker.tech/api/v1/similarity \\
> | jq`
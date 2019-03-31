export function PostCode(bodyJson,url) {
    const options = {
        method: 'POST',
        url: url,
        body: {
           bodyJson
        },
        json: true  // JSON stringifies the body automatically
    }
      
    request(options)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.error(err);
    });
  
}
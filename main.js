
const Octokit = require('@octokit/rest')
const request = require('request')

const clientWithAuth = new Octokit({
    auth: 'token ' + process.env.GIT_TOKEN // Get Git Token from env
})

// Define JSON File
var fs = require("fs");
// Get content from file
var contents = fs.readFileSync("config.json");
// Define to JSON type
var Configs = JSON.parse(contents);

Configs.repos.forEach(repository => {
    console.log(repository);
    setInterval( () => {  //Scheduler Timer
        clientWithAuth.repos.get({
            owner: 'GeraudWilling',
            repo: repository
        }).then(({ data, status, headers }) => {
            //console.log(data);
            //Send data to dashboard widget
            const options = {
                method: 'POST',
                url: process.env.GUI_URL+'/widgets/' +repository,
                body: {
                    "auth_token": 'YOUR_AUTH_TOKEN',
                    "repo": data.full_name,
                    "issues": data.open_issues_count,
                    "forks": data.forks,
                    "watchers": data.subscribers_count,
                    "stargazers": data.stargazers_count,
                    "activity": data.updated_at
                },
                json: true  // JSON stringifies the body automatically
            }
            postToWidget(options);
        }).catch(function(error) {
            console.error(error);
        });
    }, 60*1000); 
    
});



function postToWidget(options) {   
    request(options, (error, response, body)=> {
        console.error('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body); 
    });
  
}

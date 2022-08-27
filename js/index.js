const form   = document.querySelector('#github-form')
const userUL = document.querySelector('#user-list')
const repoUL = document.querySelector('#repos-list')

form.addEventListener('submit',formHandler)

//handlers

function formHandler(event){
    event.preventDefault()
    const queryString  = this.search.value
    const promise = findUsers(queryString)
    displayUsers(promise)
    this.reset()
}
function listClickHandler(event){
    console.log(this)
    const username = this.querySelector('a').getAttribute('data-username')
    const repoPromise = findRepos(username)
    displayRepos(repoPromise)
}
//utilities
async function get(resourceUri){
    const baseUrl = 'https://api.github.com'
    const configurations = {
        method: 'get',
        headers :{
            accept: 'application/vnd.github.v3+json'
        }
    }
    return fetch(baseUrl+resourceUri, configurations)

}

async function findUsers(q){
    try{
        const userResponseObject = await (await get(`/search/users?q=${q}`)).json()       
        return userResponseObject.items
    }

    catch(e){
        console.error(e.message)
        return userResponseObject
    }
   return []

}

async function displayUsers(promiseObj){    
    userUL.innerHTML = ' '
    const users = await promiseObj   
    users.forEach(user => {        
        const li = createElement('li', {id: user.id})
        li.innerHTML = `
        <div class="display-inline ">
            <img class="rounded-avatar" src="${user.avatar_url}" alt="${user.login}'s avatar">                 
            <a href="#" class="center-text" data-username="${user.login}">Username: ${user.login}<a>   
        </div>        
      `
        li.addEventListener('click',listClickHandler)
        userUL.append(li)        
    })
}
async function displayRepos(promiseObj){
    repoUL.innerHTML= ''
    const repos = await promiseObj
    if(!repos.length){
        const li = createElement('li')
        li.innerHTML = 'There is no repos to display'
        repoUL.append(li)
    }
    repos.forEach((repo) => {
        const li = createElement('li', {id: repo.id})
        li.innerHTML = `
        <div class="bottom-line">
            <ul>
                <li>
                <span class="under-line"> <strong>${repo.name}</strong></span>
                </li>
                <li>
                    Open Issues <span>${repo.open_issues_count}</span>
                </li>
                <li>Forks Count <span>${repo.forks_count}</span></li>
                <li>License <span>${repo.license ? repo.license.name : 'No licence provided'}</span>  </li>
            </ul> 
        </div>        
      `
    repoUL.append(li)

    })

}

function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    if (Object.keys(attributes).length > 0) {
      for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
      }
      
      return element;
    }
    return element;
}

async function findRepos(username){
    try{
        const repoResponseObject = await (await get(`/users/${username}/repos`)).json()              
        return repoResponseObject
    }

    catch(e){
        console.error(e.message)
        return repoResponseObject
    }
   return []
}
//   {
//     "login": "Dcolonel6",
//     "id": 11848689,
//     "node_id": "MDQ6VXNlcjExODQ4Njg5",
//     "avatar_url": "https://avatars.githubusercontent.com/u/11848689?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/Dcolonel6",
//     "html_url": "https://github.com/Dcolonel6",
//     "followers_url": "https://api.github.com/users/Dcolonel6/followers",
//     "following_url": "https://api.github.com/users/Dcolonel6/following{/other_user}",
//     "gists_url": "https://api.github.com/users/Dcolonel6/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/Dcolonel6/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/Dcolonel6/subscriptions",
//     "organizations_url": "https://api.github.com/users/Dcolonel6/orgs",
//     "repos_url": "https://api.github.com/users/Dcolonel6/repos",
//     "events_url": "https://api.github.com/users/Dcolonel6/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/Dcolonel6/received_events",
//     "type": "User",
//     "site_admin": false,
//     "score": 1
// }

// {
//     "id": 220247721,
//     "node_id": "MDEwOlJlcG9zaXRvcnkyMjAyNDc3MjE=",
//     "name": "5614116-front-end-app",
//     "full_name": "Dcolonel6/5614116-front-end-app",
//     "private": false,
//     "owner": {
//         "login": "Dcolonel6",
//         "id": 11848689,
//         "node_id": "MDQ6VXNlcjExODQ4Njg5",
//         "avatar_url": "https://avatars.githubusercontent.com/u/11848689?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/Dcolonel6",
//         "html_url": "https://github.com/Dcolonel6",
//         "followers_url": "https://api.github.com/users/Dcolonel6/followers",
//         "following_url": "https://api.github.com/users/Dcolonel6/following{/other_user}",
//         "gists_url": "https://api.github.com/users/Dcolonel6/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/Dcolonel6/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/Dcolonel6/subscriptions",
//         "organizations_url": "https://api.github.com/users/Dcolonel6/orgs",
//         "repos_url": "https://api.github.com/users/Dcolonel6/repos",
//         "events_url": "https://api.github.com/users/Dcolonel6/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/Dcolonel6/received_events",
//         "type": "User",
//         "site_admin": false
//     },
//     "html_url": "https://github.com/Dcolonel6/5614116-front-end-app",
//     "description": null,
//     "fork": true,
//     "url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app",
//     "forks_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/forks",
//     "keys_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/keys{/key_id}",
//     "collaborators_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/collaborators{/collaborator}",
//     "teams_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/teams",
//     "hooks_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/hooks",
//     "issue_events_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/issues/events{/number}",
//     "events_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/events",
//     "assignees_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/assignees{/user}",
//     "branches_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/branches{/branch}",
//     "tags_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/tags",
//     "blobs_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/git/blobs{/sha}",
//     "git_tags_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/git/tags{/sha}",
//     "git_refs_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/git/refs{/sha}",
//     "trees_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/git/trees{/sha}",
//     "statuses_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/statuses/{sha}",
//     "languages_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/languages",
//     "stargazers_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/stargazers",
//     "contributors_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/contributors",
//     "subscribers_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/subscribers",
//     "subscription_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/subscription",
//     "commits_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/commits{/sha}",
//     "git_commits_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/git/commits{/sha}",
//     "comments_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/comments{/number}",
//     "issue_comment_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/issues/comments{/number}",
//     "contents_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/contents/{+path}",
//     "compare_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/compare/{base}...{head}",
//     "merges_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/merges",
//     "archive_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/{archive_format}{/ref}",
//     "downloads_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/downloads",
//     "issues_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/issues{/number}",
//     "pulls_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/pulls{/number}",
//     "milestones_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/milestones{/number}",
//     "notifications_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/notifications{?since,all,participating}",
//     "labels_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/labels{/name}",
//     "releases_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/releases{/id}",
//     "deployments_url": "https://api.github.com/repos/Dcolonel6/5614116-front-end-app/deployments",
//     "created_at": "2019-11-07T13:49:33Z",
//     "updated_at": "2019-11-07T13:49:34Z",
//     "pushed_at": "2019-09-10T10:41:52Z",
//     "git_url": "git://github.com/Dcolonel6/5614116-front-end-app.git",
//     "ssh_url": "git@github.com:Dcolonel6/5614116-front-end-app.git",
//     "clone_url": "https://github.com/Dcolonel6/5614116-front-end-app.git",
//     "svn_url": "https://github.com/Dcolonel6/5614116-front-end-app",
//     "homepage": null,
//     "size": 348,
//     "stargazers_count": 0,
//     "watchers_count": 0,
//     "language": null,
//     "has_issues": false,
//     "has_projects": true,
//     "has_downloads": true,
//     "has_wiki": true,
//     "has_pages": false,
//     "forks_count": 0,
//     "mirror_url": null,
//     "archived": false,
//     "disabled": false,
//     "open_issues_count": 0,
//     "license": null,
//     "allow_forking": true,
//     "is_template": false,
//     "web_commit_signoff_required": false,
//     "topics": [],
//     "visibility": "public",
//     "forks": 0,
//     "open_issues": 0,
//     "watchers": 0,
//     "default_branch": "master"
// }
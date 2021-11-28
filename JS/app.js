// Select the button
const btn = document.querySelector(".btn-toogle-mode");
const iconChange = document.querySelector(".btn-toogle-mode i")

// local storage dark/light mode
let theme = localStorage.getItem('data-theme')



// fonctions toogle theme
function changeThemeToDark(){
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("data-theme", "dark")
    // icon dark
    iconChange.setAttribute('class', 'bi-brightness-high-fill')
}

function changeThemeToLight(){
    document.documentElement.setAttribute("data-theme", "light")
    localStorage.setItem("data-theme", 'light')
    // icon light
    iconChange.setAttribute('class', 'bi-moon-fill')

}


// Listen for a click on the button
btn.addEventListener("click", function() {

    let theme = localStorage.getItem('data-theme');

    if (theme ==='dark'){
        changeThemeToLight()
    }
    
    else{
        changeThemeToDark()
    }
  

});


// API call
const form = document.querySelector('.form')


// event fonction
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let inputValue = document.querySelector('.Input-search').value

    let originalValue = inputValue.split(' ').join('')

    // fetch api
    fetch(`https://api.github.com/users/${originalValue}`)
        .then((response) => {
            
            if(response.status == 200){
               
                return response.json()
            }
            else {
                throw new Error('Something went wrong');
              } 
        })
        .then((data) =>{
            
            document.querySelector('.content-dynamic').innerHTML = `

            <div class="content-section">
            <div class="wave-section">
                <div class="round-design"></div>
                
                <div class="avatar-profil">
                    <img src="${data.avatar_url}" alt="Avatar">
                </div>
            </div>

            <div class="Details-section">
                <!-- titles -->
                <div class="titles">
                    <h1>${data.name}</h1>
                    <span>
                        <a href="${data.html_url}">@${data.login}</a>
                    </span>
                </div>
                <!-- dash -->
                <div class="Dash-content">
                    <div class="dash Repositories">
                        <h2>${data.public_repos}</h2>
                        <span>Repositories</span>
                    </div>
                    <div class="dash Followers">
                        <h2>${data.followers}</h2>
                        <span>Followers</span>
                    </div>
                    <div class="dash Following">
                        <h2>${data.following}</h2>
                        <span>Following</span>
                    </div>
                </div>

                <!-- footer -->
                <div class="Footer">
                    <ul class="footer-child">
                        <li class="child"><i class="bi bi-geo-alt-fill"></i> ${data.location}</li>
                        <li class="child"><i class="bi bi-briefcase-fill"></i> ${data.company}</li>
         
                    </ul>

                    <ul>
                        <li class="child"><i class="bi bi-link-45deg"></i> <a href="https://${data.blog}">${data.blog}</a></li>
                        <li class="child"><i class="bi bi-twitter"></i> <a href="https://twitter.com/${data.twitter_username}">@${data.twitter_username}</a></li>
                    </ul>

                    <div class="Bio-footer">

                        <div class="content-bio">
                            <h2>Bio</h2>
                            <p>
                                ${data.bio}
                            </p>

                            <i>Joined ${
                                new Date(data.created_at).toISOString().split('T')[0]  
                            }</i>
                        </div>
                    </div>

                </div>

            </div>

            </div>

            `
        })
        .catch((error)=>{

            document.querySelector('.content-dynamic').innerHTML = `

            <div class="error-block">
            <img src="./Images/error.svg" alt="Error illustration">
            <h1>Oops!</h1>
            <h3>Error - User not found</h3>
            </div>
            
            `
        })

       
  
})

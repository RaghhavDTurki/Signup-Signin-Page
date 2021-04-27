const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


const signupform = document.getElementById('sign-up-form')
signupform.addEventListener('submit',registerUser)

async function registerUser(event){
    event.preventDefault()
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    const result = await fetch('/register', {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });
    let json = await result.json();
    if(json.status === "200")
    {
      alert("User Added!");
      container.classList.remove("sign-up-mode");
    }
    else{
      alert(json.error);
    }
}


const signinform = document.getElementById('sign-in-form')
signinform.addEventListener('submit',login)

async function login(event){
    event.preventDefault()
    const email = document.getElementById('sign-in-email').value
    const password = document.getElementById('sign-in-password').value
    
    const result = await fetch('/login', {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    let loginjson = await result.json();
    // console.log(loginjson);
    if(loginjson.status === "200")
    {
      alert("Logged In Successfully!");
    }
    else{
      alert(loginjson.error);
    }
}


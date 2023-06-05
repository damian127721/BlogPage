import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue, get} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js"

// ## variables
const signButton = document.querySelector(".header__signup__button")
const logForm = document.getElementById("register-form")
const logFormCross = document.querySelector(".register-form__cross") 
const addPostText = document.getElementById("add-post__textarea")
const blogPosts = document.getElementById("blog-posts")
const addPostBtn = document.getElementById("add-post__plus")
// # login vars
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const loginSubmitBtn = document.getElementById("register-form__button")

const appSettings = {
    apiKey: "AIzaSyAynj2drTUQnxmO8qQG1l8642xlYuwqZWc",
    authDomain: "blogpage-37761.firebaseapp.com",
    databaseURL: "https://blogpage-37761-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blogpage-37761",
    storageBucket: "blogpage-37761.appspot.com",
    messagingSenderId: "827658126289",
    appId: "1:827658126289:web:80866e8ef83e9d9fbd56f0"
}
const app = initializeApp(appSettings)
console.log(app)
const database = getDatabase(app)

firebase.initializeApp(appSettings) 

const postsData = ref(database, "postsData")
const loginData = ref(database, "loginData")

let postAuthor = ""
let lastTextEntries = [] 
let delIdArr = []
let account = {
    emailVal: "",
    passwordVal: ""
}



// ## posts code
onValue(postsData, function(snapshot) {
    delIdArr = []
    if (!snapshot.exists()){ 
        blogPosts.innerHTML = ""
        return;
    }
    lastTextEntries = Object.entries(snapshot.val())

    blogPosts.innerHTML = ""
    for (let i = 0; i < lastTextEntries.length; ++i) {
        newPost(lastTextEntries[i][1], lastTextEntries[i][0])
    }

    for(let i = 0; i < delIdArr.length; ++i) {
    if (delIdArr[i] != 0){
    document.getElementById(delIdArr[i]).addEventListener("click", function () {
        let refEx = ref(database, `postsData/${delIdArr[i]}`)
        console.log(`Removed element with id ${delIdArr[i]}`)
        delIdArr[i] = 0
        /* delIdArr.splice(i, 1) */
        remove(refEx)
        
    }) }
    }
})

signButton.addEventListener("click", function() {
    logForm.style.display = "block"
    logForm.style.width = "100%"
})

logFormCross.addEventListener("click", function() {
    logForm.style.display = "none"
    
})

addPostBtn.addEventListener("click", function() {
    let text = addPostText.value
    addPostText.value = ""
    push(postsData, text)
})

function newPost(text, id) {
    
    blogPosts.innerHTML += `<article class="blog-posts__post">
    <p class="blog-posts__post__p">Author:  ${postAuthor}</p> 
    <p class="blog-posts__post__p"> ${text} </p>
    <div id="${id}" class="blog-posts__post__delete">&times; </div>
</article> `
    delIdArr.push(id)
    
    
}

// ## login code 
loginSubmitBtn.addEventListener("click", function() {
    account.emailVal = emailInput.value
    account.passwordVal = passwordInput.value

    emailInput.value = ""
    passwordInput.value = ""
    console.log(account.emailVal + " " + account.passwordVal)

    push(loginData, account)

    getLoginData()
})

function getLoginData() {

}
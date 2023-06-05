import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue, get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js"

const signButton = document.querySelector(".header__signup__button")
const logForm = document.getElementById("register-form")
const logFormCross = document.querySelector(".register-form__cross") 
const addPostText = document.getElementById("add-post__textarea")
const blogPosts = document.getElementById("blog-posts")
const addPostBtn = document.getElementById("add-post__plus")

const appSettings = {
    databaseURL: "https://blogpage-37761-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
console.log(app)
const database = getDatabase(app)
const postsData = ref(database, "postsData")

let lastTextEntries = [] 
let delIdArr = []

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
    <p class="blog-posts__post__p">Author:  </p> 
    <p class="blog-posts__post__p"> ${text} </p>
    <div id="${id}" class="blog-posts__post__delete">&times; </div>
</article> `
    delIdArr.push(id)
    
    
}


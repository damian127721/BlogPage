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

onValue(postsData, function(snapshot) {
    if (!snapshot.exists()){ 
        blogPosts.innerHTML = ""
        return;
    }
    lastTextEntries = Object.entries(snapshot.val())

    blogPosts.innerHTML = ""
    for (let i = 0; i < lastTextEntries.length; ++i) {
        console.log(lastTextEntries[i][0])
        newPost(lastTextEntries[i][1], lastTextEntries[i][0])
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
    
    blogPosts.innerHTML += `<article class="blog-posts__post" id="${id}">
    <p class="blog-posts__post__p">Author:  </p> 
    <p class="blog-posts__post__p"> ${text} </p>
    <div onclick="removeEl(${id})" class="blog-posts__post__delete">&times; </div>
</article> `
    
}

function removeEl(id) {
    console.log(`Removed element with id ${id}`)
}
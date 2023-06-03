const signButton = document.querySelector(".header__signup__button")
const logForm = document.getElementById("register-form")
const logFormCross = document.querySelector(".register-form__cross") 
const addPostText = document.getElementById("add-post__textarea")
const blogPosts = document.getElementById("blog-posts")

appSettings = {
    databaseURL: "https://blogpage-37761-default-rtdb.europe-west1.firebasedatabase.app/"
}



signButton.addEventListener("click", function() {
    logForm.style.display = "block"
    logForm.style.width = "100%"
})

logFormCross.addEventListener("click", function() {
    logForm.style.display = "none"
    
})

function addPostBtn() {
    let text = addPostText.value
    addPostText.value = ""
    newPost(text)
    
}

function newPost(text) {
    blogPosts.innerHTML += `<article class="blog-posts__post">
    <p class="blog-posts__post__p">Author:  </p> 
    <p class="blog-posts__post__p"> ${text} </p>
</article> `
    
}
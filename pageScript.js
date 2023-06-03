const signButton = document.querySelector(".header__signup__button")
const logForm = document.getElementById("register-form")
const logFormCross = document.querySelector(".register-form__cross") 
let addPostText = document.getElementById("blog-posts__add__textarea")
const blogPosts = document.getElementById("blog-posts")

signButton.addEventListener("click", function() {
    logForm.style.display = "block"
    logForm.style.width = "100%"
})

logFormCross.addEventListener("click", function() {
    logForm.style.display = "none"
    
})

function addPostBtn() {
    addPostText = document.getElementById("blog-posts__add__textarea")
    let text = addPostText.value
    newPost(text)
}

function newPost(text) {
    blogPosts.innerHTML += `<article class="blog-posts__post">
    <p class="blog-posts__post__p"> ${text} </p>
</article> `
}
const addPostForm = document.getElementById('create-post')
const postsContainer = document.getElementById('posts')
let editPostId = null
const API_ENDPOINTS = {
    post: '	https://testapi.io/api/rksmrks/resource/Posts',
    get: 'https://testapi.io/api/rksmrks/resource/Posts',
    getPostById: (id) => `	https://testapi.io/api/rksmrks/resource/Posts/${id}`,
    edit: (id) => `https://testapi.io/api/rksmrks/resource/Posts/${id}`,
    delete: (id) => `https://testapi.io/api/rksmrks/resource/Posts/${id}`
}
const handleButtonName = (name) => {
    const btn = document.querySelector('button[type=submit]')
    btn.innerText = name
}
const getData = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))
}
const getPostById = (id) => {
    const url = API_ENDPOINTS.getPostById(id)
    return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))
}
const editData = (url, data) => {
    return fetch(url, {
        method: 'PUT',
        body: data,
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))
}
const deletePost = (id) => {
    const url = API_ENDPOINTS.delete(id)
    return fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        response.status === 204 &&
        document.getElementById(id).remove()
    })
    .catch(err => console.log(err))
}
const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(err => console.log(err))       
}
const postTemplate = (data) => {
    const x = JSON.stringify(data)
    return `
    <div id=${data.id} class="mainpost">
    <div class="change-buttons">
    <button class="edit" onClick=handlePostEdit(${data.id})>Edit</button>
    <button class="delete" onClick=deletePost(${data.id})>Delete</button>
    </div>
    <p class="posttitle">${data.title}</p>
    <img src="${data.img}" alt="${data.id}">
    <p class="posttext">${data.content}</p>
    <div class="social">
        <hr>
        <div class="social-icons">
            <i class="fa-brands fa-facebook-f fa-sm"></i>
            <i class="fa-brands fa-twitter fa-sm"></i>
            <i class="fa-brands fa-linkedin-in fa-sm"></i>
            <i class="fa-solid fa-link fa-sm"></i>
        </div>
        <hr>
        <div class="socialcounts">
            <p class="views"><span class="viewcount">0</span>views</p>
            <p class="comments"><span class="commentcount">0</span>comments</p>
            <p class="hearts"><span class="heartscount">0</span><i class="fa-regular fa-heart"></i></p>
            <!-- <i class="fa-solid fa-heart"></i> reikes pakeitimui paspaudus -->
        </div>
    </div>
</div>
    `
}
const handlePostEdit = async (id) => {
    editPostId = id
    const postDataById = await getPostById(id)
    const arr = [...addPostForm.getElementsByTagName('input')];
    arr.forEach(input => {
        input.value = postDataById[input.name]
    })
    handleButtonName('Update Post')
}
const handlePostUpdate = async (formData, id) => {
    const updatedPost = await editData(API_ENDPOINTS.edit(id), new URLSearchParams(formData))
    document.getElementById(id).remove()
    postsContainer.innerHTML += postTemplate(updatedPost)
    editPostId = null
    handleButtonName('Add Post')
}
const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    if(editPostId) {
        handlePostUpdate(formData, editPostId)
    } else {
        const newPost = await postData(API_ENDPOINTS.post, formData)
        postsContainer.innerHTML += postTemplate(newPost)
    }
    e.target.reset()
}
addPostForm.addEventListener('submit', handleFormSubmit)
window.onload = async () => {
    const posts = await getData(API_ENDPOINTS.get)
    posts.data.forEach(post => {
        postsContainer.innerHTML += postTemplate(post)
    })
}
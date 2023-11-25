const cl = console.log;
const cardContainer = document.getElementById('cardContainer');
const postForm = document.getElementById('postForm');
const titleControl = document.getElementById('title');
const bodyControl = document.getElementById('body');
const userIdControl = document.getElementById('userId');
const UpdateBtn = document.getElementById('UpdateBtn');
const addBtn = document.getElementById('addBtn');



let baseUrl = `https://jsonplaceholder.typicode.com`;

let postUrl = `${baseUrl}/posts`;
let postArray = [];


const onEditHandler = (eve => {
    cl(eve)
    let getId = eve.closest(".card").id;
    localStorage.setItem("editId", getId);
  
    // cl(getId)
    let getUrl = `${baseUrl}/posts/${getId}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", getUrl, true);

    xhr.send();

    xhr.onload = function() {
        if(xhr.status === 200){
            cl(xhr.response);
            let getObj = JSON.parse(xhr.response);
            cl(getObj)
            titleControl.value = getObj.title;
            bodyControl.value = getObj.body;
            userIdControl.value = getObj.userId;
        }
        addBtn.classList.add('d-none');
        UpdateBtn.classList.remove('d-none');
    }
});

const onUpdateHandler = (eve => {
    // cl(eve)
    let updatedObj = {
        title: titleControl.value,
        body: bodyControl.value,
        userId: userIdControl.value
    }
    let getEditId = localStorage.getItem("editId");
    // cl(getEditId);
    let getUrl = `${postUrl}/${getEditId}`;
    // cl(getUrl)

    let xhr = new XMLHttpRequest();

    xhr.open("PATCH", getUrl, true);

    xhr.send(JSON.stringify(updatedObj));

    xhr.onload = function(){
        // cl(xhr.response)
        if(xhr.status === 200){
            let getUpdatedObj = postArray.findIndex(ele =>{
                return ele.id == getEditId
            });
            // cl(getUpdatedObj)
            postArray[getUpdatedObj].title = updatedObj.title;
            postArray[getUpdatedObj].body = updatedObj.body;
            postArray[getUpdatedObj].userId = updatedObj.userId;
            templating(postArray)
        }
    }
});

const onDeletHandler = (eve => {
    // cl(eve)
    let getDeletId = eve.closest('.card').id;
    cl(getDeletId);
    let deletUrl = `${postUrl}/${getDeletId}`;

    let xhr = new XMLHttpRequest();

    xhr.open("DELETE", deletUrl, true);

    xhr.send();

    xhr.onload = function(){
        if(xhr.status === 200){
            let getDelete = document.getElementById(getDeletId);
            getDelete.remove();
        }
    }
});

const templating = (arr => {
    let result = '';
    arr.forEach(post =>{
        result += `
            <div class="card mb-4 cardBody" id="${post.id}">
                <div class="card-header">
                    <h3>${post.title}</h3>
                </div>
                <div class="card-body">
                    <p>
                    ${post.body}
                    </p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-primary" onclick= "onEditHandler(this)">Edit</button>
                    <button class="btn btn-danger" onclick = "onDeletHandler(this)">Delete</button>
                </div>
            </div>
        
        
                `
    })
    cardContainer.innerHTML = result;
});

const onSubmitHandler = (eve) => {
    eve.preventDefault();

    let postObj = {
        title: titleControl.value,
        body: bodyControl.value,
        userId: userIdControl.value
    };
    cl(postObj);
    onPostHandler(postObj)

    postForm.reset();
};


const onPostHandler = (postObj) => {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", postUrl, true);

    xhr.send(JSON.stringify(postObj));

    xhr.onload = function() {
        if(xhr.status === 200 || xhr.status === 201){
            cl(xhr.response)
            postObj.id = JSON.parse(xhr.response).id;
            postArray.push(postObj)
            templating(postArray)
        }
    }
};


const onGetHander = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("Get", postUrl, true);

    xhr.send();

    xhr.onload = function(){
        if(xhr.status === 200){
            cl(xhr.response)
            postArray = JSON.parse(xhr.response);
            // cl(data)
            templating(postArray)
        }else{
            cl("something went wrong")
        }
}
};
UpdateBtn.addEventListener("click", onUpdateHandler)
postForm.addEventListener("submit", onSubmitHandler);

onGetHander()
const cl = console.log;
const cardContainer = document.getElementById('cardContainer');
const postForm = document.getElementById('postForm');
const titleControl = document.getElementById('title');
const bodyControl = document.getElementById('body');
const userIdControl = document.getElementById('userId');



let baseUrl = `https://jsonplaceholder.typicode.com`;

let postUrl = `${baseUrl}/posts`;
let postArray = [];


const templating = (arr => {
    let result = '';
    arr.forEach(post =>{
        result += `
            <div class="card mb-4">
                <div class="card-header">
                    <h3>${post.title}</h3>
                </div>
                <div class="card-body">
                    <p>
                    ${post.body}
                    </p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-primary">Update</button>
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>
        
        
                `
    })
    cardContainer.innerHTML = result;
})

const onSubmitHandler = (eve) => {
    eve.preventDefault();
    let postObj = {
        title: titleControl.value,
        body: bodyControl.value,
        userId: userIdControl.value
    };
    cl(postObj);

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
    postForm.reset()
}
    
    // onSubmitHandler()


postForm.addEventListener("submit", onSubmitHandler)

const onGetHander = () => {
    const xhr = new XMLHttpRequest();

xhr.open("Get", postUrl, true);

xhr.send();

xhr.onload = function(){
    // cl(xhr.response);

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

onGetHander()
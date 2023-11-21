const cl = console.log;
const cardContainer = document.getElementById('cardContainer');

let baseUrl = `https://jsonplaceholder.typicode.com`;

let postUrl = `${baseUrl}/posts`;

const xhr = new XMLHttpRequest();

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

xhr.open("Get", postUrl, true);

xhr.send();

xhr.onload = function(){
    // cl(xhr.response);

    if(xhr.status === 200){
        cl(xhr.response)
        let data = JSON.parse(xhr.response);
        cl(data)
        templating(data)
    }else{
        cl("something went wrong")
    }
}

console.log("hello world");
let baseurl = "https://tecacesever.herokuapp.com/"

// https request buttons
let getBtn = document.getElementById("callGetBtn");
getBtn.addEventListener("click", getSpreadSheet);

let postBtn = document.getElementById("callPostBtn");
postBtn.addEventListener("click", postSpreadSheet);

let deleteBtn = document.getElementById("callDeleteBtn");
deleteBtn.addEventListener("click", deleteSpreadSheet);

// clear buttons
let clearGetBtn = document.getElementById("clearGet");
clearGetBtn.addEventListener("click", () => {
    clearRespond("getResult");
})

let clearPostBtn = document.getElementById("clearPost");
clearPostBtn.addEventListener("click", () => {
    clearRespond("postResult");
})

let clearDeleteBtn = document.getElementById("clearDelete");
clearDeleteBtn.addEventListener("click", () => {
    clearRespond("deleteResult");
})

function loading(textBoxId) {
    let text = document.getElementById(textBoxId);
    clearRespond(text.id);
    console.log(text);
    let loadingCirle = text.nextElementSibling;
    if(loadingCirle) loadingCirle.classList.toggle("hidden");
    //console.log(textBox);
}

function clearRespond(textId) {
    let text = document.getElementById(textId);
    text.innerHTML = "";
}

function deleteSpreadSheet() {
    let text = document.getElementById("deleteResult");
    loading(text.id);
    let key = document.getElementById("deleteKey").value;
    let url = baseurl + "data/" + key;
    fetch(url, {
        method: "DELETE"
    })
    .then(respond => respond.json())
    .then(data => {
        let prettyData = JSON.stringify(data, null, 4);
        loading(text.id);
        text.innerHTML = prettyData;
        
    })
    .catch(err => {
        loading(text.id);
        window.alert("error");
    })
}

function postSpreadSheet() {
    let key = document.getElementById("postKey").value;
    let value = document.getElementById("postValue").value;
    let text = document.getElementById("postResult");
    loading(text.id);
    //console.log(key + "         " + value);
    let data = {};
    data[key] = value;
    let url = baseurl + "data";
    console.log(data);
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(data)
    })
    .then(respond => respond.json())
    .then((data) => {
        let prettyData = JSON.stringify(data, null, 4);
        loading(text.id);
        text.innerHTML = prettyData;
    })
    .catch (err => {
        loading(text.id);
        window.alert("error");
    })

}

function getSpreadSheet() {
    let text = document.getElementById("getResult");
    loading(text.id);
    fetch(baseurl)
        .then(respond => respond.json())
        .then(data => {
            let prettyData = JSON.stringify(data, null, 4)
            console.log(text.id);
            loading(text.id);
            text.innerHTML = prettyData;
        })
        .catch(err => {
            loading(textBox.id);
            window.alert("error");
        })
}

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

function clearRespond(textBoxId) {
    let textBox = document.getElementById(textBoxId);
    textBox.innerHTML = "";
}

function deleteSpreadSheet() {
    let key = document.getElementById("deleteKey").value;
    let url = baseurl + "data/" + key;
    fetch(url, {
        method: "DELETE"
    })
    .then(respond => respond.json())
    .then(data => {
        console.log(data);
        let text = document.getElementById("deleteResult");
        let prettyData = JSON.stringify(data, null, 4);
        text.innerHTML = prettyData;
    })
    .catch(err => {
        window.alert("error");
    })
}


function postSpreadSheet() {
    let key = document.getElementById("postKey").value;
    let value = document.getElementById("postValue").value;
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
        //console.log(data);

        let text = document.getElementById("postResult");
        let prettyData = JSON.stringify(data, null, 4);
        text.innerHTML = prettyData;

    })
    .catch (err => {
        window.alert("error");
    })

}

function getSpreadSheet() {
    fetch(baseurl)
        .then(respond => respond.json())
        .then(data => {
            let text = document.getElementById("getResult");
            let prettyData = JSON.stringify(data, null, 4)
            text.innerHTML = prettyData;
        })
        .then(() => {
            console.log("success");
        })
        .catch(err => {
            window.alert("error");
            console.log(err);
        })
}
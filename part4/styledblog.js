let postArr = [];
let dialog = document.getElementsByTagName("dialog")[0];
let editBtnClicked = false; 
let listIndex; 

window.onbeforeunload = function () {
    localStorage.setItem('blog', JSON.stringify(postArr));
}

window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('blog') != null && localStorage.getItem('blog').length > 0) {
        let div = document.getElementsByTagName('div')[0];
        div.innerHTML = "";
        postArr = JSON.parse(localStorage.getItem('blog'));

        let ul = document.getElementsByTagName("ul")[0];
        for (let i = 0; i < postArr.length; i++) {
            let li = document.createElement("li");
            let span = document.createElement("span");
            let str = postArr[i][0] + " (" + postArr[i][1] + "): " + postArr[i][2] + " ";
            span.textContent = str;
            ul.appendChild(li);
            li.appendChild(span);
            let editBtn = document.createElement("img");
            let deleteBtn = document.createElement("img");
            editBtn.src = "../icons/edit.png";
            editBtn.alt = "Edit"
            deleteBtn.src = "../icons/delete.png";
            deleteBtn.alt = "Delete"
            editBtn.setAttribute("list-index", i);
            deleteBtn.setAttribute("list-index", i);

            editBtn.addEventListener("click", editBtnEvent);
            deleteBtn.addEventListener("click", deleteBtnEvent);

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
        }
    }

    document.getElementById('add-btn').addEventListener("click", function() {
        dialog.show();
    });

    document.getElementById('save-btn').addEventListener("click", function() {
        let div = document.getElementsByTagName('div')[0];
        div.innerHTML = "";

        let title = document.getElementById("title");
        let date = document.getElementById("date");
        let summary = document.getElementById("summary");

        if (!editBtnClicked) {
            postArr.push([title.value, date.value, summary.value]);

            let str = title.value + " (" + date.value + "): " + summary.value + " ";
            let ul = document.getElementsByTagName("ul")[0];
            let li = document.createElement("li");
            let span = document.createElement("span");
            span.textContent = str;
            ul.appendChild(li);
            li.appendChild(span);
            let editBtn = document.createElement("img");
            let deleteBtn = document.createElement("img");
            editBtn.src = "../icons/edit.png";
            editBtn.alt = "Edit"
            deleteBtn.src = "../icons/delete.png";
            deleteBtn.alt = "Delete"
            editBtn.setAttribute("list-index", postArr.length-1);
            deleteBtn.setAttribute("list-index", postArr.length-1);

            editBtn.addEventListener("click", editBtnEvent);
            deleteBtn.addEventListener("click", deleteBtnEvent);

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
        } else {
            editBtnClicked = false;

            postArr[parseInt(listIndex)][0] = title.value;
            postArr[parseInt(listIndex)][1] = date.value;
            postArr[parseInt(listIndex)][2] = summary.value;

            let listElement = document.getElementsByTagName('li')[listIndex];
            let str = title.value + " (" + date.value + "): " + summary.value + " ";
            let span = listElement.firstChild;
            span.innerHTML = str;
        }
        closeDialog();
    });

    document.getElementById('cancel-btn').addEventListener("click", function() {
        closeDialog();
    });
}); 

function editBtnEvent() {
    editBtnClicked = true;
    listIndex = parseInt(this.getAttribute("list-index"));
    let title = document.getElementById("title");
    let date = document.getElementById("date");
    let summary = document.getElementById("summary");
    dialog.show();

    title.value = postArr[listIndex][0];
    date.value = postArr[listIndex][1];
    summary.value = postArr[listIndex][2];
}

function deleteBtnEvent() {
    listIndex = parseInt(this.getAttribute("list-index"));
    let allListElements = document.getElementsByTagName('li');
    for (let i = listIndex + 1; i < postArr.length; i++) {
        let allSpans = allListElements[i].children; 
        let editBtn = allSpans[1];
        editBtn.setAttribute("list-index", i-1);
        let delBtn = allSpans[2];
        delBtn.setAttribute("list-index", i-1);
    }

    let listElement = document.getElementsByTagName('li')[listIndex];
    listElement.remove();
    postArr.splice(listIndex,1);
    if (postArr.length == 0) {
        let div = document.getElementsByTagName('div')[0];
        div.innerHTML = "No blogs currently listed.";
    }
}

function closeDialog() {
    let dialog = document.getElementsByTagName("dialog")[0];
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("summary").value = "";
    dialog.close();
}
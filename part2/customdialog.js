/* difference between domcontentloaded and window.onload*/
window.addEventListener('DOMContentLoaded', function() {
    /* variable form doesn't work?!!!*/
    let dialog = document.getElementsByTagName("dialog")[0];
    document.getElementById('alert-btn').addEventListener("click", function() {
        let outputTag = document.getElementById("output-tag");
        outputTag.innerText = "";
        dialog.innerHTML = "";
        alert("Alert Pressed!");
    });

    document.getElementById('confirm-btn').addEventListener("click", function() {
        let outputTag = document.getElementById("output-tag");
        outputTag.innerText = "";
        dialog.innerHTML = "";
        confirm("Do you confirm this?");
    });

    document.getElementById('prompt-btn').addEventListener("click", function() {
        let outputTag = document.getElementById("output-tag");
        outputTag.innerText = "";
        dialog.innerHTML = "";
        prompt("What is your name?");
    });
}); 


function alert(text) {
    let dialog = document.getElementsByTagName("dialog")[0];
    dialog.innerHTML = text;
    let btn = document.createElement("button");
    btn.innerHTML = "Ok";
    dialog.appendChild(document.createElement("br"));
    dialog.appendChild(document.createElement("br"));
    dialog.appendChild(btn);
    dialog.show();

    btn.addEventListener('click', () => {
        dialog.close();
    });

}

function confirm(text) {
    let dialog = document.getElementsByTagName("dialog")[0];
    dialog.innerHTML = text;
    let okBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");
    okBtn.innerHTML = "Ok";
    cancelBtn.innerHTML = "Cancel";
    dialog.appendChild(document.createElement("br"));
    dialog.appendChild(document.createElement("br"));
    dialog.appendChild(cancelBtn);
    dialog.appendChild(okBtn);
    dialog.show();

    okBtn.addEventListener('click', () => {
        dialog.close();
        dialog.innerHTML = "";
        let outputTag = document.getElementById("output-tag");
        outputTag.innerHTML = "Confirm result : true";
    });

    cancelBtn.addEventListener('click', () => {
        dialog.close();
        dialog.innerHTML = "";
        let outputTag = document.getElementById("output-tag");
        outputTag.innerHTML = "Confirm result : False";
    });
}

function prompt(text) {
    let dialog = document.getElementsByTagName("dialog")[0];
    let label = document.createElement("label");
    label.for="name";
    label.textContent = text;

    let form = document.createElement("form");
    dialog.appendChild(form);
    let input = document.createElement("input");
    input.type="text";
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
    form.appendChild(input);

    let okBtn = document.createElement("input");
    okBtn.type="button";
    okBtn.value = "Ok";
    let cancelBtn = document.createElement("input");
    cancelBtn.type="button";
    cancelBtn.value = "Cancel";

    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(cancelBtn);
    form.appendChild(okBtn);
    dialog.show();

    okBtn.addEventListener('click', () => {
        let promptValue = input.value;
        dialog.close();
        dialog.innerHTML = "";
        let outputTag = document.getElementById("output-tag");
        outputTag.innerHTML = sanitizeResults`Prompt Result: ${promptValue}`; ;
    });

    cancelBtn.addEventListener('click', () => {
        dialog.close();
        dialog.innerHTML = "";
        let outputTag = document.getElementById("output-tag");
        outputTag.innerHTML = "User didn't enter anything";
    });
}

function sanitizeResults(strings, promptValue) {
    let saferValue = DOMPurify.sanitize(promptValue);
    // why is there a comma with strings
    return strings[0] + saferValue;
}
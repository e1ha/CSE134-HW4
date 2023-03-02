
// export function editBtnEvent() {
//     editBtnClicked = true;
//     listIndex = parseInt(this.getAttribute("list-index"));
//     let title = document.getElementById("title");
//     let date = document.getElementById("date");
//     let summary = document.getElementById("summary");
//     dialog.show();

//     title.value = postArr[listIndex][0];
//     date.value = postArr[listIndex][1];
//     summary.value = postArr[listIndex][2];
// }

// export function deleteBtnEvent() {
//     let allListElements = document.getElementsByTagName('li');
//     for (let i = listIndex + 1; i < postArr.length; i++) {
//         let allSpans = allListElements[i].children; 
//         let editBtn = allSpans[1];
//         editBtn.setAttribute("list-index", i-1);
//         let delBtn = allSpans[2];
//         delBtn.setAttribute("list-index", i-1);
//     }

//     let listElement = document.getElementsByTagName('li')[listIndex];
//     listElement.remove();
//     postArr.splice(listIndex,1);
//     if (postArr.length == 0) {
//         let div = document.getElementsByTagName('div')[0];
//         div.innerHTML = "No blogs currently listed.";
//     }
// }
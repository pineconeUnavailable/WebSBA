let excuseField = document.getElementById("excuse")
var shareFunc = (id) => {
    if(id != 'favorites'){
        let excuse = faves.getFavoriteById(id);
        excuseField.innerText = excuse.excuse;
    }
}

document.getElementById("tip").onclick = () => {
    faveCheck.checked = true;
    updateFaveVisibility(faveCheck);
}

function submitHandler(form) {
    if(document.getElementById("platform").value === "twitter") {
        window.location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(excuseField.value);
        return false;
    }

    return true;
}
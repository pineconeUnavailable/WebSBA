function getQueryParam(name) {
    try {
        let params = document.location.href.split("?")[1].split("&");
        let x;
        for (const param of params) {
            x = param.split("=");
            if(x[0] == name) {
                return x[1];
            }
        }
        throw "err";
    } catch (error) {
        return null;
    }
}

//Thank you! https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replace = function(idx, c) {
    return this.substring(0, idx) + c + this.substring(idx + c.length);
}

//hooks
const excuse = decodeURIComponent(getQueryParam("excuse"));
let fixedExcuse = "";
for (let i = 0; i < excuse.length; i++) {
    if(excuse[i] === '+'){
        fixedExcuse += " ";
    } else {
        fixedExcuse += excuse[i];
    }
}
console.log(fixedExcuse);
document.getElementById("excuse").innerHTML = fixedExcuse;
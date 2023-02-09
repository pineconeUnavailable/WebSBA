let output = document.getElementById("output")

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

//custom hooks
async function handleQueryParam(type) {
    if(type !== null){
        let queryUrl = "https://excuser-three.vercel.app/v1/excuse";
        if(type !== "any") {
            queryUrl += "/" + type
        }
        
        return fetch(queryUrl).then(async (resp) => {
            let json = await resp.json();
            let obj = Object.assign(new Favorite, json[0]);
            output.innerText = obj.excuse;
            return obj;
        }).catch((err) => {
            console.err(err);
            return null
        })
    }
}

async function addToFavorites() {
    await result.then(value => {
        faves.addFavorite(value, faveList)
    })
}

//hooks
let type = getQueryParam("type");
let result = handleQueryParam(type);
document.getElementById("category").value = type == null ? "any" : type;
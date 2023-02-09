let faveList = document.getElementById("favorites");
let favePaine = document.getElementById("favorites-paine");
let faveCheck = document.getElementById("faves");

class Favorite {
    excuse;
    category;
    id;

    constructor(excuse, category, id) {
        this.excuse = excuse;
        this.category = category;
        this.id = id;
    }

    render(dest) {
        let li = document.createElement("li");
        li.classList.add("fave");
        li.setAttribute("id", this.id)
        let btn = document.createElement("button");
        btn.innerText = '✕';
        let span = document.createElement("span")
        span.innerText = " " + this.excuse;
        li.appendChild(btn);
        li.appendChild(span);

        dest.appendChild(li)
    }
}

class Favorites {
    favorites;

    constructor() {
        this.favorites = new Array();
    }

    static transformJson(json) {
        let f = new Favorites();
        f.favorites = Object.assign(new Array, json.favorites);
        return f;
    }

    renderAll(dest) {
        for (let i = 0; i < this.favorites.length; i++) {
            this.favorites[i] = Object.assign(new Favorite, this.favorites[i])
        }
        for (const value of this.favorites) {
            value.render(dest);
        }
    }

    addFavorite(favorite, dest) {
        for(let elem of this.favorites) {
            if(elem.id == favorite.id) {
                return;
            }
        }        
        this.favorites.push(favorite);
        if(dest) {
            favorite.render(dest)
        }
    }

    removeFavoriteById(favoriteId, dest) {
        for(let i = 0; i < this.favorites.length; i++) {
            if(this.favorites[i].id == favoriteId){
                this.favorites.splice(i, 1);
                for (let i = 0; i < dest.children.length; i++) {
                    if(dest.children[i].getAttribute("id") == favoriteId) {
                        dest.removeChild(dest.children[i]);
                        break;
                    }
                }
                console.log("success")
                break;
            }
        }
        
    }
}

function initFavorites() {
    try {
        console.log("[Favorites]: Loading favorites...")
        return Favorites.transformJson(JSON.parse(decodeURIComponent(getCookieValue("favorites"))));
    } catch (error) {
        console.log("[Favorites]: No favorites found.")
        return new Favorites();
    }
}

//Thank you <3 https://stackoverflow.com/a/15724300/12578780
function getCookieValue(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

//existing hooks
function handleFaveClick(event) {
    if(event.target.tagName == "BUTTON") {
        faves.removeFavoriteById(event.target.parentElement.getAttribute("id"), faveList)
    }
}

function updateFaveVisibility(checkBox){
    if (checkBox.checked) {
        favePaine.setAttribute("aria-hidden", false)
    } else {
        favePaine.setAttribute("aria-hidden", true)
    }
}

//hooks
let faves = initFavorites();
faves.renderAll(faveList)
console.log("[Favorites]: Done!")
updateFaveVisibility(faveCheck)

window.onbeforeunload = () => {
    document.cookie = "favorites=" + encodeURIComponent(JSON.stringify(faves)) + "; SameSite=Strict";
};
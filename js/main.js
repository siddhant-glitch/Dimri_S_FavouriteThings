import { fetchData } from "./modules/DataMiner.js";

(() => {
    // stub * just a place for non-component-specific stuff
    console.log('loaded');

    let lightBox = document.querySelector(".lightbox");
    let lbClose = lightBox.querySelector("span");
    let things = document.querySelectorAll(".thingContainer");
    
    function showLightbox() {

        lightBox.classList.toggle('show-lightbox');
        
    }

    lbClose.addEventListener("click", showLightbox);
    things.forEach(thing => thing.addEventListener("click", showLightbox));

    function popErrorBox(message) {
        alert("Something has gone horribly, horribly wrong");
    }

    function handleDataSet(data) {
        let userSection = document.querySelector('.user-section'),
            userTemplate = document.querySelector('#user-template').content;

        for (let user in data) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

            
            currentUserText[2].textContent = data[user].name;
            currentUserText[3].textContent = data[user].role;
            currentUserText[4].textContent = data[user].nickname;
            currentUserText[1].src = `images/${data[user].avatar}`;

            // add this new user to the view
            userSection.appendChild(currentUser);
        }
    }

    function retrieveProjectInfo() {
        // test for an ID
        debugger;
        console.log(this.id);

        fetchData(`./includes/index.php?id=${this.id}`).then(data => console.log(data)).catch(err => console.log(err));
    }

    function renderPortfolioThumbnails(thumbs) {
        let userSection = document.querySelector('.user-section'),
            userTemplate = document.querySelector('#user-template').content;

        for (let user in thumbs) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

            currentUserText[1].src = `images/${thumbs[user].avatar}`;
            currentUserText[1].id = thumbs[user].id;
            // add this new user to the view
            currentUser.addEventListener("click", retrieveProjectInfo);
            userSection.appendChild(currentUser);
        }
    }
        
    fetchData("./includes/index.php").then(data => renderPortfolioThumbnails(data)).catch(err => console.log(err));
})();
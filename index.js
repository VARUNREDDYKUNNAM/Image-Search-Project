const accessKey = "IyQc6JK0kr_HP1fPBr_XN64mHX3t6LMod5EiaGkUCgU";

const formEl = document.querySelector("form")
const searchInputEl = document.getElementById("search-input")
const searchReasultsEl = document.querySelector(".search-results")
const showMoreButtonEl = document.getElementById("show-more-button")

let inputData = "";
let page = 1;

async function searchImage(){
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=1${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
        if(page === 1){
            searchReasultsEl.innerHTML = "";
        }

        const results = data.results;
        results.map((result)=>{
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchReasultsEl.appendChild(imageWrapper);

        });

        page++;
        console.log(page);


        if(page>1 & page<3){
            showMoreButtonEl.style.display = "block";
        }
        
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImage();
});

showMoreButtonEl.addEventListener("click",() =>{
    searchImage();
});

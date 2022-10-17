function createHTML(countries){
    let countriesInHTML =``;
    let darkModeflag = JSON.parse(localStorage.getItem('darkMode'));
    let darkModeElement = darkModeflag ? 'dark-mode-elements':'';

    if(countries !== undefined && countries.length !== 0){
        countries.forEach(element => {
            let countryCode = element.cca3;
            let yellowStar = setStarFav(countryCode);

            countriesInHTML += `
            <div class="${darkModeElement} p-0 m-0 card shadow border-0  h-100" name="element"
            draggable="true" ondragstart="drag(event)" ondragend="dragEnd(event)"
            style="width: calc( 33% - 40px); min-width: 250px;  max-height:380px; border-radius: 5px;" id="${countryCode}">            
                <a href="./info.html?name=${element.name.common}" class="${darkModeElement} btn text-start p-0 m-0 border-0 w-100 h-100" name="element">
                    
                        <img src="${element.flags.svg}" class="w-100 h-50" alt="${element.name.common}" style="object-fit: cover; border-radius: 5px 5px 0px 0px;">
                        <div class="${darkModeElement} card-body px-4 h-50" style="border-radius: 0px 0px 5px 5px;" name="element">
                            <h5 class="${darkModeElement} card-title mb-3 mt-2 fw-bold"  name="element">${element.name.common}</h5>
                            <div class="card-text mb-4">
                                <div class="info"><strong class="fw-semibold">Population:</strong> ${element.population.toLocaleString()}</div>
                                <div class="info"><strong class="fw-semibold">Region:</strong> ${element.region}</div>
                                <div class="info"><strong class="fw-semibold">Capital:</strong> ${element.capital}</div>
                            </div>
                        </div>
                    
                </a>
                <div class=" d-lg-none position-absolute bottom-0 end-0 pb-2 pe-2"><i name="star" class="${yellowStar} text-secondary fa-sharp fa-solid fa-star" id="${countryCode}-star" onclick="changeFav('${countryCode}')"></i></div>
            </div>`;
        });
    }else{
        countriesInHTML = `<div class="${darkModeElement}">No Results Found</div>`;
    }

    return countriesInHTML;
}


function createFavHTML(){
    let darkModeflag = JSON.parse(localStorage.getItem('darkMode'));
    let darkModeElement = darkModeflag ? 'dark-mode-background':'';

    let HTMLfavorites = ``;
    render(HTMLfavorites,"fav-list");

    for (countryCode of favourites) {
        let countryInfo = allCountries.find(function (element) {
            return countryCode == element.cca3;
        });
        HTMLfavorites += `<div class="p-1 d-flex" style="height: 40px ;">
                                <div class="d-flex align-items-center w-80 flex-grow-1" onclick="location.href='./details.html?country=${countryInfo.cca3}'">
                                    <img src="${countryInfo.flags.svg}" alt="${countryInfo.name.common}" class=" rounded p-1" style="height: 25px ; width =40px ; object-fit: cover;">
                                    <span class="ps-2 fw-bold">${countryInfo.name.common}</span>
                                </div>
                                <div class="flex-shrink-1 pe-3">
                                    <div class="${darkModeElement} normal-mode-background rounded-circle p-1 text-center" style="height: 30px ; width:30px ;" name="back">
                                    <i onclick="removeFavourites('${countryCode}')" class="fa-solid fa-xmark fs-6" ></i>
                                    </div>
                                </div>
                              </div>`;
    }
    render(HTMLfavorites,"fav-list");
}

function createInfoHTML(country){

    let countryInHTML = ``;

    if(country !== undefined &&  country.status !== 404){

        countryInHTML = `
        <img src="${country[0].flags.svg}" alt="${country[0].flags.svg}" class="col col-lg-5 mb-5 mb-lg-0" style="height: 400px; object-fit: cover;">

        <div class="col-lg-6 ">

            <h2 class="fs-2 fw-bold">${country[0].name.common}</h2>
            <div class="row justify-content-between">
                <div class="my-3 col-lg-6">
                    <p class="my-2"><strong class="fw-semibold">Native Name:</strong> ${Object.values(country[0].name.nativeName)[0].common}</p>
                    <p class="my-2"><strong class="fw-semibold">Population:</strong> ${country[0].population.toLocaleString()}</p>
                    <p class="my-2"><strong class="fw-semibold">Region:</strong> ${country[0].region}</p>
                    <p class="my-2"><strong class="fw-semibold">Sub Region:</strong> ${country[0].subregion}</p>
                    <p class="my-2"><strong class="fw-semibold">Capital:</strong> ${country[0].capital}</p>
                </div>

                <div class="my-3 col-lg-6">
                    <p class="my-2"><strong class="fw-semibold">Top Level Domain:</strong> ${country[0].tld}</p>
                    <p class="my-2"><strong class="fw-semibold">currencies:</strong> ${Object.values(country[0].currencies).map(cur => cur.name).join(",")}</p>
                    <p class="my-2"><strong class="fw-semibold">Languages:</strong> ${Object.values(country[0].languages).join(", ")}</p>
                </div>

                <div class="row align-items-center my-3 ">
                    <div class="col-lg-3 mb-3 mb-lg-0"><strong class="fw-semibold">Border Countries:</strong></div>
                    <div class="borderBtns col-lg-9 d-flex flex-wrap justify-content-start gap-2" id="borderBtns">


                    </div>
                </div>
            </div>
        </div>`;
    }else{
        countryInHTML = `<div class="${darkModeElement}">Something Wrong</div>`;
    }

    return countryInHTML;
}

function createBorderHtml(borders){
    let darkModeflag = JSON.parse(localStorage.getItem('darkMode'));
    let darkModeElement = darkModeflag ? 'dark-mode-elements':'';
    let borderBtn =``;
    if(borders){
        borders.forEach(async element => {
            console.log('this beebeebbe');
            let borderCountry = await fetchBorderCountry(element);
            borderBtn =`<button class="${darkModeElement} rounded border-0 shadow  px-lg-4 py-lg-1 px-3 py-0  col-lg-3" name="element" onclick="location.href='info.html?name=${borderCountry[0].name.common}'">${borderCountry[0].name.common}</button>`;
            document.getElementsByClassName("borderBtns")[0].innerHTML += borderBtn;
        });
        
    }else{
        borderBtn = `<button class="${darkModeElement} rounded border-0 shadow  px-lg-4 py-lg-1 px-3 py-0   col-lg-3" name="element" > No borders </button>`;
        console.log(borderBtn);
    }
    return borderBtn;
}



function render(HTML,className){
    document.getElementById(className).innerHTML = HTML;
}

function setStarFav(code) {
    return favourites.includes(code) ? "text-warning" : "";
}

function changeFav(code) {
    favourites.includes(code) ? removeFavourites(code) : addFavourites(code);
}
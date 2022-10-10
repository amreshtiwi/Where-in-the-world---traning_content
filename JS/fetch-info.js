async function render(){
    let darkModeflag = JSON.parse(localStorage.getItem('darkMode')); //retreive the status of dark mode from local storge
    if(darkModeflag === true){
        darkMode();
    }
    await fetchCountryInfo();
}

async function fetchCountryInfo(){
    let params = new URLSearchParams(location.search);
    let countryname = params.get('name');
    let url =`https://restcountries.com/v3.1/name/${countryname}`;

    let countries = undefined;
    let NoReseultFlag = true;
    let countriesInHTML=``;

    countries = await fetch(url) //ftech the API
        .then(response => {
            if (!response.ok) {
                NoReseultFlag = false;                    
                return NoReseultFlag
            }
                NoReseultFlag = true;
                return response.json();
            })
        .catch(error => {
            console.error('Could not fetch verse:', error)
        });
    
    
    if(countries !== undefined &&  NoReseultFlag){

                countriesInHTML = `
                <img src="${countries[0].flags.svg}" alt="${countries[0].flags.svg}" class="col col-lg-5 mb-5 mb-lg-0" style="height: 400px; object-fit: cover;">

                <div class="col-lg-6 ">
    
                    <h2 class="fs-2 fw-bold">${countries[0].name.common}</h2>
                    <div class="row justify-content-between">
                        <div class="my-3 col-lg-6">
                            <p class="my-2"><strong class="fw-semibold">Native Name:</strong> ${Object.values(countries[0].name.nativeName)[0].common}</p>
                            <p class="my-2"><strong class="fw-semibold">Population:</strong> ${countries[0].population}</p>
                            <p class="my-2"><strong class="fw-semibold">Region:</strong> ${countries[0].region}</p>
                            <p class="my-2"><strong class="fw-semibold">Sub Region:</strong> ${countries[0].subregion}</p>
                            <p class="my-2"><strong class="fw-semibold">Capital:</strong> ${countries[0].capital}</p>
                        </div>
        
                        <div class="my-3 col-lg-6">
                            <p class="my-2"><strong class="fw-semibold">Top Level Domain:</strong> ${countries[0].tld}</p>
                            <p class="my-2"><strong class="fw-semibold">currencies:</strong> ${Object.values(countries[0].currencies).map(cur => cur.name).join(",")}</p>
                            <p class="my-2"><strong class="fw-semibold">Languages:</strong> ${Object.values(countries[0].languages).join(", ")}</p>
                        </div>
        
                        <div class="row align-items-center my-3 ">
                            <div class="col-lg-3 mb-3 mb-lg-0"><strong class="fw-semibold">Border Countries:</strong></div>
                            <div class="borderBtns col-lg-9 d-flex flex-wrap justify-content-start gap-2" id="borderBtns">

        
                            </div>
                        </div>
                    </div>
                </div>`;

                document.getElementById("info-section").innerHTML = countriesInHTML;

                let darkModeflag = JSON.parse(localStorage.getItem('darkMode'));
                let darkModeElement = darkModeflag ? 'dark-mode-elements':'';
                let borderBtn =``;
                let border = countries[0].borders;
                if (border) {
                    border.forEach(async element => {
                        let url = `https://restcountries.com/v3.1/alpha/${element}`;
                        console.log(element);
                        let borderCountry = await fetch(url) //ftech the API
                        .then(response => {
                            if (!response.ok) {                    
                                throw new Error(`HTTP error: ${response.status}`);
                            }
                                return response.json();
                            })
                        .catch(error => {
                            console.error('Could not fetch verse:', error)
                        });
                        console.log(borderCountry);
                        borderBtn =`<button class="${darkModeElement} rounded border-0 shadow  px-lg-4 py-lg-1 px-3 py-0 text-nowrap  col-lg-3" name="element" onclick="location.href='info.html?name=${borderCountry[0].name.common}'">${borderCountry[0].name.common}</button>`;
                        document.getElementsByClassName("borderBtns")[0].innerHTML += borderBtn;
                    });
                } else {
                    borderBtn = `<button class="${darkModeElement} rounded border-0 shadow  px-lg-4 py-lg-1 px-3 py-0 text-nowrap  col-lg-3" name="element" > No borders </button>`;
                    document.getElementsByClassName("borderBtns")[0].innerHTML += borderBtn;
                }
        
    }else{
        let darkModeflag = JSON.parse(localStorage.getItem('darkMode'));
        let darkModeElement = darkModeflag ? 'dark-mode-elements':'';
        document.getElementById("info-section").innerHTML = `<div class="${darkModeElement}">Somthing Wrong<div>`;
    }


}
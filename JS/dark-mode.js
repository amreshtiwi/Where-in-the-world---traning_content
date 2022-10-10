function darkMode(){
    document.getElementById("body").classList.toggle("dark-mode-background");
    let dark_mode_elemnt = document.getElementsByName("element");
    dark_mode_elemnt.forEach(element => {
        element.classList.toggle("dark-mode-elements");
    });
}

function darkModeValue(){
    localStorage.setItem('darkMode', JSON.stringify(!JSON.parse(localStorage.getItem('darkMode'))));
}
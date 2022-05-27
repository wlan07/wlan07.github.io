import { listenToThemeSwitching, darkMode } from './utils/reusables.js';




const dark_bg_color = "#151515";
const light_bg_color = "#f5f5f5";


const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
    changeHeaderBarColor(true);
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
    changeHeaderBarColor(false);
}



function changeHeaderBarColor(dark) {
    document.getElementsByTagName('meta')["theme-color"].content = dark ? dark_bg_color : light_bg_color;
    document.getElementsByTagName('meta')["msapplication-navbutton-color"].content = dark ? dark_bg_color : light_bg_color;
    document.getElementsByTagName('meta')["apple-mobile-web-app-status-bar-style"].content = dark ? dark_bg_color : light_bg_color;
}



listenToThemeSwitching(disableDarkMode, enableDarkMode);



if (darkMode() == 'enabled') {
    enableDarkMode();
}



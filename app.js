let github_user_name = "wlan07";
let repos = [

    "game_characters_ui",
    "game_characters_ui",
    "game_characters_ui",
    "game_characters_ui",
    "game_characters_ui",
    "game_characters_ui",
    "game_characters_ui"

];



let darkMode = localStorage.getItem('darkMode');
const osp_items = document.querySelector(".osp-items");
const darkModeToggle = document.querySelector('#dark-mode-toggle');


function update_osp_items(darkMode) {

    osp_items_innerHtml = "";

    repos.forEach(element => {
        osp_items_innerHtml += `<a href='https://github.com/wlan07/${element}'><img \
    src='https://github-readme-stats.vercel.app/api/pin/?username=${github_user_name}&repo=${element}&theme=${darkMode == 'enabled' ? 'dark' : 'light'}'></a>`;
    });

    osp_items.innerHTML = osp_items_innerHtml
}


const enableDarkMode = () => {
    update_osp_items('enabled');
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    update_osp_items(null)
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
}

if (darkMode === 'enabled') {
    enableDarkMode();
} else {
    update_osp_items(darkMode);
}



darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');

    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});















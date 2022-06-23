import { listenToThemeSwitching, darkMode } from './utils/reusables.js';

const github_user_name = "wlan07";
const repos = [];
const skills = [

    {
        "image_alt": "dart",
        "image_url": "https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white"
    },
    {
        "image_alt": "flutter",
        "image_url": "https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white",
    },
    {
        "image_url": "https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black",
        "image_alt": "firebase"
    },
    {
        "image_alt": "graphql",
        "image_url": "https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white"
    },
    {
        "image_url": "https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white",
        "image_alt": "bash",
    },
    {
        "image_url": "https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue",
        "image_alt": "python"
    },
    {
        "image_alt": "django",
        "image_url": "https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green",
    },
    {
        "image_alt": "selenium",
        "image_url": "https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=Selenium&logoColor=white"
    },
    {
        "image_url": "https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white",
        "image_alt": "C",
    },
    {
        "image_url": "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white",
        "image_alt": "JAVA"
    },
    {
        "image_alt": "HTML5",
        "image_url": "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"
    },
    {
        "image_alt": "php",
        "image_url": "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
    },
    {
        "image_url": "https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E",
        "image_alt": "javascript"
    },
    {
        "image_url": "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
        "image_alt": "CSS3"
    },
    {
        "image_alt": "MySQL",
        "image_url": "https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white",
    },
    {
        "image_alt": "mongoDB",
        "image_url": "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"
    },
    {
        "image_alt": "sqlite",
        "image_url": "https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white"
    },
    {
        "image_alt": "Linux",
        "image_url": "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"
    }

];

let showMore = false;

const loading_spinner = () => document.querySelector(".loading-spinner");
const osp_items = () => document.querySelector(".osp-items");
const skills_items = () => document.querySelector(".skills-badges");



function update_osp_items() {

    let osp_items_innerHtml = "";

    for (let i = 0; i < repos.length; i++) {
        if (showMore) {
            osp_items_innerHtml += `<a href='https://github.com/wlan07/${repos[i]}'><img  \
            src='https://github-readme-stats.vercel.app/api/pin/?username=${github_user_name}&repo=${repos[i]}&theme=${darkMode() == 'enabled' ? 'dark' : 'light'}'></a>`;
        } else {
            if (i < 6) {
                osp_items_innerHtml += `<a href='https://github.com/wlan07/${repos[i]}'><img  \
                src='https://github-readme-stats.vercel.app/api/pin/?username=${github_user_name}&repo=${repos[i]}&theme=${darkMode() == 'enabled' ? 'dark' : 'light'}'></a>`;
            } else {
                break;
            }
        }
    }
    osp_items().innerHTML = osp_items_innerHtml;

}


function update_skills_items() {


    let skills_items_innerHtml = "";

    skills.forEach(element => {
        skills_items_innerHtml += `<img src=${element["image_url"]}
        alt=${element["image_alt"]}>`;
    });

    skills_items().innerHTML = skills_items_innerHtml;
}


function listenToShowMoreClick() {
    document.getElementById('showMore').onclick = () => {

        showMore = !showMore;
        event.target.textContent = showMore ? "See Less" : "See More";
        document.activeElement.blur();
        update_osp_items();
    }
}





function hideLoadingSpinner() {
    loading_spinner().style.display = "none";
}


async function getOSP() {


    await fetch(`https://api.github.com/users/${github_user_name}/repos`)
        .then(response => response.json())
        .then(data => {
            data.filter((element, index) => {
                return !element["fork"] && element["stargazers_count"] > 0
            }).sort((a, b) => b["stargazers_count"] - a["stargazers_count"]).forEach(repo => {
                repos.push(repo["name"]);
            });
        })
        .catch(error => console.error(error));



    return;

};





await getOSP();







update_osp_items();
update_skills_items();
hideLoadingSpinner();

listenToShowMoreClick();


listenToThemeSwitching(update_osp_items, update_osp_items);



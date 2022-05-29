import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore/lite';

import { listenToThemeSwitching, darkMode } from './utils/reusables.js';

const github_user_name = "wlan07";
const repos = [];
const skills = [];

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


const firebaseConfig = {
    apiKey: "AIzaSyAsY086T3GAr3eeIFpby9NlXsaSfQ56y3E",
    authDomain: "wlan07-2c4a6.firebaseapp.com",
    projectId: "wlan07-2c4a6",
    storageBucket: "wlan07-2c4a6.appspot.com",
    messagingSenderId: "588169029021",
    appId: "1:588169029021:web:9eb1f141076d030d75bb74"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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



async function getSkills() {

    const skillsCol = collection(db, 'skills');
    const skillsSnapshot = await getDocs(query(skillsCol, orderBy("index")));
    skillsSnapshot.docs.forEach(doc => {
        skills.push(doc.data());
    });


    return;

};


await Promise.all([
    getOSP(),
    getSkills(),
]);







update_osp_items();
update_skills_items();
hideLoadingSpinner();

listenToShowMoreClick();


listenToThemeSwitching(update_osp_items, update_osp_items);



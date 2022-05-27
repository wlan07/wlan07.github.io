import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore/lite';

import { listenToThemeSwitching, darkMode } from './utils/reusables.js';

const github_user_name = "wlan07";
const repos = [];
const skills = [];
const blogs = [];


const loading_spinner = () => document.querySelector(".loading-spinner");
const osp_items = () => document.querySelector(".osp-items");
const skills_items = () => document.querySelector(".skills-badges");
const blogs_items = () => document.querySelector(".blog-items");


function update_osp_items() {


    let osp_items_innerHtml = "";

    repos.forEach(element => {
        osp_items_innerHtml += `<a href='https://github.com/wlan07/${element}'><img \
    src='https://github-readme-stats.vercel.app/api/pin/?username=${github_user_name}&repo=${element}&theme=${darkMode() == 'enabled' ? 'dark' : 'light'}'></a>`;
    });

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

function update_blogs_items() {

    let blogs_items_innerHtml = "";

    blogs.forEach(element => {
        blogs_items_innerHtml += `<div class="blog-item">

        <img class="blog-item__header-image" src="${element["cover_image_url"]}" alt="why flutter?">
        <div class="blog-item__title title ">${element["title"]}</div>
        <div class="blog-item__subtitle subtitle">${element["subtitle"]}</div>
        <div class="blog-item__bottom-bar"></div>
    </div>`;
    });

    blogs_items().innerHTML = blogs_items_innerHtml;
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

    const ospCol = collection(db, 'osp');
    const ospSnapshot = await getDocs(ospCol);

    ospSnapshot.docs.forEach(doc => {
        repos.push(doc.data()["github_repo_link"]);
    });


    return;

};


async function getBlogs() {

    const blogsCol = collection(db, 'blogs');
    const blogsSnapshot = await getDocs(blogsCol);

    blogsSnapshot.docs.forEach(doc => {
        blogs.push(doc.data());
    });


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
    getBlogs()
])



update_osp_items();
update_skills_items();
update_blogs_items();
hideLoadingSpinner();


listenToThemeSwitching(update_osp_items, update_osp_items);



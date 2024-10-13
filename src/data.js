import { listenToThemeSwitching, darkMode } from './utils/reusables.js';
import ExperienceEntry from './models/experience_model.js';

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

// $(document).ready(function () {
//     if (Modernizr.csstransitions && Modernizr.csstransforms) {
//         $(".sexytabs").tabs({
//             show: {
//                 effect: "slide",
//                 direction: "left",
//                 duration: 200,
//                 easing: "easeOutBack"
//             },
//             hide: {
//                 effect: "slide",
//                 direction: "right",
//                 duration: 200,
//                 easing: "easeInQuad"
//             }
//         });
//     } else {
//         console.warn("CSS transitions and transforms are not supported. Consider updating your browser.");
//         // initialize tabs without the slide effect as a fallback
//         $(".sexytabs").tabs();
//     }
// });

// function populateTimeline(entries) {
//     const timelineDiv = document.querySelector('#timeline .timeline-wrapper ul');

//     // Clear existing list items
//     while (timelineDiv.firstChild) {
//         timelineDiv.removeChild(timelineDiv.firstChild);
//     }

//     // Add new list items
//     entries.forEach(entry => {
//         const li = document.createElement('li');

//         // Create bullet div
//         const bulletDiv = document.createElement('div');
//         bulletDiv.className = `bullet ${entry.color}`;
//         li.appendChild(bulletDiv);

//         // Create date div with class="date"
//         const dateDiv = document.createElement('div');
//         dateDiv.className = 'date'; // Explicitly setting the class
//         dateDiv.textContent = entry.dates;
//         li.appendChild(dateDiv);

//         // Create description div with class="desc"
//         const descDiv = document.createElement('div');
//         descDiv.className = 'desc'; // Explicitly setting the class

//         // Create title
//         const titleH3 = document.createElement('h3');
//         titleH3.textContent = entry.title;
//         descDiv.appendChild(titleH3);

//         // Create company name
//         const companyNameH4 = document.createElement('h4');
//         companyNameH4.textContent = entry.companyName;
//         descDiv.appendChild(companyNameH4);

//         li.appendChild(descDiv);
//         timelineDiv.appendChild(li);
//     });
// }


function populateTimeline(entries) {
    const timelineDiv = document.querySelector('#experience-timeline .timeline'); // Adjusted selector

    // Clear existing list items
    while (timelineDiv.firstChild) {
        timelineDiv.removeChild(timelineDiv.firstChild);
    }

    // Add new list items
    entries.forEach((entry, index) => {
        const li = document.createElement('li');
        // Optionally add 'timeline-inverted' class for every other item
        if (index % 2 !== 0) {
            li.classList.add('timeline-inverted');
        }

        // Create bullet div
        const bulletDiv = document.createElement('div');
        bulletDiv.className = 'tl-circ';
        li.appendChild(bulletDiv);

        // Create timeline panel
        const timelinePanel = document.createElement('div');
        timelinePanel.className = 'timeline-panel';

        // Create tl-heading div
        const tlHeading = document.createElement('div');
        tlHeading.className = 'tl-heading';
        const headingH4 = document.createElement('h4');
        headingH4.textContent = entry.title;
        // Create SVG element with the provided specifications
        const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgIcon.setAttribute("height", "24");
        svgIcon.setAttribute("width", "24");
        svgIcon.setAttribute("viewBox", "0 0 576 512");

        svgIcon.innerHTML = '<path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>';

        // Append headingH4 and SVG to tlHeading
        tlHeading.appendChild(headingH4);
        if (entry.highlighted) {
            tlHeading.appendChild(svgIcon);
        }
        // Create tl-body div
        const tlBody = document.createElement('div');
        tlBody.className = 'tl-body paragraph vp1';
        const bodyP = document.createElement('p');
        bodyP.textContent = entry.description;
        tlBody.appendChild(bodyP);

        // Create tldate div
        const tldateDiv = document.createElement('div');
        tldateDiv.className = 'tldate';
        tldateDiv.textContent = entry.dates;

        // Append to timeline panel
        timelinePanel.appendChild(tlHeading);
        timelinePanel.appendChild(tlBody);
        timelinePanel.appendChild(tldateDiv);

        // Append timeline panel to li
        li.appendChild(timelinePanel);

        // Append li to timelineDiv
        timelineDiv.appendChild(li);
    });
}

const experienceEntries = [
    new ExperienceEntry(
        "Cybersecurity Enthusiast & Developer",
        "Dived into the world of hacking, focusing on computer systems, networks, and security best practices. Developed proficiency in Linux, networking, and various hacking tools.",
        "2016 - 2019",
        false
    ),
    new ExperienceEntry(
        "Python & Java Developer",
        "Acquired foundational and advanced knowledge in Python and Java, applying these skills to develop games and automate tasks.",
        "2019 - Present",
        false
    ),
    new ExperienceEntry(
        "Senior Flutter Developer & Technical Lead",
        "Mastered Flutter for mobile app development, leading to the development of numerous personal projects and contributions to many startups and large companies through full-time freelancing. Also served as a Technical Lead, guiding teams in complex mobile development projects.",
        "2019 - Present",
        true
    ),
    new ExperienceEntry(
        "Django Framework Specialist",
        "Leveraged existing Python skills to learn Django, enhancing project development capabilities.",
        "2022 - Present",
        false
    ),
    // new ExperienceEntry(
    //     "Spring Boot Explorer",
    //     "Began exploring Spring Boot, attracted by its architecture and integration capabilities, indicating ongoing commitment to learning and adapting to new technologies.",
    //     "2024 - Present"
    // ),
];



populateTimeline(experienceEntries);
const progressBar = document.querySelector("#progress-bar");
const content = document.querySelector("#content")


export const animateProgressBar = () => {

    let scrollDistance = content.scrollTop;
    let progressWidth = (scrollDistance / (content.scrollHeight - content.clientHeight)) * 100;

    let value = Math.floor(progressWidth);


    if (value < 0) {
        value = 0;
    }


    progressBar.style.width = value + "%";


}


content.addEventListener('scroll', animateProgressBar);


const darkModeToggle = document.querySelector('#dark-mode-toggle');

export const darkMode = () => {
    return localStorage.getItem('darkMode');
}

export function listenToThemeSwitching(darkCallBack, lightCallBack) {

    darkModeToggle.addEventListener('click', () => {
        let darkMode = localStorage.getItem('darkMode');

        if (darkMode == 'enabled') {
            darkCallBack();
            console.log("DISABLE DARK MODE");
        } else {
            lightCallBack();
            console.log("ENABLE DARK MODE");
        }
    });

}
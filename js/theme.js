if (window.localStorage.getItem('darkTheme') != null) {
    document.getElementById('darkTheme').checked = Boolean(window.localStorage.getItem('darkTheme'));
    document.body.classList = Boolean(window.localStorage.getItem('darkTheme')) ? ['dark'] : ['light'];
    document.getElementsByTagName('footer')[1].classList = document.getElementById('darkTheme').checked ? ['footer has-background-black'] : ['footer has-background-white'];
    document.querySelectorAll('div.appBar > span')[1].classList = document.getElementById('darkTheme').checked ? ['dark'] : ['light'];
    document.querySelectorAll('.title')[0].classList = document.getElementById('darkTheme').checked ? ['title dark'] : ['title light'];
    document.querySelectorAll('.subtitle')[0].classList = document.getElementById('darkTheme').checked ? ['subtitle dark'] : ['subtitle light'];
}
document.getElementById('darkTheme').addEventListener('click', () => {
    window.localStorage.setItem('darkTheme', document.getElementById('darkTheme').checked);
    document.body.classList = document.getElementById('darkTheme').checked ? ['dark'] : ['light'];
    document.getElementsByTagName('footer')[1].classList = document.getElementById('darkTheme').checked ? ['footer has-background-black'] : ['footer has-background-white'];
    document.querySelectorAll('div.appBar > span')[1].classList = document.getElementById('darkTheme').checked ? ['dark'] : ['light'];
    document.querySelectorAll('.title')[0].classList = document.getElementById('darkTheme').checked ? ['title dark'] : ['title light'];
    document.querySelectorAll('.subtitle')[0].classList = document.getElementById('darkTheme').checked ? ['subtitle dark'] : ['subtitle light'];
});

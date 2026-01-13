const contentContainer = document.getElementById('content-container');
const navContentContainer = document.getElementById('nav-content-container');

function startupload(){
    pageToUse = 'index';
    navToUse = 'indexnav';
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('page')) {
        pageToUse = urlParams.get('page');
        navToUse = pageToUse+'nav';
    }
    loadPage(pageToUse);
    loadPageNav(navToUse);    
    // Update URL and history (optional but recommended)
    history.pushState({ page: 'index' }, null, `/index`);
}

async function loadPage(pageName) {
    // Fetch HTML content (e.g., home.html, about.html)
    const response = await fetch(`profjapiegreeffweb/assets/pages/${pageName}.html`);
    const html = await response.text();
    contentContainer.innerHTML = html;
}

async function loadPageNav(navName){
    // Fetch HTML content (e.g., indexnav.html)
    const navresponse = await fetch(`profjapiegreeffweb/assets/pages/${navName}.html`);
    const navhtml = await navresponse.text();
    navContentContainer.innerHTML = navhtml;
}

function navigate(event, pageName, navName) {
    event.stopPropagation()
    event.preventDefault(); // Prevent full page reload
    event.stopPropagation()
    loadPageNav(navName);
    loadPage(pageName);
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    // Update URL and history (optional but recommended)
    history.pushState({ page: pageName }, null, `/${pageName}`);
}

// Function to handle the click event
function toggleBodyClass(event) {
    event.stopPropagation()
    // Select the body element and toggle the 'header-visible' class
    document.body.classList.toggle('header-visible');
}

// Load initial page on startup
window.onload = () => startupload();
// Handle browser back/forward buttons
window.onpopstate = (event) => {
    if (event.state && event.state.page) {
        loadPageNav(`${event.state.page}nav`);
        loadPage(event.state.page);
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
        });
    }
};


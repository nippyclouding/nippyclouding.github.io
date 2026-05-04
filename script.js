// 헤더 
async function loadHeader() {
    try {
        // GitHub Pages 경로 문제를 방지하기 위해 절대 경로 방식 권장
        const response = await fetch('header.html');
        if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
        
        const data = await response.text();
        document.getElementById('header-container').innerHTML = data;
        
        // 헤더 로드 완료 후 현재 메뉴 활성화 실행
        setActiveMenu();
    } catch (error) {
        console.error('헤더를 불러오는 중 오류 발생:', error);
    }
}

// active 동작 
function setActiveMenu() {
    // 현재 웹페이지의 파일 이름 추출 (예: index.html)
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';

    // 각 메뉴 아이디를 찾아 active 클래스 부여
    if (page === 'index.html') {
        const homeMenu = document.getElementById('nav-home');
        if (homeMenu) homeMenu.classList.add('active');
    } else if (page === 'about.html') {
        const aboutMenu = document.getElementById('nav-about');
        if (aboutMenu) aboutMenu.classList.add('active');
    } else if (page === 'project.html') {
        const projectMenu = document.getElementById('nav-project');
        if (projectMenu) projectMenu.classList.add('active');
    }
}

window.addEventListener('DOMContentLoaded', loadHeader);

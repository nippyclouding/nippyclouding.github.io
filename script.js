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
        // 프로젝트 페이지일 경우 모달 초기화 실행
        initProjectModal();
    }
}

// 프로젝트 모달 초기화 및 관리
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const modalTitle = document.getElementById('modal-title');

    const modalVideoContainer = document.getElementById('modal-video-container');
    const closeButton = document.querySelector('.close-button');
    const readMoreBtns = document.querySelectorAll('.btn-read-more');

    // 프로젝트 데이터 정의
    const projectData = {
        'sto': {
            title: 'STO Project',

            videoUrl: 'https://www.youtube.com/embed/MlunL9xoCPI'
        },
        'books': {
            title: 'SecondHandBooks',

            videoUrl: 'https://www.youtube.com/embed/bUNw9EWqAn8'
        },
        'tripton': {
            title: 'TripToN',

            videoUrl: 'https://www.youtube.com/embed/wkFMnX2pCsY'
        }
    };

    // 모달 열기
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                modalTitle.innerText = data.title;


                if (data.videoUrl) {
                    modalVideoContainer.innerHTML = `<iframe src="${data.videoUrl}" allowfullscreen></iframe>`;
                } else {
                    modalVideoContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 40px 0;">시연 영상이 준비 중입니다.</p>';
                }

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 스크롤 방지
            }
        });
    });

    // 모달 닫기 (X 버튼)
    closeButton.addEventListener('click', () => {
        closeModal();
    });

    // 모달 닫기 (배경 클릭)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        modalVideoContainer.innerHTML = ''; // 영상 정지 (iframe 제거)
        document.body.style.overflow = 'auto'; // 스크롤 복구
    }
}

window.addEventListener('DOMContentLoaded', loadHeader);

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
    const modalBodyContent = document.getElementById('modal-body-content');
    const modalVideoContainer = document.getElementById('modal-video-container');
    const closeButton = document.querySelector('.close-button');
    const readMoreBtns = document.querySelectorAll('.btn-read-more');

    // 프로젝트 데이터 정의
    const projectData = {
        'sto': {
            title: 'STO Project',
            githubUrl: 'https://github.com/nippyclouding/STO',
            videoUrl: 'https://www.youtube.com/embed/MlunL9xoCPI'
        },
        'books': {
            title: 'SecondHandBooks',
            githubUrl: 'https://github.com/nippyclouding/secondary-book',
            videoUrl: 'https://www.youtube.com/embed/bUNw9EWqAn8'
        },
        'tripton': {
            title: 'TripToN',
            githubUrl: 'https://github.com/nippyclouding/trip-to-n',
            techStack: `
<p><strong>개발 인원 : 2명</strong><br>디자이너 1명, 개발자 1명</p>
<p><strong>개발 환경</strong><br>
Java 21, MariaDB 11<br>
Spring Boot 3 with JPA (Spring Data JPA)<br>
Auth : Session & Cookie<br>
Javascript, Thymeleaf<br>
AWS EC2 & Docker Container & NginX<br>
Gemini AI API</p>
            `,
            rationale: `
<p>디자이너와 협업하는 프로젝트 특성상 요구사항 변경이 자주 발생했기 때문에,<br>
프론트엔드와 백엔드를 분리하기보다 Spring Boot + Thymeleaf 기반 SSR 구조를 선택했습니다.<br>
이를 통해 별도의 프론트 서버를 구성하지 않고 하나의 애플리케이션에서 화면과 비즈니스 로직을 함께 관리할 수 있었고,<br>
빠른 수정 및 배포가 가능했습니다.</p>
<p>요구사항 변경이 자주 발생하는 프로젝트 특성상<br>
유지보수성과 빠른 도메인 수정이 중요하다고 판단했습니다.<br>
반복적인 CRUD SQL 작성 비용을 줄이고,<br>
객체 중심으로 도메인을 관리하기 위해 Spring Data JPA를 사용했습니다.</p>
<p>하나의 AWS EC2 환경에서 Spring Boot, MariaDB, Nginx를 함께 운영해야 했기 때문에 Docker를 사용했습니다.<br>
각 서비스를 컨테이너 단위로 분리하여 환경 의존성을 줄이고,<br>
배포 및 실행 환경을 일관되게 관리할 수 있도록 구성했습니다.</p>
<p>프로젝트 규모와 SSR 기반 구조를 고려하여 Session 기반 인증 방식을 사용했습니다.<br>
서버에서 사용자 인증 상태를 관리할 수 있어 구현 복잡도를 줄일 수 있었고,<br>
Thymeleaf 기반 SSR 구조와도 자연스럽게 연동할 수 있었습니다.</p>
<p>관리자 페이지에서 회원 정보, 통계 데이터, 로그 데이터를 하나의 API로 조회할 경우<br>
불필요한 데이터까지 함께 조회되는 문제가 있었습니다.<br>
따라서 기능별 API를 분리하여 필요한 데이터만 조회하도록 구성했고,<br>
페이지 이동 시에도 관련 데이터만 요청되도록 개선했습니다.<br>
이를 통해 응답 구조를 단순화하고 유지보수성을 높일 수 있었습니다.</p>
            `,
            performance: `
<h4>1. 인덱스 최적화</h4>
<p>삭제된 데이터는 사용자 화면에서 제외되어야 했기 때문에<br>
조회 조건으로 자주 사용되는 컬럼을 기준으로 인덱스를 구성했습니다.</p>
<ul>
    <li>고민(Concern) 테이블
        <ul>
            <li>삭제 여부(<code>deleted</code>) 컬럼 인덱스 적용</li>
            <li>회원 ID + 삭제 여부 복합 인덱스 적용</li>
        </ul>
    </li>
    <li>댓글(Comment) 테이블
        <ul>
            <li>회원 ID + 삭제 여부 복합 인덱스 적용</li>
        </ul>
    </li>
</ul>
<p>이를 통해 마이페이지 및 고민 목록 조회 시<br>
불필요한 Full Scan을 줄이고 조회 성능을 개선했습니다.</p>
<hr>
<h4>2. MyPage API 분리</h4>
<p>초기에는 MyPage 진입 시 아래 데이터를 하나의 API에서 함께 조회했습니다.</p>
<ul>
    <li>회원이 작성한 고민</li>
    <li>회원이 작성한 댓글</li>
    <li>회원이 좋아요한 고민</li>
    <li>회원이 좋아요한 댓글</li>
</ul>
<p>각 데이터는 모두 페이징 처리되어 있었지만,<br>
특정 목록의 다음 페이지를 조회할 때도<br>
불필요하게 모든 데이터를 함께 조회하는 문제가 있었습니다.</p>
<p>예를 들어,<br>
‘회원이 작성한 고민’ 목록만 다음 페이지로 이동하더라도<br>
다른 목록 데이터까지 함께 조회가 발생했습니다.</p>
<p>이를 개선하기 위해<br>
기능별로 API를 분리하여 필요한 데이터만 조회하도록 변경했습니다.</p>
<ul>
    <li>고민 목록 조회 API</li>
    <li>댓글 목록 조회 API</li>
    <li>좋아요한 고민 조회 API</li>
    <li>좋아요한 댓글 조회 API</li>
</ul>
<p>이를 통해 불필요한 조회를 줄이고,<br>
응답 구조를 단순화할 수 있었습니다.</p>
<hr>
<h4>3. 관리자 페이지 조회 구조 개선</h4>
<p>관리자 페이지 역시 회원 정보, 통계 데이터, 로그 데이터를<br>
하나의 응답으로 구성할 경우<br>
응답 크기가 커지고 유지보수성이 떨어질 수 있다고 판단했습니다.</p>
<p>따라서 MyPage와 동일하게<br>
기능별 API를 분리하여 필요한 데이터만 조회하도록 설계했습니다.</p>
<p>이를 통해 특정 기능 수정 시 영향 범위를 줄이고,<br>
관리자 기능 확장에 유리한 구조로 개선할 수 있었습니다.</p>
            `,
            retrospective: `
<h4>협업 방식에 대한 고민</h4>
<p>디자이너와 개발자의 작업 시간이 달랐기 때문에,<br>
당시에는 Figma 피드백과 카카오톡 영상 공유를 중심으로 작업 진행 상황을 전달했습니다.</p>
<p>저녁 시간에 구현한 기능을 녹화하여 공유하는 방식으로 협업을 진행했지만,<br>
프로젝트를 마무리하며 협업 도구의 중요성을 느낄 수 있었습니다.</p>
<p>특히 칸반 기반 작업 관리 도구나 Discord, Notion과 같은 협업 툴을 함께 사용했다면<br>
진행 상황과 피드백을 더욱 체계적으로 관리할 수 있었을 것이라고 생각했습니다.</p>
<p>또한 초기 단계에서 GitHub Actions 기반 CI/CD 환경을 구축해<br>
배포 자동화를 적용했다면,<br>
디자이너가 직접 배포된 서비스를 확인하며 피드백할 수 있어<br>
협업 효율이 더욱 높아졌을 것이라고 느꼈습니다.</p>
<hr>
<h4>기술 선택과 설계에 대한 고민</h4>
<p>프로젝트 규모가 크지 않은 환경에서는<br>
객체 중심 설계 기반의 JPA가 빠른 개발과 유지보수 측면에서 효율적이라는 점을 경험할 수 있었습니다.</p>
<p>또한 Gemini AI API 연동 과정에서<br>
초기에는 비동기 기반 WebClient를 사용했지만,<br>
현재 서비스 흐름에서는 AI 응답 요청 이후 별도의 병렬 작업이 존재하지 않는다고 판단했습니다.</p>
<p>이에 따라 과도한 비동기 구조보다<br>
단순하고 유지보수가 쉬운 RestClient 기반 구조가 프로젝트 규모에 더 적합하다고 판단하여 변경했습니다.</p>
<p>이를 통해 기술 선택에서는 최신 기술 사용 자체보다<br>
현재 서비스 구조와 요구사항에 적합한 설계가 중요하다는 점을 배울 수 있었습니다.</p>
            `,
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

                let bodyHtml = '';
                
                // 깃허브 링크
                if (data.githubUrl) {
                    bodyHtml += `
                    <div class="modal-section" style="margin-bottom: 30px;">
                        <a href="${data.githubUrl}" target="_blank" class="btn-link" style="background-color: #181717; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            GitHub Repository 바로가기 &rarr;
                        </a>
                    </div>
                    `;
                }

                if (data.techStack) {
                    bodyHtml += `
                    <div class="modal-section">
                        <h3>사용 기술</h3>
                        <div class="modal-content-body">${data.techStack}</div>
                    </div>
                    `;
                }

                if (data.rationale) {
                    bodyHtml += `
                    <div class="modal-section">
                        <h3>기술적 선택 근거</h3>
                        <div class="modal-content-body">${data.rationale}</div>
                    </div>
                    `;
                }

                if (data.performance) {
                    bodyHtml += `
                    <div class="modal-section">
                        <h3>성능 개선 및 조회 최적화</h3>
                        <div class="modal-content-body">${data.performance}</div>
                    </div>
                    `;
                }

                if (data.retrospective) {
                    bodyHtml += `
                    <div class="modal-section">
                        <h3>회고 및 배운 점</h3>
                        <div class="modal-content-body">${data.retrospective}</div>
                    </div>
                    `;
                }

                if (modalBodyContent) {
                    modalBodyContent.innerHTML = bodyHtml;
                }

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

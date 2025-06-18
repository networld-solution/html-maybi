const htmlEl =  document.querySelector('html');
const searchDropdown = document.querySelector('.search__dropdown');
const searchOpen = document.querySelector('.search-opened');
const btnSearch = document.querySelector(".btn__search");

const mainApp = (function () {   

    // header sticky
    const headerSticky = () => {
        const body = document.body;
        const headerContainer =  document.querySelector(".header-wrapper");
        const headerTop = document.querySelector(".header-top");
        const headerContainerHeight = headerContainer.offsetHeight;
        const topHeaderHeight = headerTop.offsetHeight ||0;
        const targetScroll = topHeaderHeight + 200;

        window.addEventListener('scroll', function () {
            if (!body.classList.contains('zp-header-sticky')) return; // Early exit for efficiency
            if(window.scrollY > targetScroll){
                headerContainer.classList.add('zp-sticky');
            }else{
                headerContainer.classList.remove('zp-sticky');
            }
        });
    };
    
    const tabCategoryMenuHover = () => {
        const verticalNavItems = document.querySelectorAll('.category_menu_item');      
        verticalNavItems.forEach(item => {
          item.addEventListener('mouseover', function () {

            const tabContent = document.querySelectorAll('.category_menu_content .tab-content');
            tabContent.forEach(inner => inner.style.display = 'none');      

            verticalNavItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            const selectedTab = this.querySelector('a').getAttribute('href');
            if(document.querySelector(selectedTab)){
                document.querySelector(selectedTab).style.display = 'block';
            }
                     
          });
        });
    };
    
    const btnSearchClick = () =>{       
        btnSearch.addEventListener('click', function(e){
            e.preventDefault();            
            htmlEl.classList.toggle('search-opened');
            this.classList.toggle("open");
            searchDropdown.classList.toggle("active");
        });
    };

    const closeSearchDropdown = () => {
        document.addEventListener('click', function (e) {
            if (htmlEl.classList.contains("search-opened")){
                closeSideNav(e);
            }            
        });
    }

    const closeSideNav = function (e) {       
        if (!searchDropdown.contains(e.target) && !btnSearch.contains(e.target)) {
            htmlEl.classList.toggle('search-opened');
            btnSearch.classList.toggle("open");
            searchDropdown.classList.toggle("active");
        }
    };

    const mbMenusBar = () =>{
        const btnMbMenusbar = document.querySelector(".menus__bar");
        const mbMenus = document.querySelector(".mb__menus"); 
        const mbMenuClose = document.querySelector(".mb__menus__close"); 
        const mbMenuWrapper = document.querySelector(".mb__menus__wrapper");
        btnMbMenusbar.addEventListener('click', function(e){
            mbMenus.classList.toggle('active');
        });        
        mbMenuClose.addEventListener('click', function(e){
            mbMenus.classList.toggle('active');
        });

        mbMenus.addEventListener('click', function(e){
            if(!mbMenuWrapper.contains(e.target)){
                mbMenus.classList.toggle('active');
            }
        });
    }
    
    const mbMenuChildren = () => {
        const mbChilder = document.querySelectorAll(".mb__children");
        mbChilder.forEach(function (item) {
            item.addEventListener("click", function (evt) {  
                var menuBarSub = evt.currentTarget.querySelector(".mb__menubar__sub");
                if (menuBarSub.contains(evt.target)){
                    return;
                }
                var flag = evt.currentTarget.classList.contains('open');               
                if (flag){
                    evt.currentTarget.classList.remove('open');
                }else{
                    mbChilder.forEach(function (mb) {
                        mb.classList.remove('open');
                    });
                    evt.currentTarget.classList.add('open');
                }
            });
        });        
    }

    const mbFooterChildren = () => {
        const mbFooterChild = document.querySelectorAll(".md__footer__child");
        mbFooterChild.forEach(function (item) {
            item.addEventListener("click", function (evt) { 
                evt.currentTarget.classList.toggle('open');
            });
        });
    }

    document.querySelector('.video-main__video').addEventListener('click', function(){				
        var id = get_video_id(this.getAttribute('data-url'));
        document.querySelector('.video-main__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?feature=oembed&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>';
    });

    var list_video = document.querySelectorAll('.video-list .video__item');
    for (const video of list_video) {
        video.addEventListener('click', () => {	
        
        var act = document.querySelector('.video-list .video__item.active');
        if (act !== null){
            act.classList.remove("active");
        }
        
        video.classList.add("active");
        var id = get_video_id(video.getAttribute('data-url'));
        document.querySelector('.video-main__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?feature=oembed&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>';
        });
    }

    const tabContents = () => {
        const tabLinks = document.querySelectorAll('.tab-link');
        if (tabLinks.length > 0){
            tabLinks.forEach(function(link) {
                link.addEventListener('click', function(event) {
                    openTab(event, event.currentTarget.getAttribute('data-tab'));
                });
            });
        }
        function openTab(event, tabId) {
            var tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(function(tab) {
                tab.classList.remove('active');
            });
            tabLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            event.currentTarget.classList.add('active');
        }
    }
    

    return {
        init: function () {
            tabCategoryMenuHover();
            btnSearchClick();
            closeSearchDropdown();
            headerSticky();
            mbMenusBar();
            mbMenuChildren();
            mbFooterChildren();
            tabContents();
        },
    };
})();


document.addEventListener("DOMContentLoaded", function (event) {
    mainApp.init();
});

function get_video_id(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}


  
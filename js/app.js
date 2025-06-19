const appMain = (function () {  
    const dropdownTitle = document.getElementById('search-cate');
    const dropdownList = document.querySelector('.search-category__dropdown');

    const searchCategoryDropdown = () => {
        if (!dropdownTitle || !dropdownList) return;

        // Toggle dropdown when title clicked
        dropdownTitle.addEventListener('click', () => {
            dropdownList.classList.toggle('show');
        });

        // Handle click on each dropdown item
        const items = dropdownList.querySelectorAll('li[data-value]');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const selectedText = item.textContent.trim();
                const selectedValue = item.getAttribute('data-value');

                // Update dropdown title
                dropdownTitle.textContent = selectedText;
                dropdownTitle.setAttribute('data-value', selectedValue);

                // Update active state
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Close dropdown
                dropdownList.classList.remove('show');
            });
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (e) => {
            if (!dropdownTitle.contains(e.target) && !dropdownList.contains(e.target)) {
                dropdownList.classList.remove('show');
            }
        });
    };

    return {
        init: function () {
            searchCategoryDropdown();
        },
    };
})();

document.addEventListener("DOMContentLoaded", function (event) {
    appMain.init();
});
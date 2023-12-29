document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('navigation');
    var navDescription = document.getElementById('nav_description');

    nav.addEventListener('mouseover', function () {
        navDescription.style.width = '100%';
    });

    nav.addEventListener('mouseout', function () {
        navDescription.style.width = '0rem';
    });
});
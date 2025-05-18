document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('modo-desktop').addEventListener('change', function () {
        document.body.classList.toggle('dark-mode');
    });
});
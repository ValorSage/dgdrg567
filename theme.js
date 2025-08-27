window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    btn.onclick = () => {
        document.body.classList.toggle('dark');
    };
});
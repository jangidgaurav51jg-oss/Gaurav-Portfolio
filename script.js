// Consolidated frontend interactions
document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle?.addEventListener('click', () => document.querySelector('nav ul')?.classList.toggle('active'));

    // Smooth scroll for nav links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelector('nav ul')?.classList.remove('active');
        });
    });

    // Welcome modal removed — no modal behavior

    // Typing animation
    const typedEl = document.getElementById('typed');
    const phrases = ['Cyber Security', 'AI & ML', 'Web Developer', 'Problem Solver'];
    let pi = 0, ci = 0, forward = true;
    function tick() {
        if (!typedEl) return;
        const current = phrases[pi];
        typedEl.textContent = current.slice(0, ci);
        if (forward) {
            if (ci < current.length) ci++; else { forward = false; setTimeout(tick, 900); return; }
        } else {
            if (ci > 0) ci--; else { forward = true; pi = (pi+1)%phrases.length; }
        }
        setTimeout(tick, forward?80:40);
    }
    tick();

    // Custom cyberpunk cursor
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!isTouch) {
        document.body.classList.add('custom-cursor-enabled');

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<span class="cursor-center"></span><span class="cursor-dot"></span><span class="cursor-bracket top-left"></span><span class="cursor-bracket top-right"></span><span class="cursor-bracket bottom-left"></span><span class="cursor-bracket bottom-right"></span>';

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';

        document.body.appendChild(trail);
        document.body.appendChild(cursor);

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;
        let trailX = targetX;
        let trailY = targetY;
        const ease = 0.15;

        const hoverables = document.querySelectorAll('a, button, .btn, .project-card, .card, .timeline-item, .cert, .contact-form input, .contact-form textarea');
        const setHover = (hovered) => {
            cursor.classList.toggle('cursor-hover', hovered);
            trail.classList.toggle('cursor-hover', hovered);
        };
        hoverables.forEach((item) => {
            item.addEventListener('mouseenter', () => setHover(true));
            item.addEventListener('mouseleave', () => setHover(false));
        });

        document.addEventListener('mousemove', (event) => {
            targetX = event.clientX;
            targetY = event.clientY;
        });

        const animateCursor = () => {
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;
            trailX += (currentX - trailX) * 0.12;
            trailY += (currentY - trailY) * 0.12;

            cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
            trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);
    }

    // Skills tab switching
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillPanels = document.querySelectorAll('.skill-panel');

    function activateSkillTab(tab) {
        skillTabs.forEach(t => t.classList.toggle('active', t === tab));
        skillPanels.forEach(panel => {
            const target = tab?.getAttribute('data-target');
            const isActive = panel.id === target;
            panel.classList.toggle('active', isActive);
        });
    }

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => activateSkillTab(tab));
    });

    activateSkillTab(document.querySelector('.skill-tab.active'));

    // Contact form: open user's mail client with prefilled email to owner
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formEl = e.target;
        const name = (formEl.querySelector('input[name="name"]')?.value || '').trim();
        const email = (formEl.querySelector('input[name="email"]')?.value || '').trim();
        const message = (formEl.querySelector('textarea[name="message"]')?.value || '').trim();

        const to = 'jangidgaurav51jg@gmail.com';
        const subject = encodeURIComponent(`Portfolio Contact from ${name || 'Visitor'}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        // Open the user's default mail client with the prefilled message
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        formEl.reset();
    });
});

// Loader simulation runs immediately to show progress then reveal welcome modal
(function loaderSim(){
    const bar = document.getElementById('progress-bar');
    const pct = document.getElementById('progress-percent');
    const loader = document.getElementById('loader');
    if (!bar || !pct || !loader) return;
    let v = 0;
    const id = setInterval(()=>{
        v += Math.floor(Math.random()*6)+2; if (v>100) v=100;
        bar.style.width = v+ '%'; pct.textContent = v + '%';
        if (v>=100){ clearInterval(id); setTimeout(()=>{ loader.style.display='none'; },400); }
    },120);
})();

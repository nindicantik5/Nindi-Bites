document.addEventListener('DOMContentLoaded', () => {
  /* Sticky navbar shadow */
  const nav = document.querySelector('.navbar');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Hamburger */
  const ham = document.querySelector('.hamburger');
  const mob = document.querySelector('.nav-mobile');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      const open = mob.classList.toggle('open');
      ham.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', open);
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mob.classList.remove('open');
      ham.classList.remove('open');
      ham.setAttribute('aria-expanded', false);
    }));
  }

  /* Active link */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* Contact form validation */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[data-req]').forEach(field => {
        const grp = field.closest('.fg');
        const err = grp.querySelector('.err');
        grp.classList.remove('error');
        if (!field.value.trim()) {
          grp.classList.add('error');
          err.textContent = 'Field ini wajib diisi.';
          ok = false;
          return;
        }
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
          grp.classList.add('error');
          err.textContent = 'Masukkan alamat email yang valid.';
          ok = false;
        }
      });
      if (ok) {
        alert('Halo! Terima kasih sudah menghubungi Nindi Bites. Pesan Anda sudah diterima oleh Nindi Yulianingsi. 🌸');
        form.reset();
        form.querySelectorAll('.fg').forEach(g => g.classList.remove('error'));
      }
    });
    form.querySelectorAll('input, textarea').forEach(f => {
      f.addEventListener('input', () => f.closest('.fg').classList.remove('error'));
    });
  }

  /* Gallery lightbox */
  document.querySelectorAll('.g-item').forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('.g-overlay span')?.textContent || 'Nindi Bites';
      const ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(61,44,46,.85);display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(10px)';
      const img = item.querySelector('img');
      ov.innerHTML = `<div style="max-width:92vw;max-height:90vh;position:relative">
        <img src="${img.src}" style="max-width:90vw;max-height:85vh;border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.4);object-fit:contain">
        <div style="text-align:center;color:#fff;margin-top:1rem;font-family:Poppins,sans-serif;font-size:.9rem;opacity:.85">${label}</div>
        <div style="text-align:center;color:rgba(255,255,255,.4);font-size:.75rem;font-family:Poppins,sans-serif;margin-top:.3rem">Klik untuk menutup</div>
      </div>`;
      document.body.appendChild(ov);
      ov.addEventListener('click', () => ov.remove());
    });
  });

  /* Fade-in on scroll */
  const els = document.querySelectorAll('.feat-card,.prod-card,.g-item,.val,.c-detail');
  if ('IntersectionObserver' in window && els.length) {
    els.forEach((el, i) => {
      el.style.cssText += `opacity:0;transform:translateY(24px);transition:opacity .55s ease ${i*.07}s,transform .55s ease ${i*.07}s`;
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          obs.unobserve(en.target);
        }
      });
    }, { threshold: .12 });
    els.forEach(el => obs.observe(el));
  }
});

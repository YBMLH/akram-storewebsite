// ============================================================
// Collection By Ibtissam — In-App Browser Helper
// Detects Instagram/Facebook/TikTok/Snapchat webviews and shows
// a dismissible banner nudging users to open in Safari/Chrome
// so WhatsApp handoff and other features work reliably.
// ============================================================

(function() {
  const ua = navigator.userAgent || '';

  const inApps = [
    { name: 'Instagram', test: /Instagram/i },
    { name: 'Facebook',  test: /FBAN|FBAV|FB_IAB/i },
    { name: 'TikTok',    test: /BytedanceWebview|TikTok|musical_ly/i },
    { name: 'Snapchat',  test: /Snapchat/i },
    { name: 'LinkedIn',  test: /LinkedInApp/i },
  ];

  const match = inApps.find(a => a.test.test(ua));
  if (!match) return;

  // Respect dismissal for this browsing session
  try {
    if (sessionStorage.getItem('cbi_inapp_dismissed') === '1') return;
  } catch (e) {}

  const isAr = (typeof i18n !== 'undefined' && i18n.currentLang === 'ar') ||
               document.documentElement.getAttribute('lang') === 'ar';

  const strings = isAr ? {
    title: `أنت تتصفح داخل ${match.name}`,
    body: 'لتجربة أفضل وضمان عمل زر الواتساب، افتح الموقع في متصفحك.',
    button: 'افتح في المتصفح',
    dismiss: '×',
    howTo: 'انقر على ⋯ ثم "فتح في المتصفح"',
  } : {
    title: `Vous êtes dans ${match.name}`,
    body: 'Pour une meilleure expérience et pour que WhatsApp fonctionne, ouvrez le site dans votre navigateur.',
    button: 'Ouvrir dans le navigateur',
    dismiss: '×',
    howTo: 'Appuyez sur ⋯ puis « Ouvrir dans le navigateur »',
  };

  const banner = document.createElement('div');
  banner.id = 'cbi-inapp-banner';
  banner.setAttribute('role', 'alert');
  banner.innerHTML = `
    <style>
      #cbi-inapp-banner {
        position: fixed; top: 0; left: 0; right: 0;
        z-index: 9999;
        background: #1A1A1A; color: #fff;
        padding: 10px 14px;
        font-family: 'Inter', 'Cairo', system-ui, -apple-system, sans-serif;
        font-size: 13px; line-height: 1.4;
        display: flex; align-items: center; gap: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        animation: cbi-slide-down 0.3s ease-out;
      }
      @keyframes cbi-slide-down {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
      #cbi-inapp-banner .cbi-inapp-text { flex: 1; min-width: 0; }
      #cbi-inapp-banner .cbi-inapp-title { font-weight: 600; display: block; }
      #cbi-inapp-banner .cbi-inapp-sub { font-size: 11.5px; opacity: 0.85; display: block; margin-top: 2px; }
      #cbi-inapp-banner button {
        background: #fff; color: #1A1A1A; border: none;
        padding: 7px 12px; border-radius: 6px;
        font-size: 12px; font-weight: 600; cursor: pointer;
        white-space: nowrap; font-family: inherit;
      }
      #cbi-inapp-banner .cbi-inapp-close {
        background: transparent; color: #fff; font-size: 20px;
        padding: 0 4px; opacity: 0.7;
      }
      body.cbi-has-inapp-banner { padding-top: 56px; }
      @media (max-width: 420px) {
        #cbi-inapp-banner { font-size: 12px; padding: 8px 10px; gap: 8px; }
        #cbi-inapp-banner .cbi-inapp-sub { display: none; }
        body.cbi-has-inapp-banner { padding-top: 48px; }
      }
    </style>
    <div class="cbi-inapp-text">
      <span class="cbi-inapp-title">${strings.title}</span>
      <span class="cbi-inapp-sub">${strings.body}</span>
    </div>
    <button type="button" class="cbi-inapp-open">${strings.button}</button>
    <button type="button" class="cbi-inapp-close" aria-label="dismiss">${strings.dismiss}</button>
  `;

  document.body.appendChild(banner);
  document.body.classList.add('cbi-has-inapp-banner');

  banner.querySelector('.cbi-inapp-close').addEventListener('click', () => {
    try { sessionStorage.setItem('cbi_inapp_dismissed', '1'); } catch (e) {}
    banner.remove();
    document.body.classList.remove('cbi-has-inapp-banner');
  });

  banner.querySelector('.cbi-inapp-open').addEventListener('click', () => {
    const url = window.location.href;
    const isAndroid = /Android/i.test(ua);

    if (isAndroid) {
      // Android intent URL — opens the default browser directly.
      const intent = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
      window.location.href = intent;
      // Fallback: if nothing happens, show hint
      setTimeout(() => alert(strings.howTo), 1500);
    } else {
      // iOS — can't force escape the webview. Show instructions.
      alert(strings.howTo);
    }
  });
})();

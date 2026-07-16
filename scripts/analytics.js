(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-P13799GMDH';
  var CONSENT_KEY = 'tp_analytics_consent_v1';
  var EVENT_NAME = 'ads_conversion_Contato_1';
  var PRIMARY_EVENT_KEY = 'tp_primary_contact_sent';
  var analyticsReady = false;

  function startAnalytics() {
    if (analyticsReady) return;
    analyticsReady = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      anonymize_ip: true,
      ads_data_redaction: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(tag);
  }

  function updateConsent(value) {
    if (!analyticsReady || typeof window.gtag !== 'function') return;
    var granted = value === 'granted' ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      analytics_storage: granted,
      ad_storage: granted,
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function getConsent() {
    try { return window.localStorage.getItem(CONSENT_KEY); }
    catch (error) { return null; }
  }

  function saveConsent(value) {
    try { window.localStorage.setItem(CONSENT_KEY, value); }
    catch (error) { /* O site continua funcional quando o armazenamento está bloqueado. */ }
  }

  function removeBanner() {
    var banner = document.getElementById('tp-cookie-banner');
    if (banner) banner.remove();
  }

  function showBanner() {
    if (document.getElementById('tp-cookie-banner')) return;

    var style = document.createElement('style');
    style.textContent =
      '#tp-cookie-banner{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:10000;max-width:760px;margin:auto;padding:1rem 1.15rem;background:#0b2522;color:#fff;border:1px solid rgba(201,168,76,.45);border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.3);font:400 14px/1.5 Inter,Arial,sans-serif}' +
      '#tp-cookie-banner p{margin:0;color:#f7f3e8}' +
      '#tp-cookie-banner a{color:#e3c66f;text-decoration:underline}' +
      '#tp-cookie-actions{display:flex;gap:.65rem;flex-wrap:wrap;margin-top:.85rem}' +
      '#tp-cookie-actions button{border-radius:8px;padding:.65rem 1rem;font:600 13px Inter,Arial,sans-serif;cursor:pointer}' +
      '#tp-cookie-accept{background:#c9a84c;color:#0b2522;border:1px solid #c9a84c}' +
      '#tp-cookie-reject{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.55)}' +
      '@media(max-width:560px){#tp-cookie-actions button{flex:1}#tp-cookie-banner{font-size:13px}}';
    document.head.appendChild(style);

    var banner = document.createElement('aside');
    banner.id = 'tp-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Preferências de privacidade');
    banner.innerHTML =
      '<p>Usamos o Google Analytics somente com sua autorização para medir visitas e cliques nos canais de contato, sem enviar o conteúdo da sua mensagem. Saiba mais na <a href="/politica-de-privacidade.html">Política de Privacidade</a>.</p>' +
      '<div id="tp-cookie-actions"><button id="tp-cookie-accept" type="button">Aceitar análise</button><button id="tp-cookie-reject" type="button">Recusar</button></div>';
    document.body.appendChild(banner);

    document.getElementById('tp-cookie-accept').addEventListener('click', function () {
      saveConsent('granted');
      updateConsent('granted');
      window.dispatchEvent(new CustomEvent('tp:analytics-consent'));
      removeBanner();
    });
    document.getElementById('tp-cookie-reject').addEventListener('click', function () {
      saveConsent('denied');
      updateConsent('denied');
      removeBanner();
    });
  }

  function sendEvent(name, params) {
    if (!analyticsReady || typeof window.gtag !== 'function') return;
    window.gtag('event', name, Object.assign({ page_path: window.location.pathname }, params || {}));
  }

  function trackPrimaryContactOnce(method) {
    try {
      if (window.sessionStorage.getItem(PRIMARY_EVENT_KEY)) return;
      window.sessionStorage.setItem(PRIMARY_EVENT_KEY, '1');
    } catch (error) { /* A deduplicação é apenas uma proteção adicional. */ }
    sendEvent(EVENT_NAME, { contact_method: method });
  }

  function trackContact(method) {
    sendEvent(method === 'whatsapp' ? 'contact_whatsapp' : 'contact_phone', {
      contact_method: method
    });
    trackPrimaryContactOnce(method);
  }

  function init() {
    startAnalytics();
    var consent = getConsent();
    if (consent === 'granted') updateConsent('granted');
    else {
      updateConsent('denied');
      if (consent !== 'denied') showBanner();
    }

    window.addEventListener('tp:lead-form-completed', function () {
      sendEvent('lead_form_completed', { contact_method: 'formulario' });
    });

    document.addEventListener('click', function (event) {
      var consentButton = event.target.closest && event.target.closest('[data-tp-manage-consent]');
      if (consentButton) {
        event.preventDefault();
        try { window.localStorage.removeItem(CONSENT_KEY); } catch (error) {}
        showBanner();
        return;
      }
      var link = event.target.closest && event.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href') || '';
      if (/^https:\/\/(?:api\.)?wa\.me\//i.test(href) || /whatsapp\.com\//i.test(href)) {
        trackContact('whatsapp');
      } else if (/^tel:/i.test(href)) {
        trackContact('telefone');
      }
    }, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

// detail.js - Gelişmiş detay gösterimi
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
const id = urlParams.get('id');

let item = null;
if (type === 'tool') item = toolsData.find(t => t.id === id);
else if (type === 'threat') item = threatsData.find(t => t.id === id);
else if (type === 'resource') item = resourcesData.find(r => r.id === id);

function getSeverityClass(severity) {
    if (!severity) return '';
    const s = severity.toLowerCase();
    if (s.includes('kritik') || s.includes('critical')) return 'severity-critical';
    if (s.includes('yüksek') || s.includes('high')) return 'severity-high';
    if (s.includes('orta') || s.includes('medium')) return 'severity-medium';
    return 'severity-low';
}

function renderInfoGrid(item, type) {
    const grid = document.getElementById('infoGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (type === 'tool') {
        if (item.category) grid.innerHTML += `<div class="info-card"><i class="fas fa-tag"></i><strong>Kategori</strong><br>${item.category}</div>`;
        if (item.usage) grid.innerHTML += `<div class="info-card"><i class="fas fa-terminal"></i><strong>Kullanım</strong><br><code style="font-size:0.7rem;">${item.usage.substring(0, 30)}...</code></div>`;
    } 
    else if (type === 'threat') {
        if (item.severity) grid.innerHTML += `<div class="info-card"><i class="fas fa-exclamation-triangle"></i><strong>Risk Seviyesi</strong><br>${item.severity}</div>`;
        if (item.solution) grid.innerHTML += `<div class="info-card"><i class="fas fa-shield-alt"></i><strong>Korunma</strong><br>${item.solution.substring(0, 50)}...</div>`;
    }
    else if (type === 'resource') {
        if (item.url) grid.innerHTML += `<div class="info-card"><i class="fas fa-link"></i><strong>Web Sitesi</strong><br><a href="${item.url}" target="_blank" style="color:#2dd4bf;">Ziyaret Et</a></div>`;
    }
}

if (item) {
    // Başlık ve ikon
    if (item.icon) {
        document.getElementById('detailIcon').innerHTML = item.icon;
    }
    document.getElementById('detailTitle').innerText = item.name;
    
    // Severity badge (sadece tehditler için)
    if (type === 'threat' && item.severity) {
        const badge = document.getElementById('severityBadge');
        badge.innerText = `⚠️ ${item.severity}`;
        badge.className = `severity-badge ${getSeverityClass(item.severity)}`;
    } else {
        document.getElementById('severityBadge').style.display = 'none';
    }
    
    // Kısa açıklama
    document.getElementById('detailDesc').innerHTML = `<strong><i class="fas fa-info-circle"></i> Kısa Açıklama</strong><br>${item.desc}`;
    
    // Hızlı bilgi kartları
    renderInfoGrid(item, type);
    
    // Uzun açıklama
    if (item.longDesc) {
        document.getElementById('detailLongDesc').innerHTML = `<strong><i class="fas fa-align-left"></i> Detaylı Bilgi</strong><br><p style="margin-top:0.5rem;">${item.longDesc}</p>`;
    } else {
        document.getElementById('detailLongDesc').style.display = 'none';
    }
    
    // Kullanım (sadece araçlar)
    if (type === 'tool' && item.usage) {
        document.getElementById('detailUsage').innerHTML = `<strong><i class="fas fa-code"></i> Kullanım Komutu</strong><div class="code-block">${item.usage}</div>`;
    } else {
        document.getElementById('detailUsage').style.display = 'none';
    }
    
    // Örnek (sadece araçlar)
    if (type === 'tool' && item.example) {
        document.getElementById('detailExample').innerHTML = `<strong><i class="fas fa-lightbulb"></i> Örnek Kullanım</strong><div class="code-block">${item.example}</div>`;
    } else {
        document.getElementById('detailExample').style.display = 'none';
    }
    
    // Çözüm/Korunma (sadece tehditler)
    if (type === 'threat' && item.solution) {
        document.getElementById('detailSolution').innerHTML = `<strong><i class="fas fa-lock"></i> Korunma Yöntemleri</strong><br><p>${item.solution}</p>`;
    } else {
        document.getElementById('detailSolution').style.display = 'none';
    }
    
    // Ekstra bilgi
    if (item.extra) {
        document.getElementById('detailExtra').innerHTML = `<strong><i class="fas fa-star"></i> Öne Çıkan Özellik</strong><br>${item.extra}`;
    } else {
        document.getElementById('detailExtra').style.display = 'none';
    }
    
    // URL bağlantısı (kaynaklar için)
    if (type === 'resource' && item.url) {
        document.getElementById('detailUrl').innerHTML = `<strong><i class="fas fa-external-link-alt"></i> Kaynak Linki</strong><br><a href="${item.url}" target="_blank" class="external-link">${item.url} <i class="fas fa-arrow-right"></i></a>`;
    } else if (type === 'tool' && item.url) {
        document.getElementById('detailUrl').innerHTML = `<strong><i class="fas fa-globe"></i> Resmi Site</strong><br><a href="${item.url}" target="_blank" class="external-link">${item.url} <i class="fas fa-arrow-right"></i></a>`;
    } else {
        document.getElementById('detailUrl').style.display = 'none';
    }
    
    // Paylaş butonu (sayfa linkini kopyala)
    document.getElementById('shareBtn').addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        alert('Bağlantı kopyalandı!');
    });
    
} else {
    document.getElementById('detailTitle').innerText = 'Bilgi Bulunamadı';
    document.getElementById('detailDesc').innerHTML = 'Aradığınız içerik mevcut değil veya yanlış bir bağlantı kullandınız.';
    document.getElementById('infoGrid').style.display = 'none';
    document.getElementById('detailLongDesc').style.display = 'none';
    document.getElementById('detailUsage').style.display = 'none';
    document.getElementById('detailExample').style.display = 'none';
    document.getElementById('detailSolution').style.display = 'none';
    document.getElementById('detailExtra').style.display = 'none';
    document.getElementById('detailUrl').style.display = 'none';
    document.getElementById('shareBtn').style.display = 'none';
}
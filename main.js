// main.js - Kartları gösterir, icon'ları akıllıca işler
function renderCards(containerId, dataArray, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    dataArray.forEach(item => {
        const cardLink = document.createElement('a');
        cardLink.className = 'card-link';
        cardLink.href = `detail.html?type=${type}&id=${item.id}`;
        cardLink.target = '_self';
        
        const card = document.createElement('div');
        card.className = 'card';
        
        // Icon: eğer '<img' ile başlıyorsa direkt HTML yaz, değilse FontAwesome <i> ile sar
        let iconHtml = '';
        if (item.icon && item.icon.trim().startsWith('<img')) {
            iconHtml = item.icon;
        } else {
            const iconClass = item.icon || 'fa-shield-alt';
            iconHtml = `<i class="fas ${iconClass}" style="font-size: 1.8rem;"></i>`;
        }
        
        const tagHtml = item.category ? `<span class="badge"><i class="fas fa-tag"></i> ${item.category}</span>` : 
                        (item.severity ? `<span class="badge">⚠️ ${item.severity}</span>` : '');
        
        card.innerHTML = `
            <div class="card-header">
                ${iconHtml}
                <h3>${item.name}</h3>
            </div>
            <div class="card-content">
                ${tagHtml}
                <div class="description">${item.desc}</div>
                <div class="extra-info"><i class="fas fa-info-circle"></i> ${item.extra}</div>
                <div style="margin-top: 10px; font-size: 0.7rem; color: #2dd4bf;"><i class="fas fa-external-link-alt"></i> Detaylı incele</div>
            </div>
        `;
        cardLink.appendChild(card);
        container.appendChild(cardLink);
    });
}

// Sayfa yüklendiğinde render çağrıları
if (document.getElementById('featuredTools')) {
    renderCards('featuredTools', toolsData.slice(0, 6), 'tool');
    renderCards('featuredThreats', threatsData.slice(0, 6), 'threat');
}
if (document.getElementById('allTools')) renderCards('allTools', toolsData, 'tool');
if (document.getElementById('allThreats')) renderCards('allThreats', threatsData, 'threat');
if (document.getElementById('allResources')) renderCards('allResources', resourcesData, 'resource');

// Arama fonksiyonu
function setupSearch(inputId, cardContainerId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('keyup', () => {
        const term = input.value.toLowerCase();
        const cards = document.querySelectorAll(`#${cardContainerId} .card`);
        cards.forEach(card => {
            const parentLink = card.closest('.card-link');
            const text = card.innerText.toLowerCase();
            if (text.includes(term)) {
                if (parentLink) parentLink.style.display = '';
                else card.style.display = '';
            } else {
                if (parentLink) parentLink.style.display = 'none';
                else card.style.display = 'none';
            }
        });
    });
}
setupSearch('searchTools', 'allTools');
setupSearch('searchThreats', 'allThreats');
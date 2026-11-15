(() => {
    'use strict';
    const status = () => document.getElementById('dealer-map-status');
    const announce = text => { if (status()) { status().textContent = text; status().hidden = !text; } };
    const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.gm_authFailure = () => announce('The map could not be loaded. Dealer contact details remain available below.');
    document.querySelectorAll('[data-country-code]').forEach(label => {
        const code = label.dataset.countryCode.toUpperCase();
        if (!/^[A-Z]{2}$/.test(code)) return;
        const flag = String.fromCodePoint(...Array.from(code, c => c.charCodeAt(0) + 127397));
        let name = label.textContent;
        try { name = new Intl.DisplayNames(['en'], { type: 'region' }).of(code); } catch (_) {}
        label.textContent = `${flag} ${name}`;
    });
    const filterButtons = Array.from(document.querySelectorAll('.dealer-category-filter'));
    const dealerItems = Array.from(document.querySelectorAll('.dealer-list-item'));
    let activeCategory = '';
    let filterMarkers = () => {};
    function applyCategory(category) {
        activeCategory = category;
        filterButtons.forEach(button => {
            const active = button.dataset.category === category;
            button.setAttribute('aria-pressed', String(active));
            button.classList.toggle('btn-primary', active);
            button.classList.toggle('btn-outline-dark', !active);
        });
        let visible = 0;
        dealerItems.forEach(item => {
            item.hidden = category !== '' && !(item.dataset.categories || '').split(' ').includes(category);
            if (!item.hidden) visible++;
        });
        const empty = document.getElementById('dealer-filter-empty');
        if (empty) empty.hidden = visible > 0 || category === '';
        filterMarkers();
    }
    filterButtons.forEach(button => button.addEventListener('click', () => applyCategory(button.dataset.category)));
    window.initDealerMap = async () => {
        try {
            const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
            const dealers = (window.ioniqueDealers || []).filter(dealer => dealer.position);
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 6, minZoom: 2, maxZoom: 20, center: { lat: 50.85, lng: 4.35 },
                gestureHandling: 'cooperative', streetViewControl: false, clickableIcons: false,
                disableDefaultUI: true, mapId: window.ioniqueMapId,
            });
            [['dealer-map-zoom-out', -1], ['dealer-map-zoom-in', 1]].forEach(([id, step]) => {
                const button = document.getElementById(id);
                if (!button) return;
                button.disabled = false;
                button.addEventListener('click', () => {
                    map.setZoom(Math.min(20, Math.max(2, map.getZoom() + step)));
                });
            });
            const selection = document.getElementById('dealer-map-selection');
            const selectionName = document.getElementById('dealer-map-selection-name');
            let selectedDealerId = null;
            if (selection) selection.addEventListener('click', () => {
                if (!selectedDealerId) return;
                const card = document.getElementById(`dealer-${selectedDealerId}`);
                card.scrollIntoView({ behavior: reduceMotion() ? 'instant' : 'smooth', block: 'center' });
                card.querySelector('.dealer-map-select').focus({ preventScroll: true });
            });
            const markers = new Map();
            const resetButton = document.getElementById('dealer-map-reset');
            function resetMapView(zoomOut = false) {
                const visible = Array.from(markers.values());
                if (visible.length === 1) {
                    map.setCenter(visible[0].dealer.position);
                    map.setZoom(zoomOut ? 13 : 14);
                } else if (visible.length > 1) {
                    const bounds = new google.maps.LatLngBounds();
                    visible.forEach(entry => bounds.extend(entry.dealer.position));
                    map.fitBounds(bounds, 60);
                    google.maps.event.addListenerOnce(map, 'idle', () => {
                        map.setZoom(Math.max(2, Math.min(16, map.getZoom()) - (zoomOut ? 1 : 0)));
                    });
                }
            }
            if (resetButton) resetButton.addEventListener('click', () => {
                applyCategory('');
                selectedDealerId = null;
                if (selection) selection.hidden = true;
                markers.forEach((entry, id) => {
                    entry.pin.classList.toggle('is-selected', false);
                    entry.marker.zIndex = 1;
                    const card = document.getElementById(`dealer-${id}`);
                    card.classList.toggle('is-selected', false);
                    card.querySelector('.dealer-map-select').setAttribute('aria-pressed', 'false');
                });
                resetMapView(true);
            });
            function selectDealer(id, fromMarker) {
                const selected = markers.get(id);
                if (!selected) return;
                markers.forEach((entry, key) => {
                    const active = key === id;
                    entry.pin.classList.toggle('is-selected', active);
                    entry.marker.zIndex = active ? 1000 : 1;
                    const card = document.getElementById(`dealer-${key}`);
                    card.classList.toggle('is-selected', active);
                    card.querySelector('.dealer-map-select').setAttribute('aria-pressed', String(active));
                });
                map.panTo(selected.dealer.position);
                selectedDealerId = id;
                announce('');
                if (selection && selectionName) {
                    selectionName.textContent = selected.dealer.name;
                    selection.setAttribute('aria-label', `View dealer details: ${selected.dealer.name}`);
                    selection.setAttribute('aria-controls', `dealer-${id}`);
                    selection.hidden = false;
                }
                if (!fromMarker) {
                    document.getElementById('map').scrollIntoView({ behavior: reduceMotion() ? 'instant' : 'smooth', block: 'center' });
                }
            }
            dealers.forEach((dealer, index) => {
                const pin = document.createElement('span');
                pin.className = 'dealer-pin';
                pin.textContent = String(index + 1);
                const marker = new AdvancedMarkerElement({ map, position: dealer.position, title: dealer.name, gmpClickable: true });
                marker.append(pin);
                markers.set(dealer.id, { marker, pin, dealer });
                marker.addEventListener('gmp-click', () => selectDealer(dealer.id, true));
            });
            filterMarkers = () => {
                let selectionVisible = selectedDealerId === null;
                let visibleCount = 0;
                markers.forEach((entry, id) => {
                    const visible = activeCategory === '' || (entry.dealer.category_ids || []).includes(activeCategory);
                    entry.marker.map = visible ? map : null;
                    if (visible) visibleCount++;
                    if (id === selectedDealerId) selectionVisible = visible;
                });
                if (!selectionVisible) {
                    selectedDealerId = null;
                    if (selection) selection.hidden = true;
                    markers.forEach((entry, id) => {
                        entry.pin.classList.toggle('is-selected', false);
                        entry.marker.zIndex = 1;
                        const card = document.getElementById(`dealer-${id}`);
                        card.classList.toggle('is-selected', false);
                        card.querySelector('.dealer-map-select').setAttribute('aria-pressed', 'false');
                    });
                }
                if (resetButton) resetButton.disabled = markers.size === 0;
                if (!visibleCount && activeCategory !== '') announce('No map locations available in this category.');
                else announce('');
            };
            filterMarkers();
            document.querySelectorAll('.dealer-map-select').forEach(button => {
                button.disabled = !markers.has(button.dataset.dealerId);
                button.addEventListener('click', () => selectDealer(button.dataset.dealerId, false));
            });
            resetMapView();
            if (!dealers.length) announce('No dealer locations are available on the map yet.');
        } catch (error) {
            announce('The map could not be loaded. Dealer contact details remain available below.');
            console.error('Dealer map could not be initialized.', error);
        }
    };
})();

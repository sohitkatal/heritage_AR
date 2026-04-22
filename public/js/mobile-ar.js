/**
 * Heritage AR - Mobile AR Optimization
 * Handles AR-specific features and performance optimization
 */

class MobileARManager {
    constructor() {
        this.modelViewer = null;
        this.isARSupported = this.checkARSupport();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.modelScale = 1;
        this.init();
    }

    // Check AR support
    checkARSupport() {
        const hasWebXR = navigator.xr !== undefined;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        return {
            webxr: hasWebXR,
            ios: isIOS,
            android: isAndroid,
            supported: hasWebXR || isIOS || isAndroid
        };
    }

    // Initialize
    init() {
        this.optimizePerformance();
        this.setupTouchControls();
        this.setupARControls();
    }

    // Performance optimization
    optimizePerformance() {
        // Reduce quality on low-end devices
        if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
            document.documentElement.style.fontSize = '16px';
        }

        // Optimize animations
        if (navigator.connection?.saveData) {
            document.body.style.animation = 'none';
        }

        // Reduce frame rate if needed
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
            console.log('Low-end device detected, reducing frame rate');
        }
    }

    // Setup touch controls
    setupTouchControls() {
        const container = document.getElementById('arContainer');
        
        if (!container) return;

        container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        });

        container.addEventListener('touchmove', (e) => {
            const deltaX = e.touches[0].clientX - this.touchStartX;
            const deltaY = e.touches[0].clientY - this.touchStartY;
            
            // Prevent default scroll
            e.preventDefault();
        });

        container.addEventListener('touchend', () => {
            this.touchStartX = 0;
            this.touchStartY = 0;
        });
    }

    // Setup AR controls
    setupARControls() {
        // Monitor AR session
        const modelViewer = document.getElementById('modelViewer');
        
        if (modelViewer) {
            modelViewer.addEventListener('ar-tracking-changed', (event) => {
                if (event.detail.status === 'not-tracking') {
                    this.showNotification('📍 Detecting surface...');
                } else if (event.detail.status === 'tracking') {
                    this.showNotification('✅ Surface detected!');
                }
            });
        }
    }

    // Show notification
    showNotification(message) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(56, 189, 248, 0.9);
            color: #000;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 999;
            animation: slideDown 0.3s ease;
        `;
        notif.textContent = message;
        document.body.appendChild(notif);

        setTimeout(() => notif.remove(), 2000);
    }

    // Get device info for optimization
    getDeviceInfo() {
        return {
            memory: navigator.deviceMemory || 'unknown',
            cores: navigator.hardwareConcurrency || 'unknown',
            connection: navigator.connection?.effectiveType || 'unknown',
            saveData: navigator.connection?.saveData || false
        };
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MobileARManager();
    });
} else {
    new MobileARManager();
}
// Initialize Lucide Icons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize Calculator
    initCalculator();

    // Mobile Navigation Toggle
    initMobileNav();

    // Scroll Animations
    initScrollAnimations();

    // Contact Form Handler
    initContactForm();
});

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Toggle icon menu / close
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                const currentIconName = icon.getAttribute('data-lucide');
                if (currentIconName === 'menu') {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Close menu when navigation link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }
}

/**
 * Interactive ROI Savings Calculator
 */
function initCalculator() {
    const hoursInput = document.getElementById('hours-input');
    const rateInput = document.getElementById('rate-input');
    const projectsInput = document.getElementById('projects-input');

    const hoursVal = document.getElementById('hours-val');
    const rateVal = document.getElementById('rate-val');
    const projectsVal = document.getElementById('projects-val');

    const monthlySavingsEl = document.getElementById('monthly-savings');
    const hoursSavedEl = document.getElementById('hours-saved');
    const yearlySavingsEl = document.getElementById('yearly-savings');

    if (!hoursInput || !rateInput || !projectsInput) return;

    function updateCalculations() {
        const hoursPerWeek = parseFloat(hoursInput.value);
        const hourlyRate = parseFloat(rateInput.value);
        const projectsCount = parseInt(projectsInput.value);

        // Update UI value badges
        hoursVal.textContent = `${hoursPerWeek} Hours`;
        rateVal.textContent = `$${hourlyRate}/hr`;
        projectsVal.textContent = `${projectsCount}`;

        // Calculations:
        // AI automates ~75% of manual estimation, spec extraction, blueprint mapping.
        const automationRate = 0.75;
        const weeksPerMonth = 4.33;
        
        // 1. Calculate Monthly Hours Saved
        const savedHoursPerMonth = Math.round(hoursPerWeek * automationRate * weeksPerMonth);
        
        // 2. Calculate Monthly Dollar Savings
        // Add a multiplier for error cost reductions based on project volume: $75 saved per bid in error avoidance
        const errorAvoidancePerProject = 75;
        const savedDollarsPerMonth = Math.round((savedHoursPerMonth * hourlyRate) + (projectsCount * errorAvoidancePerProject));
        
        // 3. Calculate Yearly Savings
        const savedDollarsPerYear = savedDollarsPerMonth * 12;

        // Animate count values (smooth counting effect)
        animateValue(hoursSavedEl, parseInt(hoursSavedEl.textContent) || 0, savedHoursPerMonth, 400, ' hrs');
        animateValue(monthlySavingsEl, parseCurrency(monthlySavingsEl.textContent) || 0, savedDollarsPerMonth, 400, '$');
        animateValue(yearlySavingsEl, parseCurrency(yearlySavingsEl.textContent) || 0, savedDollarsPerYear, 400, '$$');
    }

    // Add event listeners for sliders
    hoursInput.addEventListener('input', updateCalculations);
    rateInput.addEventListener('input', updateCalculations);
    projectsInput.addEventListener('input', updateCalculations);

    // Initial run
    updateCalculations();
}

/**
 * Value Animation Helper for Smooth Number Transitions
 */
function animateValue(obj, start, end, duration, formatFlag) {
    if (start === end) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Easing out quadratic
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * (end - start) + start);
        
        if (formatFlag === '$') {
            obj.textContent = `$${currentValue.toLocaleString()}`;
        } else if (formatFlag === '$$') {
            obj.textContent = `$${currentValue.toLocaleString()}`;
        } else {
            obj.textContent = `${currentValue}${formatFlag}`;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (formatFlag === '$' || formatFlag === '$$') {
                obj.textContent = `$${end.toLocaleString()}`;
            } else {
                obj.textContent = `${end}${formatFlag}`;
            }
        }
    };
    window.requestAnimationFrame(step);
}

function parseCurrency(str) {
    return parseInt(str.replace(/[^0-9]/g, '')) || 0;
}

/**
 * Scroll Animations using IntersectionObserver
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once animated, stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(el => {
            el.classList.add('visible');
        });
    }
}

/**
 * Contact Form Simulation with local success check
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');
    
    if (form && statusEl) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show processing status
            const submitBtn = form.querySelector('button[type="submit"]');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');
            
            submitBtn.disabled = true;
            if (submitBtnText) submitBtnText.textContent = 'Sending Message...';
            
            // Simulating API POST request
            setTimeout(() => {
                try {
                    // Collect form data (for validation simulation)
                    const name = document.getElementById('name').value;
                    const company = document.getElementById('company').value;
                    const email = document.getElementById('email').value;
                    const industry = document.getElementById('industry').value;
                    
                    if (!name || !company || !email || !industry) {
                        throw new Error('Please fill in all required fields.');
                    }

                    // Success state
                    statusEl.textContent = `Thank you, ${name}! Your request has been received. One of our engineers will contact you at ${email} shortly.`;
                    statusEl.className = 'form-status success';
                    
                    // Reset Form
                    form.reset();
                    
                    // Clean up button state
                    submitBtn.disabled = false;
                    if (submitBtnText) submitBtnText.textContent = 'Submit Request';
                } catch (error) {
                    statusEl.textContent = error.message || 'There was an error sending your request. Please try again.';
                    statusEl.className = 'form-status error';
                    submitBtn.disabled = false;
                    if (submitBtnText) submitBtnText.textContent = 'Submit Request';
                }
                
                // Scroll to status
                statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1200);
        });
    }
}

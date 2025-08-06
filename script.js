document.addEventListener('DOMContentLoaded', function() {
    // --- Header and Footer Injection ---
    // Function to generate the header HTML
    function getHeaderHTML() {
        const currentPath = window.location.pathname.split('/').pop();
        const links = [
            { name: 'Home', href: '#home' },
            { name: 'About Us', href: '#about' },
            { name: 'Services', href: '#services' },
            { name: 'Team', href: '#team' },
            { name: 'Insights', href: '#insights' }, // Renamed from reviews/blog
            { name: 'Contact', href: '#contact' },
        ];
        
        const navLinks = links.map(link => {
            // Check if the current section is active based on scroll position (handled by scroll observer)
            // For initial load, we don't mark active here, it's done by the Intersection Observer
            return `<a href="${link.href}" class="header-link text-gray-600 hover:text-accent-600 transition-colors duration-200 px-3 py-2 rounded-md font-medium">${link.name}</a>`;
        }).join('');

        return `
            <div class="bg-white shadow-sm sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center py-4 md:py-6">
                        <!-- Logo & Tagline -->
                        <div class="flex-shrink-0 flex items-center">
                            <a href="#home" class="flex items-center">
                                <!-- SVG Logo -->
                                <svg class="w-8 h-8 mr-2 text-accent-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z" fill="currentColor"/>
                                </svg>
                                <span class="text-2xl font-bold text-gray-800 leading-tight">
                                    Dr. [Doctor's Name]
                                    <span class="block text-sm text-gray-500 font-medium tracking-wide font-inter">Holistic Healing</span>
                                </span>
                            </a>
                        </div>
                        
                        <!-- Desktop Navigation -->
                        <nav class="hidden md:flex items-center space-x-4">
                            ${navLinks}
                            <a href="login.html" class="btn-primary inline-flex items-center justify-center text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl ml-4">
                                Book Appointment
                            </a>
                        </nav>
                        
                        <!-- Mobile Navigation (Hamburger Icon) -->
                        <div class="md:hidden flex items-center">
                            <a href="login.html" class="btn-primary inline-flex items-center justify-center text-white font-semibold py-2 px-4 rounded-full shadow-md mr-4">
                                Book
                            </a>
                            <button id="mobile-menu-toggle" class="text-gray-500 hover:text-gray-900 focus:outline-none">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Mobile Menu (To be toggled by JS) -->
                    <div id="mobile-menu" class="hidden md:hidden">
                        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#home" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-600 hover:bg-gray-50">Home</a>
                            <a href="#about" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-600 hover:bg-gray-50">About Us</a>
                            <a href="#services" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-600 hover:bg-gray-50">Services</a>
                            <a href="#team" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-600 hover:bg-gray-50">Team</a>
                            <a href="#insights" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-600 hover:bg-gray-50">Insights</a>
                            <a href="#contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-600 hover:bg-gray-50">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to generate the footer HTML
    function getFooterHTML() {
        return `
            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div class="md:flex md:justify-between">
                    <div class="mb-8 md:mb-0">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Contact Us</h3>
                        <p class="text-gray-600">
                            <span class="block">123 Health Ave, Wellness City, USA 12345</span>
                            <span class="block">Phone: (123) 456-7890</span>
                            <span class="block">Email: info@holistic-healing.com</span>
                        </p>
                    </div>
                    <div class="mb-8 md:mb-0">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Quick Links</h3>
                        <ul class="text-gray-600 space-y-1">
                            <li><a href="#home" class="hover:text-accent-600 transition-colors">Home</a></li>
                            <li><a href="#about" class="hover:text-accent-600 transition-colors">About Us</a></li>
                            <li><a href="#services" class="hover:text-accent-600 transition-colors">Services</a></li>
                            <li><a href="#insights" class="hover:text-accent-600 transition-colors">Insights</a></li>
                            <li><a href="#contact" class="hover:text-accent-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Connect</h3>
                        <div class="flex space-x-4">
                            <!-- Social Media Icons (SVG for clean display) -->
                            <a href="#" class="text-gray-400 hover:text-accent-600 transition-colors">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M22.25 12.012c0-5.525-4.502-10.012-10.012-10.012S2.226 6.487 2.226 12.012c0 4.93 3.593 9.022 8.358 9.873v-6.994H7.873V12.01h2.711v-2.083c0-2.684 1.583-4.148 4.02-4.148 1.15 0 2.298.204 2.298.204V7.54h-1.42c-1.396 0-1.83.864-1.83 1.758v1.365h3.044l-.485 3.003h-2.559v6.994c4.765-.85 8.358-4.943 8.358-9.873z" />
                                </svg>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-accent-600 transition-colors">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.9 6.2a8.6 8.6 0 00-2.4-.7c-.8.8-1.7 1.4-2.8 1.9a1.1 1.1 0 01-1.1 0c-1.1-.5-2-.6-3-.6s-1.9 0-2.8.6a1.1 1.1 0 01-1.1 0c-.8-.5-1.7-1.1-2.4-1.9a8.6 8.6 0 00-2.4.7A10.8 10.8 0 002 12c0 2.2.8 4.3 2.4 5.9a10.8 10.8 0 005.9 2.4c.8-.8 1.7-1.4 2.8-1.9a1.1 1.1 0 011.1 0c1.1.5 2 .6 3 .6s1.9 0 2.8-.6a1.1 1.1 0 011.1 0c.8.5 1.7 1.1 2.4 1.9a10.8 10.8 0 002.4-5.9c0-2.2-.8-4.3-2.4-5.9z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="mt-8 border-t border-gray-200 pt-8 text-center">
                    <p class="text-sm text-gray-500">
                        &copy; 2024 Dr. [Doctor's Name]. All rights reserved.
                    </p>
                </div>
            </div>
        `;
    }

    // Load components into the page
    document.getElementById('main-header').innerHTML = getHeaderHTML();
    document.getElementById('main-footer').innerHTML = getFooterHTML();
    
    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open'); // For CSS transition
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('open');
                }
                
                // Scroll to the target element with offset for fixed header
                const headerOffset = document.getElementById('main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Add a little extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Dynamic Blog Posts Loading (from JSON-like structure) ---
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const loadingMessage = document.getElementById('loading-message');

    // Simulate fetching data (in a real app, this would be a fetch call to a .json file or API)
    const postsData = [
        {
            "id": 1,
            "title": "The Benefits of Holistic Healing",
            "author": "Dr. [Doctor's Name]",
            "date": "August 1, 2024",
            "excerpt": "Discover how a holistic approach can improve your well-being, focusing on the mind, body, and spirit. We explore the interconnectedness of various health aspects...",
            "readMoreLink": "#" // Link to a dedicated blog post page if you expand this
        },
        {
            "id": 2,
            "title": "Understanding Homeopathic Remedies",
            "author": "Dr. [Doctor's Name]",
            "date": "July 25, 2024",
            "excerpt": "Homeopathy is a gentle and personalized system of medicine. Learn about its core principles, from the law of similars to the concept of potentization...",
            "readMoreLink": "#"
        },
        {
            "id": 3,
            "title": "A Guide to Natural Wellness",
            "author": "Dr. [Doctor's Name]",
            "date": "July 18, 2024",
            "excerpt": "From nutrition and exercise to mindfulness and stress management, this guide offers practical tips for integrating natural wellness into your daily routine...",
            "readMoreLink": "#"
        }
    ];

    function renderPosts(posts) {
        if (loadingMessage) {
            loadingMessage.style.display = 'none'; // Hide the loading message
        }

        if (posts.length === 0) {
            if (blogPostsContainer) {
                blogPostsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">No blog posts found.</p>';
            }
            return;
        }

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl duration-300';
            
            postCard.innerHTML = `
                <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${post.title}</h3>
                    <p class="text-sm text-gray-500 mb-4">
                        By ${post.author} on <time datetime="${post.date}">${post.date}</time>
                    </p>
                    <p class="text-gray-600 mb-4 about-text-font">${post.excerpt}</p>
                </div>
                <a href="${post.readMoreLink}" class="text-accent-600 font-semibold hover:text-accent-800 transition-colors duration-200 self-start mt-4">
                    Read More &rarr;
                </a>
            `;

            if (blogPostsContainer) {
                blogPostsContainer.appendChild(postCard);
            }
        });
    }

    // Initial render of blog posts
    renderPosts(postsData);

    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.header-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // When section is in middle of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

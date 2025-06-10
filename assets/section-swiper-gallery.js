document.addEventListener('DOMContentLoaded', function() {
	const swiperGallerySections = document.querySelectorAll('.swiper-gallery-section');

	swiperGallerySections.forEach(section => {
		const swiperContainer = section.querySelector('.mySwiper');
		if (!swiperContainer) return;

		// Read settings from data attributes
		const desktopSlidesPerView = parseInt(section.dataset.desktopSlidesPerView);
		const desktopPagination = section.dataset.desktopPagination === 'true';
		const desktopNavigation = section.dataset.desktopNavigation === 'true';
		const desktopSpaceBetween = parseInt(section.dataset.desktopSpaceBetween);

		const tabletSlidesPerView = parseInt(section.dataset.tabletSlidesPerView);
		const tabletPagination = section.dataset.tabletPagination === 'true';
		const tabletNavigation = section.dataset.tabletNavigation === 'true';
		const tabletSpaceBetween = parseInt(section.dataset.tabletSpaceBetween);

		const mobileSlidesPerView = parseInt(section.dataset.mobileSlidesPerView);
		const mobilePagination = section.dataset.mobilePagination === 'true';
		const mobileNavigation = section.dataset.mobileNavigation === 'true';
		const mobileSpaceBetween = parseInt(section.dataset.mobileSpaceBetween);

		const swiperOptions = {
			// Default options (can be overridden by settings)
			loop: false,

			// Initial settings for mobile first (can be overridden by breakpoints)
			slidesPerView: mobileSlidesPerView,
			spaceBetween: mobileSpaceBetween,
			pagination: mobilePagination ? { el: ".swiper-pagination", clickable: true } : false,
			navigation: mobileNavigation ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" } : false,

			breakpoints: {
				// Tablet settings
				768: {
					slidesPerView: tabletSlidesPerView,
					spaceBetween: tabletSpaceBetween,
					pagination: tabletPagination ? { el: ".swiper-pagination", clickable: true } : false,
					navigation: tabletNavigation ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" } : false,
				},
				// Desktop settings
				992: { // Or a larger breakpoint, e.g., 1024 or 1200 depending on theme
					slidesPerView: desktopSlidesPerView,
					spaceBetween: desktopSpaceBetween,
					pagination: desktopPagination ? { el: ".swiper-pagination", clickable: true } : false,
					navigation: desktopNavigation ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" } : false,
				}
			}
		};

		// Initialize Swiper
		try {
			new Swiper(swiperContainer, swiperOptions);
			console.log(`Swiper initialized for section ${section.dataset.sectionId}`);
		} catch (error) {
			console.error("Error initializing Swiper:", error);
		}
	});
});
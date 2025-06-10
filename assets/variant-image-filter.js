class VariantImageFilter extends HTMLElement {
	constructor() {
		super();
		this.productInfo = this.closest('product-info');
		if (this.productInfo) {
			this.productInfo.addEventListener('variant:change', this.onVariantChange.bind(this));
		}
		this.mediaItems = this.querySelectorAll('.product__media-item');
		this.thumbnailItems = this.querySelectorAll('.thumbnail-list__item');
		this.initialActiveMedia = this.querySelector('.product__media-item.is-active');
		this.initialActiveThumbnail = this.querySelector('.thumbnail-list__item.is-active');
	}

	onVariantChange(event) {
		const selectedVariant = event.detail.variant;
		if (!selectedVariant) {
			return;
		}

		const selectedVariantId = selectedVariant.id;
		this.mediaItems.forEach(item => item.classList.remove('is-active'));
		this.thumbnailItems.forEach(item => item.classList.remove('is-active'));

		let firstVisibleMediaFound = false;


		this.mediaItems.forEach(mediaItem => {
			const variantIds = mediaItem.dataset.variantIds ? mediaItem.dataset.variantIds.split(',').map(Number) : [];

			if (variantIds.includes(selectedVariantId) || (variantIds.length === 0 && mediaItem.dataset.variantIds === 'all')) {
				mediaItem.style.display = '';
				if (!firstVisibleMediaFound) {
					mediaItem.classList.add('is-active');
					firstVisibleMediaFound = true;

					const mediaId = mediaItem.dataset.mediaId;
					const correspondingThumbnail = this.querySelector(`.thumbnail-list__item[data-target="${mediaId}"]`);
					if (correspondingThumbnail) {
						correspondingThumbnail.classList.add('is-active');
					}
				}
			} else {
				mediaItem.style.display = 'none';
			}
		});

		this.thumbnailItems.forEach(thumbnailItem => {
			const variantIds = thumbnailItem.dataset.variantIds ? thumbnailItem.dataset.variantIds.split(',').map(Number) : [];

			if (variantIds.includes(selectedVariantId) || (variantIds.length === 0 && thumbnailItem.dataset.variantIds === 'all')) {
				thumbnailItem.style.display = '';
			} else {
				thumbnailItem.style.display = 'none';
			}
		});
	}
}

customElements.define('variant-image-filter', VariantImageFilter);
document.addEventListener('DOMContentLoaded', () => {
	const productInfoElement = document.querySelector('product-info');
	if (productInfoElement) {
		const currentVariantInput = document.querySelector(`#ProductInfo-${productInfoElement.dataset.section} input[name="id"]`);
		if (currentVariantInput && currentVariantInput.value) {
			const currentVariantId = Number(currentVariantInput.value);
			const productForm = document.querySelector(`#product-form-${productInfoElement.dataset.section}`);
			if (productForm && productForm.product) {
				const selectedVariant = productForm.product.variants.find(v => v.id === currentVariantId);
				if (selectedVariant) {
					const customEvent = new CustomEvent('variant:change', {
						detail: { variant: selectedVariant }
					});
					productInfoElement.dispatchEvent(customEvent);
				}
			}
		}
	}
});
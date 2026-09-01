import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ProductColor, ProductImage } from '@/types/product';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  selectedColor: ProductColor;
}

export function ProductGallery({ images, productName, selectedColor }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(0);
    setZoomOpen(false);
    const gallery = mobileGalleryRef.current;
    if (gallery) {
      if (typeof gallery.scrollTo === 'function') {
        gallery.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        gallery.scrollLeft = 0;
      }
    }
  }, [images]);

  const showPrevious = () => setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setSelectedIndex((current) => (current + 1) % images.length);

  const scrollToImage = (index: number) => {
    setSelectedIndex(index);
    const gallery = mobileGalleryRef.current;
    if (!gallery) return;
    const left = gallery.clientWidth * index;
    if (typeof gallery.scrollTo === 'function') {
      gallery.scrollTo({ left, behavior: 'smooth' });
    } else {
      gallery.scrollLeft = left;
    }
  };

  const updateMobileIndex = () => {
    const gallery = mobileGalleryRef.current;
    if (!gallery || gallery.clientWidth === 0) return;
    setSelectedIndex(Math.round(gallery.scrollLeft / gallery.clientWidth));
  };

  const activeImage = images[selectedIndex] ?? images[0];

  if (!activeImage) return null;

  return (
    <Dialog.Root open={zoomOpen} onOpenChange={setZoomOpen}>
      <div className="product-gallery product-gallery--desktop">
        <div className="product-gallery__main">
          <img
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            width="1122"
            height="1402"
            style={{ objectPosition: activeImage.position }}
            data-testid="product-gallery-main-image"
          />
          <span className="product-gallery__variant">
            <i style={{ backgroundColor: selectedColor.hex }} aria-hidden="true" />
            {selectedColor.name}
          </span>
          <Dialog.Trigger asChild>
            <button className="product-gallery__expand" aria-label={`Ampliar imagem de ${productName}`}>
              <Expand aria-hidden="true" />
              Ampliar
            </button>
          </Dialog.Trigger>
          <span className="product-gallery__counter">{String(selectedIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          {images.length > 1 && (
            <div className="product-gallery__arrows">
              <button type="button" onClick={showPrevious} aria-label="Imagem anterior">
                <ChevronLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={showNext} aria-label="Próxima imagem">
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="product-gallery__thumbnails" aria-label="Outras imagens do produto">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              onClick={() => setSelectedIndex(index)}
              className={selectedIndex === index ? 'is-active' : undefined}
              aria-label={`Ver imagem ${index + 1} de ${productName}`}
              aria-pressed={selectedIndex === index}
            >
              <img
                src={image.src}
                alt=""
                width="1122"
                height="1402"
                loading={index === 0 ? 'eager' : 'lazy'}
                style={{ objectPosition: image.position }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="product-gallery product-gallery--mobile">
        <div ref={mobileGalleryRef} className="product-gallery__rail" onScroll={updateMobileIndex}>
          {images.map((image, index) => (
            <div key={`${image.src}-${index}`} className="product-gallery__slide">
              <img
                src={image.src}
                alt={image.alt}
                width="1122"
                height="1402"
                loading={index === 0 ? 'eager' : 'lazy'}
                style={{ objectPosition: image.position }}
              />
            </div>
          ))}
        </div>
        <div className="product-gallery__mobile-nav">
          <span>{selectedIndex + 1} / {images.length}</span>
          <div>
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                onClick={() => scrollToImage(index)}
                className={selectedIndex === index ? 'is-active' : undefined}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay dialog-overlay--dark" />
        <Dialog.Content className="image-lightbox">
          <Dialog.Title className="sr-only">Galeria ampliada de {productName}</Dialog.Title>
          <Dialog.Description className="sr-only">
            Imagem {selectedIndex + 1} de {images.length}.
          </Dialog.Description>
          <Dialog.Close className="icon-button image-lightbox__close" aria-label="Fechar imagem ampliada">
            <X aria-hidden="true" />
          </Dialog.Close>
          {images.length > 1 && (
            <button className="image-lightbox__previous" onClick={showPrevious} aria-label="Imagem anterior">
              <ChevronLeft aria-hidden="true" />
            </button>
          )}
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            width="1122"
            height="1402"
            style={{ objectPosition: activeImage.position }}
          />
          {images.length > 1 && (
            <button className="image-lightbox__next" onClick={showNext} aria-label="Próxima imagem">
              <ChevronRight aria-hidden="true" />
            </button>
          )}
          <span className="image-lightbox__counter">{selectedIndex + 1} / {images.length}</span>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

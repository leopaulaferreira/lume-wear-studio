import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ProductImage } from '@/types/product';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const showPrevious = () => setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setSelectedIndex((current) => (current + 1) % images.length);

  const scrollToImage = (index: number) => {
    setSelectedIndex(index);
    const gallery = mobileGalleryRef.current;
    if (gallery) gallery.scrollTo({ left: gallery.clientWidth * index, behavior: 'smooth' });
  };

  const updateMobileIndex = () => {
    const gallery = mobileGalleryRef.current;
    if (!gallery || gallery.clientWidth === 0) return;
    setSelectedIndex(Math.round(gallery.scrollLeft / gallery.clientWidth));
  };

  return (
    <Dialog.Root open={zoomOpen} onOpenChange={setZoomOpen}>
      <div className="product-gallery product-gallery--desktop">
        <div className="product-gallery__main">
          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            width="1122"
            height="1402"
          />
          <Dialog.Trigger asChild>
            <button className="product-gallery__expand" aria-label={`Ampliar imagem de ${productName}`}>
              <Expand aria-hidden="true" />
              Ampliar
            </button>
          </Dialog.Trigger>
          <span className="product-gallery__counter">{String(selectedIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        </div>
        <div className="product-gallery__thumbnails" aria-label="Outras imagens do produto">
          {images.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setSelectedIndex(index)}
              className={selectedIndex === index ? 'is-active' : undefined}
              aria-label={`Ver imagem ${index + 1} de ${productName}`}
              aria-pressed={selectedIndex === index}
            >
              <img src={image.src} alt="" width="1122" height="1402" loading={index === 0 ? 'eager' : 'lazy'} />
            </button>
          ))}
        </div>
      </div>

      <div className="product-gallery product-gallery--mobile">
        <div ref={mobileGalleryRef} className="product-gallery__rail" onScroll={updateMobileIndex}>
          {images.map((image, index) => (
            <div key={image.src} className="product-gallery__slide">
              <img
                src={image.src}
                alt={image.alt}
                width="1122"
                height="1402"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
        <div className="product-gallery__mobile-nav">
          <span>{selectedIndex + 1} / {images.length}</span>
          <div>
            {images.map((image, index) => (
              <button
                key={image.src}
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
          <button className="image-lightbox__previous" onClick={showPrevious} aria-label="Imagem anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <img src={images[selectedIndex].src} alt={images[selectedIndex].alt} width="1122" height="1402" />
          <button className="image-lightbox__next" onClick={showNext} aria-label="Próxima imagem">
            <ChevronRight aria-hidden="true" />
          </button>
          <span className="image-lightbox__counter">{selectedIndex + 1} / {images.length}</span>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

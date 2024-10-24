import Image from 'next/image';
import React from 'react';
import { BannerImageCard } from 'views/guestViews/commonComponents/WorkerCard/WorkerCard.styled';

const HomeHeroBanner = ({ isSmDown, isSm }: { isSmDown: boolean; isSm: boolean }) => {
  return (
    <BannerImageCard>
      <picture>
        <source
          media="(max-width:699px)"
          srcSet="https://ik.imagekit.io/gpgv4gnda/images/1729084436818home-banner-model1_1qobIoZFu.webp"
          type="image/webp"
        />
        <source
          media="(max-width:640px)"
          srcSet="https://ik.imagekit.io/gpgv4gnda/images/1729084436818home-banner-model1_1qobIoZFu.webp"
          type="image/webp"
        />
        <Image
          alt="home_model"
          decoding="async"
          width={isSm && isSmDown ? 300 : isSmDown ? 347 : 462}
          height={isSmDown ? 339 : 452}
          src="https://ik.imagekit.io/gpgv4gnda/images/1729084436818home-banner-model1_1qobIoZFu.webp"
          placeholder="blur"
          blurDataURL="/images/home/home-banner-blur.webp"
          style={{ borderRadius: '12px', right: 0 }}
          priority={true}
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 600px) 300px, (max-width: 768px) 347px, 462px"
        />
      </picture>
    </BannerImageCard>
  );
};

export default HomeHeroBanner;

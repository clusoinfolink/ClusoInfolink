'use client';

import Slider from 'react-slick';

function getCompanyMark(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'CO';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}

function CompanyItem({ name }: { name: string }) {
  const mark = getCompanyMark(name);

  return (
    <article className="company-slide-item" aria-label={name}>
      <span className="company-mark" aria-hidden="true">
        {mark}
      </span>
      <span className="company-name">{name}</span>
    </article>
  );
}

interface TrustedCompaniesProps {
  companies?: string[];
}

export function TrustedCompanies({ companies }: TrustedCompaniesProps) {
  const companyNames = (companies ?? [])
    .map((item) => item.trim())
    .filter(Boolean);

  if (companyNames.length === 0) {
    return null;
  }

  const baseList = companyNames;
  const minimumLoopItems = 18;
  const repeatCount = Math.max(2, Math.ceil(minimumLoopItems / baseList.length));
  const listToRender = Array.from({ length: repeatCount }, () => baseList).flat();

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <section className="company-slider-section" aria-label="Trusted companies">
      <div className="company-slider-wrap">
        <Slider {...settings}>
          {listToRender.map((company, index) => (
            <CompanyItem key={`${company}-${index}`} name={company} />
          ))}
        </Slider>
      </div>

      <p className="company-slider-caption">Startups who use our platform</p>
    </section>
  );
}
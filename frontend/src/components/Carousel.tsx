import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

interface Props {
  items: any[];
  variant: string;
}

const CustomCarousel = (props: Props) => {
  const { variant, items } = props;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant={variant} className='w-100'>
      {items.map((i) => {
        return (
          <Carousel.Item interval={2000} key={i.id}>
            <div className='w-75 ms-auto me-auto p-6 mb-6'>{i.item}</div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export { CustomCarousel };

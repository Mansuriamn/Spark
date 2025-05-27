import React from 'react';


export const Logo = [
  {
    id: 1,
    name: 'logo1',
    imgPath: '/assets/img/logo2.svg',
  },
  {
    id: 2,
    name: 'logo2',
    imgPath: '/assets/img/logo3.jpg',
  },
  {
    id: 3,
    name: 'logo3',
    imgPath: '/assets/img/logo4.jpg',
  },
];

const LogoIcon = ({ icon }) => {
  return (
    <div className='flex-none flex-center marquee-items'>
      <img src={icon.imgPath} alt={icon.name} />
    </div>
  );
};

const LogoSection = () => {
  return (
    <div className='md:my-20 my-10 relative'>
      <div className='gradient-edge' />
      <div className='gradient-edge' />

      <div className='marquee h-52'>
        <div className='md:gap-12 gap-5 flex justify-center items-center w-full absolute overflow-hidden marquee-box'>
          {Logo.map((icon) => (
            <LogoIcon key={icon.id} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;

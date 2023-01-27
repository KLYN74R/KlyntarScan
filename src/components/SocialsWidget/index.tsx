import React from 'react';
import config from '../../config';

import telegram from '../../assets/img/socials/telegram.png';
import github from '../../assets/img/socials/github.png';
import twitter from '../../assets/img/socials/twitter.png';
import medium from '../../assets/img/socials/medium.png';

const icons = {
    telegram,
    github,
    twitter,
    medium
}

const SocialsWidget: React.FC = () => {
  return (
      <div className='mt-8'>
          <ul className='flex items-center justify-center'>
              {Object.keys(config.socials).map((item, idx) => (
                  <li key={idx} className='first:ml-0 ml-5'>
                      <a href={config.socials[item as keyof typeof config.socials]} target='_blank' rel='noreferrer'>
                          <img
                              src={icons[item as keyof typeof icons]}
                              alt={item}
                              width={30}
                              height={30}
                          />
                      </a>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default SocialsWidget;
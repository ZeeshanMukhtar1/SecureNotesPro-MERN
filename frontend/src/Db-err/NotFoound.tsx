import React from 'react';
import NotFoundStyles from '../styles/NotFound.module.css';
import NotFoundImg from './funny-404-error-page-design.gif';

const NotFoound = () => {
  return (
    <div>
      {/* error image */}
      <img
        style={{
          marginTop: '-10%',
          width: '50%',
          height: '100%',
          marginLeft: '25%',
        }}
        className={NotFoundStyles.ImgStyles}
        src={NotFoundImg}
        alt="Empty Database"
      />
      {/* error msg */}
      <p className={NotFoundStyles.textStyles}>
        Sorry , No notes available in Databse , please add some notes..!
      </p>
    </div>
  );
};

export default NotFoound;

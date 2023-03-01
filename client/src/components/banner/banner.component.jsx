import React from 'react'
import './banner.styles.scss'
import bannerImg1 from '../../assest/svgs/banner1.svg'
import bannerImg2 from '../../assest/svgs/banner2.svg'
export const BannerRaiser = () => {
  return (
    <div className='banner'>
        <div className="banner__container">
            <div className="banner__container-1">
                <div className="banner__item">
                    <div className="banner__item-text">
                        welcome <span>to</span><br /> help desk
                    </div>
                </div>
                <div className="banner__item">
                    <div className="banner__item-img">

                    <img src={bannerImg1} alt="" />
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}


export const BannerIssuer = () => {
  return (
     <div className='banner'>
         <div className="banner__container">
            <div className="banner__container-2">
                <div className="banner__item">
                        welcome 
                </div>
                <div className="banner__item">
                    <div className="banner__item-img">
                        <img src={bannerImg2} alt="" />
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

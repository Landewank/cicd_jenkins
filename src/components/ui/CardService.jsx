import React from 'react'

const CardService = ({ backgroundColor, hoverBgColor, imageSrc, title, description, width, textColor, animation, animationDuration }) => {
  return (
    <div>
      <div data-testid="cardService" className={`relative ${backgroundColor}  ${textColor} ${width}  overflow-hidden rounded-2xl p-5 text-center group cursor-pointer`} data-aos-duration={`${animationDuration}`} data-aos="fade-up">
        {/* Pseudo-element for hover effect */}
        <div className={`absolute inset-0 ${hoverBgColor}  transform -translate-x-full transition-transform duration-1000 ease-in-out group-hover:translate-x-0 z-0`}></div>
        {/* Content inside card */}
        <div className="relative">
          <div className="mb-5">
            <div className="flex justify-center mb-2">
              <img src={imageSrc} alt="logo section service" />
            </div>
            <div className="font-bold text-3xl">
              <h3>{title}</h3>
            </div>
          </div>
          <blockquote className="text-center">
            <p>{description}</p>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
export default CardService;
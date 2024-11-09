
import React from 'react';
// import Carousel from './components/Carousel';

function Team() {
  return (
    <>
    <div className="Teams">

    <div className="flex items-center justify-center min-h-sscreen">
        <div className="carousel w-full  max-w-md mx-auto flex items-center">

        
        <div id="slide1" className="carousel-item relative w-full flex-col">
            
            <img
            src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/be/4a/1d/62/dc/v1_E10/E10AG20W.jpg?w=800&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=12e745ca711d5bf0e27b9dd6f9dfe2f9049cc60fd7bee884caa8363f85c9ffd6"
            className="w-full  md:h-64 lg:h-80 object-cover " />
            
            <div className="text-center p-4" style={{ backgroundColor: '#629584', width: '100%', marginTop: '0.5rem' }}>
                <h2 class="text-lg font-bold">Anupma Kumari</h2>
                <p class="text-sm">Reg No: 20233072</p>
                <p class="text-sm">Discord: anupma1111</p>
            </div>

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
            
            
        </div>

        
        <div id="slide2" className="carousel-item relative w-full flex-col">
            <img
            src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/c0/a5/47/f7/ca/v1_E10/E105JAJ6.jpg?w=800&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=792cb0cae854d155b2ba117d9ee7340e59d0160975929b4f3762b6bb7e3afb84"
            className="w-full h-40 md:h-64 lg:h-80 object-cover" />

            <div className="text-center p-4" style={{ backgroundColor: '#629584', width: '100%', marginTop: '0.5rem' }}>
                <h2 class="text-lg font-bold">Astha Jaiswal</h2>
                <p class="text-sm">Reg No: 20233091</p>
                <p class="text-sm">Discord: astha_jaiswal</p>
            </div>

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full flex-col">
            <img
            src="https://elements-resized.envatousercontent.com/envato-shoebox/5f8d/e475-ab35-47d8-adb8-fd4f1889a9b7/DSC_7309.JPG?w=800&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=8da506ad9552037bc788aa10e823fb1b3179569e1549c4ac0e53984beb93ec32"
            className="w-full h-40 md:h-64 lg:h-80 object-cover" />

                    <div className="text-center p-4" style={{ backgroundColor: '#629584', width: '100%', marginTop: '0.5rem' }}>
                        <h2 class="text-lg font-bold">Anushka Prajapati</h2>
                        <p class="text-sm">Reg No: 20233074</p>
                        <p class="text-sm">Discord: Vonn4254</p>
                    </div>

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
        </div>
</div>
</div>
</div>
    </>
  );
}

export default Team;
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
            src="rhttps://www.schemecolor.com/images/color-image-thumb.php?tx&n=Soap&w=250&h=250&hex=DBCDF0"
            className="w-full h-40 md:h-64 lg:h-80 object-cover " />
            
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
            src="rhttps://wallpaperaccess.com/full/6887714.jpg"
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
            src="rhttps://www.siepmann.net/produktbilder/655216/plane-beige.png"
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
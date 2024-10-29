import React from 'react'

function About() {
    return (
        <>
            <div className="bg-gray-100" style={{ color: 'black' }}>
                <section className="relative bg-white px-6 py-12 shadow-lg z-10 mx-auto max-w-5xl">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-sm uppercase font-bold text-gray-600 mb-2">Who we are</h2>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">About us</h2>
                            <p className="text-gray-700 mb-6">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi dolor, saepe assumenda eos reprehenderit ipsam maxime quasi. Expedita, consectetur tempora doloribus architecto accusamus nobis cupiditate reiciendis eos, perspiciatis, fugiat placeat?
                            </p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                            <div className="mt-4">
                                <button className="bg-black text-white px-5 py-2 rounded-full mt-2 hover:bg-gray-700 hover:shadow-lg transform hover:scale-105 transition duration-200">
                                    Read more
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <img
                                src="..\public\Darshan-logo.png"
                                alt="About us"
                                className="rounded-lg shadow-md transform transition duration-200 hover:scale-105"
                            />
                        </div>
                    </div>
                </section>

            </div>

        </>
    )
}

export default About;

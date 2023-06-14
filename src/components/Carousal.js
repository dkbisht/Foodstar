import React from 'react'

export default function Carousal() {
    return (
        <div>
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div class="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div class="carousel-item active">
                        <img src="https://source.unsplash.com/random/1400x700?burger" class="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
                    </div>
                    <div class="carousel-item">
                        <img src="https://source.unsplash.com/random/1400x700?springroll" class="d-block w-100" alt="..." style={{filter:"brightness(30%)"}} />
                    </div>
                    <div class="carousel-item">
                        <img src="https://source.unsplash.com/random/1400x700?pizza" class="d-block w-100" alt="..." style={{filter:"brightness(30%)"}} />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

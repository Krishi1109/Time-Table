import React from 'react'
import vvp from '../vvp.png'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    
                    <a  href="#"><img src={vvp} className="text-center p-1" alt="" height="60px" weight="50px"/></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/faculty">Faculty List</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/subjects">Subjects</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/reserve">Reserve Slot</a>
                            </li>

                            <div class="btn-group" role="group">
                                <button id="btnGroupDrop1" type="button" class="nav-item btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    ODD Sem
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <li><a class="dropdown-item" href="/3">Sem-3</a></li>
                                    <li><a class="dropdown-item" href="/5">Sem-5</a></li>
                                    <li><a class="dropdown-item" href="/7">Sem-7</a></li>
                                </ul>
                            </div>
                            <div class="btn-group" role="group">
                                <button id="btnGroupDrop1" type="button" class="nav-item btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Even Sem
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <li><a class="dropdown-item" href="/4">Sem-4</a></li>
                                    <li><a class="dropdown-item" href="/6">Sem-6</a></li>
                                    <li><a class="dropdown-item" href="/8">Sem-8</a></li>
                                </ul>
                            </div>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

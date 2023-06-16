import React, { useState, useEffect } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import axios from 'axios'
import spinner from "../load.gif"
import './style.css'

const Reserve = () => {
    const [reserveSlot, setReserveSlot] = useState([])
    const [deleteData, setDeleteData] = useState([])

    const [sem, setSem] = useState('')
    const [day, setDay] = useState('')
    const [slot, setSlot] = useState('')
    const [activity, setActivity] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/getreserveslot')
            .then(res => setReserveSlot(res.data))
            .catch(error => console.log(error))
    })

    const deleteReserveSlot = id => {
        axios.delete(`http://localhost:5000/deletereserve/${id}`)
            .then(res => alert("Deleted successfully"))
        setDeleteData(deleteData.filter(elem => elem._id !== id))
    }

    const handleSelectSem = (e) => {
        console.log(e);
        setSem(e)
    }

    const handleSelectDay = (e) => {
        console.log(e);
        setDay(e);
    }

    const handleSelectSlot = (e) => {
        console.log(e);
        setSlot(e);
    }
    const PostData = (e) => {
        e.preventDefault();

        const reserve = {
            sem, day, slot, activity
        }
        axios.post('http://localhost:5000/reserve', reserve)
            .then(res => console.log(res.data))
            .catch(err => alert("Something went wrong!"))
    }

    return (
        <div className="container mt-4">
            <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" class="scrollspy-example    scorll_middle p-4" tabindex="0">
                <table class="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">Index</th> */}
                            <th className="text-center" scope="col">Semester</th>
                            <th className="text-center" scope="col">Day</th>
                            <th className="text-center" scope="col">Slot</th>
                            <th className="text-center" scope="col">Activity</th>
                            <th className="text-center" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {
                                reserveSlot.map((data, key) => (
                                    
                                <tr key={key}>
                                    
                                    <td  className="text-center">{data.sem != "5" ? <span class="fs-6 badge bg-light text-dark">{data.sem}</span> :<span class="fs-6 badge bg-dark text-light">{data.sem}</span> }</td>
                                    <td  className="text-center">{data.sem != "5" ? <span class="fs-6 badge bg-light text-dark">{data.day}</span> :<span class="fs-6 badge bg-dark text-light">{data.day}</span> }</td>
                                    <td  className="text-center">{data.sem != "5" ? <span class="fs-6 badge bg-light text-dark">{data.slot}</span> :<span class="fs-6 badge bg-dark text-light">{data.slot}</span> }</td>
                                    
                                    <td  className="text-center">{!data.activity ? <span class="fs-6 badge bg-warning text-dark">Free</span> : <span class="fs-6 badge bg-light text-dark">{data.activity}</span>}</td>
                                    <td className="text-center">
                                    <button  to="/delete-article" onClick={() => deleteReserveSlot(data._id)} class="btn btn-danger mx-2"><span class="fas fa-trash-alt"> Delete</span></button></td>
                                </tr>
                                ))
                            }
                            
                        
                    </tbody>
                </table>
            </div>

            <hr />
            <form onSubmit={PostData} encType="multipart/form-data" className=" p-4">
                <div className="row">
                    <div className="mb-3 col-md-2" >
                        <DropdownButton alignRight title={!sem ? "Semester" : "Semester " + sem} onSelect={handleSelectSem}  >
                            <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            <Dropdown.Item eventKey="4">4</Dropdown.Item>
                            <Dropdown.Item eventKey="5">5</Dropdown.Item>
                            <Dropdown.Item eventKey="6">6</Dropdown.Item>
                            <Dropdown.Item eventKey="7">7</Dropdown.Item>
                            <Dropdown.Item eventKey="8">8</Dropdown.Item>
                        </DropdownButton>

                    </div>
                    <div className="mb-3 col-md-2">
                        <DropdownButton alignRight title={!day ? "Day" : day} onSelect={handleSelectDay}  >
                            <Dropdown.Item eventKey="Monday">Monday</Dropdown.Item>
                            <Dropdown.Item eventKey="Tuesday">Tuesday</Dropdown.Item>
                            <Dropdown.Item eventKey="Wednesday">Wednesday</Dropdown.Item>
                            <Dropdown.Item eventKey="Thursday">Thursday</Dropdown.Item>
                            <Dropdown.Item eventKey="Friday">Friday</Dropdown.Item>
                            <Dropdown.Item eventKey="Saturday">Saturday</Dropdown.Item>
                        </DropdownButton>

                    </div>
                    <div className="mb-3 col-md-2">
                        <DropdownButton alignRight title={!slot ? "Slot" : "Slot " + slot} onSelect={handleSelectSlot} >
                            <Dropdown.Item eventKey="1">1</Dropdown.Item>
                            <Dropdown.Item eventKey="2">2</Dropdown.Item>
                            <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            <Dropdown.Item eventKey="4">4</Dropdown.Item>
                            <Dropdown.Item eventKey="5">5</Dropdown.Item>
                            <Dropdown.Item eventKey="6">6</Dropdown.Item>
                        </DropdownButton>

                    </div>
                    <div className="mb-3 col-md-4">
                        <input type="text" className="form-control" placeholder="Activity"
                        value={activity} onChange={e => setActivity(e.target.value)}
                        />

                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-success"><i class="fas fa-user-plus"> Reserve</i></button>
                    </div>
                   
                </div>
            </form>


        </div>
    )
}

export default Reserve


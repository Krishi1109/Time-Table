import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import spinner from "../../load.gif"
import {Link} from 'react-router-dom'
import '../style.css'

const Sem6 = () => {

    const [deleteData, setDeleteData] = useState([])

    const [teachers, setTeachers] = useState([])
    const [tiletableList, setTimetableList] = useState([])

    const [fname, setFname] = useState('');
    const [sub, setSub] = useState('');
    const [lec, setLec] = useState('');
    const [lab, setLab] = useState('');
    const [sem, setSem] = useState(6);

    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/getsub')
            .then(res => setSubjects(res.data))
            .catch(error => console.log(error))
    })
    

    const deleteTimeData = id => {
        axios.delete(`http://localhost:5000/delete/${id}`)
        .then(res => alert("Deleted successfully"))
        setDeleteData(deleteData.filter(elem => elem._id !== id))
    }

    useEffect(() => {
        axios.get('http://localhost:5000/data6')
            .then(res => setTimetableList(res.data))
            .catch(error => console.log(error))
    })

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(res => setTeachers(res.data))
            .catch(error => console.log(error))
    })

    const handleSelectFname = (e) => {
        console.log(e);
        setFname(e)
    }
    const handleSelectSub = (e) => {
        console.log(e);
        setSub(e)
    }
    const changeOnClick = (e) => {
        e.preventDefault();

        const timetable = {
            sem, fname, sub, lec, lab
        }
        axios.post('http://localhost:5000/sem', timetable)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-4">
            <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" class="scrollspy-example scorll_middle p-4" tabindex="0">
                
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sem</th>
                            <th scope="col">Faculty Name</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Lecture</th>
                            <th scope="col">Lab</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody >{!tiletableList.length ? <div><img className="position-absolute top-50 start-50 translate-middle-x"  src={spinner} alt="" /> </div>: 
                        tiletableList.map((data, key) => (
                                <tr key={key}>
                                <td>{data.sem}</td>
                                <td>{data.fname}</td>
                                <td>{data.sub}</td>
                                <td>{data.lec}</td>
                                <td>{data.lab}</td>
                                {/* <Link to={`/edit-article/${article._id}`} class="btn btn-primary">Edit</Link> */}
                                <td><Link to={`/edit/${data._id}`} type="button" class="btn btn-info mx-2"><i class="fas fa-edit"> Edit</i></Link>
                                <button onClick={() => deleteTimeData(data._id)} to="/delete-article" class="btn btn-danger mx-2"><i class="fas fa-trash-alt"> Delete</i></button></td>
                                
                            </tr>
                            
                        ))}

                    </tbody>
                </table>
            </div>
            <form onSubmit={changeOnClick} encType="multipart/form-data" >
                <div className="row mt-4 pt-5">
                <hr />
                <div className="col-md-2">
                    <DropdownButton
                        alignRight
                        title={!fname ? "Faculty Name" : fname}
                        id="dropdown-menu-align-right"
                        onSelect={handleSelectFname}
                    >
                        {teachers.map((teacher, key) => (
                            <Dropdown.Item eventKey={teacher.name}>{teacher.name}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="col-md-2">
                    <DropdownButton
                            alignRight
                            title={!sub ? "Subject" : sub}
                            id="dropdown-menu-align-right"
                            onSelect={handleSelectSub}
                        >
                            {subjects.map((sub, key) => (
                                <>
                                {sub.sem === 6 ? <Dropdown.Item eventKey={sub.sub}>{sub.sub}</Dropdown.Item> 
                                : <> </>}
                                
                                </>
                            ))}
                        </DropdownButton>
                    </div>
                <div className="col-md-3 mb-3">
                        <input type="text" className="form-control" placeholder="Lecture Hour"
                        value={lec} onChange={e => setLec(e.target.value)}/>
                    </div>
                    <div className="col-md-3 mb-3">
                        <input type="text" className="form-control" placeholder="Lab Hour"
                        value={lab} onChange={e => setLab(e.target.value)}/>
                    </div>
                    
                    <button type="submit" class="btn btn-success col-md-2 "><i class="fas fa-plus-square"> Add</i></button>
                </div>
            </form>

        </div>
    )
}

export default Sem6

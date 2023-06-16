import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import spinner from "../load.gif"
import './style.css'

const Subjects = () => {
    const [deleteData, setDeleteData] = useState([])

    const [sem, setSem] = useState()
    const [sub, setSub] = useState('')
    const [subjects, setSubjects] = useState([])

    const handleSelectSub = (e) => {
        console.log(e);
        setSem(e)
    }
    const deleteTimeData = id => {
        axios.delete(`http://localhost:5000/delsub/${id}`)
            .then(res => alert("delete successfully"))
        setDeleteData(deleteData.filter(elem => elem._id !== id))
    }


    useEffect(() => {
        axios.get('http://localhost:5000/getsub')
            .then(res => setSubjects(res.data))
            .catch(error => console.log(error))
    })

    const changeOnClick = (e) => {
        e.preventDefault();

        const subjects = {
            sub, sem
        }

        setSub('')
        axios.post('http://localhost:5000/subjects', subjects)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    return (
        <div className="container mt-4">
            <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" class="scrollspy-example scorll_middle p-4" tabindex="0">
                <table class="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">Index</th> */}
                            <th className="text-center" scope="col">Semester</th>
                            <th className="text-center" scope="col">Subjects</th>
                            <th className="text-center" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!subjects.length ? <div><img className="position-absolute top-50 start-50 translate-middle-x" src={spinner} alt="" /> </div> :
                            subjects.map((subject, key) => (
                                
                                <tr key={key}>
                                    {/* <th scope="row">{`${c+=1}`}</th> */}
                                    <td className="text-center">{subject.sem}</td>
                                    <td className="text-center">{subject.sub}</td>
                                    <td className="text-center"><button onClick={() => deleteTimeData(subject._id)} to="/delete-article" class="btn btn-danger mx-4">Delete</button></td>
                                </tr>


                            )  )}

                    </tbody>
                </table>
            </div>
            <div className="row">
                <form onSubmit={changeOnClick} encType="multipart/form-data" className="m-4 p-4">
                    <div className="row">
                    <div className="mb-3 col-md-6">
                        <input type="text" className="form-control" placeholder="Subject Name"
                            value={sub} onChange={e => setSub(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <DropdownButton alignRight title={!sem ? "Semester" : sem} onSelect={handleSelectSub} >
                            <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            <Dropdown.Item eventKey="4">4</Dropdown.Item>
                            <Dropdown.Item eventKey="5">5</Dropdown.Item>
                            <Dropdown.Item eventKey="6">6</Dropdown.Item>
                            <Dropdown.Item eventKey="7">7</Dropdown.Item>
                            <Dropdown.Item eventKey="8">8</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary"><i class="fas fa-user-plus"> Add Subject</i></button>
                    </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Subjects


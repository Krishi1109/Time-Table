import React, { useState, useEffect } from 'react'
import axios from 'axios'
import spinner from "../load.gif"
import './style.css'

const AddFaculty = () => {
    const c = 1
    const [deleteData, setDeleteData] = useState([])

    const [index, setIndex] = useState()
    const [name, setName] = useState('')
    const [teachers, setTeachers] = useState([])

    const deleteTimeData = id => {
        axios.delete(`http://localhost:5000/del/${id}`)
            .then(res => alert("delete successfully"))
        setDeleteData(deleteData.filter(elem => elem._id !== id))
    }


    useEffect(() => {
        axios.get('http://localhost:5000')
            .then(res => setTeachers(res.data))
            .catch(error => console.log(error))
    })

    const changeOnClick = (e) => {
        e.preventDefault();

        const teacher = {
            name
        }

        setName('')
        

        axios.post('http://localhost:5000/add', teacher)
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
                            <th className="text-center" scope="col">Name</th>
                            <th className="text-center" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!teachers.length ? <div><img className="position-absolute top-50 start-50 translate-middle-x" src={spinner} alt="" /> </div> :
                            teachers.map((teacher, key) => (
                                
                                <tr key={key}>
                                    {/* <th scope="row">{`${c+=1}`}</th> */}
                                    <td className="text-center">{teacher.name}</td>
                                    <td className="text-center"><button onClick={() => deleteTimeData(teacher._id)} to="/delete-article" class="btn btn-danger mx-4">Delete</button></td>
                                </tr>
                            )  )}

                    </tbody>
                </table>
            </div>
            <div className="row">
                <form onSubmit={changeOnClick} encType="multipart/form-data" className="m-4 p-4">

                    <div className="mb-3 col-md-6">
                        <label htmlFor="title" className="form-label">Faculty Name</label>
                        <input type="text" className="form-control"
                            value={name} onChange={e => setName(e.target.value)} />

                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary"><i class="fas fa-user-plus"> Add Faculty</i></button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default AddFaculty


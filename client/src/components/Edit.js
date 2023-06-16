import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Edit = (props) => {
    const [fname, setFname] = useState('');
    const [sub, setSub] = useState('');
    const [lec, setLec] = useState('');
    const [lab, setLab] = useState('');
    const [sem, setSem] = useState();

    
    const changeOnClick = (e) => {
        e.preventDefault();

        const timetable = {
            sem, fname, sub, lec, lab
        }

        

        axios.put(`http://localhost:5000/edit/${props.match.params.id}`, timetable)
        .then(res  => alert(`Update successfully`))
        .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/allsem/${props.match.params.id}`)
        .then(res => [
            setFname(res.data.fname),
            setSub(res.data.sub),
            setLec(res.data.lec),
            setLab(res.data.lab),
            setSem(res.data.sem)
        ])
        .catch(error => console.log(error))
    }, [])

    
     return (
        <div className="container mt-4">
            <h1>Edit</h1>
            <div className="container m-4 pt-4">
            <h4>
                Semester : <span className="badge bg-dark">{sem}</span>
            </h4>
            <h4>
                Faculty Name: <span className="badge bg-dark">{fname}</span>
            </h4>
            <h4>
                Subject: <span className="badge bg-dark">{sub}</span>
            </h4>
            <form onSubmit={changeOnClick} encType="multipart/form-data" className="mt-4 pt-4 ">
                <div className="mb-3 col-md-4">
                    <label htmlFor="lec" className="form-label">Lecture</label>
                    <input type="number" className="form-control" 
                    value={lec} onChange={e => setLec(e.target.value)} />
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="lab" className="form-label">Lab</label>
                    <input type="number" className="form-control" 
                    value={lab} onChange={e => setLab(e.target.value)} />
                </div>
                <a type="submit" href={`/${sem}`} className="btn btn-secondary mt-4 ">Back</a>
                <button type="submit" className="btn btn-primary mt-4 mx-4">Save Changes</button>
               
            </form>
            </div>
            
        </div>
    )
}

export default Edit

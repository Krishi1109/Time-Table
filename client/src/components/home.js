import React, { useState, useEffect } from 'react'
import axios from 'axios'
import vvp from '../vvp.png'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import spinner from "../load.gif"
import './style.css'

const Home = () => {
    const [deleteData, setDeleteData] = useState([])

    const [sem, setSem] = useState()
    const [sub, setSub] = useState('')
    const [results, setResults] = useState([])
    const [oddResults, setOddResults] = useState([])
    const [evenResults, setEvenResults] = useState([])

    const deleteTimeData = () => {
        axios.delete(`http://localhost:5000/daletetimetable/`)
            .then(res => alert("Deleted successfully"))
            .catch(err => console.log(err))

    }


    useEffect(() => {
        axios.get('http://localhost:5000/getfinal')
            .then(res => setResults(res.data))
            .catch(error => console.log(error))
    })
    useEffect(() => {
        axios.get('http://localhost:5000/getfinalodd')
            .then(res => setOddResults(res.data))
            .catch(error => console.log(error))
    })
    useEffect(() => {
        axios.get('http://localhost:5000/getfinaleven')
            .then(res => setEvenResults(res.data))
            .catch(error => console.log(error))
    })

    const changeOnClick = (e) => {
        e.preventDefault();

        const timetable = {

        }

        axios.post('http://localhost:5000/resultodd', timetable)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    const changeOnClickEven = (e) => {
        e.preventDefault();

        const timetable = {

        }

        axios.post('http://localhost:5000/resulteven', timetable)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    return (
        <div className="p-4">
            {!results.length ?
                <>
                    <h1 className="p-4 m-4 text-center"><img src={vvp} height="100px" weight="100px" alt="" /> V.V.P. Engineering College</h1>
                    <h3 className="text-center">Generate Time-Table</h3>
                    <div className="row position-absolute top-50 start-50 translate-middle-x">
                        <form onSubmit={changeOnClick} encType="multipart/form-data" className="p-4 col-md-6">
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-primary "><span class=""><b><i class="far fa-calendar-alt"></i> Odd Semester</b> </span></button>
                            </div>
                        </form>
                        <form onSubmit={changeOnClickEven} encType="multipart/form-data" className="p-4 col-md-6">
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-primary"><span class=""><b><i class="far fa-calendar-alt"></i> Even Semester</b> </span></button>
                            </div>
                        </form></div>
                </>
                : oddResults.length ?
                    <>
                        <h1 className="text-center">Odd Semester Time-Table</h1>
                        <table class="table all" id="table-to-xls">
                            <thead >
                                <tr>
                                    <th className="text-center" scope="col"><h3>Day</h3></th>
                                    <th className="text-center" scope="col"><h3>Semester 3</h3></th>
                                    <th className="text-center" scope="col"><h3>Semester 5</h3> </th>
                                    <th className="text-center" scope="col"><h3>Semester 7</h3> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    oddResults.map((data, key) => {
                                        return (
                                            <>

                                                {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 || data.slot === 29 || data.slot === 35 ?
                                                    <>
                                                        <tr key={key}>
                                                            {data.slot === 2 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark border border-5">MONDAY</span></td>
                                                                : data.slot === 8 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">TUESDAY</span></td>
                                                                    : data.slot === 14 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">WEDNESDAY</span></td>
                                                                        : data.slot === 20 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">THURSDAY</span></td>
                                                                            : data.slot === 26 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">FRIDAY</span></td>
                                                                                : data.slot === 33 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">Saturday</span></td>
                                                                                    : <td className="border-5 border-start-0 border-end-0 border-top-0"></td>}

                                                            <td className="text-center p-3 border border-5">
                                                                {data.f31 && !data.f32 ? <><span class="badge rounded-pill bg-secondary">{data.f31}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s31}</span></>
                                                                    : data.f32 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f31} </span> <span class="badge rounded-pill bg-secondary"> {data.s31} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f32} </span> <span class="badge rounded-pill bg-secondary"> {data.s32} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span></>
                                                                        : data.f33 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f33} </span> <span class="badge rounded-pill bg-secondary"> {data.s33} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f34} </span> <span class="badge rounded-pill bg-secondary"> {data.s34} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span></>
                                                                            : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                            </td>

                                                            <td className="text-center p-3 border border-5">
                                                                {data.f51 && !data.f52 ? <><span class="badge rounded-pill bg-secondary">{data.f51}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s51}</span></>
                                                                    : data.f52 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f51} </span> <span class="badge rounded-pill bg-secondary"> {data.s51} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f52} </span> <span class="badge rounded-pill bg-secondary"> {data.s52} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span></>
                                                                        : data.f53 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f53} </span> <span class="badge rounded-pill bg-secondary"> {data.s53} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f54} </span> <span class="badge rounded-pill bg-secondary"> {data.s54} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span></>
                                                                            : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                            </td>

                                                            <td className="text-center p-3 border border-5">
                                                                {data.f71 && !data.f72 ? <><span class="badge rounded-pill bg-secondary">{data.f71}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s71}</span></>
                                                                    : data.f72 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f71} </span> <span class="badge rounded-pill bg-secondary"> {data.s71} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f72} </span> <span class="badge rounded-pill bg-secondary"> {data.s72} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span></>
                                                                        : data.f73 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f73} </span> <span class="badge rounded-pill bg-secondary"> {data.s73} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f74} </span> <span class="badge rounded-pill bg-secondary"> {data.s74} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span></>
                                                                            : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                            </td>


                                                        </tr> </> : <tr key={key}>
                                                        {data.slot === 2 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">MONDAY</span></td>
                                                            : data.slot === 8 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">TUESDAY</span></td>
                                                                : data.slot === 14 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">WEDNESDAY</span></td>
                                                                    : data.slot === 20 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">THURSDAY</span></td>
                                                                        : data.slot === 26 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">FRIDAY</span></td>
                                                                            :
                                                                            data.slot === 33 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">Saturday</span></td>
                                                                                :
                                                                                <td className="border-0"></td>}
                                                        <td className="text-center p-3 border border-5">
                                                            {data.f31 && !data.f32 ? <><span class="badge rounded-pill bg-secondary">{data.f31}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s31}</span></>
                                                                : data.f32 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f31} </span> <span class="badge rounded-pill bg-secondary"> {data.s31} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f32} </span> <span class="badge rounded-pill bg-secondary"> {data.s32} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span></>
                                                                    : data.f33 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f33} </span> <span class="badge rounded-pill bg-secondary"> {data.s33} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f34} </span> <span class="badge rounded-pill bg-secondary"> {data.s34} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span></>
                                                                        : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                        </td>

                                                        <td className="text-center p-3 border border-5">
                                                            {data.f51 && !data.f52 ? <><span class="badge rounded-pill bg-secondary">{data.f51}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s51}</span></>
                                                                : data.f52 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f51} </span> <span class="badge rounded-pill bg-secondary"> {data.s51} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f52} </span> <span class="badge rounded-pill bg-secondary"> {data.s52} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span></>
                                                                    : data.f53 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f53} </span> <span class="badge rounded-pill bg-secondary"> {data.s53} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f54} </span> <span class="badge rounded-pill bg-secondary"> {data.s54} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span></>
                                                                        : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                        </td>

                                                        <td className="text-center p-3 border border-5">
                                                            {data.f71 && !data.f72 ? <><span class="badge rounded-pill bg-secondary">{data.f71}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s71}</span></>
                                                                : data.f72 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f71} </span> <span class="badge rounded-pill bg-secondary"> {data.s71} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f72} </span> <span class="badge rounded-pill bg-secondary"> {data.s72} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span></>
                                                                    : data.f73 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f73} </span> <span class="badge rounded-pill bg-secondary"> {data.s73} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f74} </span> <span class="badge rounded-pill bg-secondary"> {data.s74} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span></>
                                                                        : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                        </td>

                                                    </tr>}
                                            </>
                                        )
                                    })}

                            </tbody>
                        </table>
                        <button onClick={() => deleteTimeData()} to="/delete-article" class="btn btn-danger mx-2"><i class="fas fa-trash-alt"> Delete</i></button>
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-primary"
                            table="table-to-xls"
                            filename="Odd-sem-timetable"
                            sheet="tablexls"
                            buttonText="Download as XLS" />
                    </>
                    : evenResults.length ?
                        <>
                            <h1 className="text-center">Even Semester Time-Table</h1>
                            <table class="table" id="table-to-xls">
                                <thead >
                                    <tr>
                                        <th className="text-center" scope="col"><h3>Day</h3></th>
                                        <th className="text-center" scope="col"><h3>Semester 4</h3></th>
                                        <th className="text-center" scope="col"><h3>Semester 6</h3> </th>
                                        <th className="text-center" scope="col"><h3>Semester 8</h3> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        evenResults.map((data, key) => {
                                            return (
                                                <>

                                                    {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 || data.slot === 29 || data.slot === 35 ?
                                                        <>
                                                            <tr key={key}>
                                                                {data.slot === 2 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark border border-5">MONDAY</span></td>
                                                                    : data.slot === 8 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">TUESDAY</span></td>
                                                                        : data.slot === 14 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">WEDNESDAY</span></td>
                                                                            : data.slot === 20 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">THURSDAY</span></td>
                                                                                : data.slot === 26 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">FRIDAY</span></td>
                                                                                    : data.slot === 33 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">Saturday</span></td>
                                                                                        : <td className="border-5 border-start-0 border-end-0 border-top-0"></td>}

                                                                <td className="text-center p-3 border border-5">
                                                                    {data.f31 && !data.f32 ? <><span class="badge rounded-pill bg-secondary">{data.f31}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s31}</span></>
                                                                        : data.f32 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f31} </span> <span class="badge rounded-pill bg-secondary"> {data.s31} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f32} </span> <span class="badge rounded-pill bg-secondary"> {data.s32} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span></>
                                                                            : data.f33 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f33} </span> <span class="badge rounded-pill bg-secondary"> {data.s33} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f34} </span> <span class="badge rounded-pill bg-secondary"> {data.s34} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span></>
                                                                                : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                                </td>

                                                                <td className="text-center p-3 border border-5">
                                                                    {data.f51 && !data.f52 ? <><span class="badge rounded-pill bg-secondary">{data.f51}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s51}</span></>
                                                                        : data.f52 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f51} </span> <span class="badge rounded-pill bg-secondary"> {data.s51} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f52} </span> <span class="badge rounded-pill bg-secondary"> {data.s52} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span></>
                                                                            : data.f53 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f53} </span> <span class="badge rounded-pill bg-secondary"> {data.s53} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f54} </span> <span class="badge rounded-pill bg-secondary"> {data.s54} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span></>
                                                                                : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                                </td>

                                                                <td className="text-center p-3 border border-5">
                                                                    {data.f71 && !data.f72 ? <><span class="badge rounded-pill bg-secondary">{data.f71}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s71}</span></>
                                                                        : data.f72 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f71} </span> <span class="badge rounded-pill bg-secondary"> {data.s71} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f72} </span> <span class="badge rounded-pill bg-secondary"> {data.s72} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span></>
                                                                            : data.f73 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f73} </span> <span class="badge rounded-pill bg-secondary"> {data.s73} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f74} </span> <span class="badge rounded-pill bg-secondary"> {data.s74} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span></>
                                                                                : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                                </td>


                                                            </tr> </> : <tr key={key}>
                                                            {data.slot === 2 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">MONDAY</span></td>
                                                                : data.slot === 8 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">TUESDAY</span></td>
                                                                    : data.slot === 14 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">WEDNESDAY</span></td>
                                                                        : data.slot === 20 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">THURSDAY</span></td>
                                                                            : data.slot === 26 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">FRIDAY</span></td>
                                                                                :
                                                                                data.slot === 33 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">Saturday</span></td>
                                                                                    :
                                                                                    <td className="border-0"></td>}
                                                            <td className="text-center p-3 border border-5">
                                                                {data.f31 && !data.f32 ? <><span class="badge rounded-pill bg-secondary">{data.f31}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s31}</span></>
                                                                    : data.f32 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f31} </span> <span class="badge rounded-pill bg-secondary"> {data.s31} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f32} </span> <span class="badge rounded-pill bg-secondary"> {data.s32} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span></>
                                                                        : data.f33 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f33} </span> <span class="badge rounded-pill bg-secondary"> {data.s33} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f34} </span> <span class="badge rounded-pill bg-secondary"> {data.s34} </span> <span class="badge rounded-pill bg-light text-dark">{data.type3}</span></>
                                                                            : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                            </td>

                                                            <td className="text-center p-3 border border-5">
                                                                {data.f51 && !data.f52 ? <><span class="badge rounded-pill bg-secondary">{data.f51}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s51}</span></>
                                                                    : data.f52 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f51} </span> <span class="badge rounded-pill bg-secondary"> {data.s51} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f52} </span> <span class="badge rounded-pill bg-secondary"> {data.s52} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span></>
                                                                        : data.f53 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f53} </span> <span class="badge rounded-pill bg-secondary"> {data.s53} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f54} </span> <span class="badge rounded-pill bg-secondary"> {data.s54} </span> <span class="badge rounded-pill bg-light text-dark">{data.type5}</span></>
                                                                            : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                            </td>

                                                            <td className="text-center p-3 border border-5">
                                                                {data.f71 && !data.f72 ? <><span class="badge rounded-pill bg-secondary">{data.f71}</span><br /><span class="badge rounded-pill bg-light text-dark">{data.s71}</span></>
                                                                    : data.f72 && data.slot % 2 == 0 ? <><span class="badge rounded-pill bg-dark"> D1 </span> <span class="badge rounded-pill bg-secondary"> {data.f71} </span> <span class="badge rounded-pill bg-secondary"> {data.s71} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span> <br /> <span class="badge rounded-pill bg-dark"> D2 </span> <span class="badge rounded-pill bg-secondary"> {data.f72} </span> <span class="badge rounded-pill bg-secondary"> {data.s72} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span></>
                                                                        : data.f73 && data.slot % 2 != 0 ? <><span class="badge rounded-pill bg-dark"> D3 </span> <span class="badge rounded-pill bg-secondary"> {data.f73} </span> <span class="badge rounded-pill bg-secondary"> {data.s73} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span> <br /> <span class="badge badge rounded-pill bg-dark"> D4 </span> <span class="badge rounded-pill bg-secondary"> {data.f74} </span> <span class="badge rounded-pill bg-secondary"> {data.s74} </span> <span class="badge rounded-pill bg-light text-dark">{data.type7}</span></>
                                                                            : <><span class="badge rounded-pill bg-warning text-dark">Free</span></>}
                                                            </td>

                                                        </tr>}
                                                </>
                                            )

                                        })}

                                </tbody>
                            </table>
                            <button onClick={() => deleteTimeData()} to="/delete-article" class="btn btn-danger mx-2"><i class="fas fa-trash-alt"> Delete</i></button>
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-primary"
                                table="table-to-xls"
                                filename="timetable"
                                sheet="tablexls"
                                buttonText="Download as XLS" /></>
                        : <> </>}



            {/* {!results.length ? <>
                <h1 className="p-4 m-4 text-center"><img src={vvp} height="100px" weight="100px" alt="" /> V.V.P. Engineering College</h1>
                <h3 className="text-center">Generate Time-Table</h3>
                <div className="row position-absolute top-50 start-50 translate-middle-x">
                    <form onSubmit={changeOnClick} encType="multipart/form-data" className="p-4 col-md-6">
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-primary "><span class=""><b><i class="far fa-calendar-alt"></i> Odd Semester</b> </span></button>
                        </div>
                    </form>
                    <form onSubmit={changeOnClickEven} encType="multipart/form-data" className="p-4 col-md-6">
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-primary"><span class=""><b><i class="far fa-calendar-alt"></i> Even Semester</b> </span></button>
                        </div>
                    </form></div>
            </> : <>

                <table class="table" id="table-to-xls">
                    <thead >
                        <tr>
                            <th className="text-center" scope="col">Semester</th>
                            <th className="text-center" scope="col">Semester</th>
                            <th className="text-center" scope="col">Subjects</th>
                            <th className="text-center" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            oddResults.map((data, key) => {
                                return (
                                    <>
                                        {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ||
                                            data.slot === 29 ?
                                            <><tr key={key}>
                                                {data.slot === 2 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark border border-5">MONDAY</span></td>
                                                    : data.slot === 8 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">TUESDAY</span></td>
                                                        : data.slot === 14 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">WEDNESDAY</span></td>
                                                            : data.slot === 20 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">THURSDAY</span></td>
                                                                : data.slot === 26 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">FRIDAY</span></td>
                                                                    : <td className="border-5 border-start-0 border-end-0 border-top-0"></td>}
                                                <td className="text-center p-3 border border-5 ">{!data.fname3 ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <><span class="badge bg-secondary">{data.fname3}</span><span class="badge rounded-pill bg-light text-dark">{data.sub3} {data.type}</span></>}</td>

                                                <td className="text-center p-3 border border-5 ">{!data.fname5 ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <><span class="badge bg-secondary">{data.fname5}</span><span class="badge rounded-pill bg-light text-dark">{data.sub5} {data.type}</span></>}</td>

                                                <td className="text-center p-3 border border-5 ">{!data.fname7 ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <><span class="badge bg-secondary">{data.fname7}</span><span class="badge rounded-pill bg-light text-dark">{data.sub7} {data.type}</span></>}</td>

                                            </tr> </> : <tr key={key}>
                                                {data.slot === 2 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">MONDAY</span></td>
                                                    : data.slot === 8 ? <td className="text-center border-0 "><span class="badge rounded-pill bg-info text-dark">TUESDAY</span></td>
                                                        : data.slot === 14 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">WEDNESDAY</span></td>
                                                            : data.slot === 20 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">THURSDAY</span></td>
                                                                : data.slot === 26 ? <td className="text-center border-0"><span class="badge rounded-pill bg-info text-dark">FRIDAY</span></td>
                                                                    : <td className="border-0"></td>}
                                                <td className="text-center p-3 border border-5">{!data.fname3 ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <><span class="badge bg-secondary">{data.fname3}</span><span class="badge rounded-pill bg-light text-dark">{data.sub3} {data.type}</span></>}</td>
                                                <td className="text-center p-3 border border-5">{!data.fname5 ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <><span class="badge bg-secondary">{data.fname5}</span><span class="badge rounded-pill bg-light text-dark">{data.sub5} {data.type}</span></>}</td>
                                                <td className="text-center p-3 border border-5">{!data.fname7 ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <><span class="badge bg-secondary">{data.fname7}</span><span class="badge rounded-pill bg-light text-dark">{data.sub7} {data.type}</span></>}</td>

                                            </tr>}




                                    </>
                                )



                            })}

                    </tbody>
                </table>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary"
                    table="table-to-xls"
                    filename="timetable"
                    sheet="tablexls"
                    buttonText="Download as XLS" />
            </> ? <></> : <></>} */}


        </div>


    )
}

export default Home


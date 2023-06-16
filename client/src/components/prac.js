import React, { useState, useEffect } from 'react'
import axios from 'axios'
import vvp from '../vvp.png'
import './style.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function Home() {
    const [results, setResults] = useState([])
    const [results3, setResults3] = useState([])
    const [results5, setResults5] = useState([])
    const [results7, setResults7] = useState([])
    const [results4, setResults4] = useState([])
    const [results6, setResults6] = useState([])
    const [results8, setResults8] = useState([])
    console.log(results3)
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

    const deleteTimeData = () => {
        axios.delete(`http://localhost:5000/daletetimetable/`)
            .then(res => alert("Deleted successfully"))
            .catch(err => console.log(err))

    }
    useEffect(() => {
        axios.get('http://localhost:5000/getResults')
            .then(res => setResults(res.data))
            .catch(error => console.log(error))
    })
    useEffect(() => {
        axios.get('http://localhost:5000/getResults3')
            .then(res => setResults3(res.data))
            .catch(error => console.log(error))
    })
    useEffect(() => {
        axios.get('http://localhost:5000/getResults5')
            .then(res => setResults5(res.data))
            .catch(error => console.log(error))
    })
    useEffect(() => {
        axios.get('http://localhost:5000/getResults7')
            .then(res => setResults7(res.data))
            .catch(error => console.log(error))
    })
    useEffect(() => {
        axios.get('http://localhost:5000/getResults4')
            .then(res => setResults4(res.data))
            .catch(error => console.log(error))
    })
    useEffect(() => {
        axios.get('http://localhost:5000/getResults6')
            .then(res => setResults6(res.data))
            .catch(error => console.log(error))
    })
    useEffect(() => {
        axios.get('http://localhost:5000/getResults8')
            .then(res => setResults8(res.data))
            .catch(error => console.log(error))
    })

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
                : results3.length ? <div className="row all">
                    <h2 className="text-center p-2"><b>Odd Semester Time-Table</b></h2>
                    <div className="col-md-3">
                        <table className="table table-bordered border-primary">
                            <tbody className="row p-2">
                                <table>
                                    <tr className="text-center pt-2 pb-2"><h3>DAY \ SEM</h3></tr>
                                    {results3.map((data, index) => (
                                        <>
                                            <tr className="col-md-12">
                                                {data.slot === 2 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">MONDAY</span></h5></td>
                                                    : data.slot === 8 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">TUESDAY</span></h5></td>
                                                        : data.slot === 14 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">WEDNESDAY</span></h5></td>
                                                            : data.slot === 20 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">THURSDAY</span></h5></td>
                                                                : data.slot === 26 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">FRIDAY</span></h5></td>
                                                                    : <td></td>}
                                                <td className="p-2 ">{data.slot + 1}</td>
                                            </tr>
                                            {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ? <> <h3 className="text-center">. . . . . . . . . . . . . </h3> </> : <></>} </>
                                    ))}
                                </table>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-9">
                        <table className="table table-bordered border-primary" id="table-to-xls">
                            <tbody className="row p-2">
                                <table className="col-md-4">
                                    <tr className="text-center pt-2 pb-2"><h3><span class="badge rounded-pill bg-light text-dark">SEM 3</span></h3></tr>
                                    
                                    {results3.map((data, index)  => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="text-center p-2">{!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <><span class="badge bg-secondary">{data.fname}</span><span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></>}</td>
                                                    <td>
                                                        {results5}
                                                    </td>

                                                </tr>
                                                {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ? <> <h3 className="text-center">. . . . . . . . . . . . . </h3> </> : <></>}
                                            </>
                                        )
                                    })}
                                </table>
                                <table className="col-md-4">
                                    <tr className="text-center pt-2 pb-2"><h3><span class="badge rounded-pill bg-light text-dark">SEM 5</span></h3></tr>
                                    {results5.map((data, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="text-center p-2">{!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <span class="badge bg-secondary">{data.fname}</span>}<span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></td>
                                                </tr>
                                                {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ? <> <h3 className="text-center">. . . . . . . . . . . . . </h3> </> : <></>}
                                            </>
                                        )
                                    })}
                                </table>
                                <table className="col-md-4">
                                    <tr className="text-center pt-2 pb-2"><h3><span class="badge rounded-pill bg-light text-dark">SEM 7</span></h3></tr>
                                    {results7.map((data, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="text-center p-2">{!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <span class="badge bg-secondary">{data.fname}</span>}<span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></td>
                                                </tr>
                                                {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ? <> <h3 className="text-center">. . . . . . . . . . . . . </h3> </> : <></>}
                                            </>
                                        )
                                    })}
                                </table>
                            </tbody>
                        </table>
                        <button onClick={() => deleteTimeData()} to="/delete-article" class="btn btn-danger mx-2"><i class="fas fa-trash-alt"> Delete</i></button>
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-primary"
                            table="table-to-xls"
                            filename="timetable"
                            sheet="tablexls"
                            buttonText="Download as XLS" />

                    </div>
                </div>
                    : <div className="row all">
                        <h2 className="text-center p-2"><b>Even Semester Time-Table</b></h2>
                        <div className="col-md-3">
                            <table className="table table-bordered border-primary">
                                <tbody className="row p-2">
                                    <table>
                                        <tr className="text-center pt-2 pb-2"><h3>DAY \ SEM</h3></tr>
                                        {results4.map((data, index) => (
                                            <>
                                                <tr className="col-md-12">
                                                    {data.slot === 2 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">MONDAY</span></h5></td>
                                                        : data.slot === 8 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">TUESDAY</span></h5></td>
                                                            : data.slot === 14 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">WEDNESDAY</span></h5></td>
                                                                : data.slot === 20 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">THURSDAY</span></h5></td>
                                                                    : data.slot === 26 ? <td className="text-center"><h5><span class="badge rounded-pill bg-info text-dark">FRIDAY</span></h5></td>
                                                                        : <td></td>}
                                                    <td className="p-2 ">{data.slot + 1}</td>
                                                </tr>
                                                {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ? <> <h3 className="text-center">. . . . . . . . . . . . . </h3> </> : <></>} </>
                                        ))}
                                    </table>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-9">
                            <table className="table table-bordered border-primary" id="table-to-xls">
                                <tbody className="row p-2">
                                    <table className="col-md-4">
                                        <tr className="text-center pt-2 pb-2"><h3><span class="badge rounded-pill bg-light text-dark">SEM 4</span></h3></tr>
                                        {results4.map((data, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="text-center p-2">{!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <><span class="badge bg-secondary">{data.fname}</span><span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></>}</td>
                                                    </tr>
                                                    {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ? <> <h3 className="text-center">. . . . . . . . . . . . . </h3> </> : <></>}
                                                </>
                                            )
                                        })}
                                    </table>
                                    <table className="col-md-4">
                                        <tr className="text-center pt-2 pb-2"><h3><span class="badge rounded-pill bg-light text-dark">SEM 6</span></h3></tr>
                                        {results6.map((data, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="text-center p-2">{!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <span class="badge bg-secondary">{data.fname}</span>}<span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></td>
                                                    </tr>
                                                    {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ? <> <h3 className="text-center">. . . . . . . . . . . . . </h3> </> : <></>}
                                                </>
                                            )
                                        })}
                                    </table>
                                    <table className="col-md-4">
                                        <tr className="text-center pt-2 pb-2"><h3><span class="badge rounded-pill bg-light text-dark">SEM 8</span></h3></tr>
                                        {results8.map((data, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="text-center p-2">{!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> : <span class="badge bg-secondary">{data.fname}</span>}<span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></td>
                                                    </tr>
                                                    {data.slot === 5 || data.slot === 11 || data.slot === 17 || data.slot === 23 ? <> <h3 className="text-center">. . . . . . . . . . . . . </h3> </> : <></>}
                                                </>
                                            )
                                        })}
                                    </table>
                                </tbody>
                            </table>
                            <button onClick={() => deleteTimeData()} to="/delete-article" class="btn btn-danger mx-2"><i class="fas fa-trash-alt"> Delete</i></button>
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-primary"
                                table="table-to-xls"
                                filename="timetable"
                                sheet="tablexls"
                                buttonText="Download as XLS" />

                        </div>
                    </div>}
        </div>


        // <div className="container mt-4" >
        //     {!results.length ?
        //     <div className="position-absolute top-50 start-50 translate-middle-x">
        //         <form onSubmit={changeOnClick} encType="multipart/form-data" className="m-2">
        //     <div className="col-md-6">
        //         <button type="submit" className="btn btn-primary "><i class="">Generate(odd)</i></button>
        //     </div>
        // </form>
        // <form onSubmit={changeOnClickEven} encType="multipart/form-data" className="">
        // <div className="col-md-6">
        //     <button type="submit" className="btn btn-primary"><i class="">Generate(even)</i></button>
        // </div>
        // </form></div>

        //         : <div>{results3.length ? <>
        //             <div className="row">
        //                 <div className="col-md-3"><h3><span class="badge rounded-pill bg-info text-dark">DAY</span></h3></div>
        //                 <div className="col-md-3"><h3><span class="badge rounded-pill bg-info text-dark">SEM-3</span></h3></div>
        //                 <div className="col-md-3"><h3><span class="badge rounded-pill bg-info text-dark">SEM-5</span></h3></div>
        //                 <div className="col-md-3"><h3><span class="badge rounded-pill bg-info text-dark">SEM-7</span></h3></div>
        //             </div>
        //             <div className="row">
        //                 <div className="col-md-3 ">
        //                     <div className="sizeclass">
        //                         <h4></h4>
        //                         <h4><span class="badge rounded-pill bg-success">Monday</span></h4>
        //                     </div>
        //                     <hr />
        //                     <div className="sizeclass">
        //                         <h4><span class="badge rounded-pill bg-success">Tuesday</span></h4>
        //                     </div>
        //                     <hr />
        //                     <div className="sizeclass">
        //                         <h4><span class="badge rounded-pill bg-success">Wednesday</span></h4>
        //                     </div>
        //                     <hr />
        //                     <div className="sizeclass">
        //                         <h4><span class="badge rounded-pill bg-success">Thursday</span></h4>
        //                     </div>
        //                     <hr />
        //                     <div className="sizeclass">
        //                         <h4><span class="badge rounded-pill bg-success">Friday</span></h4>
        //                     </div>
        //                     <hr />

        //                 </div>
        //                 <div className="col-md-3">
        //                     {results3.map((data, key) => (
        //                         <div>
        //                             {!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> :
        //                                 <div><span class="badge bg-secondary">{data.fname}</span><span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></div>
        //                             }
        //                             <hr />
        //                         </div>


        //                     ))}
        //                 </div>
        //                 <div className="col-md-3">
        //                     {results5.map((data, key) => (
        //                         <div>
        //                             {!data.fname ? <span class="badge rounded-pill bg-warning text-dark">NA</span> :
        //                                 <div><span class="badge bg-secondary">{data.fname}</span><span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></div>
        //                             }
        //                             <hr />
        //                         </div>

        //                     ))}
        //                 </div>
        //                 <div className="col-md-3">
        //                     {results7.map((data, key) => (
        //                         <div>
        //                             {!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> :
        //                                 <div><span class="badge bg-secondary">{data.fname}</span><span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></div>
        //                             }
        //                             <hr />
        //                         </div>

        //                     ))}
        //                 </div>

        //             </div>
        //             {/* <button onClick={() => deleteTimeData()} to="/delete-article" class="btn btn-danger mx-2"><i class="fas fa-trash-alt"> Delete</i></button> */}
        //         </> : <div>
        //             <div className="row">
        //             <div className="col-md-3"><h3><span class="badge rounded-pill bg-info text-dark">DAY</span></h3></div>
        //             <div className="col-md-3"><h3><span class="badge rounded-pill bg-info text-dark">SEM-4</span></h3></div>
        //             <div className="col-md-3"><h3><span class="badge rounded-pill bg-info text-dark">SEM-6</span></h3></div>
        //             <div className="col-md-3"><h3><span class="badge rounded-pill bg-info text-dark">SEM-8</span></h3></div>
        //         </div>
        //             <div className="row">
        //                 <div className="col-md-3 ">
        //                     <div className="sizeclass">
        //                         <h4></h4>
        //                         <h4><span class="badge rounded-pill bg-success">Monday</span></h4>
        //                     </div>
        //                     <hr />
        //                     <div className="sizeclass">
        //                         <h4><span class="badge rounded-pill bg-success">Tuesday</span></h4>
        //                     </div>
        //                     <hr />
        //                     <div className="sizeclass">
        //                         <h4><span class="badge rounded-pill bg-success">Wednesday</span></h4>
        //                     </div>
        //                     <hr />
        //                     <div className="sizeclass">
        //                         <h4><span class="badge rounded-pill bg-success">Thursday</span></h4>
        //                     </div>
        //                     <hr />
        //                     <div className="sizeclass">
        //                         <h4><span class="badge rounded-pill bg-success">Friday</span></h4>
        //                     </div>
        //                     <hr />

        //                 </div>
        //                 <div className="col-md-3">
        //                     {results4.map((data, key) => (
        //                         <div>
        //                             {!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> :
        //                                 <div><span class="badge bg-secondary">{data.fname}</span><span class="badge rounded-pill bg-light text-dark">{data.sub} {data.type}</span></div>
        //                             }
        //                             <hr />
        //                         </div>


        //                     ))}
        //                 </div>
        //                 <div className="col-md-3">
        //                     {results6.map((data, key) => (
        //                         <div>
        //                             {!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> :
        //                                 <div><span class="badge bg-secondary">{data.fname}</span><span class="badge rounded-pill bg-light text-dark">{data.sub}</span></div>
        //                             }
        //                             <hr />
        //                         </div>

        //                     ))}
        //                 </div>
        //                 <div className="col-md-3">
        //                     {results8.map((data, key) => (
        //                         <div>
        //                             {!data.fname ? <span class="badge rounded-pill bg-warning text-dark">FREE</span> :
        //                                 <div><span class="badge bg-secondary">{data.fname}</span><span class="badge rounded-pill bg-light text-dark">{data.sub}</span></div>
        //                             }
        //                             <hr />
        //                         </div>

        //                     ))}
        //                 </div>

        //             </div> </div>
        //         }<button onClick={() => deleteTimeData()} to="/delete-article" class="btn btn-danger mx-2"><i class="fas fa-trash-alt"> Delete</i></button></div>}

        // </div>
    )
}

export default Home

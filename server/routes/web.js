const express = require('express')
const router = express.Router()

require('../db/conn')
const Teacher = require("../models/teacher")
const Timetable = require('../models/timetabledata')
const Result = require('../models/result')
const Reserve = require('../models/reserve')
const Sub = require('../models/sub')
const FinalResult = require('../models/final')

// ===================================================================
// Get Faculty
router.get('/', (req, res) => {
    Teacher.find()
        .then(teacher => res.json(teacher))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// Post Faculty
router.post('/add', (req, res) => {
    const { name } = req.body
    const newTeacher = new Teacher({ name })

    newTeacher.save()
        .then(() => res.json("add new article"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// delete Faculty
router.delete("/del/:id", (req, res) => {
    Teacher.findByIdAndDelete(req.params.id).exec((err, deleteItem) => {
        if (err) {
            res.send(err)
        }
        return res.json(deleteItem)
    })
})
// =====================================================================

// All data 
router.post('/allsem', (req, res) => {
    Timetable.find()
        .then(timetabledata => res.json(timetabledata))
        .catch(err => res.status(400).json(`Error: ${err}`))
    // console.log(sub);
})
router.get('/allsem/:id', (req, res) => {
    Timetable.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
})


// sem 3
router.post('/sem', (req, res) => {
    const { sem, fname, sub, lec, lab } = req.body
    
    const timetableData = new Timetable({ sem, fname, sub, lec, lab })

    timetableData.save()
        .then(() => res.json("added succfully"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/data3', (req, res) => {
    Timetable.find({ "sem": "3" })
        .then(timetable => res.json(timetable))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/data4', (req, res) => {
    Timetable.find({ "sem": "4" })
        .then(timetable => res.json(timetable))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// Sem 5
router.get('/data5', (req, res) => {
    Timetable.find({ "sem": "5" })
        .then(timetable => res.json(timetable))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// Sem 6
router.get('/data6', (req, res) => {
    Timetable.find({ "sem": "6" })
        .then(timetable => res.json(timetable))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

//  sem 7
router.get('/data7', (req, res) => {
    Timetable.find({ "sem": "7" })
        .then(timetable => res.json(timetable))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
// Sem 8 
router.get('/data8', (req, res) => {
    Timetable.find({ "sem": "8" })
        .then(timetable => res.json(timetable))
        .catch(err => res.status(400).json(`Error: ${err}`))
})


// Edit 
router.put("/edit/:id", (req, res) => {

    Timetable.findById(req.params.id)
        .then(timetable => {
            timetable.sem = req.body.sem;
            timetable.fname = req.body.fname;
            timetable.sub = req.body.sub
            timetable.lec = req.body.lec
            timetable.lab = req.body.lab

            timetable
                .save()
                .then(() => res.json("Updated successfully"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))

})

// delete Timetable data
router.delete("/delete/:id", (req, res) => {
    Timetable.findByIdAndDelete(req.params.id).exec((err, deleteItem) => {
        if (err) {
            res.send(err)
        }
        return res.json(deleteItem)
    })
})

// Reserved
router.post("/reserve", (req, res) => {
    const { sem, day, slot, activity } = req.body
    const Reserved = new Reserve({ sem, day, slot, activity })
    // console.log(Reserved)
    Reserved.save()
        .then(() => res.json("Added"))
        .catch(err => res.status(420).json(`Error: ${err}`))
})
// Get Reserved slots
router.get("/getreserveslot", (req, res) => {
    Reserve.aggregate(
        [
            { $sort: { sem: 1 } }
        ]
    )
        .then(reserveSlots => res.json(reserveSlots))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
// Delete Reeserve
router.delete("/deletereserve/:id", (req, res) => {
    Reserve.findByIdAndDelete(req.params.id).exec((err, deleteItem) => {
        if (err) {
            res.send(err)
        }
        return res.json(deleteItem)
    })
})

// Results
router.post('/resultodd', async (req, res) => {
    try {
        const list = await Timetable.find();
        var arr = [ 
            ["sem", "fname", "sub", "lec", "lab"],
        ];
        var semid
        // console.log(list);
        for (obj in list) {
            for (var i = 0; i < obj.length; i++) {

                if (list[obj].sem == 3) {
                    semid = 0
                } else if (list[obj].sem == 5) {
                    semid = 1
                } else if (list[obj].sem == 7) {
                    semid = 2
                } else {
                    semid = 3
                }
                if (semid < 3) {
                    arr.push([semid, list[obj].fname, list[obj].sub, list[obj].lec, 
                        list[obj].lab*4 ])
                }

            }
        }



        // function arrToObject(arr) {
        //     //assuming header
        //     var keys = arr[0];
        //     //vacate keys from main array
        //     var newArr = arr.slice(1, arr.length);

        //     var formatted = [],
        //         data = newArr,
        //         cols = keys,
        //         l = cols.length;
        //     for (var i = 0; i < data.length; i++) {
        //         var d = data[i],
        //             o = {};
        //         for (var j = 0; j < l; j++)
        //             o[cols[j]] = d[j];
        //         formatted.push(o);
        //     }
        //     return formatted;
        // }
        // console.log(arr);
        var result = [];
        for (let i = 0; i < 3; i++) {
            result[i] = []
        }

        for (let i = 0; i < 3; i++) {
            result[i] = new Array(36)
            for (let j = 0; j < 36; j++) {
                result[i][j] = new Array(9)
            }
        }
        // For reserve slots
        var reserve = [
            ["sem", "slot", "activity"],
        ];
        const reserveSlot = await Reserve.find();
        for (obj in reserveSlot) {
            var daySlot
            if (reserveSlot[obj].day == "Monday") {
                daySlot = 0
            } else if (reserveSlot[obj].day == "Tuesday") {
                daySlot = 1
            } else if (reserveSlot[obj].day == "Wednesday") {
                daySlot = 2
            } else if (reserveSlot[obj].day == "Thursday") {
                daySlot = 3
            } else if (reserveSlot[obj].day == "Friday") {
                daySlot = 4
            } else if (reserveSlot[obj].day == "Saturday") {
                daySlot = 5
            }
            var semid
            if (reserveSlot[obj].sem == 3) {
                semid = 0
            } else if (reserveSlot[obj].sem == 5) {
                semid = 1
            } else if (reserveSlot[obj].sem == 7) {
                semid = 2
            } else {
                semid = 3
            }
            reserve.push([semid, (daySlot * 6) + reserveSlot[obj].slot - 1, reserveSlot[obj].activity])
        }
        // console.log(reserve)
        // console.log(reserve[1][1])

        var clash = false
        var dayClash = false
        var labClash = false
        var labSlotClash = false
        // result[0][3] = ["free", "freeee", "lec", 1]
        for (let i = 0; i < 36; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k <= reserveSlot.length; k++) {
                    // console.log("j = " + j + "sem = " + reserve[k][0])
                    if (j == reserve[k][0] && i == reserve[k][1]) {
                        result[j][i] = [reserve[k][2], i, "1"]
                    }
                }
            }
        }
        // console.log(result)
        for (let i = 0; i < 36; i++) {
            var lab = parseInt((i / 6)) * 6 + 6
            for (let j = 0; j < 3; j++) {
                if (j == 2 && i >= lab - 6 && i < lab - 5 || j == 1 && i >= lab - 4 && i < lab - 3 || j == 0 && i >= lab - 2 && i < lab - 1) {
                    for (let n = 0; n < 4; n++) {
                        
                        for (let k = 0; k < arr.length; k++) {
                            labClash = false
                            labSlotClash = false
                            if (arr[k][0] == j && arr[k][4] > 0) {
                                
                                if (i == 10 && j == 0) {
                                    // console.log("I "+ i +" j "+ j + " k "+ k + " lab" + arr[k][4])
                                }
                                for (let l = 0; l < j; l++) {
                                    if (result[l][i][0] == arr[k][1] || result[l][i][3] == arr[k][1] || 
                                        result[l][i][5] == arr[k][1] || result[l][i][7] == arr[k][1]) {
                                        labClash = true
                                    }
                                }
                                for(let a = i; a>=0; a-=6){
                                    if(result[j][a][0] == arr[k][1] && n==0){
                                        labSlotClash = true
                                    }
                                    if(result[j][a][3] == arr[k][1] && n==1){
                                        labSlotClash = true
                                    }
                                    if(result[j][a][5] == arr[k][1] && n==2){
                                        labSlotClash = true
                                    }
                                    if(result[j][a][7] == arr[k][1] && n==3){
                                        labSlotClash = true
                                    }
                                }
                                if (!labClash && !labSlotClash && result[j][i][2] != 1 && result[j][i+1][2] != 1 && n == 0 && arr[k][4] > 0) {
                                    result[j][i] = [arr[k][1], arr[k][2], "lab"]
                                    arr[k][4]--
                                    break
                                }
                                if (!labClash && !labSlotClash && result[j][i][2] != 1 && result[j][i+1][2] != 1 && n == 1 && result[j][i][0] != arr[k][1] && arr[k][4] > 0) {
                                    result[j][i] = [result[j][i][0], result[j][i][1], "lab", arr[k][1], arr[k][2]]
                                    arr[k][4]--
                                    break
                                }
                                if (!labClash && !labSlotClash && result[j][i][2] != 1 && result[j][i+1][2] != 1 && n == 2 && result[j][i][0] != arr[k][1] && result[j][i][3] != arr[k][1] && arr[k][4] > 0) {
                                    result[j][i] = [result[j][i][0], result[j][i][1], "lab", result[j][i][3],
                                    result[j][i][4], arr[k][1], arr[k][2]]
                                    arr[k][4]--
                                    break
                                }
                                if (!labClash && !labSlotClash  && result[j][i][2] != 1 && result[j][i+1][2] != 1 && n == 3 && result[j][i][0] != arr[k][1] && result[j][i][3] != arr[k][1] && result[j][i][5] != arr[k][1] && arr[k][4] > 0) {
                                    result[j][i] = [result[j][i][0], result[j][i][1], "lab", result[j][i][3],
                                    result[j][i][4], result[j][i][5], result[j][i][6], arr[k][1], arr[k][2]]
                                    arr[k][4]--
                                    break
                                }
                            }
                        }
                    }

                } else if(j == 2 && i >= lab - 5 && i < lab - 4 && result[j][i][2] != 1 || j == 1 && i >= lab - 3 && i < lab - 2 && result[j][i][2] != 1 || j == 0 && i >= lab - 1 && i < lab - 0 && result[j][i][2] != 1){
                    result[j][i] = result[j][i-1]
                }
                
            }
        }

        for(let i=0; i<36; i++){
            var lab = parseInt((i / 6)) * 6 + 6
            for(let j=0; j<3; j++){
                if(result[j][i][2] != 1 && result[j][i][2] != "lab") {
                        // console.log("j = " +j + " i = " + i)
                    for (let k = 0; k < arr.length; k++) {
                        dayClash = false
                        clash = false
                        if (arr[k][0] == j && arr[k][3] > 0) {
                            for (let l = 0; l < j; l++) {
                                if (result[l][i][0] == arr[k][1] || result[l][i][3] == arr[k][1] ||
                                    result[l][i][5] == arr[k][1] || result[l][i][7] == arr[k][1]) {
                                    clash = true
                                    break
                                }
                            }
                            for (let l = 2; l > j; l--) {
                                if (result[l][i][0] == arr[k][1] || result[l][i][3] == arr[k][1] ||
                                    result[l][i][5] == arr[k][1] || result[l][i][7] == arr[k][1]) {
                                    clash = true
                                    break
                                }
                            }
                            if (!clash) {
                                for (let a = parseInt((i / 6)) * 6; a < i; a++) {
                                    if (result[j][a][0] == arr[k][1] && result[j][a][2] != "lab") {
                                        dayClash = true
                                        break
                                    }
                                }

                                if (dayClash == false && result[j][i][2] != 1) {
                                    result[j][i] = [arr[k][1], arr[k][2]]
                                    arr[k][3]--
                                    break
                                }

                            }
                        }
                    }

                }
            }
        }
        // console.log(result)
        // for (let i = 0; i < 36; i++) {
        //     var lab = parseInt((i/6))*6 + 6
        //     var flag = false
        //     var full =false
        //     // console.log("lab" + lab + " i " + i )
        //     if(i>0) {
        //         full = false
        //         for(let j = 0; j < 3; j++){
        //             if(j==0 && i >= lab-4 && i<lab-2){
        //                 console.log(i)
        //                 full = true
        //                 for(let k = 0; k < arr.length; k++) {
        //                     labClash = false
        //                     if(arr[k][0] == j && arr[k][4] > 0) {
        //                         if(i==10 && j==0){
        //                             // console.log("I "+ i +" j "+ j + " k "+ k + " lab" + arr[k][4])
        //                         }
        //                         for(let l = 0; l < j; l++) {
        //                             if(result[l][i][0] == arr[k][1]) {
        //                                 labClash = true
        //                             }
        //                         }
        //                         flag = false
        //                         if(!labClash && result[j][i][2] != 1){
        //                             result[j][i] = [arr[k][1], arr[k][2], "lab"]
        //                             result[j][i+1] =  result[j][i]
        //                             arr[k][4]--
        //                             flag = true
        //                             break
        //                         }
        //                     }
        //                 }
        //             }


        //         }
        //         if(flag == true){
        //             i++
        //         }
        //     } if(full == false) {
        //         // console.log("flag = "  + flag + "i = " + i)
        //         for (let j = 0; j < 3; j++) {
        //             if(full == false){
        //                 for (let k = 0; k < arr.length; k++) {
        //                     dayClash = false
        //                     clash = false
        //                     if (arr[k][0] == j && arr[k][3] > 0) {
        //                         for (let l = 0; l < j; l++) {
        //                             if (result[l][i][0] == arr[k][1]) {
        //                                 clash = true
        //                                 break
        //                             }
        //                         }
        //                         if (!clash) {
        //                             for(let a = parseInt((i/6))*6 ; a<i; a++){
        //                                 if(result[j][a][0] == arr[k][1]){
        //                                     dayClash = true
        //                                     break
        //                                 }
        //                             }
        //                             if(dayClash == false && result[j][i][2] != 1){
        //                                 result[j][i] = [arr[k][1], arr[k][2]]
        //                                 arr[k][3]--
        //                                 break
        //                             }

        //                         }
        //                     }
        //                 }
        //             }

        //         }
        //     }
        // }


        // console.log(` done ${result}`)
        var TimeTable = [
            ["sem", "slot", "fname", "sub", "type"],
        ];
        var sem
        for (let i = 0; i < result.length; i++) {
            // console.log(`Sem = ${i}`)

            for (let j = 0; j < result[i].length; j++) {
                if (i == 0) {
                    sem = 3
                } else if (i == 1) {
                    sem = 5
                } else if (i == 2) {
                    sem = 7
                }
                TimeTable.push([sem, j, result[i][j][0], result[i][j][1], result[i][j][2],result[i][j][3],
                    result[i][j][4],result[i][j][5],result[i][j][6],result[i][j][7], result[i][j][8]])
            }
        }
        // console.log(TimeTable)
        // console.log(TimeTable[3][1])
        for (var i = 1; i <= 36; i++) {
            var slot = TimeTable[i][1]

            var f31 = TimeTable[i][2]
            var f32 = TimeTable[i][5]
            var f33 = TimeTable[i][7]
            var f34 = TimeTable[i][9]
        
            var s31 = TimeTable[i][3]
            var s32 = TimeTable[i][6]
            var s33 = TimeTable[i][8]
            var s34 = TimeTable[i][10]

            var type3 = TimeTable[i][4]

            var f51 = TimeTable[i + 36][2]
            var f52 = TimeTable[i + 36][5]
            var f53 = TimeTable[i + 36][7]
            var f54 = TimeTable[i + 36][9]

            var s51 = TimeTable[i + 36][3]
            var s52 = TimeTable[i + 36][6]
            var s53 = TimeTable[i + 36][8]
            var s54 = TimeTable[i + 36][10]

            var type5 = TimeTable[i + 36][4]

            var f71 = TimeTable[i + 72][2]
            var f72 = TimeTable[i + 72][5]
            var f73 = TimeTable[i + 72][7]
            var f74 = TimeTable[i + 72][9]

            var s71 = TimeTable[i + 72][3]
            var s72 = TimeTable[i + 72][6]
            var s73 = TimeTable[i + 72][8]
            var s74 = TimeTable[i + 72][10]

            var type7 = TimeTable[i + 72][4]

            var odd = true

            const finalResult = new FinalResult({ 
                slot, 
                f31, f32, f33,f34,s31,s32, s33, s34, type3, 
                f51, f52, f53, f54, s51,s52,s53,s54, type5, 
                f71, f72, f73, f74, s71,s72,s73,s74, type7, 
                odd })
            await finalResult.save()
            // console.log(finalResult)
        }


        // const abc = arrToObject(TimeTable)
        // // console.log(abc);
        // for (obj in abc) {
        //     const { sem, slot, fname, sub, type } = abc[obj]
        //     const result = new Result({ sem, fname, sub, slot, type })
        //     await result.save()
        // }

    }
    catch (err) {
        console.log(err);
    }

})


router.post('/resulteven', async (req, res) => {
    try {
        const list = await Timetable.find();
        var arr = [
            ["sem", "fname", "sub", "lec", "lab"],
        ];
        var semid
        // console.log(list);
        for (obj in list) {
            for (var i = 0; i < obj.length; i++) {

                if (list[obj].sem == 4) {
                    semid = 0
                } else if (list[obj].sem == 6) {
                    semid = 1
                } else if (list[obj].sem == 8) {
                    semid = 2
                } else {
                    semid = 3
                }

                if (semid < 3) {
                    arr.push([semid, list[obj].fname, list[obj].sub, list[obj].lec, 
                        list[obj].lab*4 ])
                }

            }
        }




        // console.log(arr);
        var result = [];
        for (let i = 0; i < 3; i++) {
            result[i] = []
        }

        for (let i = 0; i < 3; i++) {
            result[i] = new Array(36)
            for (let j = 0; j < 36; j++) {
                result[i][j] = new Array(3)
            }
        }
        // For reserve slots
        var reserve = [
            ["sem", "slot", "activity"],
        ];
        const reserveSlot = await Reserve.find();
        for (obj in reserveSlot) {
            var daySlot
            if (reserveSlot[obj].day == "Monday") {
                daySlot = 0
            } else if (reserveSlot[obj].day == "Tuesday") {
                daySlot = 1
            } else if (reserveSlot[obj].day == "Wednesday") {
                daySlot = 2
            } else if (reserveSlot[obj].day == "Thursday") {
                daySlot = 3
            } else if (reserveSlot[obj].day == "Friday") {
                daySlot = 4
            } else if (reserveSlot[obj].day == "Saturday") {
                daySlot = 5
            }
            var semid
            if (reserveSlot[obj].sem == 4) {
                semid = 0
            } else if (reserveSlot[obj].sem == 6) {
                semid = 1
            } else if (reserveSlot[obj].sem == 8) {
                semid = 2
            } else {
                semid = 3
            }
            reserve.push([semid, (daySlot * 6) + reserveSlot[obj].slot - 1, reserveSlot[obj].activity])
        }
        var clash = false
        var dayClash = false
        var labClash = false
        for (let i = 0; i < 36; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k <= reserveSlot.length; k++) {
                    // console.log("j = " + j + "sem = " + reserve[k][0])
                    if (j == reserve[k][0] && i == reserve[k][1]) {
                        result[j][i] = [reserve[k][2], i, "1"]
                    }
                }

            }
        }
        for (let i = 0; i < 36; i++) {
            var lab = parseInt((i / 6)) * 6 + 6
            for (let j = 0; j < 3; j++) {
                if (j == 0 && i >= lab - 6 && i < lab - 5 || j == 1 && i >= lab - 4 && i < lab - 3 || j == 2 && i >= lab - 2 && i < lab - 1) {
                    for (let n = 0; n < 4; n++) {
                        
                        for (let k = 0; k < arr.length; k++) {
                            labClash = false
                            labSlotClash = false
                            if (arr[k][0] == j && arr[k][4] > 0) {
                                
                                if (i == 10 && j == 0) {
                                    // console.log("I "+ i +" j "+ j + " k "+ k + " lab" + arr[k][4])
                                }
                                for (let l = 0; l < j; l++) {
                                    if (result[l][i][0] == arr[k][1] || result[l][i][3] == arr[k][1] || 
                                        result[l][i][5] == arr[k][1] || result[l][i][7] == arr[k][1]) {
                                        labClash = true
                                    }
                                }
                                for(let a = i; a>=0; a-=6){
                                    if(result[j][a][0] == arr[k][1] && n==0){
                                        labSlotClash = true
                                    }
                                    if(result[j][a][3] == arr[k][1] && n==1){
                                        labSlotClash = true
                                    }
                                    if(result[j][a][5] == arr[k][1] && n==2){
                                        labSlotClash = true
                                    }
                                    if(result[j][a][7] == arr[k][1] && n==3){
                                        labSlotClash = true
                                    }
                                }
                                if (!labClash && !labSlotClash && result[j][i][2] != 1 && n == 0 && arr[k][4] > 0) {
                                    result[j][i] = [arr[k][1], arr[k][2], "lab"]
                                    arr[k][4]--
                                    break
                                }
                                if (!labClash && !labSlotClash &&result[j][i][2] != 1 && n == 1 && result[j][i][0] != arr[k][1] && arr[k][4] > 0) {
                                    result[j][i] = [result[j][i][0], result[j][i][1], "lab", arr[k][1], arr[k][2]]
                                    arr[k][4]--
                                    break
                                }
                                if (!labClash && !labSlotClash && result[j][i][2] != 1 && n == 2 && result[j][i][0] != arr[k][1] && result[j][i][3] != arr[k][1] && arr[k][4] > 0) {
                                    result[j][i] = [result[j][i][0], result[j][i][1], "lab", result[j][i][3],
                                    result[j][i][4], arr[k][1], arr[k][2]]
                                    arr[k][4]--
                                    break
                                }
                                if (!labClash && !labSlotClash  && result[j][i][2] != 1 && n == 3 && result[j][i][0] != arr[k][1] && result[j][i][3] != arr[k][1] && result[j][i][5] != arr[k][1] && arr[k][4] > 0) {
                                    result[j][i] = [result[j][i][0], result[j][i][1], "lab", result[j][i][3],
                                    result[j][i][4], result[j][i][5], result[j][i][6], arr[k][1], arr[k][2]]
                                    arr[k][4]--
                                    break
                                }
                            }
                        }
                    }

                } else if(j == 0 && i >= lab - 5 && i < lab - 4 || j == 1 && i >= lab - 3 && i < lab - 2 || j == 2 && i >= lab - 1 && i < lab - 0){
                    result[j][i] = result[j][i-1]
                }
                
            }
        }

        for(let i=0; i<36; i++){
            var lab = parseInt((i / 6)) * 6 + 6
            for(let j=0; j<3; j++){
                if(j == 0 && i >= lab - 4 && i < lab - 0 || j == 1 && i != lab - 4 && i != lab - 3 || j == 2 && 
                    i >= lab - 6 && i < lab - 2) {
                    for (let k = 0; k < arr.length; k++) {
                        dayClash = false
                        clash = false
                        if (arr[k][0] == j && arr[k][3] > 0) {
                            for (let l = 0; l < j; l++) {
                                if (result[l][i][0] == arr[k][1] || result[l][i][3] == arr[k][1] ||
                                    result[l][i][5] == arr[k][1] || result[l][i][7] == arr[k][1]) {
                                    clash = true
                                    break
                                }
                            }
                            for (let l = 2; l > j; l--) {
                                if (result[l][i][0] == arr[k][1] || result[l][i][3] == arr[k][1] ||
                                    result[l][i][5] == arr[k][1] || result[l][i][7] == arr[k][1]) {
                                    clash = true
                                    break
                                }
                            }
                            if (!clash) {
                                for (let a = parseInt((i / 6)) * 6; a < i; a++) {
                                    if (result[j][a][0] == arr[k][1] && result[j][a][2] != "lab") {
                                        dayClash = true
                                        break
                                    }
                                }

                                if (dayClash == false && result[j][i][2] != 1) {
                                    result[j][i] = [arr[k][1], arr[k][2]]
                                    arr[k][3]--
                                    break
                                }

                            }
                        }
                    }

                }
            }
        }

        // console.log(` done ${result}`)
        var TimeTable = [
            ["sem", "slot", "fname", "sub", "type"],
        ];
        var sem
        for (let i = 0; i < result.length; i++) {
            // console.log(`Sem = ${i}`)

            for (let j = 0; j < result[i].length; j++) {
                if (i == 0) {
                    sem = 4
                } else if (i == 1) {
                    sem = 6
                } else if (i == 2) {
                    sem = 8
                }
                TimeTable.push([sem, j, result[i][j][0], result[i][j][1], result[i][j][2],result[i][j][3],
                    result[i][j][4],result[i][j][5],result[i][j][6],result[i][j][7], result[i][j][8]])
            }
        }

        for (var i = 1; i <= 36; i++) {
            var slot = TimeTable[i][1]

            var slot = TimeTable[i][1]

            var f31 = TimeTable[i][2]
            var f32 = TimeTable[i][5]
            var f33 = TimeTable[i][7]
            var f34 = TimeTable[i][9]
        
            var s31 = TimeTable[i][3]
            var s32 = TimeTable[i][6]
            var s33 = TimeTable[i][8]
            var s34 = TimeTable[i][10]

            var type3 = TimeTable[i][4]

            var f51 = TimeTable[i + 36][2]
            var f52 = TimeTable[i + 36][5]
            var f53 = TimeTable[i + 36][7]
            var f54 = TimeTable[i + 36][9]

            var s51 = TimeTable[i + 36][3]
            var s52 = TimeTable[i + 36][6]
            var s53 = TimeTable[i + 36][8]
            var s54 = TimeTable[i + 36][10]

            var type5 = TimeTable[i + 36][4]

            var f71 = TimeTable[i + 72][2]
            var f72 = TimeTable[i + 72][5]
            var f73 = TimeTable[i + 72][7]
            var f74 = TimeTable[i + 72][9]

            var s71 = TimeTable[i + 72][3]
            var s72 = TimeTable[i + 72][6]
            var s73 = TimeTable[i + 72][8]
            var s74 = TimeTable[i + 72][10]

            var type7 = TimeTable[i + 72][4]
            
            var odd = false
            const finalResult = new FinalResult({ 
                slot, 
                f31, f32, f33,f34,s31,s32, s33, s34, type3, 
                f51, f52, f53, f54, s51,s52,s53,s54, type5, 
                f71, f72, f73, f74, s71,s72,s73,s74, type7, 
                odd})
            await finalResult.save()
        }
        // console.log(TimeTable)
        // const abc = arrToObject(TimeTable)
        // console.log(abc);
        // for (obj in abc) {
        //     const { sem, slot, fname, sub, type } = abc[obj]
        //     const result = new Result({ sem, fname, sub, slot, type })
        //     await result.save()
        // }

    }
    catch (err) {
        console.log(err);
    }

})

router.get('/getfinalodd', (req, res) => {
    var odd = true
    FinalResult.find({ odd })
        .then(teacher => res.json(teacher))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.get('/getfinaleven', (req, res) => {
    var odd = false
    FinalResult.find({ odd })
        .then(teacher => res.json(teacher))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.get('/getfinal', (req, res) => {
    FinalResult.find()
        .then(teacher => res.json(teacher))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.get('/getResults', (req, res) => {
    Result.find()
        .then(resultdata => {
            res.json(resultdata)
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/getResults3', (req, res) => {
    const sem = 3
    Result.find({ sem })
        .then(timetable => {
            res.json(timetable)
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/getResults4', (req, res) => {
    const sem = 4
    Result.find({ sem })
        .then(timetable => {
            res.json(timetable)
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/getResults5', (req, res) => {
    const sem = 5
    Result.find({ sem })
        .then(resultdata => {
            res.json(resultdata)
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/getResults6', (req, res) => {
    const sem = 6
    Result.find({ sem })
        .then(timetable => {
            res.json(timetable)
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/getResults7', (req, res) => {
    const sem = 7
    Result.find({ sem })
        .then(resultdata => {
            res.json(resultdata)
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/getResults8', (req, res) => {
    const sem = 8
    Result.find({ sem })
        .then(timetable => {
            res.json(timetable)
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.delete('/daletetimetable', async (req, res) => {
    await FinalResult.deleteMany({}).then(function () {
        console.log("Data deleted"); // Success
    }).catch(function (error) {
        console.log(error); // Failure
    });
})

router.post('/subjects', (req, res) => {
    const { sem, sub } = req.body
    const subjects = new Sub({ sem, sub })

    subjects.save()
        .then(() => res.json("subject added succfully"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.get('/getsub', (req, res) => {
    Sub.aggregate(
        [
            { $sort: { sem: 1 } }
        ]
    )
        .then(subjects => res.json(subjects))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.delete("/delsub/:id", (req, res) => {
    Sub.findByIdAndDelete(req.params.id).exec((err, deleteItem) => {
        if (err) {
            res.send(err)
        }
        return res.json(deleteItem)
    })
})
module.exports = router

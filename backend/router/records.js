const record = require("../model/record");
const fs = require('fs');

async function getRecords(req, res, next) {
    console.log("/get Records");
    const params = req.query;
    try {
        let getRecords = await record.find();
        res.json(getRecords);
    } catch (err) {
        res.json({ message: err });
    }
}

async function createRecords(req, res, next) {
    console.log("/post Records");
    const params = req.query;
    const body = req.body;
    if (!params._id) {
        file_names = fs.readdirSync(__dirname + "/records_photos/");
        let photos_data = [];
        for (const i in file_names) {
            photos_data.push(fs.readFileSync(__dirname + "/records_photos/" + file_names[i]));
        }
        const newRecord = new record({
            date: body.date,
            tasks_done: body.tasks_done,
            tasks_undone: body.tasks_undone,
            photos: photos_data,
        });
        fs.writeFileSync(__dirname + "/output.jpg", newRecord.photos[0]); 
        try {
            const record = await newRecord.save();
            res.json(record);
        } catch (err) {
            res.json({ message: err});
        }
    }else{
        try {
            const updatedRecord = await record.updateOne(
                { _id: params._id },
                {date: body.date, tasks_done: body.tasks.done, tasks_undone: body_tasks_undone, photos: photos_data }
            );
            res.json(updatedRecord);
        } catch (err) {
            res.json({ message: err});
        }
    }
}

async function deleteRecords(req, res, next) {
    console.log("/delete Tasks");
    const params = req.query;
    try {
        const selectRecord = await record.delete();
        res.json(selectRecord);
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = {
    getRecords,
    createRecords,
    deleteRecords,
}
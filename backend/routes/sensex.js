const express = require('express');
const router = express.Router();
const SensexData = require('../models/SensexData');
const auth = require('../middleware/auth');

router.get('/', auth, async(req,res) => {
    try{
        const data = await SensexData.find().sort({ date: -1 });
        
        res.json(data);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/:id', auth, async(req,res) => {
    try{
        const data = await SensexData.findById(req.params.id);
        
        res.json(data);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/', auth, async(req,res) => {
    try{
        const data = new SensexData(req.body);
        const io = req.app.get('io');
        io.emit('data-added', data);
        await data.save();
        res.status(201).json(data);
    }
    catch(err){
        res.status(400).send(err)
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updatedData = await SensexData.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        
        const io = req.app.get('io');
        io.emit('data-updated', updatedData);
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({ message: 'Error updating data', error });
    }
});

router.delete('/:id', auth, async(req,res) => {
    try {
        const result = await SensexData.findByIdAndDelete(req.params.id);
        
        const io = req.app.get('io');
        io.emit('data-deleted', result);
        res.status(200).json({ message: "Data deleted", result });
    } 
    catch (error) {
        res.status(500).json({ message: "Error deleting data", error });
    }
});

router.delete('/delete-all', auth, async(req,res) => {
    try {
        const result = await SensexData.deleteMany({});
        res.status(200).json({ message: "All data deleted", result });
    } 
    catch (error) {
        res.status(500).json({ message: "Error deleting data", error });
    }
});
module.exports = router;
const express = require('express');
const Orders = require('../models/Orders');
const { isAuthenticated, hasRoles } = require('../auth');

const router = express.Router();

router.get('/', (req, res) => {
    Orders.find()
    .exec()
    .then(x => res.status(200).send(x));
 })
 
 router.get('/:id', (req, res) => {
    Orders.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x));
 })
 
 router.post('/', isAuthenticated, (req, res) => {
    const { _id } = req.user;
    Orders.create({ ...req.body, user_id: _id })
     .then(x => res.status(201).send(x));
 })
 
 router.put('/:id', isAuthenticated, /*hasRoles(['admin', 'user']),*/  (req, res) => {
    Orders.findByIdAndUpdate(req.params.id, req.body).then(() => res.sendStatus(204));
 })
 
 router.delete('/:id', isAuthenticated, (req, res) => {
    Orders.findByIdAndDelete(req.params.id).exec().then(() => res.sendStatus(204));
 })

module.exports = router;
const express = require('express');
const router = express.Router();
const { addSchedule, getAllSchedule, updateSchedule, deleteSchedule } = require('../controllers/mentorSchedule');
const authToken = require('../middlewares/authToken');
const cache = require('../middlewares/cache');
const { checkRoleId, checkScheduleOwnership } = require('../middlewares/authorize');
const { addValidate } = require('../middlewares/validators/mentorSchedule')

router
    .get('/', authToken, cache.get, getAllSchedule, cache.set)
    .post('/', authToken, checkRoleId([2]), addValidate, addSchedule, cache.clear)
    .patch('/:id', authToken, checkScheduleOwnership, updateSchedule, cache.clear)
    .delete('/:id', authToken, checkScheduleOwnership, deleteSchedule, cache.clear);

module.exports = router;

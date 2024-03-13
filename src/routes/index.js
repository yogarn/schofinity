const express = require('express');
const router = express.Router();

const authsRoute = require('./auth');
const usersRoute = require('./user');
const scholarshipsRoute = require('./scholarship');
const favoritesRoute = require('./favorite');
const mentorsRoute = require('./mentor');
const schedulesRoute = require('./mentorSchedule');
const mentoringsRoute = require('./mentoring');
const onlineClassesRoute = require('./onlineClass');
const classResourcesRoute = require('./classResource');
const feedbacksRoute = require('./feedback');
const midtransRoute = require('./midtrans');

router.use('/auths', authsRoute);
router.use('/users', usersRoute);
router.use('/scholarships', scholarshipsRoute);
router.use('/favorites', favoritesRoute);
router.use('/mentors', mentorsRoute);
router.use('/schedules', schedulesRoute);
router.use('/mentorings', mentoringsRoute);
router.use('/classes', onlineClassesRoute);
router.use('/classes/:classId/resources', classResourcesRoute);
router.use('/feedbacks', feedbacksRoute);
router.use('/midtrans', midtransRoute);

module.exports = router;

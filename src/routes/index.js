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
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api-docs.yaml');
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/health-check', (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    }

    res.status(200).send(data);
});

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

// import
const router = require('express').Router();
const { Exercises, UserExercises } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    try {
        res.render('exercises', {
            loggedIn: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/ball', withAuth, async (req, res) => {
    try {
        const exerciseData = await Exercises.findAll({
            where: { exercise_type: 'ball' },
        });
        const exercises = exerciseData.map(e => e.get({ plain: true }));
        res.render('ball', {
            exercises,
            loggedIn: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/stretch', withAuth, async (req, res) => {
    try {
        const exerciseData = await Exercises.findAll({
            where: { exercise_type: 'stretches' },
        });
        const exercises = exerciseData.map(e => e.get({ plain: true }));
        res.render('stretch', {
            exercises,
            loggedIn: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/band', withAuth, async (req, res) => {
    try {
        const exerciseData = await Exercises.findAll({
            where: { exercise_type: 'band' },
        });
        const exercises = exerciseData.map(e => e.get({ plain: true }));
        res.render('band', { exercises, loggedIn: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/list', withAuth, async (req, res) => {
    try {
        const test = await UserExercises.findAll({
            where: { login_email: req.session.email },
            include: [{
                model: Exercises,
                attributes: ['exercise_name', 'img_start', 'img_end', 'starting_tip', 'ending_tip', 'exercise_type', 'exercise_path']
            }]
        });
        const myExercises = test.map(e => e.get({ plain: true }));
        res.render('mylist', {
            myExercises,
            loggedIn: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
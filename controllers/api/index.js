const router = require('express').Router();
const { UserExercises, Exercises } = require('../../models');

// add to user's list
router.post('/add/:id', async (req, res) => {
    try {
        const addExercise = await UserExercises.create({
            exercise_id: parseInt(req.params.id),
            login_email: req.session.email},{
         include: [{
            model: Exercises,
            attributes: ['exercise_name','img_start','img_end','starting_tip', 'ending_tip']
            }]   
        });
        res.json(addExercise)    
        // error
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/del/:id', async (req, res) => {
    try {
        const deleteUserExercise = await UserExercises.destroy({
            where: {id: req.params.id}
        })
        res.json(deleteUserExercise)
    } catch (err) {
        res.status(500).json(err);
      }
    });

module.exports = router;

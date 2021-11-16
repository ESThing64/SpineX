const router = require('express').Router();
const { UserExercises, Exercises } = require('../../models');
const session = require('express-session');

// add to user's list
router.post('/add/:id', async (req, res) => {
    console.log(req.params);
    console.log(req.session.email);

    try {
      
        const addEx = await UserExercises.create({
            exercise_id: parseInt(req.params.id),
            login_email: req.session.email
        },{
         include: [{
            model: Exercises,
            attributes: ['exercise_name','img_start','img_end','starting_tip', 'ending_tip']
        }]   
        }
        
        );


        console.log("======++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++===================================================================================")



        const myExercises = addEx.map(e => e.get({ plain: true }));
        console.log(myExercises)
        res.json(myExercises)
        

        // error
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/delexercise',  async (req, res) => {
    try {

        listData = await UserExercises.findOne()
        delExData = await UserExercises.destroy({
            where: { id : parseInt(req.params.id) }
        });

        res.json(delExData)



    } catch (err) {
        res.status(500).json(err);
      }
    });














module.exports = router;

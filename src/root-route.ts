import express, { response } from 'express';
import { FormModel } from './types';
import { crawlFromData } from './diploma-crawler';
import { crawlDiplomaDetails } from './diploma-details-crawler';

const router = express.Router();
export default router;



router.get('/', (req, res) => {
    res.status(200).send('Ok.');
});

router.post('/', (req, res) => {
    try {
        // check if the model has enough properties
        const model = req.body as FormModel;
        if (isModelValid(model)) {
            return res.status(400).send({ 'error': 'model not accepted' });
        }
    
        // start crawling data by the model
        crawlFromData(model)
            .then((data) => {
                return res.status(200).send(data);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).send(err.message);
            });
    }
    catch(err) {
        // console.log(err);
        res.status(403).send({ 'error': 'model not accepted' });
    }
});


// getting the details infomation of a student by the key of the date
router.post('/details/:key', (req, res) => {

    crawlDiplomaDetails(req.body.key)
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err) => {
            // console.log(err);
            return res.status(500).send(err.message);
        });
});



function isModelValid(model: FormModel) {
    return (
        model?.Ten == undefined ||
        model?.currentPage == undefined ||
        model?.hoDem == undefined ||
        model?.maSinhVien == undefined ||
        model?.ngaySinh == undefined ||
        model?.soHieuVanBang == undefined
    );
}

const Chart = require('../modules/chart-shcema');

module.exports.getPieData = async (req,res) => {
    try {
        const pieData = await Chart.findOne({type:"pie"});
        if(pieData.length === 0){
            throw('No such chart');
        }
        res.status(200).json(pieData);
    } catch (error) {
        if(error === 'No such chart'){
            return res.status(409).send(error);
        }else{
            return res.status(500).send("Internal error");
        }
    }

}
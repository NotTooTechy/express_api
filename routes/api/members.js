const express = require('express');
const uuid = require('uuid');
const router = express.Router(); 
const members = require('./members_dict');


// Get all members
// Beacause of app.use('/api/members', require('./routes/api/members')); .. we can put just /
router.get('/', (req, res) => {
	res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	if(found){
		res.json(members.filter(member => member.id === parseInt(req.params.id)));
	}else{
		res.status(400).json({msg:`Member ${req.params.id} not found`});
	}
});

// Create Member, post request
router.post('/', (req, res) => {
	//res.send(req.body);
	const new_member = {
		id : uuid.v4(),
		name : req.body.name,
		email : req.body.email,
		status: 'active'
	};
	if (!new_member.name || !new_member.email){
		return res.status(400).json( {msg : 'Make sure to include name and email in your request!!',
			'sent': req.body});
	};
	members.push(new_member);
	// member.save(new_member); ... database way
	res.json(members);
});

// Update a member
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	if(found){
		const update_member = req.body;
		members.forEach(member => {
			if(member.id === parseInt(req.params.id)){
				member.name = update_member.name ? update_member.name : member.name;
				member.email = update_member.email ? update_member.email : member.email;
				res.json({msg : 'Member was updated', member});
			};
		});
	}else{
		res.status(400).json({msg:`Member ${req.params.id} not found`});
	}
});

// delete member
router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	if(found){
		res.json({
			msg: 'Member deleted!!', 
			members:members.filter(member => member.id !== parseInt(req.params.id))
		});
		members.splice(req.params.id -1, 1);
	}else{
		res.status(400).json({msg:`Member ${req.params.id} not found`});
	}
});
module.exports = router;
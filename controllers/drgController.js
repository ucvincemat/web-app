const db = require('../models/db');

exports.getAllSeeds = (req, res) => {
	const query = `
		SELECT * FROM drg_seeds
		ORDER BY game_version, seed_g, seed_m, seed_p;
	`;
	db.all(query, [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(rows);
		}
	});
};

exports.getSeed = (req, res) => {
	const { seed_g, seed_m, seed_p, season } = req.params;

	const query = `
		SELECT * FROM drg_seeds
		WHERE seed_g = ? AND seed_m = ? AND seed_p = ? AND season = ?
		LIMIT 1;
	`;

	db.get(query, [seed_g, seed_m, seed_p, season], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			if (row) {
				res.json(row);
			} else {
				res.status(404).json({ message: 'Seed not found' });
			}
		}
	});
};

exports.addSeed = (req, res) => {
    const {
        game_version, seed_g, seed_m, seed_p, season,
        primary_obj, secondary_obj, complexity, length,
        machine_event, data_cell, core_stone, plagueheart,
        huuli_hoarder, tyrant_weed, crassus_detonator, err_cube, bittergem,
		date_added, date_modified,
        notes
    } = req.body;

    const query = `
		INSERT INTO drg_seeds (
			game_version, seed_g, seed_m, seed_p, season,
			primary_obj, secondary_obj, complexity, length,
			machine_event, data_cell, core_stone, plagueheart,
			huuli_hoarder, tyrant_weed, crassus_detonator, err_cube, bittergem, notes
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
	`;

	const params = [
		game_version, seed_g, seed_m, seed_p, season,
		primary_obj, secondary_obj, complexity, length,
		machine_event || null, data_cell || 0, core_stone || 0, plagueheart || 0,
		huuli_hoarder || 0, tyrant_weed || 0, crassus_detonator || 0, err_cube || 0, bittergem || 0,
		notes || null
	];

    db.run(query, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Seed added successfully!' });
        }
    });
};

exports.updateSeed = (req, res) => {
    const { seed_g, seed_m, seed_p, season } = req.params;
    const updates = req.body;

    const query = `
        UPDATE drg_seeds
        SET ${Object.keys(updates).map((key) => `${key} = ?`).join(', ')}, 
            date_modified = CURRENT_TIMESTAMP
        WHERE seed_g = ? AND seed_m = ? AND seed_p = ? AND season = ?;
    `;

    const params = [...Object.values(updates), seed_g, seed_m, seed_p, season];

    db.run(query, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Seed not found.' });
        } else {
            res.json({ message: 'Seed updated successfully!' });
        }
    });
};

exports.deleteSeed = (req, res) => {
	const { seed_g, seed_m, seed_p, season } = req.params;

	const query = `
		DELETE FROM drg_seeds
		WHERE seed_g = ? AND seed_m = ? AND seed_p = ? AND season = ?;
	`;

	db.run(query, [seed_g, seed_m, seed_p, season], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else if (this.changes === 0) {
			res.status(404).json({ message: 'Seed not found.' });
		} else {
			res.json({ message: 'Seed deleted successfully!' });
		}
	});
};
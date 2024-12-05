$(document).ready(function() {
	const seedModal = $('#seedModal');
	const closeModal = $('#closeModal');
	const addSeedBtn = $('#addSeedBtn');
	const seedForm = $('#seedForm');
	const seedsTableBody = $('#seedsTable tbody');
	let editingSeed = null;
	
	seedModal.hide();

	function fetchSeeds() {
		$.get("/api/seeds", function(data) {
			seedsTableBody.empty();
			data.forEach(function(seed) {
				let row = `<tr>
					<td>${seed.game_version}</td>
					<td>${seed.seed_g}, ${seed.seed_m}, ${seed.seed_p}, ${seed.season}</td>
					<td>${seed.primary_obj}</td>
					<td>${seed.secondary_obj}</td>
					<td>${seed.complexity}</td>
					<td>${seed.length}</td>
					<td>${seed.machine_event ? seed.machine_event : 'No'}</td>
					<td>${seed.data_cell ? seed.data_cell : 'No'}</td>
					<td>${seed.core_stone ? seed.core_stone : 'No'}</td>
					<td>${seed.plagueheart ? seed.plagueheart : 'No'}</td>
					<td>${seed.huuli_hoarder ? 'Yes' : 'No'}</td>
					<td>${seed.tyrant_weed ? 'Yes' : 'No'}</td>
					<td>${seed.crassus_detonator ? 'Yes' : 'No'}</td>
					<td>${seed.err_cube ? 'Yes' : 'No'}</td>
					<td>${seed.bittergem ? 'Yes' : 'No'}</td>
					<td>${seed.date_added}</td>
					<td>${seed.date_modified}</td>
					<td>${seed.notes || ''}</td>
					<td>
						<button class="editSeed" data-id="${seed.seed_g},${seed.seed_m},${seed.seed_p},${seed.season}">Edit</button>
						<button class="deleteSeed" data-id="${seed.seed_g},${seed.seed_m},${seed.seed_p},${seed.season}">Delete</button>
					</td>
				</tr>`;
				seedsTableBody.append(row);
			});
		});
	}

	fetchSeeds();

	addSeedBtn.click(function() {
		$('#modalTitle').text("Add New Seed");
		seedForm[0].reset();
		editingSeed = null;
		seedModal.show();
	});

	closeModal.click(function() {
		seedModal.hide();
	});

	seedForm.submit(function(e) {
		e.preventDefault();

		const newSeed = {
			game_version: $('#game_version').val(),
			seed_g: $('#seed_g').val(),
			seed_m: $('#seed_m').val(),
			seed_p: $('#seed_p').val(),
			season: $('#season').val(),
			primary_obj: $('#primary_obj').val(),
			secondary_obj: $('#secondary_obj').val(),
			complexity: $('#complexity').val(),
			length: $('#length').val(),
			machine_event: $('#machine_event').val(),
			data_cell: $('#data_cell').val(),
			core_stone: $('#core_stone').val(),
			plagueheart: $('#plagueheart').val(),
			huuli_hoarder: $('#huuli_hoarder').is(':checked'),
			tyrant_weed: $('#tyrant_weed').is(':checked'),
			crassus_detonator: $('#crassus_detonator').is(':checked'),
			err_cube: $('#err_cube').is(':checked'),
			bittergem: $('#bittergem').is(':checked'),
			notes: $('#notes').val()
		};

		if (editingSeed) {
			$.ajax({
				url: `/api/seeds/${editingSeed.seed_g}/${editingSeed.seed_m}/${editingSeed.seed_p}/${editingSeed.season}`,
				method: 'PUT',
				contentType: 'application/json',
				data: JSON.stringify(newSeed),
				success: function() {
					fetchSeeds();
					seedModal.hide();
				},
				error: function() {
					alert("Failed to update seed");
				}
			});
		} else {
			$.ajax({
				url: '/api/seeds',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(newSeed),
				success: function() {
					fetchSeeds();
					seedModal.hide();
				},
				error: function() {
					alert("Failed to add seed");
				}
			});
		}
	});

	$(document).on('click', '.editSeed', function() {
		const seedId = $(this).data('id').split(',');
		const seedG = seedId[0], seedM = seedId[1], seedP = seedId[2], season = seedId[3];

		$.ajax({
			url: `/api/seeds/${seedG}/${seedM}/${seedP}/${season}`,
			method: 'GET',
			success: function(seed) {
				$('#modalTitle').text("Edit Seed");
				$('#game_version').val(seed.game_version);
				$('#seed_g').val(seed.seed_g);
				$('#seed_m').val(seed.seed_m);
				$('#seed_p').val(seed.seed_p);
				$('#season').val(seed.season);
				$('#primary_obj').val(seed.primary_obj);
				$('#secondary_obj').val(seed.secondary_obj);
				$('#complexity').val(seed.complexity);
				$('#length').val(seed.length);
				$('#machine_event').val(seed.machine_event);
				$('#data_cell').val(seed.data_cell);
				$('#core_stone').val(seed.core_stone);
				$('#plagueheart').val(seed.plagueheart);
				$('#huuli_hoarder').prop('checked', seed.huuli_hoarder);
				$('#tyrant_weed').prop('checked', seed.tyrant_weed);
				$('#crassus_detonator').prop('checked', seed.crassus_detonator);
				$('#err_cube').prop('checked', seed.err_cube);
				$('#bittergem').prop('checked', seed.bittergem);
				$('#notes').val(seed.notes || '');

				editingSeed = seed;
				seedModal.show();
			},
			error: function() {
				alert('Failed to fetch seed data.');
			}
		});
	});

	$(document).on('click', '.deleteSeed', function() {
		const seedId = $(this).data('id').split(',');
		const seedG = seedId[0], seedM = seedId[1], seedP = seedId[2], season = seedId[3];

		if (confirm('Are you sure you want to delete this seed?')) {
			$.ajax({
				url: `/api/seeds/${seedG}/${seedM}/${seedP}/${season}`,
				method: 'DELETE',
				success: function() {
					fetchSeeds();
				},
				error: function() {
					alert("Failed to delete seed");
				}
			});
		}
	});
});

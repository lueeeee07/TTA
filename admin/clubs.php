<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';
require_once __DIR__ . '/includes/active_toggle.php';

$db = (new Database())->getConnection();
$success = $error = '';
$regions = $db->query('SELECT * FROM regions ORDER BY name')->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if (try_toggle_active($db, 'clubs', $success)) {
        // visibility toggled
    } elseif ($action === 'add') {
        try {
            $features = json_encode(array_values(array_filter(array_map('trim', explode(',', $_POST['features'])))));
            $stmt = $db->prepare('INSERT INTO clubs (slug, name, region_id, courts, address, contact, features, image) VALUES (:slug, :name, :region_id, :courts, :address, :contact, :features, :image)');
            $stmt->execute([
                ':slug'      => $_POST['slug'],
                ':name'      => $_POST['name'],
                ':region_id' => $_POST['region_id'],
                ':courts'    => $_POST['courts'],
                ':address'   => $_POST['address'],
                ':contact'   => $_POST['contact'],
                ':features'  => $features,
                ':image'     => $_POST['image']
            ]);
            $success = 'Affiliated club added successfully.';
        } catch (Exception $e) {
            $error = 'Failed to add club. Slug may already exist.';
        }
    } elseif ($action === 'edit') {
        try {
            $features = json_encode(array_values(array_filter(array_map('trim', explode(',', $_POST['features'])))));
            $stmt = $db->prepare('UPDATE clubs SET slug=:slug, name=:name, region_id=:region_id, courts=:courts, address=:address, contact=:contact, features=:features, image=:image WHERE id=:id');
            $stmt->execute([
                ':id'        => $_POST['id'],
                ':slug'      => $_POST['slug'],
                ':name'      => $_POST['name'],
                ':region_id' => $_POST['region_id'],
                ':courts'    => $_POST['courts'],
                ':address'   => $_POST['address'],
                ':contact'   => $_POST['contact'],
                ':features'  => $features,
                ':image'     => $_POST['image']
            ]);
            $success = 'Club details updated successfully.';
        } catch (Exception $e) {
            $error = 'Failed to update club.';
        }
    } elseif ($action === 'delete') {
        $stmt = $db->prepare('DELETE FROM clubs WHERE id = :id');
        $stmt->execute([':id' => $_POST['id']]);
        $success = 'Club deleted.';
    }
}

$clubs = $db->query('SELECT c.*, r.name AS region_name FROM clubs c LEFT JOIN regions r ON c.region_id = r.id ORDER BY r.name, c.name')->fetchAll();

$pageTitle = 'Affiliated Clubs Management';
$currentPage = 'clubs';
require_once __DIR__ . '/includes/header.php';
?>

<?php if ($success): ?>
    <div class="alert alert-success alert-dismissible fade show mb-4">
        <i class="fas fa-check-circle fs-5"></i>
        <div><?= htmlspecialchars($success) ?></div>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<?php if ($error): ?>
    <div class="alert alert-danger alert-dismissible fade show mb-4">
        <i class="fas fa-exclamation-circle fs-5"></i>
        <div><?= htmlspecialchars($error) ?></div>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<div class="page-toolbar">
    <div class="page-toolbar-info">
        <div class="count-pill">
            <i class="fas fa-building text-primary"></i> Total Affiliated Clubs: <span><?= count($clubs) ?></span>
        </div>
    </div>
    <div>
        <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#clubModal" onclick="clearForm()">
            <i class="fas fa-plus"></i> Add New Club
        </button>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Club Name</th>
                    <th>Region</th>
                    <th>Courts</th>
                    <th>Location & Address</th>
                    <th>Contact</th>
                    <th>Website Visibility</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($clubs as $c): ?>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-3">
                            <?php if (!empty($c['image'])): ?>
                                <img src="<?= htmlspecialchars($c['image']) ?>" alt="" class="table-thumb" onerror="this.src='https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=100&auto=format&fit=crop&q=60'">
                            <?php else: ?>
                                <div class="table-thumb d-flex align-items-center justify-content-center text-muted bg-light">
                                    <i class="fas fa-building"></i>
                                </div>
                            <?php endif; ?>
                            <div>
                                <div class="fw-bold text-dark"><?= htmlspecialchars($c['name']) ?></div>
                                <div class="text-muted" style="font-size: 0.76rem;"><code><?= htmlspecialchars($c['slug']) ?></code></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-primary"><?= htmlspecialchars($c['region_name'] ?: 'National') ?></span>
                    </td>
                    <td>
                        <div class="d-flex align-items-center gap-1.5 text-secondary fw-semibold" style="font-size: 0.85rem;">
                            <i class="fas fa-table-tennis-paddle-ball text-success"></i> <?= htmlspecialchars($c['courts'] ?: 'N/A') ?>
                        </div>
                    </td>
                    <td>
                        <div class="text-muted" style="font-size: 0.82rem; max-width: 220px;">
                            <i class="fas fa-location-dot text-danger me-1"></i> <?= htmlspecialchars($c['address'] ?: 'Not specified') ?>
                        </div>
                    </td>
                    <td>
                        <div class="text-secondary" style="font-size: 0.82rem;">
                            <?= htmlspecialchars($c['contact'] ?: '—') ?>
                        </div>
                    </td>
                    <td>
                        <?= active_toggle_button($c) ?>
                    </td>
                    <td class="text-end text-nowrap">
                        <button class="btn-action-icon edit me-1" onclick='editClub(<?= json_encode($c) ?>)' title="Edit club">
                            <i class="fas fa-pen-to-square"></i>
                        </button>
                        <form method="POST" class="d-inline" onsubmit="return confirm('Delete <?= addslashes($c['name']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $c['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete club">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($clubs)): ?>
                <tr>
                    <td colspan="7">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-building"></i></div>
                            <div class="empty-state-title">No Affiliated Clubs Registered</div>
                            <div class="empty-state-desc">Register regional tennis clubs and sports facilities across Tanzania.</div>
                            <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#clubModal" onclick="clearForm()">
                                <i class="fas fa-plus"></i> Add First Club
                            </button>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Add/Edit Club Modal -->
<div class="modal fade" id="clubModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <form method="POST">
                <div class="modal-header">
                    <div class="modal-title-wrap">
                        <div class="modal-icon-badge">
                            <i class="fas fa-building"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-0" id="modalTitle">Add Affiliated Club</h5>
                            <small class="text-muted">Register venue location, court specs, and amenities</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="action" id="formAction" value="add">
                    <input type="hidden" name="id" id="formId">
                    <div class="row g-3">
                        <div class="col-md-7">
                            <label class="form-label">Club Name <span class="req">*</span></label>
                            <input type="text" name="name" id="fName" class="form-control" placeholder="e.g. Dar es Salaam Gymkhana Club" required oninput="generateSlug(this.value)">
                        </div>
                        <div class="col-md-5">
                            <label class="form-label">URL Slug <span class="req">*</span></label>
                            <input type="text" name="slug" id="fSlug" class="form-control" placeholder="e.g. dgc-dar" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Region *</label>
                            <select name="region_id" id="fRegion" class="form-select" required>
                                <?php foreach ($regions as $r): ?>
                                    <option value="<?= $r['id'] ?>"><?= htmlspecialchars($r['name']) ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Courts Specification</label>
                            <input type="text" name="courts" id="fCourts" class="form-control" placeholder="e.g. 6 Hard Courts (4 Floodlit)">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Address & Physical Location</label>
                            <input type="text" name="address" id="fAddress" class="form-control" placeholder="e.g. Kivukoni Front, Dar es Salaam">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Contact Phone / Email</label>
                            <input type="text" name="contact" id="fContact" class="form-control" placeholder="e.g. +255 22 212 0524 / info@club.tz">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Features & Amenities (comma-separated)</label>
                            <input type="text" name="features" id="fFeatures" class="form-control" placeholder="e.g. Floodlights, Pro Shop, JTI Training Centre, Clubhouse">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Club Facility Photo URL</label>
                            <input type="text" name="image" id="fImage" class="form-control" placeholder="https://images.unsplash.com/...">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-tta"><i class="fas fa-save"></i> Save Club Details</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function generateSlug(val) {
    if (document.getElementById('formAction').value === 'add') {
        const slug = val.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-');
        document.getElementById('fSlug').value = slug;
    }
}
function clearForm() {
    document.getElementById('modalTitle').textContent = 'Add Affiliated Club';
    document.getElementById('formAction').value = 'add';
    document.getElementById('formId').value = '';
    ['fName','fSlug','fCourts','fAddress','fContact','fFeatures','fImage'].forEach(id => document.getElementById(id).value = '');
}
function editClub(c) {
    document.getElementById('modalTitle').textContent = 'Edit Affiliated Club';
    document.getElementById('formAction').value = 'edit';
    document.getElementById('formId').value = c.id;
    document.getElementById('fName').value = c.name;
    document.getElementById('fSlug').value = c.slug;
    document.getElementById('fRegion').value = c.region_id;
    document.getElementById('fCourts').value = c.courts || '';
    document.getElementById('fAddress').value = c.address || '';
    document.getElementById('fContact').value = c.contact || '';
    try {
        document.getElementById('fFeatures').value = (JSON.parse(c.features || '[]')).join(', ');
    } catch(e) {
        document.getElementById('fFeatures').value = c.features || '';
    }
    document.getElementById('fImage').value = c.image || '';
    new bootstrap.Modal(document.getElementById('clubModal')).show();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

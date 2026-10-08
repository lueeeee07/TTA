<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';
require_once __DIR__ . '/includes/active_toggle.php';

$db = (new Database())->getConnection();
$success = $error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if (try_toggle_active($db, 'tournaments', $success)) {
        // visibility toggled
    } elseif ($action === 'add') {
        try {
            $stmt = $db->prepare('INSERT INTO tournaments (slug, type, name, date_text, location, status, status_badge, description, badge) VALUES (:slug, :type, :name, :date_text, :location, :status, :status_badge, :description, :badge)');
            $stmt->execute([':slug'=>$_POST['slug'],':type'=>$_POST['type'],':name'=>$_POST['name'],':date_text'=>$_POST['date_text'],':location'=>$_POST['location'],':status'=>$_POST['status'],':status_badge'=>$_POST['status_badge'],':description'=>$_POST['description'],':badge'=>$_POST['badge']]);
            $success = 'Tournament added successfully.';
        } catch (Exception $e) { $error = 'Failed to add tournament. Slug might already be in use.'; }
    } elseif ($action === 'edit') {
        try {
            $stmt = $db->prepare('UPDATE tournaments SET slug=:slug, type=:type, name=:name, date_text=:date_text, location=:location, status=:status, status_badge=:status_badge, description=:description, badge=:badge WHERE id=:id');
            $stmt->execute([':id'=>$_POST['id'],':slug'=>$_POST['slug'],':type'=>$_POST['type'],':name'=>$_POST['name'],':date_text'=>$_POST['date_text'],':location'=>$_POST['location'],':status'=>$_POST['status'],':status_badge'=>$_POST['status_badge'],':description'=>$_POST['description'],':badge'=>$_POST['badge']]);
            $success = 'Tournament updated successfully.';
        } catch (Exception $e) { $error = 'Failed to update tournament.'; }
    } elseif ($action === 'delete') {
        $db->prepare('DELETE FROM tournaments WHERE id = :id')->execute([':id' => $_POST['id']]);
        $success = 'Tournament removed successfully.';
    }
}

$tournaments = $db->query('SELECT * FROM tournaments ORDER BY id DESC')->fetchAll();
$pageTitle = 'Tournaments Management';
$currentPage = 'tournaments';
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
            <i class="fas fa-trophy text-primary"></i> Total Tournaments: <span><?= count($tournaments) ?></span>
        </div>
    </div>
    <div>
        <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#tModal" onclick="clearForm()">
            <i class="fas fa-plus"></i> Add Tournament
        </button>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Tournament</th>
                    <th>Type & Category</th>
                    <th>Schedule</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Website Visibility</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($tournaments as $t): ?>
                <tr>
                    <td>
                        <div class="fw-bold text-dark"><?= htmlspecialchars($t['name']) ?></div>
                        <div class="text-muted" style="font-size: 0.76rem;"><code><?= htmlspecialchars($t['slug']) ?></code></div>
                    </td>
                    <td>
                        <span class="badge badge-soft-info"><?= htmlspecialchars($t['type'] ?: 'Standard') ?></span>
                        <?php if (!empty($t['badge'])): ?>
                            <span class="badge badge-lime ms-1"><?= htmlspecialchars($t['badge']) ?></span>
                        <?php endif; ?>
                    </td>
                    <td>
                        <div class="d-flex align-items-center gap-1.5 text-secondary" style="font-size: 0.84rem;">
                            <i class="far fa-calendar-alt text-primary"></i> <?= htmlspecialchars($t['date_text'] ?: 'TBA') ?>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-items-center gap-1.5 text-muted" style="font-size: 0.84rem;">
                            <i class="fas fa-location-dot text-danger"></i> <?= htmlspecialchars($t['location'] ?: 'National') ?>
                        </div>
                    </td>
                    <td>
                        <?php
                            $badgeClass = 'badge-soft-secondary';
                            if ($t['status_badge'] === 'open') $badgeClass = 'badge-soft-success';
                            elseif ($t['status_badge'] === 'upcoming') $badgeClass = 'badge-soft-warning';
                        ?>
                        <span class="badge <?= $badgeClass ?>">
                            <?= htmlspecialchars($t['status'] ?: ucfirst($t['status_badge'])) ?>
                        </span>
                    </td>
                    <td>
                        <?= active_toggle_button($t) ?>
                    </td>
                    <td class="text-end text-nowrap">
                        <button class="btn-action-icon edit me-1" onclick='editT(<?= json_encode($t) ?>)' title="Edit tournament">
                            <i class="fas fa-pen-to-square"></i>
                        </button>
                        <form method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete <?= addslashes($t['name']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $t['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete tournament">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($tournaments)): ?>
                <tr>
                    <td colspan="7">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-trophy"></i></div>
                            <div class="empty-state-title">No Tournaments Listed Yet</div>
                            <div class="empty-state-desc">Create your first national or junior tennis tournament to display on the public schedule.</div>
                            <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#tModal" onclick="clearForm()">
                                <i class="fas fa-plus"></i> Add Tournament Now
                            </button>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Modal Form -->
<div class="modal fade" id="tModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <form method="POST">
                <div class="modal-header">
                    <div class="modal-title-wrap">
                        <div class="modal-icon-badge">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-0" id="modalTitle">Add Tournament</h5>
                            <small class="text-muted">Fill out tournament scheduling & details</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="action" id="formAction" value="add">
                    <input type="hidden" name="id" id="formId">
                    <div class="row g-3">
                        <div class="col-md-7">
                            <label class="form-label">Tournament Name <span class="req">*</span></label>
                            <input type="text" name="name" id="fName" class="form-control" placeholder="e.g. Tanzania Open Championship 2026" required oninput="generateSlug(this.value)">
                        </div>
                        <div class="col-md-5">
                            <label class="form-label">URL Slug <span class="req">*</span></label>
                            <input type="text" name="slug" id="fSlug" class="form-control" placeholder="e.g. tanzania-open-2026" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Type / Category</label>
                            <input type="text" name="type" id="fType" class="form-control" placeholder="e.g. Senior Tournaments, Junior Circuit">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Dates Text</label>
                            <input type="text" name="date_text" id="fDate" class="form-control" placeholder="e.g. 15 – 22 Nov 2026">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Location / Venue</label>
                            <input type="text" name="location" id="fLocation" class="form-control" placeholder="e.g. Dar es Salaam Gymkhana Club">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Status Label</label>
                            <input type="text" name="status" id="fStatus" class="form-control" placeholder="e.g. Upcoming">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Badge Tone</label>
                            <select name="status_badge" id="fBadge" class="form-select">
                                <option value="upcoming">Upcoming (Amber)</option>
                                <option value="open">Open (Green)</option>
                                <option value="completed">Completed (Gray)</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Special Tag / Badge Label (Optional)</label>
                            <input type="text" name="badge" id="fBadgeLabel" class="form-control" placeholder="e.g. Featured, ITF Sanctioned, National Championship">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Tournament Description & Overview</label>
                            <textarea name="description" id="fDesc" class="form-control" rows="3" placeholder="Provide information regarding formats, registration deadlines, and eligibility..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-tta"><i class="fas fa-save"></i> Save Tournament</button>
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
    document.getElementById('modalTitle').textContent = 'Add Tournament';
    document.getElementById('formAction').value = 'add';
    document.getElementById('formId').value = '';
    ['fName','fSlug','fType','fDate','fLocation','fStatus','fBadgeLabel','fDesc'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('fBadge').value = 'upcoming';
}
function editT(t) {
    document.getElementById('modalTitle').textContent = 'Edit Tournament';
    document.getElementById('formAction').value = 'edit';
    document.getElementById('formId').value = t.id;
    document.getElementById('fName').value = t.name;
    document.getElementById('fSlug').value = t.slug;
    document.getElementById('fType').value = t.type || '';
    document.getElementById('fDate').value = t.date_text || '';
    document.getElementById('fLocation').value = t.location || '';
    document.getElementById('fStatus').value = t.status || '';
    document.getElementById('fBadge').value = t.status_badge || 'upcoming';
    document.getElementById('fBadgeLabel').value = t.badge || '';
    document.getElementById('fDesc').value = t.description || '';
    new bootstrap.Modal(document.getElementById('tModal')).show();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

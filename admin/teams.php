<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';
require_once __DIR__ . '/includes/active_toggle.php';

$db = (new Database())->getConnection();
$success = $error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if (try_toggle_active($db, 'national_teams', $success)) {
        // visibility toggled
    } elseif ($action === 'add') {
        try {
            $achievements = json_encode(array_values(array_filter(array_map('trim', explode("\n", str_replace("\r", '', $_POST['achievements']))))));
            $stmt = $db->prepare('INSERT INTO national_teams (slug, team_name, age_group, subtitle, description, image, achievements) VALUES (:slug,:team_name,:age_group,:subtitle,:description,:image,:achievements)');
            $stmt->execute([
                ':slug'         => $_POST['slug'],
                ':team_name'    => $_POST['team_name'],
                ':age_group'    => $_POST['age_group'],
                ':subtitle'     => $_POST['subtitle'],
                ':description'  => $_POST['description'],
                ':image'        => $_POST['image'],
                ':achievements' => $achievements
            ]);
            $success = 'National squad added successfully.';
        } catch (Exception $e) { $error = 'Failed to add team. Slug may already exist.'; }
    } elseif ($action === 'edit') {
        try {
            $achievements = json_encode(array_values(array_filter(array_map('trim', explode("\n", str_replace("\r", '', $_POST['achievements']))))));
            $stmt = $db->prepare('UPDATE national_teams SET slug=:slug, team_name=:team_name, age_group=:age_group, subtitle=:subtitle, description=:description, image=:image, achievements=:achievements WHERE id=:id');
            $stmt->execute([
                ':id'           => $_POST['id'],
                ':slug'         => $_POST['slug'],
                ':team_name'    => $_POST['team_name'],
                ':age_group'    => $_POST['age_group'],
                ':subtitle'     => $_POST['subtitle'],
                ':description'  => $_POST['description'],
                ':image'        => $_POST['image'],
                ':achievements' => $achievements
            ]);
            $success = 'National squad updated successfully.';
        } catch (Exception $e) { $error = 'Failed to update team.'; }
    } elseif ($action === 'delete') {
        $db->prepare('DELETE FROM national_teams WHERE id = :id')->execute([':id' => $_POST['id']]);
        $success = 'Team deleted.';
    }
}

$teams = $db->query('SELECT * FROM national_teams ORDER BY id DESC')->fetchAll();
$pageTitle = 'National Teams & Squads';
$currentPage = 'teams';
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
            <i class="fas fa-users text-primary"></i> Total National Squads: <span><?= count($teams) ?></span>
        </div>
    </div>
    <div>
        <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#teamModal" onclick="clearForm()">
            <i class="fas fa-plus"></i> Add National Squad
        </button>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Squad / Team</th>
                    <th>Age Bracket</th>
                    <th>Subtitle & Achievements</th>
                    <th>Website Visibility</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($teams as $t): ?>
                <?php
                    $achList = [];
                    try {
                        $achList = json_decode($t['achievements'] ?: '[]', true) ?: [];
                    } catch(Exception $e) {}
                ?>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-3">
                            <?php if (!empty($t['image'])): ?>
                                <img src="<?= htmlspecialchars($t['image']) ?>" alt="" class="table-thumb" onerror="this.src='https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=100&auto=format&fit=crop&q=60'">
                            <?php else: ?>
                                <div class="table-thumb d-flex align-items-center justify-content-center text-muted bg-light">
                                    <i class="fas fa-users"></i>
                                </div>
                            <?php endif; ?>
                            <div>
                                <div class="fw-bold text-dark"><?= htmlspecialchars($t['team_name']) ?></div>
                                <div class="text-muted" style="font-size: 0.76rem;"><code><?= htmlspecialchars($t['slug']) ?></code></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-primary"><?= htmlspecialchars($t['age_group'] ?: 'Open') ?></span>
                    </td>
                    <td>
                        <div class="text-dark fw-semibold" style="font-size: 0.85rem;"><?= htmlspecialchars($t['subtitle'] ?: '—') ?></div>
                        <?php if (!empty($achList)): ?>
                            <div class="d-inline-flex align-items-center gap-1 text-success fs-xs mt-1">
                                <i class="fas fa-medal"></i> <?= count($achList) ?> Key Achievements Recorded
                            </div>
                        <?php endif; ?>
                    </td>
                    <td>
                        <?= active_toggle_button($t) ?>
                    </td>
                    <td class="text-end text-nowrap">
                        <button class="btn-action-icon edit me-1" onclick='editTeam(<?= json_encode($t) ?>)' title="Edit squad">
                            <i class="fas fa-pen-to-square"></i>
                        </button>
                        <form method="POST" class="d-inline" onsubmit="return confirm('Delete <?= addslashes($t['team_name']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $t['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete squad">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($teams)): ?>
                <tr>
                    <td colspan="5">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-users"></i></div>
                            <div class="empty-state-title">No National Teams Configured</div>
                            <div class="empty-state-desc">Display Davis Cup, Billie Jean King Cup, and Junior Davis Cup national squads.</div>
                            <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#teamModal" onclick="clearForm()">
                                <i class="fas fa-plus"></i> Add Squad Now
                            </button>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Add/Edit Team Modal -->
<div class="modal fade" id="teamModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <form method="POST">
                <div class="modal-header">
                    <div class="modal-title-wrap">
                        <div class="modal-icon-badge">
                            <i class="fas fa-users"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-0" id="modalTitle">Add National Squad</h5>
                            <small class="text-muted">Configure squad roster, division, and honors</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="action" id="formAction" value="add">
                    <input type="hidden" name="id" id="formId">
                    <div class="row g-3">
                        <div class="col-md-7">
                            <label class="form-label">Team / Squad Name <span class="req">*</span></label>
                            <input type="text" name="team_name" id="fName" class="form-control" placeholder="e.g. Tanzania Davis Cup Squad" required oninput="generateSlug(this.value)">
                        </div>
                        <div class="col-md-5">
                            <label class="form-label">URL Slug <span class="req">*</span></label>
                            <input type="text" name="slug" id="fSlug" class="form-control" placeholder="e.g. davis-cup-team" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Age Group / Division</label>
                            <input type="text" name="age_group" id="fAge" class="form-control" placeholder="e.g. Senior Men, Under 14 Girls">
                        </div>
                        <div class="col-md-8">
                            <label class="form-label">Subtitle / Motto</label>
                            <input type="text" name="subtitle" id="fSubtitle" class="form-control" placeholder="e.g. Representing Tanzania in Africa Zone Group V">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Team Photo URL</label>
                            <input type="text" name="image" id="fImage" class="form-control" placeholder="https://images.unsplash.com/...">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Team Description & History</label>
                            <textarea name="description" id="fDesc" class="form-control" rows="3" placeholder="Overview of team selections, training camps, and international tours..."></textarea>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Key Achievements (one per line)</label>
                            <textarea name="achievements" id="fAchievements" class="form-control" rows="3" placeholder="e.g. 2024 Davis Cup Africa Group V Finalist&#10;2023 ITF East Africa Junior Champions"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-tta"><i class="fas fa-save"></i> Save Squad</button>
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
    document.getElementById('modalTitle').textContent = 'Add National Squad';
    document.getElementById('formAction').value = 'add';
    document.getElementById('formId').value = '';
    ['fName','fSlug','fAge','fSubtitle','fDesc','fImage','fAchievements'].forEach(id => document.getElementById(id).value = '');
}
function editTeam(t) {
    document.getElementById('modalTitle').textContent = 'Edit National Squad';
    document.getElementById('formAction').value = 'edit';
    document.getElementById('formId').value = t.id;
    document.getElementById('fName').value = t.team_name;
    document.getElementById('fSlug').value = t.slug;
    document.getElementById('fAge').value = t.age_group || '';
    document.getElementById('fSubtitle').value = t.subtitle || '';
    document.getElementById('fDesc').value = t.description || '';
    document.getElementById('fImage').value = t.image || '';
    try {
        document.getElementById('fAchievements').value = (JSON.parse(t.achievements || '[]')).join('\n');
    } catch(e) {
        document.getElementById('fAchievements').value = t.achievements || '';
    }
    new bootstrap.Modal(document.getElementById('teamModal')).show();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

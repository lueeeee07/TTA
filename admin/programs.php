<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';
require_once __DIR__ . '/includes/active_toggle.php';

$db = (new Database())->getConnection();
$success = $error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if (try_toggle_active($db, 'programs', $success)) {
        // visibility toggled
    } elseif ($action === 'add') {
        try {
            $fullContent = json_encode(array_values(array_filter(array_map('trim', explode("\n", str_replace("\r", '', $_POST['full_content']))))));
            $stmt = $db->prepare('INSERT INTO programs (slug, title, tag, subtitle, short_desc, image, full_content) VALUES (:slug, :title, :tag, :subtitle, :short_desc, :image, :full_content)');
            $stmt->execute([
                ':slug'         => $_POST['slug'],
                ':title'        => $_POST['title'],
                ':tag'          => $_POST['tag'],
                ':subtitle'     => $_POST['subtitle'],
                ':short_desc'   => $_POST['short_desc'],
                ':image'        => $_POST['image'],
                ':full_content' => $fullContent
            ]);
            $success = 'Development program created successfully.';
        } catch (Exception $e) { $error = 'Failed to add program. Slug may already exist.'; }
    } elseif ($action === 'edit') {
        try {
            $fullContent = json_encode(array_values(array_filter(array_map('trim', explode("\n", str_replace("\r", '', $_POST['full_content']))))));
            $stmt = $db->prepare('UPDATE programs SET slug=:slug, title=:title, tag=:tag, subtitle=:subtitle, short_desc=:short_desc, image=:image, full_content=:full_content WHERE id=:id');
            $stmt->execute([
                ':id'           => $_POST['id'],
                ':slug'         => $_POST['slug'],
                ':title'        => $_POST['title'],
                ':tag'          => $_POST['tag'],
                ':subtitle'     => $_POST['subtitle'],
                ':short_desc'   => $_POST['short_desc'],
                ':image'        => $_POST['image'],
                ':full_content' => $fullContent
            ]);
            $success = 'Program details updated successfully.';
        } catch (Exception $e) { $error = 'Failed to update program.'; }
    } elseif ($action === 'delete') {
        $db->prepare('DELETE FROM programs WHERE id = :id')->execute([':id' => $_POST['id']]);
        $success = 'Program deleted.';
    }
}

$programs = $db->query('SELECT * FROM programs ORDER BY id DESC')->fetchAll();
$pageTitle = 'Core Programs Management';
$currentPage = 'programs';
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
            <i class="fas fa-graduation-cap text-primary"></i> Total Programs: <span><?= count($programs) ?></span>
        </div>
    </div>
    <div>
        <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#progModal" onclick="clearForm()">
            <i class="fas fa-plus"></i> Add New Program
        </button>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Program Title</th>
                    <th>Category Tag</th>
                    <th>Subtitle & Overview</th>
                    <th>Website Visibility</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($programs as $p): ?>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-3">
                            <?php if (!empty($p['image'])): ?>
                                <img src="<?= htmlspecialchars($p['image']) ?>" alt="" class="table-thumb" onerror="this.src='https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=100&auto=format&fit=crop&q=60'">
                            <?php else: ?>
                                <div class="table-thumb d-flex align-items-center justify-content-center text-muted bg-light">
                                    <i class="fas fa-graduation-cap"></i>
                                </div>
                            <?php endif; ?>
                            <div>
                                <div class="fw-bold text-dark"><?= htmlspecialchars($p['title']) ?></div>
                                <div class="text-muted" style="font-size: 0.76rem;"><code><?= htmlspecialchars($p['slug']) ?></code></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-info"><?= htmlspecialchars($p['tag'] ?: 'Development') ?></span>
                    </td>
                    <td>
                        <div class="text-dark fw-semibold" style="font-size: 0.85rem;"><?= htmlspecialchars($p['subtitle'] ?: '—') ?></div>
                        <div class="text-muted text-truncate" style="max-width: 320px; font-size: 0.78rem;">
                            <?= htmlspecialchars($p['short_desc'] ?: '') ?>
                        </div>
                    </td>
                    <td>
                        <?= active_toggle_button($p) ?>
                    </td>
                    <td class="text-end text-nowrap">
                        <button class="btn-action-icon edit me-1" onclick='editProg(<?= json_encode($p) ?>)' title="Edit program">
                            <i class="fas fa-pen-to-square"></i>
                        </button>
                        <form method="POST" class="d-inline" onsubmit="return confirm('Delete <?= addslashes($p['title']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $p['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete program">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($programs)): ?>
                <tr>
                    <td colspan="5">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-graduation-cap"></i></div>
                            <div class="empty-state-title">No Development Programs Listed</div>
                            <div class="empty-state-desc">Showcase grassroots youth development, coaching education, and community tennis pathways.</div>
                            <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#progModal" onclick="clearForm()">
                                <i class="fas fa-plus"></i> Add First Program
                            </button>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Add/Edit Program Modal -->
<div class="modal fade" id="progModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <form method="POST">
                <div class="modal-header">
                    <div class="modal-title-wrap">
                        <div class="modal-icon-badge">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-0" id="modalTitle">Add Program</h5>
                            <small class="text-muted">Define curriculum, focus groups, and pathways</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="action" id="formAction" value="add">
                    <input type="hidden" name="id" id="formId">
                    <div class="row g-3">
                        <div class="col-md-7">
                            <label class="form-label">Program Name <span class="req">*</span></label>
                            <input type="text" name="title" id="fTitle" class="form-control" placeholder="e.g. Junior Tennis Initiative (JTI)" required oninput="generateSlug(this.value)">
                        </div>
                        <div class="col-md-5">
                            <label class="form-label">URL Slug <span class="req">*</span></label>
                            <input type="text" name="slug" id="fSlug" class="form-control" placeholder="e.g. jti-program" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Tag / Focus Group</label>
                            <input type="text" name="tag" id="fTag" class="form-control" placeholder="e.g. Grassroots / Ages 6-14">
                        </div>
                        <div class="col-md-8">
                            <label class="form-label">Headline Subtitle</label>
                            <input type="text" name="subtitle" id="fSubtitle" class="form-control" placeholder="e.g. Fostering the Next Generation of Champions">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Cover Image URL</label>
                            <input type="text" name="image" id="fImage" class="form-control" placeholder="https://images.unsplash.com/...">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Short Summary</label>
                            <textarea name="short_desc" id="fShortDesc" class="form-control" rows="2" placeholder="Brief program intro card description..."></textarea>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Complete Program Content (one paragraph per line)</label>
                            <textarea name="full_content" id="fContent" class="form-control" rows="5" placeholder="Detailed program objectives, structure, training frequency, and national reach..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-tta"><i class="fas fa-save"></i> Save Program</button>
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
    document.getElementById('modalTitle').textContent = 'Add Program';
    document.getElementById('formAction').value = 'add';
    document.getElementById('formId').value = '';
    ['fTitle','fSlug','fTag','fSubtitle','fShortDesc','fImage','fContent'].forEach(id => document.getElementById(id).value = '');
}
function editProg(p) {
    document.getElementById('modalTitle').textContent = 'Edit Program';
    document.getElementById('formAction').value = 'edit';
    document.getElementById('formId').value = p.id;
    document.getElementById('fTitle').value = p.title;
    document.getElementById('fSlug').value = p.slug;
    document.getElementById('fTag').value = p.tag || '';
    document.getElementById('fSubtitle').value = p.subtitle || '';
    document.getElementById('fShortDesc').value = p.short_desc || '';
    document.getElementById('fImage').value = p.image || '';
    try {
        document.getElementById('fContent').value = (JSON.parse(p.full_content || '[]')).join('\n');
    } catch(e) {
        document.getElementById('fContent').value = p.full_content || '';
    }
    new bootstrap.Modal(document.getElementById('progModal')).show();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

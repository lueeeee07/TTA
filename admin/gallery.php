<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';
require_once __DIR__ . '/includes/active_toggle.php';

$db = (new Database())->getConnection();
$success = $error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if (try_toggle_active($db, 'gallery', $success)) {
        // visibility toggled
    } elseif ($action === 'add') {
        try {
            $stmt = $db->prepare('INSERT INTO gallery (title, category, type, image) VALUES (:title,:category,:type,:image)');
            $stmt->execute([
                ':title'    => $_POST['title'],
                ':category' => $_POST['category'],
                ':type'     => $_POST['type'] ?? 'image',
                ':image'    => $_POST['image']
            ]);
            $success = 'Media item added to gallery.';
        } catch (Exception $e) { $error = 'Failed to add media item.'; }
    } elseif ($action === 'edit') {
        try {
            $stmt = $db->prepare('UPDATE gallery SET title=:title, category=:category, type=:type, image=:image WHERE id=:id');
            $stmt->execute([
                ':id'       => $_POST['id'],
                ':title'    => $_POST['title'],
                ':category' => $_POST['category'],
                ':type'     => $_POST['type'] ?? 'image',
                ':image'    => $_POST['image']
            ]);
            $success = 'Gallery item updated.';
        } catch (Exception $e) { $error = 'Failed to update item.'; }
    } elseif ($action === 'delete') {
        $db->prepare('DELETE FROM gallery WHERE id = :id')->execute([':id' => $_POST['id']]);
        $success = 'Gallery item deleted.';
    }
}

$gallery = $db->query('SELECT * FROM gallery ORDER BY id DESC')->fetchAll();
$pageTitle = 'Media Gallery Management';
$currentPage = 'gallery';
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
            <i class="fas fa-photo-film text-primary"></i> Total Media Items: <span><?= count($gallery) ?></span>
        </div>
    </div>
    <div>
        <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#gModal" onclick="clearForm()">
            <i class="fas fa-plus"></i> Add Media Item
        </button>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Media Preview</th>
                    <th>Title & Description</th>
                    <th>Category</th>
                    <th>Format</th>
                    <th>Website Visibility</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($gallery as $g): ?>
                <tr>
                    <td style="width: 80px;">
                        <img src="<?= htmlspecialchars($g['image']) ?>" alt="" class="table-thumb" style="width: 65px; height: 48px;" onerror="this.src='https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=100&auto=format&fit=crop&q=60'">
                    </td>
                    <td>
                        <div class="fw-bold text-dark"><?= htmlspecialchars($g['title']) ?></div>
                    </td>
                    <td>
                        <span class="badge badge-soft-primary"><?= htmlspecialchars($g['category'] ?: 'General') ?></span>
                    </td>
                    <td>
                        <?php if ($g['type'] === 'video'): ?>
                            <span class="badge badge-soft-danger"><i class="fas fa-video me-1"></i> Video</span>
                        <?php else: ?>
                            <span class="badge badge-soft-info"><i class="fas fa-image me-1"></i> Image</span>
                        <?php endif; ?>
                    </td>
                    <td>
                        <?= active_toggle_button($g) ?>
                    </td>
                    <td class="text-end text-nowrap">
                        <button class="btn-action-icon edit me-1" onclick='editG(<?= json_encode($g) ?>)' title="Edit item">
                            <i class="fas fa-pen-to-square"></i>
                        </button>
                        <form method="POST" class="d-inline" onsubmit="return confirm('Delete this media item?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $g['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete item">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($gallery)): ?>
                <tr>
                    <td colspan="6">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-photo-film"></i></div>
                            <div class="empty-state-title">No Media Uploaded Yet</div>
                            <div class="empty-state-desc">Upload photos and highlight reels from tournaments, training clinics, and ceremonies.</div>
                            <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#gModal" onclick="clearForm()">
                                <i class="fas fa-plus"></i> Add Media Item
                            </button>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Add/Edit Gallery Modal -->
<div class="modal fade" id="gModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form method="POST">
                <div class="modal-header">
                    <div class="modal-title-wrap">
                        <div class="modal-icon-badge">
                            <i class="fas fa-photo-film"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-0" id="modalTitle">Add Gallery Item</h5>
                            <small class="text-muted">Upload or link photos and video clips</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="action" id="formAction" value="add">
                    <input type="hidden" name="id" id="formId">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="form-label">Media Caption / Title <span class="req">*</span></label>
                            <input type="text" name="title" id="fTitle" class="form-control" placeholder="e.g. 2026 National Championship Trophy Presentation" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Category</label>
                            <input type="text" name="category" id="fCategory" class="form-control" placeholder="e.g. Tournaments, JTI, Events">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Media Format</label>
                            <select name="type" id="fType" class="form-select">
                                <option value="image">Image Photo</option>
                                <option value="video">Video Reel</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Image or Thumbnail URL <span class="req">*</span></label>
                            <input type="text" name="image" id="fImage" class="form-control" placeholder="https://images.unsplash.com/..." required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-tta"><i class="fas fa-save"></i> Save Media</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function clearForm() {
    document.getElementById('modalTitle').textContent = 'Add Gallery Item';
    document.getElementById('formAction').value = 'add';
    document.getElementById('formId').value = '';
    ['fTitle','fCategory','fImage'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('fType').value = 'image';
}
function editG(g) {
    document.getElementById('modalTitle').textContent = 'Edit Gallery Item';
    document.getElementById('formAction').value = 'edit';
    document.getElementById('formId').value = g.id;
    document.getElementById('fTitle').value = g.title;
    document.getElementById('fCategory').value = g.category || '';
    document.getElementById('fType').value = g.type || 'image';
    document.getElementById('fImage').value = g.image || '';
    new bootstrap.Modal(document.getElementById('gModal')).show();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

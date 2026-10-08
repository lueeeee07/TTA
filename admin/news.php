<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';
require_once __DIR__ . '/includes/active_toggle.php';

$db = (new Database())->getConnection();
$success = $error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if (try_toggle_active($db, 'news', $success)) {
        // visibility toggled
    } elseif ($action === 'add') {
        try {
            $stmt = $db->prepare('INSERT INTO news (slug, date_text, title, snippet, category, is_featured, image, content) VALUES (:slug, :date_text, :title, :snippet, :category, :is_featured, :image, :content)');
            $stmt->execute([
                ':slug'        => $_POST['slug'],
                ':date_text'   => $_POST['date_text'],
                ':title'       => $_POST['title'],
                ':snippet'     => $_POST['snippet'],
                ':category'    => $_POST['category'],
                ':is_featured' => isset($_POST['is_featured']) ? 1 : 0,
                ':image'       => $_POST['image'],
                ':content'     => $_POST['content']
            ]);
            $success = 'News article published successfully.';
        } catch (Exception $e) {
            $error = 'Failed to add article. Slug may already exist.';
        }
    } elseif ($action === 'edit') {
        try {
            $stmt = $db->prepare('UPDATE news SET slug=:slug, date_text=:date_text, title=:title, snippet=:snippet, category=:category, is_featured=:is_featured, image=:image, content=:content WHERE id=:id');
            $stmt->execute([
                ':id'          => $_POST['id'],
                ':slug'        => $_POST['slug'],
                ':date_text'   => $_POST['date_text'],
                ':title'       => $_POST['title'],
                ':snippet'     => $_POST['snippet'],
                ':category'    => $_POST['category'],
                ':is_featured' => isset($_POST['is_featured']) ? 1 : 0,
                ':image'       => $_POST['image'],
                ':content'     => $_POST['content']
            ]);
            $success = 'News article updated successfully.';
        } catch (Exception $e) {
            $error = 'Failed to update article.';
        }
    } elseif ($action === 'delete') {
        $stmt = $db->prepare('DELETE FROM news WHERE id = :id');
        $stmt->execute([':id' => $_POST['id']]);
        $success = 'News article deleted.';
    }
}

$news = $db->query('SELECT * FROM news ORDER BY id DESC')->fetchAll();
$pageTitle = 'News & Media Management';
$currentPage = 'news';
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
            <i class="fas fa-newspaper text-primary"></i> Total Articles: <span><?= count($news) ?></span>
        </div>
    </div>
    <div>
        <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#newsModal" onclick="clearForm()">
            <i class="fas fa-plus"></i> Add Article
        </button>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Article</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Featured</th>
                    <th>Website Visibility</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($news as $n): ?>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-3">
                            <?php if (!empty($n['image'])): ?>
                                <img src="<?= htmlspecialchars($n['image']) ?>" alt="" class="table-thumb" onerror="this.src='https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=100&auto=format&fit=crop&q=60'">
                            <?php else: ?>
                                <div class="table-thumb d-flex align-items-center justify-content-center text-muted bg-light">
                                    <i class="fas fa-image"></i>
                                </div>
                            <?php endif; ?>
                            <div>
                                <div class="fw-bold text-dark"><?= htmlspecialchars($n['title']) ?></div>
                                <div class="text-muted text-truncate" style="max-width: 320px; font-size: 0.78rem;">
                                    <?= htmlspecialchars($n['snippet'] ?: substr(strip_tags($n['content']), 0, 80) . '...') ?>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-primary"><?= htmlspecialchars($n['category'] ?: 'General') ?></span>
                    </td>
                    <td>
                        <div class="d-flex align-items-center gap-1.5 text-muted" style="font-size: 0.82rem;">
                            <i class="far fa-calendar text-primary"></i> <?= htmlspecialchars($n['date_text'] ?: 'Recent') ?>
                        </div>
                    </td>
                    <td>
                        <?php if ($n['is_featured']): ?>
                            <span class="badge badge-lime"><i class="fas fa-star me-1"></i> Featured</span>
                        <?php else: ?>
                            <span class="text-muted fs-xs">Standard</span>
                        <?php endif; ?>
                    </td>
                    <td>
                        <?= active_toggle_button($n) ?>
                    </td>
                    <td class="text-end text-nowrap">
                        <button class="btn-action-icon edit me-1" onclick='editNews(<?= json_encode($n) ?>)' title="Edit article">
                            <i class="fas fa-pen-to-square"></i>
                        </button>
                        <form method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete <?= addslashes($n['title']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $n['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete article">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($news)): ?>
                <tr>
                    <td colspan="6">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-newspaper"></i></div>
                            <div class="empty-state-title">No News Articles Published</div>
                            <div class="empty-state-desc">Share official tournament results, player milestones, and press announcements.</div>
                            <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#newsModal" onclick="clearForm()">
                                <i class="fas fa-plus"></i> Write First Article
                            </button>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Add/Edit News Modal -->
<div class="modal fade" id="newsModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <form method="POST">
                <div class="modal-header">
                    <div class="modal-title-wrap">
                        <div class="modal-icon-badge">
                            <i class="fas fa-newspaper"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-0" id="modalTitle">Add News Article</h5>
                            <small class="text-muted">Draft and publish press releases or stories</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="action" id="formAction" value="add">
                    <input type="hidden" name="id" id="formId">
                    <div class="row g-3">
                        <div class="col-md-8">
                            <label class="form-label">Article Headline <span class="req">*</span></label>
                            <input type="text" name="title" id="fTitle" class="form-control" placeholder="e.g. Tanzania Junior Team Secures Silver at East Africa Championship" required oninput="generateSlug(this.value)">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">URL Slug <span class="req">*</span></label>
                            <input type="text" name="slug" id="fSlug" class="form-control" required placeholder="e.g. junior-team-silver-2026">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Display Date Text</label>
                            <input type="text" name="date_text" id="fDate" class="form-control" placeholder="e.g. 28 Jul 2026">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Category</label>
                            <input type="text" name="category" id="fCategory" class="form-control" placeholder="e.g. Tournaments, National Team, JTI">
                        </div>
                        <div class="col-md-4 d-flex align-items-end">
                            <div class="form-check form-switch p-2 ps-5 border rounded-3 bg-light w-100">
                                <input type="checkbox" name="is_featured" id="fFeatured" class="form-check-input" role="switch">
                                <label class="form-check-label fw-bold text-dark fs-xs" for="fFeatured">⭐ Featured Story</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Cover Image URL</label>
                            <input type="text" name="image" id="fImage" class="form-control" placeholder="https://images.unsplash.com/...">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Snippet / Excerpt</label>
                            <textarea name="snippet" id="fSnippet" class="form-control" rows="2" placeholder="Brief 1-2 sentence hook displayed on news preview cards..."></textarea>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Full Article Story <span class="req">*</span></label>
                            <textarea name="content" id="fContent" class="form-control" rows="6" required placeholder="Write the complete article content here..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-tta"><i class="fas fa-paper-plane"></i> Publish Article</button>
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
    document.getElementById('modalTitle').textContent = 'Add News Article';
    document.getElementById('formAction').value = 'add';
    document.getElementById('formId').value = '';
    ['fTitle','fSlug','fDate','fCategory','fImage','fSnippet','fContent'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('fFeatured').checked = false;
}
function editNews(n) {
    document.getElementById('modalTitle').textContent = 'Edit News Article';
    document.getElementById('formAction').value = 'edit';
    document.getElementById('formId').value = n.id;
    document.getElementById('fTitle').value = n.title;
    document.getElementById('fSlug').value = n.slug;
    document.getElementById('fDate').value = n.date_text || '';
    document.getElementById('fCategory').value = n.category || '';
    document.getElementById('fFeatured').checked = n.is_featured == 1;
    document.getElementById('fImage').value = n.image || '';
    document.getElementById('fSnippet').value = n.snippet || '';
    document.getElementById('fContent').value = n.content || '';
    new bootstrap.Modal(document.getElementById('newsModal')).show();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

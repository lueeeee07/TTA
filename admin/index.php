<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';

$db = (new Database())->getConnection();

// Fetch counts
$clubsCount       = (int) $db->query('SELECT COUNT(*) FROM clubs')->fetchColumn();
$programsCount    = (int) $db->query('SELECT COUNT(*) FROM programs')->fetchColumn();
$newsCount        = (int) $db->query('SELECT COUNT(*) FROM news')->fetchColumn();
$tournamentsCount = (int) $db->query('SELECT COUNT(*) FROM tournaments')->fetchColumn();
$pendingApps      = (int) $db->query("SELECT COUNT(*) FROM club_applications WHERE status = 'pending'")->fetchColumn();
$unreadMsgs       = (int) $db->query("SELECT COUNT(*) FROM contact_messages WHERE is_read = 0")->fetchColumn();
$pendingBookings  = (int) $db->query("SELECT COUNT(*) FROM meeting_bookings WHERE status = 'pending'")->fetchColumn();

// Recent messages
$recentMsgs = $db->query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5')->fetchAll();
// Recent applications
$recentApps = $db->query('SELECT * FROM club_applications ORDER BY created_at DESC LIMIT 5')->fetchAll();

$pageTitle = 'Dashboard Overview';
$currentPage = 'dashboard';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Welcome Banner -->
<div class="card border-0 mb-4 position-relative overflow-hidden" style="background: linear-gradient(135deg, #0B1120 0%, #152238 60%, #075985 100%); color: #fff; box-shadow: 0 10px 30px -5px rgba(11, 17, 32, 0.4);">
    <div class="position-absolute end-0 top-0 bottom-0 opacity-10 d-none d-md-flex align-items-center pe-4 pointer-events-none">
        <i class="fas fa-trophy" style="font-size: 11rem; transform: rotate(12deg) translateY(10px);"></i>
    </div>
    <div class="card-body p-4 p-lg-4 position-relative z-1">
        <div class="row align-items-center g-3">
            <div class="col-lg-8">
                <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-10 text-lime mb-2.5" style="font-size: 0.75rem; font-weight: 700; color: #C7ED56;">
                    <i class="fas fa-sparkles"></i> Control Center Active
                </div>
                <h2 class="fw-extrabold mb-1" style="font-weight: 800; letter-spacing: -0.5px;">
                    Welcome back, <?= htmlspecialchars($_SESSION['admin_name'] ?? 'Administrator') ?> 👋
                </h2>
                <p class="text-white-50 mb-0" style="font-size: 0.88rem;">
                    Manage Tanzania Tennis Association official tournaments, affiliated clubs, news releases, and incoming public inquiries.
                </p>
            </div>
            <div class="col-lg-4 text-lg-end">
                <div class="d-flex flex-wrap gap-2 justify-content-lg-end">
                    <a href="tournaments.php" class="btn btn-lime shadow-sm">
                        <i class="fas fa-plus"></i> Tournament
                    </a>
                    <a href="news.php" class="btn btn-light shadow-sm fw-bold">
                        <i class="fas fa-plus"></i> News Article
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Primary Metric Stats Grid -->
<div class="row g-3 mb-4">
    <div class="col-sm-6 col-xl-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="number"><?= $clubsCount ?></div>
                    <div class="label">Affiliated Clubs</div>
                </div>
                <div class="stat-icon-box" style="background: rgba(9, 125, 198, 0.12); color: #097DC6;">
                    <i class="fas fa-building"></i>
                </div>
            </div>
            <div class="stat-card-footer">
                <span>Active nationwide</span>
                <a href="clubs.php">Manage <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </div>

    <div class="col-sm-6 col-xl-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="number"><?= $newsCount ?></div>
                    <div class="label">News Articles</div>
                </div>
                <div class="stat-icon-box" style="background: rgba(14, 165, 233, 0.12); color: #0284C7;">
                    <i class="fas fa-newspaper"></i>
                </div>
            </div>
            <div class="stat-card-footer">
                <span>Published updates</span>
                <a href="news.php">Manage <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </div>

    <div class="col-sm-6 col-xl-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="number"><?= $tournamentsCount ?></div>
                    <div class="label">Tournaments</div>
                </div>
                <div class="stat-icon-box" style="background: rgba(16, 185, 129, 0.12); color: #059669;">
                    <i class="fas fa-trophy"></i>
                </div>
            </div>
            <div class="stat-card-footer">
                <span>National schedule</span>
                <a href="tournaments.php">Manage <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </div>

    <div class="col-sm-6 col-xl-3">
        <div class="stat-card">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="number"><?= $programsCount ?></div>
                    <div class="label">Core Programs</div>
                </div>
                <div class="stat-icon-box" style="background: rgba(245, 158, 11, 0.12); color: #D97706;">
                    <i class="fas fa-graduation-cap"></i>
                </div>
            </div>
            <div class="stat-card-footer">
                <span>Development paths</span>
                <a href="programs.php">Manage <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </div>
</div>

<!-- Pending Inquiries / Priority Action Cards -->
<div class="row g-3 mb-4">
    <div class="col-md-4">
        <div class="stat-card border-start border-4 border-warning" style="border-left-width: 4px !important;">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="number text-warning"><?= $pendingApps ?></div>
                    <div class="label">Pending Applications</div>
                </div>
                <a href="applications.php" class="btn btn-soft-primary">
                    Review <i class="fas fa-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="stat-card border-start border-4 border-danger" style="border-left-width: 4px !important;">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="number text-danger"><?= $unreadMsgs ?></div>
                    <div class="label">Unread Messages</div>
                </div>
                <a href="messages.php" class="btn btn-soft-danger">
                    Inbox <i class="fas fa-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="stat-card border-start border-4 border-info" style="border-left-width: 4px !important;">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="number text-info"><?= $pendingBookings ?></div>
                    <div class="label">Pending Bookings</div>
                </div>
                <a href="bookings.php" class="btn btn-soft-primary">
                    Schedule <i class="fas fa-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    </div>
</div>

<!-- Recent Submissions Grid -->
<div class="row g-4 mb-4">
    <!-- Recent Messages Table -->
    <div class="col-lg-6">
        <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
                    <div class="p-2 rounded-3 bg-primary bg-opacity-10 text-primary fw-bold">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <h6 class="fw-bold mb-0">Recent Inquiries</h6>
                </div>
                <a href="messages.php" class="btn btn-sm btn-soft-primary">View All</a>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Topic</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($recentMsgs as $msg): ?>
                            <tr>
                                <td>
                                    <div class="fw-bold text-dark"><?= htmlspecialchars($msg['name']) ?></div>
                                    <div class="text-muted fs-xs"><?= htmlspecialchars($msg['email']) ?></div>
                                </td>
                                <td>
                                    <span class="badge badge-soft-secondary"><?= htmlspecialchars($msg['topic']) ?></span>
                                </td>
                                <td class="text-muted fs-xs">
                                    <?= date('M j, Y', strtotime($msg['created_at'])) ?>
                                </td>
                                <td>
                                    <?php if ($msg['is_read']): ?>
                                        <span class="badge badge-soft-success">Read</span>
                                    <?php else: ?>
                                        <span class="badge badge-soft-danger">Unread</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        <?php if (empty($recentMsgs)): ?>
                            <tr>
                                <td colspan="4" class="text-center text-muted py-4">No recent messages received yet</td>
                            </tr>
                        <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Applications Table -->
    <div class="col-lg-6">
        <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
                    <div class="p-2 rounded-3 bg-warning bg-opacity-10 text-warning-emphasis fw-bold">
                        <i class="fas fa-file-signature"></i>
                    </div>
                    <h6 class="fw-bold mb-0">Recent Club Applications</h6>
                </div>
                <a href="applications.php" class="btn btn-sm btn-soft-primary">View All</a>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Applicant</th>
                                <th>Region</th>
                                <th>Club</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($recentApps as $app): ?>
                            <tr>
                                <td>
                                    <div class="fw-bold text-dark"><?= htmlspecialchars($app['applicant_name']) ?></div>
                                    <div class="text-muted fs-xs"><?= htmlspecialchars($app['email']) ?></div>
                                </td>
                                <td>
                                    <span class="badge badge-soft-primary"><?= htmlspecialchars($app['region']) ?></span>
                                </td>
                                <td class="fw-semibold text-secondary">
                                    <?= htmlspecialchars($app['club_name']) ?>
                                </td>
                                <td>
                                    <?php
                                        $statusType = $app['status'] === 'approved' ? 'success' : ($app['status'] === 'rejected' ? 'danger' : 'warning');
                                    ?>
                                    <span class="badge badge-soft-<?= $statusType ?>">
                                        <?= ucfirst($app['status']) ?>
                                    </span>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        <?php if (empty($recentApps)): ?>
                            <tr>
                                <td colspan="4" class="text-center text-muted py-4">No club applications submitted yet</td>
                            </tr>
                        <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

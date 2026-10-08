<?php
$sidebarUnreadMsgs = 0;
$sidebarPendingApps = 0;
$sidebarPendingBookings = 0;
if (isset($db) && $db instanceof PDO) {
    try {
        $sidebarUnreadMsgs = (int) $db->query("SELECT COUNT(*) FROM contact_messages WHERE is_read = 0")->fetchColumn();
        $sidebarPendingApps = (int) $db->query("SELECT COUNT(*) FROM club_applications WHERE status = 'pending'")->fetchColumn();
        $sidebarPendingBookings = (int) $db->query("SELECT COUNT(*) FROM meeting_bookings WHERE status = 'pending'")->fetchColumn();
    } catch (Throwable $e) {}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? 'Admin Portal') ?> — Tanzania Tennis Association</title>
    
    <!-- Google Fonts & Font Awesome -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --tta-blue: #097DC6;
            --tta-blue-dark: #075985;
            --tta-blue-light: #38BDF8;
            --tta-lime: #C7ED56;
            --tta-lime-dark: #A3D129;
            --tta-dark: #0B1120;
            --tta-dark-card: #151E32;
            --tta-dark-border: rgba(255, 255, 255, 0.08);
            --tta-bg: #F8FAFC;
            --tta-card-bg: #FFFFFF;
            --tta-border: #E2E8F0;
            --tta-text-main: #1E293B;
            --tta-text-muted: #64748B;
            --tta-shadow-sm: 0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px 0 rgba(15, 23, 42, 0.04);
            --tta-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02);
            --tta-shadow-lg: 0 20px 35px -8px rgba(15, 23, 42, 0.1), 0 8px 16px -4px rgba(15, 23, 42, 0.04);
            --tta-radius-sm: 0.5rem;
            --tta-radius: 0.85rem;
            --tta-radius-lg: 1.25rem;
            --tta-radius-xl: 1.5rem;
        }

        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            background-color: var(--tta-bg);
            color: var(--tta-text-main);
            min-height: 100vh;
            overflow-x: hidden;
            letter-spacing: -0.01em;
        }

        /* -------------------------------------------------------------
           SIDEBAR STYLING
        ------------------------------------------------------------- */
        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 275px;
            background: #0B1120;
            background: linear-gradient(180deg, #0B1120 0%, #070B14 100%);
            color: #fff;
            z-index: 1050;
            overflow-y: auto;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border-right: 1px solid var(--tta-dark-border);
            display: flex;
            flex-direction: column;
        }

        .sidebar::-webkit-scrollbar {
            width: 5px;
        }
        .sidebar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.12);
            border-radius: 10px;
        }

        .sidebar .brand {
            padding: 1.5rem 1.35rem 1.25rem;
            border-bottom: 1px solid var(--tta-dark-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.02);
        }

        .brand-logo-wrap {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            text-decoration: none;
        }

        .brand-icon {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(199, 237, 86, 0.22), rgba(9, 125, 198, 0.35));
            border: 1.5px solid rgba(199, 237, 86, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--tta-lime);
            font-size: 1.25rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            flex-shrink: 0;
        }

        .brand-text {
            display: flex;
            flex-direction: column;
        }

        .brand-title {
            font-size: 1.2rem;
            font-weight: 800;
            letter-spacing: 0.5px;
            color: #FFFFFF;
            line-height: 1.15;
        }

        .brand-title span {
            color: var(--tta-lime);
        }

        .brand-subtitle {
            font-size: 0.68rem;
            color: #94A3B8;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-top: 2px;
        }

        .version-badge {
            font-size: 0.65rem;
            font-weight: 700;
            padding: 0.2rem 0.5rem;
            border-radius: 9999px;
            background: rgba(199, 237, 86, 0.15);
            color: var(--tta-lime);
            border: 1px solid rgba(199, 237, 86, 0.25);
        }

        .sidebar-nav {
            padding: 1.25rem 0;
            flex-grow: 1;
        }

        .sidebar .section-label {
            padding: 0.85rem 1.4rem 0.4rem;
            font-size: 0.65rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #475569;
        }

        .sidebar .nav-link {
            color: #94A3B8;
            padding: 0.72rem 1.15rem;
            font-size: 0.88rem;
            font-weight: 600;
            border-radius: 0.75rem;
            margin: 0.2rem 0.85rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            text-decoration: none;
            position: relative;
        }

        .sidebar .nav-link-content {
            display: flex;
            align-items: center;
            gap: 0.85rem;
        }

        .sidebar .nav-link i {
            width: 20px;
            text-align: center;
            font-size: 0.95rem;
            transition: transform 0.2s, color 0.2s;
            color: #64748B;
        }

        .sidebar .nav-link:hover {
            color: #FFFFFF;
            background: rgba(255, 255, 255, 0.06);
            transform: translateX(4px);
        }

        .sidebar .nav-link:hover i {
            color: var(--tta-lime);
            transform: scale(1.15);
        }

        .sidebar .nav-link.active {
            color: #0B1120;
            background: var(--tta-lime);
            font-weight: 700;
            box-shadow: 0 4px 20px rgba(199, 237, 86, 0.3);
            transform: translateX(3px);
        }

        .sidebar .nav-link.active i {
            color: #0B1120;
        }

        .sidebar .divider {
            border-top: 1px solid var(--tta-dark-border);
            margin: 0.85rem 1.1rem;
        }

        /* Sidebar Footer / User Info Card */
        .sidebar-footer {
            padding: 1rem 0.85rem;
            border-top: 1px solid var(--tta-dark-border);
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }

        .sidebar-user-card {
            padding: 0.75rem 0.85rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--tta-dark-border);
            border-radius: 0.85rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .user-avatar-box {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .avatar-circle {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: linear-gradient(135deg, var(--tta-blue), #0284C7);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.95rem;
            position: relative;
            box-shadow: 0 2px 8px rgba(9, 125, 198, 0.3);
        }

        .avatar-circle::after {
            content: '';
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 10px;
            height: 10px;
            background: #10B981;
            border: 2px solid #0B1120;
            border-radius: 50%;
        }

        .user-info-text {
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-size: 0.82rem;
            font-weight: 700;
            color: #F8FAFC;
            line-height: 1.2;
        }

        .user-role {
            font-size: 0.68rem;
            color: var(--tta-lime);
            font-weight: 600;
        }

        .view-site-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.55rem;
            font-size: 0.78rem;
            font-weight: 700;
            color: #94A3B8;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--tta-dark-border);
            border-radius: 0.65rem;
            text-decoration: none;
            transition: all 0.2s;
        }

        .view-site-link:hover {
            color: #FFFFFF;
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.15);
        }

        /* -------------------------------------------------------------
           MAIN CONTENT LAYOUT & TOP BAR
        ------------------------------------------------------------- */
        .main-content {
            margin-left: 275px;
            padding: 1.75rem 2.25rem 3rem;
            min-height: 100vh;
            transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .top-bar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.25rem;
            margin-bottom: 2rem;
            padding: 1rem 1.5rem;
            background: rgba(255, 255, 255, 0.88);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--tta-border);
            border-radius: var(--tta-radius-lg);
            box-shadow: var(--tta-shadow);
            position: sticky;
            top: 1rem;
            z-index: 900;
        }

        .top-bar-title-group h1 {
            font-size: 1.35rem;
            font-weight: 800;
            color: var(--tta-dark);
            margin: 0;
            letter-spacing: -0.4px;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        .top-bar-title-group .title-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: rgba(9, 125, 198, 0.1);
            color: var(--tta-blue);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.95rem;
        }

        .top-bar-breadcrumb {
            font-size: 0.75rem;
            color: var(--tta-text-muted);
            font-weight: 600;
            margin-top: 0.2rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }

        .top-bar-actions {
            display: flex;
            align-items: center;
            gap: 0.85rem;
        }

        .admin-search-wrapper {
            position: relative;
            min-width: 270px;
        }

        .admin-search-wrapper i {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #94A3B8;
            font-size: 0.85rem;
            pointer-events: none;
        }

        .admin-search-input {
            width: 100%;
            padding: 0.55rem 2.4rem 0.55rem 2.4rem;
            font-size: 0.82rem;
            border-radius: var(--tta-radius);
            border: 1px solid var(--tta-border);
            background: #F8FAFC;
            color: var(--tta-text-main);
            font-weight: 600;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .admin-search-input:focus {
            outline: none;
            border-color: var(--tta-blue);
            background: #FFFFFF;
            box-shadow: 0 0 0 4px rgba(9, 125, 198, 0.12);
        }

        .search-kbd {
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            background: #E2E8F0;
            color: #64748B;
            font-size: 0.65rem;
            font-weight: 700;
            padding: 0.15rem 0.45rem;
            border-radius: 4px;
            pointer-events: none;
            border: 1px solid #CBD5E1;
        }

        .live-clock-badge {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            background: #FFFFFF;
            color: #334155;
            padding: 0.5rem 0.95rem;
            border-radius: var(--tta-radius);
            font-size: 0.78rem;
            font-weight: 700;
            border: 1px solid var(--tta-border);
            box-shadow: var(--tta-shadow-sm);
        }

        .live-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #10B981;
            box-shadow: 0 0 8px #10B981;
            animation: pulse-live 2s infinite;
        }

        @keyframes pulse-live {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
        }

        /* -------------------------------------------------------------
           PAGE TOOLBAR & ACTION HEADER
        ------------------------------------------------------------- */
        .page-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 1.35rem;
            flex-wrap: wrap;
        }

        .page-toolbar-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .count-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: #FFFFFF;
            color: #475569;
            padding: 0.4rem 0.85rem;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 700;
            border: 1px solid var(--tta-border);
            box-shadow: var(--tta-shadow-sm);
        }

        .count-pill span {
            color: var(--tta-blue);
            font-weight: 800;
        }

        /* -------------------------------------------------------------
           STAT CARDS & DASHBOARD METRICS
        ------------------------------------------------------------- */
        .stat-card {
            background: var(--tta-card-bg);
            border-radius: var(--tta-radius-lg);
            padding: 1.4rem 1.5rem;
            border: 1px solid var(--tta-border);
            box-shadow: var(--tta-shadow);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .stat-card:hover {
            transform: translateY(-3px);
            box-shadow: var(--tta-shadow-lg);
            border-color: #CBD5E1;
        }

        .stat-card .number {
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--tta-dark);
            line-height: 1.1;
            letter-spacing: -0.03em;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        .stat-card .label {
            font-size: 0.8rem;
            color: var(--tta-text-muted);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 0.35rem;
        }

        .stat-icon-box {
            width: 50px;
            height: 50px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            flex-shrink: 0;
        }

        .stat-card:hover .stat-icon-box {
            transform: scale(1.1) rotate(4deg);
        }

        .stat-card-footer {
            margin-top: 1rem;
            padding-top: 0.75rem;
            border-top: 1px dashed var(--tta-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.75rem;
            font-weight: 700;
            color: #64748B;
        }

        .stat-card-footer a {
            color: var(--tta-blue);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            transition: gap 0.2s;
        }

        .stat-card-footer a:hover {
            gap: 0.5rem;
            color: var(--tta-blue-dark);
        }

        /* -------------------------------------------------------------
           BUTTONS & ACTION CONTROLS
        ------------------------------------------------------------- */
        .btn-tta {
            background: linear-gradient(135deg, var(--tta-blue) 0%, var(--tta-blue-dark) 100%);
            color: #FFFFFF !important;
            border: none;
            font-weight: 700;
            border-radius: var(--tta-radius);
            padding: 0.62rem 1.35rem;
            font-size: 0.85rem;
            box-shadow: 0 4px 14px rgba(9, 125, 198, 0.28);
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            text-decoration: none;
        }

        .btn-tta:hover {
            background: linear-gradient(135deg, #0A8BDC 0%, var(--tta-blue) 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(9, 125, 198, 0.38);
        }

        .btn-lime {
            background: linear-gradient(135deg, var(--tta-lime) 0%, #b3dc33 100%);
            color: var(--tta-dark) !important;
            border: none;
            font-weight: 800;
            border-radius: var(--tta-radius);
            padding: 0.62rem 1.35rem;
            font-size: 0.85rem;
            box-shadow: 0 4px 14px rgba(199, 237, 86, 0.35);
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            text-decoration: none;
        }

        .btn-lime:hover {
            background: linear-gradient(135deg, #d3f36a 0%, var(--tta-lime) 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 22px rgba(199, 237, 86, 0.45);
        }

        .btn-soft-primary {
            background: rgba(9, 125, 198, 0.08);
            color: var(--tta-blue);
            border: 1px solid rgba(9, 125, 198, 0.18);
            font-weight: 700;
            border-radius: 0.65rem;
            padding: 0.4rem 0.85rem;
            font-size: 0.8rem;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .btn-soft-primary:hover {
            background: var(--tta-blue);
            color: #FFFFFF !important;
            border-color: var(--tta-blue);
            transform: translateY(-1px);
        }

        .btn-soft-danger {
            background: rgba(239, 68, 68, 0.08);
            color: #EF4444;
            border: 1px solid rgba(239, 68, 68, 0.18);
            font-weight: 700;
            border-radius: 0.65rem;
            padding: 0.4rem 0.85rem;
            font-size: 0.8rem;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }
        .btn-soft-danger:hover {
            background: #EF4444;
            color: #FFFFFF !important;
            border-color: #EF4444;
            transform: translateY(-1px);
        }

        .btn-action-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.82rem;
            transition: all 0.2s;
            border: 1px solid transparent;
            background: transparent;
            text-decoration: none;
        }

        .btn-action-icon.edit {
            background: rgba(9, 125, 198, 0.08);
            color: var(--tta-blue);
            border-color: rgba(9, 125, 198, 0.18);
        }
        .btn-action-icon.edit:hover {
            background: var(--tta-blue);
            color: #FFFFFF;
            transform: translateY(-1px);
        }

        .btn-action-icon.delete {
            background: rgba(239, 68, 68, 0.08);
            color: #EF4444;
            border-color: rgba(239, 68, 68, 0.18);
        }
        .btn-action-icon.delete:hover {
            background: #EF4444;
            color: #FFFFFF;
            transform: translateY(-1px);
        }

        .btn-action-icon.view {
            background: rgba(14, 165, 233, 0.08);
            color: #0284C7;
            border-color: rgba(14, 165, 233, 0.18);
        }
        .btn-action-icon.view:hover {
            background: #0284C7;
            color: #FFFFFF;
            transform: translateY(-1px);
        }

        /* -------------------------------------------------------------
           STATUS TOGGLE BADGES (ACTIVE/INACTIVE ON WEBSITE)
        ------------------------------------------------------------- */
        .status-toggle-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.35rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 700;
            border-radius: 9999px;
            border: 1px solid transparent;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            line-height: 1;
        }

        .status-toggle-badge.active {
            background: rgba(16, 185, 129, 0.1);
            color: #059669;
            border-color: rgba(16, 185, 129, 0.25);
        }
        .status-toggle-badge.active:hover {
            background: rgba(16, 185, 129, 0.18);
            border-color: #059669;
            transform: scale(1.03);
        }
        .status-toggle-badge.active .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #10B981;
            box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
        }

        .status-toggle-badge.inactive {
            background: rgba(148, 163, 184, 0.12);
            color: #64748B;
            border-color: rgba(148, 163, 184, 0.28);
        }
        .status-toggle-badge.inactive:hover {
            background: rgba(148, 163, 184, 0.22);
            border-color: #64748B;
            transform: scale(1.03);
        }
        .status-toggle-badge.inactive .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #94A3B8;
        }

        /* -------------------------------------------------------------
           CARDS & TABLES
        ------------------------------------------------------------- */
        .card {
            border: 1px solid var(--tta-border) !important;
            border-radius: var(--tta-radius-lg) !important;
            box-shadow: var(--tta-shadow) !important;
            background: var(--tta-card-bg);
            overflow: hidden;
        }

        .card-header {
            background: #FFFFFF !important;
            border-bottom: 1px solid var(--tta-border) !important;
            padding: 1.25rem 1.6rem !important;
        }

        .table-responsive {
            border-radius: var(--tta-radius-lg);
        }

        .table {
            margin-bottom: 0;
            vertical-align: middle;
            border-collapse: separate;
            border-spacing: 0;
        }

        .table thead th {
            background: #F8FAFC;
            color: #475569;
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            padding: 1rem 1.35rem;
            border-bottom: 1px solid var(--tta-border);
            white-space: nowrap;
        }

        .table tbody td {
            padding: 1rem 1.35rem;
            color: var(--tta-text-main);
            font-size: 0.88rem;
            border-bottom: 1px solid #F1F5F9;
            transition: background 0.15s ease-in-out;
        }

        .table tbody tr:hover td {
            background: #F8FAFC;
        }

        .table tbody tr:last-child td {
            border-bottom: none;
        }

        /* Table Item Thumbnails */
        .table-thumb {
            width: 52px;
            height: 40px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid var(--tta-border);
            box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
            background: #F1F5F9;
            display: inline-block;
        }

        .table-avatar {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 50%;
            border: 1.5px solid var(--tta-border);
            box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
            background: #E2E8F0;
            display: inline-block;
        }

        /* -------------------------------------------------------------
           BADGES & CHIPS
        ------------------------------------------------------------- */
        .badge {
            border-radius: 9999px;
            padding: 0.4em 0.85em;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.4px;
        }

        .badge-soft-primary {
            background: rgba(9, 125, 198, 0.1);
            color: var(--tta-blue);
            border: 1px solid rgba(9, 125, 198, 0.2);
        }

        .badge-soft-success {
            background: rgba(16, 185, 129, 0.1);
            color: #059669;
            border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .badge-soft-warning {
            background: rgba(245, 158, 11, 0.1);
            color: #D97706;
            border: 1px solid rgba(245, 158, 11, 0.25);
        }

        .badge-soft-danger {
            background: rgba(239, 68, 68, 0.1);
            color: #DC2626;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .badge-soft-info {
            background: rgba(14, 165, 233, 0.1);
            color: #0284C7;
            border: 1px solid rgba(14, 165, 233, 0.2);
        }

        .badge-soft-secondary {
            background: #F1F5F9;
            color: #475569;
            border: 1px solid #E2E8F0;
        }

        .badge-lime {
            background: rgba(199, 237, 86, 0.25);
            color: #4D6B00;
            border: 1px solid rgba(199, 237, 86, 0.5);
            font-weight: 800;
        }

        /* -------------------------------------------------------------
           MODALS & FORMS
        ------------------------------------------------------------- */
        .modal-content {
            border-radius: var(--tta-radius-xl);
            border: 1px solid var(--tta-border);
            box-shadow: var(--tta-shadow-lg);
            overflow: hidden;
        }

        .modal-header {
            background: #F8FAFC;
            border-bottom: 1px solid var(--tta-border);
            padding: 1.35rem 1.75rem;
        }

        .modal-title-wrap {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .modal-icon-badge {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(9, 125, 198, 0.1);
            color: var(--tta-blue);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
        }

        .modal-body {
            padding: 1.75rem;
        }

        .modal-footer {
            background: #F8FAFC;
            border-top: 1px solid var(--tta-border);
            padding: 1.1rem 1.75rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.75rem;
        }

        .form-control, .form-select {
            border-radius: var(--tta-radius);
            border: 1px solid var(--tta-border);
            padding: 0.65rem 1rem;
            font-size: 0.88rem;
            font-weight: 600;
            color: #1E293B;
            background-color: #FFFFFF;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .form-control:focus, .form-select:focus {
            border-color: var(--tta-blue);
            background-color: #FFFFFF;
            box-shadow: 0 0 0 4px rgba(9, 125, 198, 0.12);
        }

        .form-label {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #475569;
            margin-bottom: 0.45rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .form-label .req {
            color: #EF4444;
            font-weight: 800;
        }

        .image-preview-box {
            width: 100%;
            height: 120px;
            border-radius: var(--tta-radius);
            border: 2px dashed #CBD5E1;
            background: #F8FAFC;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            margin-top: 0.5rem;
            position: relative;
        }

        .image-preview-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* -------------------------------------------------------------
           EMPTY STATES
        ------------------------------------------------------------- */
        .empty-state-box {
            padding: 3.5rem 1.5rem;
            text-align: center;
        }

        .empty-state-icon {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: #F1F5F9;
            color: #94A3B8;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 1.75rem;
            margin-bottom: 1rem;
        }

        .empty-state-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: var(--tta-dark);
            margin-bottom: 0.35rem;
        }

        .empty-state-desc {
            font-size: 0.85rem;
            color: var(--tta-text-muted);
            max-width: 360px;
            margin: 0 auto 1.25rem;
        }

        /* -------------------------------------------------------------
           ALERTS
        ------------------------------------------------------------- */
        .alert {
            border-radius: var(--tta-radius);
            border-width: 1px;
            font-size: 0.85rem;
            font-weight: 600;
            padding: 0.85rem 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.65rem;
            box-shadow: var(--tta-shadow-sm);
        }

        .alert-success {
            background: #ECFDF5;
            border-color: #A7F3D0;
            color: #065F46;
        }

        .alert-danger {
            background: #FEF2F2;
            border-color: #FECACA;
            color: #991B1B;
        }

        /* -------------------------------------------------------------
           RESPONSIVE LAYOUT
        ------------------------------------------------------------- */
        @media (max-width: 991.98px) {
            .sidebar {
                transform: translateX(-100%);
            }
            .sidebar.show {
                transform: translateX(0);
                box-shadow: 0 0 50px rgba(0, 0, 0, 0.6);
            }
            .main-content {
                margin-left: 0;
                padding: 1.25rem 1rem 2rem;
            }
            .top-bar-container {
                padding: 0.85rem 1rem;
                top: 0.5rem;
            }
            .admin-search-wrapper {
                display: none;
            }
        }
    </style>
</head>
<body>
    <!-- Sidebar Navigation -->
    <nav class="sidebar" id="sidebar">
        <div class="brand">
            <a href="index.php" class="brand-logo-wrap">
                <div class="brand-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="brand-text">
                    <div class="brand-title"><span>TTA</span> Admin</div>
                    <div class="brand-subtitle">Tennis Portal</div>
                </div>
            </a>
            <span class="version-badge">v2.2</span>
        </div>

        <div class="sidebar-nav">
            <div class="section-label">Overview</div>
            <a class="nav-link <?= ($currentPage ?? '') === 'dashboard' ? 'active' : '' ?>" href="index.php">
                <div class="nav-link-content">
                    <i class="fas fa-chart-pie"></i> <span>Dashboard</span>
                </div>
            </a>

            <div class="divider"></div>
            <div class="section-label">Content Management</div>
            <a class="nav-link <?= ($currentPage ?? '') === 'tournaments' ? 'active' : '' ?>" href="tournaments.php">
                <div class="nav-link-content">
                    <i class="fas fa-trophy"></i> <span>Tournaments</span>
                </div>
            </a>
            <a class="nav-link <?= ($currentPage ?? '') === 'news' ? 'active' : '' ?>" href="news.php">
                <div class="nav-link-content">
                    <i class="fas fa-newspaper"></i> <span>News & Media</span>
                </div>
            </a>
            <a class="nav-link <?= ($currentPage ?? '') === 'clubs' ? 'active' : '' ?>" href="clubs.php">
                <div class="nav-link-content">
                    <i class="fas fa-building"></i> <span>Affiliated Clubs</span>
                </div>
            </a>
            <a class="nav-link <?= ($currentPage ?? '') === 'programs' ? 'active' : '' ?>" href="programs.php">
                <div class="nav-link-content">
                    <i class="fas fa-graduation-cap"></i> <span>Programs</span>
                </div>
            </a>
            <a class="nav-link <?= ($currentPage ?? '') === 'teams' ? 'active' : '' ?>" href="teams.php">
                <div class="nav-link-content">
                    <i class="fas fa-users"></i> <span>National Teams</span>
                </div>
            </a>
            <a class="nav-link <?= ($currentPage ?? '') === 'gallery' ? 'active' : '' ?>" href="gallery.php">
                <div class="nav-link-content">
                    <i class="fas fa-photo-film"></i> <span>Photo & Video Gallery</span>
                </div>
            </a>
            <a class="nav-link <?= ($currentPage ?? '') === 'leadership' ? 'active' : '' ?>" href="leadership.php">
                <div class="nav-link-content">
                    <i class="fas fa-user-tie"></i> <span>Executive Leadership</span>
                </div>
            </a>

            <div class="divider"></div>
            <div class="section-label">Inquiries & Submissions</div>
            <a class="nav-link <?= ($currentPage ?? '') === 'messages' ? 'active' : '' ?>" href="messages.php">
                <div class="nav-link-content">
                    <i class="fas fa-envelope-open-text"></i> <span>Contact Messages</span>
                </div>
                <?php if ($sidebarUnreadMsgs > 0): ?>
                    <span class="badge bg-danger shadow-sm"><?= $sidebarUnreadMsgs ?></span>
                <?php endif; ?>
            </a>
            <a class="nav-link <?= ($currentPage ?? '') === 'applications.php' || ($currentPage ?? '') === 'applications' ? 'active' : '' ?>" href="applications.php">
                <div class="nav-link-content">
                    <i class="fas fa-file-signature"></i> <span>Club Applications</span>
                </div>
                <?php if ($sidebarPendingApps > 0): ?>
                    <span class="badge bg-warning text-dark shadow-sm"><?= $sidebarPendingApps ?></span>
                <?php endif; ?>
            </a>
            <a class="nav-link <?= ($currentPage ?? '') === 'bookings' ? 'active' : '' ?>" href="bookings.php">
                <div class="nav-link-content">
                    <i class="fas fa-calendar-check"></i> <span>Meeting Bookings</span>
                </div>
                <?php if ($sidebarPendingBookings > 0): ?>
                    <span class="badge bg-info text-dark shadow-sm"><?= $sidebarPendingBookings ?></span>
                <?php endif; ?>
            </a>
        </div>

        <div class="sidebar-footer">
            <a href="../index.html" target="_blank" class="view-site-link">
                <i class="fas fa-external-link-alt"></i> <span>View Public Website</span>
            </a>
            <div class="sidebar-user-card">
                <div class="user-avatar-box">
                    <div class="avatar-circle">
                        <?= strtoupper(substr($_SESSION['admin_name'] ?? 'A', 0, 1)) ?>
                    </div>
                    <div class="user-info-text">
                        <div class="user-name"><?= htmlspecialchars($_SESSION['admin_name'] ?? 'Administrator') ?></div>
                        <div class="user-role">Super Admin</div>
                    </div>
                </div>
                <a href="logout.php" class="text-danger p-2 text-decoration-none" title="Log out of Admin Portal">
                    <i class="fas fa-arrow-right-from-bracket"></i>
                </a>
            </div>
        </div>
    </nav>

    <!-- Mobile Sidebar Backdrop Overlay -->
    <div id="sidebarBackdrop" class="position-fixed inset-0 bg-dark opacity-50 d-none" style="z-index: 1040; top:0; left:0; width:100%; height:100%;" onclick="document.getElementById('sidebar').classList.remove('show'); this.classList.add('d-none');"></div>

    <!-- Main Content Area -->
    <div class="main-content">
        <!-- Top Sticky Header -->
        <div class="top-bar-container">
            <div class="d-flex align-items-center gap-3">
                <button class="btn btn-light d-lg-none border shadow-sm rounded-3 p-2 px-3" onclick="document.getElementById('sidebar').classList.toggle('show'); document.getElementById('sidebarBackdrop').classList.toggle('d-none');">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="top-bar-title-group">
                    <h1>
                        <span class="title-icon">
                            <?php
                            $pageIcons = [
                                'dashboard' => 'fa-chart-pie',
                                'tournaments' => 'fa-trophy',
                                'news' => 'fa-newspaper',
                                'clubs' => 'fa-building',
                                'programs' => 'fa-graduation-cap',
                                'teams' => 'fa-users',
                                'gallery' => 'fa-photo-film',
                                'leadership' => 'fa-user-tie',
                                'messages' => 'fa-envelope-open-text',
                                'applications' => 'fa-file-signature',
                                'bookings' => 'fa-calendar-check',
                            ];
                            $currentIcon = $pageIcons[$currentPage ?? ''] ?? 'fa-th-large';
                            ?>
                            <i class="fas <?= $currentIcon ?>"></i>
                        </span>
                        <?= htmlspecialchars($pageTitle ?? 'Dashboard') ?>
                    </h1>
                    <div class="top-bar-breadcrumb">
                        <span>TTA Portal</span>
                        <i class="fas fa-chevron-right fs-xs text-muted"></i>
                        <span><?= htmlspecialchars($pageTitle ?? 'Overview') ?></span>
                    </div>
                </div>
            </div>

            <div class="top-bar-actions">
                <div class="admin-search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" id="adminGlobalSearch" placeholder="Filter rows in view..." class="admin-search-input" />
                    <kbd class="search-kbd">Ctrl+K</kbd>
                </div>

                <div class="live-clock-badge">
                    <span class="live-dot"></span>
                    <span id="adminLiveClock">--:--</span>
                </div>
            </div>
        </div>

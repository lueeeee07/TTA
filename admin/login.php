<?php
session_start();
if (isset($_SESSION['admin_id'])) { header('Location: index.php'); exit; }

require_once __DIR__ . '/../api/config/database.php';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email && $password) {
        try {
            $db = (new Database())->getConnection();
            $stmt = $db->prepare('SELECT * FROM admin_users WHERE email = :email');
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['admin_id'] = $user['id'];
                $_SESSION['admin_email'] = $user['email'];
                $_SESSION['admin_name'] = $user['name'];
                header('Location: index.php');
                exit;
            } else {
                $error = 'Invalid email or password.';
            }
        } catch (Exception $e) {
            $error = 'A server error occurred. Please try again.';
        }
    } else {
        $error = 'Please enter both email and password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In — Tanzania Tennis Association</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --tta-blue: #097DC6;
            --tta-blue-dark: #075985;
            --tta-lime: #C7ED56;
            --tta-lime-dark: #A3D129;
            --tta-dark: #0B1120;
        }

        * {
            box-sizing: border-box;
        }

        body {
            background: #080D1A;
            background: radial-gradient(circle at 50% 15%, #152238 0%, #0B1120 50%, #050811 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
            color: #F8FAFC;
        }

        /* Ambient Glow Spheres */
        body::before {
            content: '';
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(9, 125, 198, 0.22) 0%, rgba(0,0,0,0) 70%);
            top: -120px;
            left: 12%;
            pointer-events: none;
        }

        body::after {
            content: '';
            position: absolute;
            width: 450px;
            height: 450px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(199, 237, 86, 0.15) 0%, rgba(0,0,0,0) 70%);
            bottom: -120px;
            right: 12%;
            pointer-events: none;
        }

        .login-card {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 1.75rem;
            padding: 3.25rem 2.75rem;
            width: 100%;
            max-width: 440px;
            box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.12);
            position: relative;
            z-index: 10;
            backdrop-filter: blur(20px);
            color: #1E293B;
        }

        .login-card .brand {
            text-align: center;
            margin-bottom: 2.25rem;
        }

        .brand-logo-icon {
            width: 60px;
            height: 60px;
            border-radius: 18px;
            background: linear-gradient(135deg, #0B1120, #1E293B);
            color: var(--tta-lime);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 1.7rem;
            margin-bottom: 1rem;
            box-shadow: 0 10px 25px rgba(11, 17, 32, 0.35);
            border: 1.5px solid rgba(199, 237, 86, 0.35);
        }

        .login-card .brand h1 {
            font-size: 1.8rem;
            font-weight: 800;
            color: #0B1120;
            margin: 0;
            letter-spacing: -0.5px;
        }

        .login-card .brand h1 span {
            color: var(--tta-blue);
        }

        .login-card .brand p {
            color: #64748B;
            font-size: 0.84rem;
            font-weight: 600;
            margin-top: 0.35rem;
        }

        .form-label {
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #475569;
            margin-bottom: 0.45rem;
        }

        .input-group {
            border-radius: 0.85rem;
            overflow: hidden;
            border: 1px solid #E2E8F0;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            background: #F8FAFC;
        }

        .input-group:focus-within {
            border-color: var(--tta-blue);
            background: #FFFFFF;
            box-shadow: 0 0 0 4px rgba(9, 125, 198, 0.12);
        }

        .input-group-text {
            background: transparent;
            border: none;
            color: #94A3B8;
            padding-left: 1.1rem;
            padding-right: 0.5rem;
        }

        .form-control {
            border: none;
            padding: 0.8rem 1rem 0.8rem 0.5rem;
            font-size: 0.92rem;
            font-weight: 600;
            color: #0B1120;
            background: transparent;
        }

        .form-control:focus {
            background: transparent;
            box-shadow: none;
            border: none;
        }

        .btn-toggle-pwd {
            background: transparent;
            border: none;
            color: #94A3B8;
            padding-right: 1.1rem;
            padding-left: 0.5rem;
            cursor: pointer;
            transition: color 0.2s;
        }

        .btn-toggle-pwd:hover {
            color: var(--tta-blue);
        }

        .btn-login {
            background: linear-gradient(135deg, var(--tta-lime) 0%, #b3dc33 100%);
            color: #0B1120;
            font-weight: 800;
            border: none;
            padding: 0.85rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 0.85rem;
            width: 100%;
            box-shadow: 0 8px 20px rgba(199, 237, 86, 0.35);
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
            margin-top: 1.5rem;
        }

        .btn-login:hover {
            background: linear-gradient(135deg, #d3f36a 0%, var(--tta-lime) 100%);
            color: #0B1120;
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(199, 237, 86, 0.45);
        }

        .alert-danger {
            background: #FEF2F2;
            border: 1px solid #FECACA;
            color: #991B1B;
            border-radius: 0.75rem;
            font-size: 0.84rem;
            font-weight: 600;
            padding: 0.75rem 1rem;
        }

        .back-link {
            text-align: center;
            margin-top: 1.5rem;
        }

        .back-link a {
            color: #64748B;
            font-size: 0.82rem;
            font-weight: 700;
            text-decoration: none;
            transition: color 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }

        .back-link a:hover {
            color: var(--tta-blue);
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="brand">
            <div class="brand-logo-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <h1><span>TTA</span> Admin</h1>
            <p>Tanzania Tennis Association Portal</p>
        </div>

        <?php if ($error): ?>
            <div class="alert alert-danger mb-4 d-flex align-items-center gap-2">
                <i class="fas fa-exclamation-circle fs-6 text-danger"></i>
                <div><?= htmlspecialchars($error) ?></div>
            </div>
        <?php endif; ?>

        <form method="POST">
            <div class="mb-3.5">
                <label class="form-label">Email Address</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                    <input type="email" name="email" class="form-control" placeholder="admin@tta.or.tz" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" required autofocus>
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label">Password</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                    <input type="password" id="passwordInput" name="password" class="form-control" placeholder="••••••••" required>
                    <button type="button" class="btn-toggle-pwd" onclick="togglePasswordVisibility()" title="Toggle visibility">
                        <i class="fas fa-eye" id="toggleEyeIcon"></i>
                    </button>
                </div>
            </div>

            <button type="submit" class="btn btn-login">
                <span>Sign In to Dashboard</span>
                <i class="fas fa-arrow-right"></i>
            </button>
        </form>

        <div class="back-link">
            <a href="../index.html">
                <i class="fas fa-arrow-left"></i> Return to Public Website
            </a>
        </div>
    </div>

    <script>
        function togglePasswordVisibility() {
            const input = document.getElementById('passwordInput');
            const icon = document.getElementById('toggleEyeIcon');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    </script>
</body>
</html>

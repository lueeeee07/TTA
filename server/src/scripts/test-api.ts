import http from 'http';
import app from '../server.js';

const PORT = 5099;
const BASE_URL = `http://127.0.0.1:${PORT}`;

interface TestResult {
  endpoint: string;
  status: number;
  passed: boolean;
  message?: string;
}

const results: TestResult[] = [];

async function testEndpoint(
  name: string,
  path: string,
  options: { method?: string; headers?: Record<string, string>; body?: string } = {}
) {
  const method = options.method || 'GET';
  const url = `${BASE_URL}${path}`;

  return new Promise<void>((resolve) => {
    const req = http.request(
      url,
      {
        method,
        headers: options.headers || {},
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          const ok = (res.statusCode || 0) < 400;
          results.push({
            endpoint: `[${method}] ${path}`,
            status: res.statusCode || 0,
            passed: ok,
            message: ok ? 'OK' : `Failed with status ${res.statusCode}: ${data.substring(0, 100)}`,
          });
          resolve();
        });
      }
    );

    req.on('error', (err) => {
      results.push({
        endpoint: `[${method}] ${path}`,
        status: 0,
        passed: false,
        message: err.message,
      });
      resolve();
    });

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting API & Admin Regression Test Suite...\n');

  const server = app.listen(PORT, async () => {
    try {
      // 1. Health
      await testEndpoint('Health Check', '/health');

      // 2. All 12 Content Endpoints (Clean Paths)
      await testEndpoint('Stats', '/api/stats');
      await testEndpoint('Values', '/api/values');
      await testEndpoint('Objectives', '/api/objectives');
      await testEndpoint('Leadership', '/api/leadership');
      await testEndpoint('Partners', '/api/partners');
      await testEndpoint('Regions', '/api/regions');
      await testEndpoint('Clubs', '/api/clubs');
      await testEndpoint('Clubs Filtered', '/api/clubs?region=Dar%20es%20Salaam');
      await testEndpoint('Programs', '/api/programs');
      await testEndpoint('Tournaments', '/api/tournaments');
      await testEndpoint('National Teams', '/api/national_teams');
      await testEndpoint('News', '/api/news');
      await testEndpoint('News Single', '/api/news?slug=news-1');
      await testEndpoint('Gallery', '/api/gallery');

      // 3. Legacy PHP Paths (Exact Backward Compatibility)
      await testEndpoint('Legacy Stats PHP', '/TTA/api/endpoints/stats.php');
      await testEndpoint('Legacy Clubs PHP', '/TTA/api/endpoints/clubs.php?region=Dar%20es%20Salaam');
      await testEndpoint('Legacy News PHP', '/TTA/api/endpoints/news.php');
      await testEndpoint('Legacy Tournaments PHP', '/TTA/api/endpoints/tournaments.php');

      // 4. Form Submissions
      await testEndpoint('Contact Form Submission', '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Automated Test User',
          email: 'test@example.com',
          phone: '+255 700 000 000',
          topic: 'Automated Test',
          message: 'Regression test contact message verification.',
        }),
      });

      await testEndpoint('Legacy Contact PHP', '/TTA/api/endpoints/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Legacy Test User',
          email: 'legacy@example.com',
          phone: '+255 700 111 222',
          topic: 'Legacy PHP Test',
          message: 'Testing backward compatibility for PHP contact submission.',
        }),
      });

      await testEndpoint('Join Club Submission', '/api/join_club', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region: 'Dar es Salaam',
          club_name: 'Dar es Salaam Gymkhana Club',
          applicant_name: 'Test Player',
          email: 'player@example.com',
          phone: '+255 712 000 000',
          category: 'Junior (U6 - U18)',
        }),
      });

      await testEndpoint('Book Meeting Submission', '/api/book_meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meeting_type: 'Club Affiliation & Membership',
          officer: 'Secretary General - Emmanuel Tarimo',
          preferred_date: '2026-09-01',
          time_slot: '10:00 AM - 11:00 AM',
          name: 'Chairman Juma',
          email: 'juma@example.com',
        }),
      });

      // 5. Auth / Session Check
      await testEndpoint('Check Session (logged out)', '/api/check_session');
      await testEndpoint('Admin Login Page', '/admin/login');

      // Summary Report
      console.log('='.repeat(70));
      console.log('TEST EXECUTION REPORT:');
      console.log('='.repeat(70));

      let allPassed = true;
      for (const res of results) {
        const icon = res.passed ? '✅' : '❌';
        console.log(`${icon} ${res.endpoint} -> Status ${res.status} (${res.message})`);
        if (!res.passed) allPassed = false;
      }

      console.log('='.repeat(70));
      if (allPassed) {
        console.log(`🎉 ALL ${results.length} ENDPOINT TESTS PASSED!`);
      } else {
        console.error('❌ SOME TESTS FAILED.');
      }
    } finally {
      server.close();
      process.exit(0);
    }
  });
}

runTests();

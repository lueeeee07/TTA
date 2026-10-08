    </div><!-- end main-content -->

    <!-- Bootstrap Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Admin Portal Interactive Enhancements -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // 1. Live Digital Clock with formatted time & date
            function updateClock() {
                const clockEl = document.getElementById('adminLiveClock');
                if (!clockEl) return;
                const now = new Date();
                clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            }
            updateClock();
            setInterval(updateClock, 1000);

            // 2. Global Table Filtering with "No matching records" feedback
            const searchInput = document.getElementById('adminGlobalSearch');
            if (searchInput) {
                searchInput.addEventListener('input', function(e) {
                    const query = e.target.value.toLowerCase().trim();
                    const tables = document.querySelectorAll('.table');
                    
                    tables.forEach(table => {
                        const rows = table.querySelectorAll('tbody tr');
                        let matchCount = 0;
                        let noMatchRow = table.querySelector('.no-match-row');
                        
                        rows.forEach(row => {
                            if (row.classList.contains('no-match-row') || (row.cells.length === 1 && row.cells[0].hasAttribute('colspan') && !row.dataset.filterable)) {
                                return;
                            }
                            
                            const text = row.textContent.toLowerCase();
                            if (!query || text.includes(query)) {
                                row.style.display = '';
                                matchCount++;
                            } else {
                                row.style.display = 'none';
                            }
                        });

                        // Show or create temporary no-matches row if everything filtered out
                        if (matchCount === 0 && query !== '') {
                            if (!noMatchRow) {
                                const colCount = table.querySelectorAll('thead th').length || 6;
                                noMatchRow = document.createElement('tr');
                                noMatchRow.className = 'no-match-row';
                                noMatchRow.innerHTML = `<td colspan="${colCount}" class="text-center py-5 text-muted">
                                    <div class="d-inline-flex flex-column align-items-center">
                                        <div class="p-3 bg-light rounded-circle mb-2"><i class="fas fa-search fs-4 text-secondary"></i></div>
                                        <div class="fw-bold text-dark">No matching records found</div>
                                        <small class="text-muted">Try adjusting your search keywords</small>
                                    </div>
                                </td>`;
                                table.querySelector('tbody').appendChild(noMatchRow);
                            } else {
                                noMatchRow.style.display = '';
                            }
                        } else if (noMatchRow) {
                            noMatchRow.style.display = 'none';
                        }
                    });
                });

                // Hotkey Ctrl+K / Cmd+K or "/" to focus search
                document.addEventListener('keydown', function(e) {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                        e.preventDefault();
                        searchInput.focus();
                    }
                });
            }

            // 3. Stat Card Numbers Count-Up Animation
            const numberElements = document.querySelectorAll('.stat-card .number');
            numberElements.forEach(el => {
                const textVal = el.textContent.trim();
                const targetNum = parseInt(textVal, 10);
                if (!isNaN(targetNum) && targetNum > 0) {
                    let count = 0;
                    const duration = 650;
                    const stepTime = Math.max(Math.floor(duration / targetNum), 15);
                    const timer = setInterval(() => {
                        count += Math.ceil(targetNum / 20);
                        if (count >= targetNum) {
                            count = targetNum;
                            clearInterval(timer);
                        }
                        el.textContent = count;
                    }, stepTime);
                }
            });

            // 4. Auto Fade Dismissible Alerts after 6 seconds
            const alerts = document.querySelectorAll('.alert-dismissible');
            alerts.forEach(alert => {
                setTimeout(() => {
                    if (window.bootstrap && bootstrap.Alert) {
                        const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
                        if (bsAlert) bsAlert.close();
                    }
                }, 6000);
            });

            // 5. Dynamic Modal Image Preview Binder
            document.querySelectorAll('input[name="image"], input[name="avatar"]').forEach(input => {
                input.addEventListener('input', function() {
                    const val = this.value.trim();
                    let preview = this.parentElement.querySelector('.live-preview-img');
                    if (!preview) {
                        preview = document.createElement('img');
                        preview.className = 'live-preview-img mt-2 rounded border shadow-sm';
                        preview.style.maxHeight = '90px';
                        preview.style.display = 'none';
                        this.parentElement.appendChild(preview);
                    }
                    if (val && (val.startsWith('http') || val.startsWith('/') || val.startsWith('.'))) {
                        preview.src = val;
                        preview.style.display = 'block';
                    } else {
                        preview.style.display = 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>

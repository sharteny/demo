let currentMode = 'code';

function setMode(mode) {
    currentMode = mode;
    
    document.getElementById('btnCode').classList.toggle('active', mode === 'code');
    document.getElementById('btnWeb').classList.toggle('active', mode === 'web');
    document.getElementById('btnPentest').classList.toggle('active', mode === 'pentest');

    const input = document.getElementById('targetInput');
    const label = document.getElementById('inputLabel');

    switch (mode) {
        case 'code':
            label.innerText = "Target GitHub Repository URL:";
            input.value = "https://github.com/company/payment-gateway";
            break;
        case 'web':
            label.innerText = "Target Website / Web App URL (OWASP Scan):";
            input.value = "https://app.target-company.com";
            break;
        case 'pentest':
            label.innerText = "[PRO] Target Endpoint for Attack Simulation:";
            input.value = "https://api.target-company.com";
            break;
    }
}

function startScanning() {
    const terminal = document.getElementById('terminal');
    const resultCard = document.getElementById('resultCard');
    
    terminal.style.display = 'block';
    terminal.innerHTML = '';
    resultCard.style.display = 'none';

    let logs = [];

    if (currentMode === 'code') {
        logs = [
            "[00:01] Fetching repository source code...",
            "[00:02] Analyzing code structure and data flows...",
            "[00:04] Initializing security ruleset engine...",
            "[00:07] Validating potential vulnerability with test payload...",
            "[00:10] 🚨 EXPLOIT CONFIRMED (Verified PoC).",
            "[00:12] AI Engine generating secure code patch...",
            "[00:15] Security audit completed!"
        ];
    } else if (currentMode === 'web') {
        logs = [
            "[00:01] Connecting to target web application...",
            "[00:04] Checking OWASP Top 10 vulnerabilities...",
            "[00:08] 🚨 OWASP A03 (Reflected XSS) detected on search endpoint!",
            "[00:12] Generating Content-Security-Policy rules...",
            "[00:15] Web vulnerability scan completed!"
        ];
    } else if (currentMode === 'pentest') {
        logs = [
            "[00:01] [PRO MODULE] Launching Attack Simulation...",
            "[00:03] Discovery and service endpoint enumeration...",
            "[00:07] Simulating unauthorized API access attempt...",
            "[00:10] 🚨 EXPLOIT SUCCESSFUL: Unauthorized access confirmed!",
            "[00:13] Capturing payload evidence...",
            "[00:15] Attack simulation completed!"
        ];
    }

    let index = 0;
    const interval = setInterval(() => {
        if (index < logs.length) {
            terminal.innerHTML += logs[index] + "<br>";
            terminal.scrollTop = terminal.scrollHeight;
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => { showResults(); }, 400);
        }
    }, 600);
}

function showResults() {
    const resultCard = document.getElementById('resultCard');
    const vulnTitle = document.getElementById('vulnTitle');
    const targetArtifact = document.getElementById('targetArtifact');
    const pocBox = document.getElementById('pocBox');
    const diffBox = document.getElementById('diffBox');

    if (currentMode === 'code') {
        vulnTitle.innerText = "SQL Injection in Auth Controller";
        targetArtifact.innerText = "src/api/authController.js";
        pocBox.innerHTML = `[PAYLOAD] POST /api/v1/auth/login<br>Data: {"username": "admin' OR 1=1--", "password": "x"}<br>[RESULT] HTTP 200 OK — Admin access bypass successful.`;
        diffBox.innerHTML = `<span class="diff-del">- const query = "SELECT * FROM users WHERE email = '" + req.body.email + "'";</span>\n<span class="diff-add">+ const query = "SELECT * FROM users WHERE email = $1";</span>\n<span class="diff-add">+ const result = await db.query(query, [req.body.email]);</span>`;
    } else if (currentMode === 'pentest') {
        vulnTitle.innerText = "PRO: BOLA / IDOR Access Control Bypass";
        targetArtifact.innerText = "https://api.target-company.com/v1/users/1092/billing";
        pocBox.innerHTML = `[ATTACK SEQUENCE] Authenticated as User #5001<br>GET /api/v1/users/1092/billing<br>[RESULT] HTTP 200 OK — Data returned for unauthorized user.`;
        diffBox.innerHTML = `<span class="diff-add">+ Add access control check: ensure req.user.id matches target object owner ID.</span>`;
    } else {
        vulnTitle.innerText = "OWASP A03: Cross-Site Scripting (XSS)";
        targetArtifact.innerText = "https://app.target-company.com/search?q=";
        pocBox.innerHTML = `[EXPLOIT] GET /search?q=<script>alert(1)</script><br>[RESULT] Unsanitized script executed in DOM.`;
        diffBox.innerHTML = `<span class="diff-add">+ Apply CSP Header: default-src 'self'; script-src 'self';</span>`;
    }

    resultCard.style.display = 'block';
}

function requestExpert() {
    alert("Request sent! A Security Engineer will contact you within 15 minutes ($50/hr).");
}

// REAL PDF GENERATION FUNCTION
function generatePDFReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const title = document.getElementById('vulnTitle').innerText;
    const target = document.getElementById('targetArtifact').innerText;

    // Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(22);
    doc.text("CyberGuard AI — Security Audit Report", 14, 25);

    // Metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Audit Date:", 14, 55);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleString(), 50, 55);

    doc.setFont("helvetica", "bold");
    doc.text("Target System:", 14, 65);
    doc.setFont("helvetica", "normal");
    doc.text(target, 50, 65);

    doc.setFont("helvetica", "bold");
    doc.text("Status:", 14, 75);
    doc.setTextColor(220, 38, 38);
    doc.text("CRITICAL VULNERABILITY CONFIRMED", 50, 75);

    // Finding Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Vulnerability Overview:", 14, 95);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Finding: ${title}`, 14, 105);
    doc.text("Methodology: Automated Attack Simulation & Verification Engine.", 14, 113);

    // Proof of Concept Box
    doc.setFillColor(241, 245, 249);
    doc.rect(14, 125, 180, 35, 'F');
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("Proof of Concept (Validated Payload):", 18, 133);
    doc.text("POST /api/v1/auth/login HTTP/1.1", 18, 141);
    doc.text("Payload: {'username': 'admin\' OR 1=1--', 'password': 'x'}", 18, 149);

    // Recommendation
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("AI Auto-Remediation Recommendation:", 14, 175);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("1. Replace raw SQL queries with parameterized queries.", 14, 185);
    doc.text("2. Apply strict input sanitization on authorization controllers.", 14, 193);
    doc.text("3. Re-run CyberGuard AI Pipeline to verify fix.", 14, 201);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("Generated automatically by CyberGuard AI Platform. Confidential.", 14, 280);

    // Download File
    doc.save(`CyberGuard_Audit_Report_${Date.now()}.pdf`);
}
/**
 * zWSL Manager Portal Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("zWSL Portal Initialized");
    setupCopyAction();
    animateTerminal();
});

function setupCopyAction() {
    const installBtn = document.getElementById('installBtn');
    if (!installBtn) return;

    const originalHTML = installBtn.innerHTML;
    const command = "iwr -useb 'https://raw.githubusercontent.com/AsheshDev/zWSL-Manager/main/install.ps1' | iex";

    installBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(command);
            
            installBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Command Copied!';
            installBtn.style.background = '#059669';
            installBtn.style.boxShadow = '0 0 30px rgba(5, 150, 105, 0.5)';

            setTimeout(() => {
                installBtn.innerHTML = originalHTML;
                installBtn.style.background = '';
                installBtn.style.boxShadow = '';
            }, 3000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    });
}

function animateTerminal() {
    const lines = [
        "Initializing zWSL Manager...",
        "Checking Windows Build: 19041+ [OK]",
        "Checking Kernel: WSL2 [READY]",
        "Fetching remote installer...",
        "> Ready for deployment."
    ];
    
    const container = document.getElementById('terminalContent');
    if (!container) return;

    let index = 0;
    function addLine() {
        if (index < lines.length) {
            const p = document.createElement('p');
            p.style.margin = '4px 0';
            p.style.opacity = '0';
            p.style.transform = 'translateY(10px)';
            p.style.transition = 'all 0.5s';
            p.innerHTML = `<span style="color: #64748b; font-size: 0.8em;">[${new Date().toLocaleTimeString()}]</span> ${lines[index]}`;
            container.appendChild(p);
            
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, 50);
            
            index++;
            setTimeout(addLine, 800);
        }
    }
    
    addLine();
}

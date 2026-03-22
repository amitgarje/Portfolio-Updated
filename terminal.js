/**
 * AI Lab Terminal Simulation
 * Animates a realistic agentic workflow terminal.
 */

class AITerminal {
    constructor(elementId) {
        this.container = document.getElementById(elementId);
        if (!this.container) return;
        
        this.steps = [
            { cmd: "npm init agentic-workflow --amit", output: "Initializing 2026 Developer Blueprint..." },
            { cmd: "analyze --current-stack", output: "Stack identified: Java Full Stack | AI Integrated. High potential for velocity enhancement." },
            { cmd: "orchestrate --agent=designer --prompt='Modern High-End Portfolio'", output: "Generating glassmorphism tokens...\nSynthesizing mesh gradient parameters...\nValidating color harmonies..." },
            { cmd: "audit --security", output: "Scanning 1.2k lines of logic...\nVerified: 0 vulnerabilities found. Human-in-the-loop audit required for logic edge cases." },
            { cmd: "deploy --strategy=iterative", output: "Applying micro-interactions...\nOptimizing 3D flip card physics...\nBuild successful. Portfolio state: UNIQUE & MODERN." }
        ];
        
        this.currentStep = 0;
        this.lineCount = 0;
        this.start();
    }
    
    async start() {
        while (true) {
            for (const step of this.steps) {
                await this.typeLine(step.cmd, true);
                await this.wait(600);
                await this.showOutput(step.output);
                await this.wait(1500);
                
                if (this.lineCount > 10) {
                    this.container.innerHTML = "";
                    this.lineCount = 0;
                }
            }
            await this.wait(2000);
            this.container.innerHTML = "";
            this.lineCount = 0;
        }
    }
    
    async typeLine(text, isCmd) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = 'amit@dev:~$';
        line.appendChild(prompt);
        
        const content = document.createElement('span');
        content.className = isCmd ? 'terminal-cmd' : 'terminal-output';
        line.appendChild(content);
        
        const cursor = document.createElement('span');
        cursor.className = 'cursor-blink';
        line.appendChild(cursor);
        
        this.container.appendChild(line);
        this.scrollToBottom();
        
        for (let i = 0; i < text.length; i++) {
            content.textContent += text[i];
            await this.wait(Math.random() * 50 + 20);
        }
        
        cursor.remove();
        this.lineCount++;
    }
    
    async showOutput(text) {
        const lines = text.split('\n');
        for (const l of lines) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            
            const content = document.createElement('span');
            content.className = 'terminal-output';
            content.textContent = l;
            line.appendChild(content);
            
            this.container.appendChild(line);
            this.scrollToBottom();
            this.lineCount++;
            await this.wait(100);
        }
    }
    
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    scrollToBottom() {
        this.container.parentElement.scrollTop = this.container.parentElement.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AITerminal('ai-terminal');
});

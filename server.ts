import express from "express";
import { createServer as createViteServer } from "vite";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);
const app = express();
const PORT = 3000;

app.use(express.json());

// API Endpoints for WSL Management
app.get("/api/wsl/list", async (req, res) => {
  try {
    // We use -v for verbose list, --list --status for simpler
    const { stdout } = await execAsync("wsl --list --verbose");
    // Simple parsing for the demo; in production we'd handle UTF-16 and different locales
    res.json({ output: stdout, status: "success" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/wsl/action", async (req, res) => {
  const { distro, action } = req.body;
  try {
    let cmd = "";
    if (action === "start") cmd = `wsl --distribution ${distro}`;
    if (action === "stop") cmd = `wsl --terminate ${distro}`;
    if (action === "shutdown") cmd = `wsl --shutdown`;
    
    await execAsync(cmd);
    res.json({ message: `Action ${action} executed for ${distro}`, status: "success" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\x1b[32m[zWSL Manager]\x1b[0m Local Server running at http://localhost:${PORT}`);
    console.log(`\x1b[34m[INFO]\x1b[0m Open this URL in your browser and click "Install" to use as a Desktop App.`);
  });
}

startServer();

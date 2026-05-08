import flet as ft
import subprocess
import os
import psutil
import json
import threading
import time

class WSLManager:
    def __init__(self, page: ft.Page):
        self.page = page
        self.page.title = "zWSL Manager"
        self.page.theme_mode = ft.ThemeMode.DARK
        self.page.padding = 0
        self.page.window_width = 1100
        self.page.window_height = 800
        self.page.bgcolor = "#0A0A0B"
        
        self.terminal_logs = []
        self.setup_ui()

    def add_log(self, message, type="info"):
        prefix = "➜ " if type == "info" else "✔ " if type == "success" else "✖ "
        color = ft.colors.BLUE_400 if type == "info" else ft.colors.GREEN_400 if type == "success" else ft.colors.RED_400
        
        log_entry = ft.Row([
            ft.Text(f"[{time.strftime('%H:%M:%S')}]", size=10, color="#3A3A40", font_family="monospace"),
            ft.Text(prefix, size=12, color=color, font_family="monospace"),
            ft.Text(message, size=12, color="#E1E1E6", font_family="monospace", selectable=True),
        ], spacing=10)
        
        self.log_container.controls.append(log_entry)
        if len(self.log_container.controls) > 50:
            self.log_container.controls.pop(0)
        self.page.update()

    def run_wsl_command(self, args):
        try:
            result = subprocess.run(["wsl"] + args, capture_output=True, text=True, encoding='utf-16', shell=True)
            return result.stdout
        except Exception as e:
            return str(e)

    def setup_ui(self):
        # Sidebar
        self.sidebar = ft.Container(
            content=ft.Column([
                ft.Container(
                    content=ft.Row([
                        ft.Icon(ft.icons.TERMINAL, color=ft.colors.WHITE, size=20),
                        ft.Text("zWSL Manager", size=18, weight="bold")
                    ]),
                    padding=ft.padding.all(20),
                    bgcolor=ft.colors.BLUE_600,
                    border_radius=10,
                    margin=ft.margin.only(bottom=20)
                ),
                self.nav_button("Dashboard", ft.icons.DASHBOARD_ROUNDED, True),
                self.nav_button("Distros", ft.icons.GRID_VIEW_ROUNDED),
                self.nav_button("Applications", ft.icons.APP_REGISTRATION_ROUNDED),
                self.nav_button("Settings", ft.icons.SETTINGS_ROUNDED),
                ft.Divider(color="#2A2A2E", height=40),
                self.nav_button("About", ft.icons.INFO_OUTLINE),
            ], spacing=5),
            padding=20,
            width=250,
            bgcolor="#121214",
            border=ft.border.only(right=ft.BorderSide(1, "#2A2A2E"))
        )

        # Terminal
        self.log_container = ft.Column(spacing=2, scroll=ft.ScrollMode.ALWAYS, expand=True)
        self.terminal = ft.Container(
            content=ft.Column([
                ft.Row([
                    ft.Text("SYSTEM TERMINAL", size=10, weight="bold", color=ft.colors.GREEN_400),
                    ft.IconButton(ft.icons.CLOSE, icon_size=16, on_click=lambda _: self.toggle_terminal(False))
                ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
                self.log_container,
            ]),
            height=200,
            bgcolor="#0D0D10",
            border=ft.border.only(top=ft.BorderSide(1, "#2A2A2E")),
            padding=15,
            visible=False
        )

        # Content Area
        self.main_content = ft.Container(
            content=self.dashboard_view(),
            expand=True,
            padding=30,
            bgcolor="#0A0A0B"
        )

        self.page.add(
            ft.Row([
                self.sidebar,
                ft.Column([
                    self.main_content,
                    self.terminal
                ], expand=True, spacing=0)
            ], expand=True, spacing=0)
        )

    def nav_button(self, text, icon, active=False):
        return ft.Container(
            content=ft.Row([
                ft.Icon(icon, color=ft.colors.BLUE_400 if active else "#8D8D99", size=20),
                ft.Text(text, color=ft.colors.WHITE if active else "#8D8D99", weight="bold" if active else "normal")
            ], spacing=12),
            padding=ft.padding.symmetric(12, 16),
            border_radius=8,
            bgcolor="#1A1A1E" if active else "transparent",
            on_click=lambda _: self.change_view(text),
            hover_style=ft.ButtonStyle(bgcolor="#1A1A1E")
        )

    def toggle_terminal(self, show=True):
        self.terminal.visible = show
        self.page.update()

    def change_view(self, view_name):
        self.add_log(f"Switched to {view_name} view")
        if view_name == "Dashboard":
            self.main_content.content = self.dashboard_view()
        elif view_name == "Distros":
            self.main_content.content = self.distros_view()
        elif view_name == "About":
            self.main_content.content = self.about_view()
        self.page.update()

    def dashboard_view(self):
        return ft.Column([
            ft.Text("System Overview", size=28, weight="bold"),
            ft.Text("Real-time status of your WSL environment", color="#8D8D99"),
            ft.Row([
                self.stat_card("Active Distros", "3", ft.icons.MONITOR, ft.colors.BLUE_400),
                self.stat_card("CPU Usage", f"{psutil.cpu_percent()}%", ft.icons.CPU, ft.colors.PURPLE_400),
                self.stat_card("Memory", f"{psutil.virtual_memory().percent}%", ft.icons.MEMORY, ft.colors.GREEN_400),
                self.stat_card("Disk Free", "142 GB", ft.icons.STORAGE, ft.colors.ORANGE_400),
            ], spacing=20),
            ft.Container(height=20),
            ft.Container(
                content=ft.Column([
                    ft.Text("Quick Actions", size=18, weight="bold"),
                    ft.Row([
                        ft.ElevatedButton("Install Ubuntu", icon=ft.icons.ADD, bgcolor=ft.colors.BLUE_600, color=ft.colors.WHITE),
                        ft.ElevatedButton("Update Kernel", icon=ft.icons.UPDATE, bgcolor="#1A1A1E", color=ft.colors.WHITE),
                        ft.ElevatedButton("Compact VHDX", icon=ft.icons.COMPRESS, bgcolor="#1A1A1E", color=ft.colors.WHITE),
                    ])
                ]),
                padding=20,
                bgcolor="#121214",
                border_radius=12,
                border=ft.border.all(1, "#2A2A2E")
            )
        ], spacing=10, scroll=ft.ScrollMode.HIDDEN)

    def stat_card(self, title, value, icon, color):
        return ft.Container(
            content=ft.Column([
                ft.Icon(icon, color=color, size=30),
                ft.Text(value, size=24, weight="bold"),
                ft.Text(title, color="#8D8D99", size=12),
            ]),
            padding=20,
            bgcolor="#121214",
            border_radius=12,
            border=ft.border.all(1, "#2A2A2E"),
            expand=True
        )

    def distros_view(self):
        # In a real app, we would parse `wsl --list --verbose`
        distros = [
            {"name": "Ubuntu-22.04", "status": "Running", "version": "2"},
            {"name": "Debian", "status": "Stopped", "version": "2"},
            {"name": "Kali-Linux", "status": "Running", "version": "2"},
        ]
        
        items = []
        for d in distros:
            items.append(
                ft.Container(
                    content=ft.Row([
                        ft.Icon(ft.icons.COMPUTER, color=ft.colors.BLUE_400 if d["status"]=="Running" else "#3A3A40"),
                        ft.Column([
                            ft.Text(d["name"], weight="bold"),
                            ft.Text(f"WSL {d['version']} • {d['status']}", size=12, color="#8D8D99")
                        ], expand=True),
                        ft.Row([
                            ft.IconButton(ft.icons.PLAY_ARROW if d["status"]=="Stopped" else ft.icons.STOP, 
                                          icon_color=ft.colors.GREEN_400 if d["status"]=="Stopped" else ft.colors.RED_400),
                            ft.IconButton(ft.icons.REFRESH, icon_color=ft.colors.ORANGE_400),
                            ft.IconButton(ft.icons.DELETE_OUTLINE, icon_color="#8D8D99"),
                        ])
                    ]),
                    padding=15,
                    bgcolor="#1A1A1E",
                    border_radius=10,
                    border=ft.border.all(1, "#2A2A2E")
                )
            )

        return ft.Column([
            ft.Row([
                ft.Text("Distributions", size=24, weight="bold"),
                ft.ElevatedButton("Install New", icon=ft.icons.ADD, bgcolor=ft.colors.BLUE_600, color=ft.colors.WHITE)
            ], alignment=ft.MainAxisAlignment.SPACE_BETWEEN),
            ft.Column(items, spacing=10)
        ], spacing=20)

    def about_view(self):
        return ft.Column([
            ft.Container(
                content=ft.Icon(ft.icons.TERMINAL, size=60, color=ft.colors.BLUE_400),
                alignment=ft.alignment.center
            ),
            ft.Text("zWSL Manager", size=32, weight="bold", width=900, text_align=ft.TextAlign.CENTER),
            ft.Text("Built for the power users of Windows Subsystem for Linux.", 
                    width=900, text_align=ft.TextAlign.CENTER, color="#8D8D99"),
            ft.Divider(height=40, color="#2A2A2E"),
            ft.Text("Author: Ashesh Development", weight="bold"),
            ft.Text("A specialized tool for managing, cloning, and optimizing your Linux environments on Windows."),
            ft.Row([
                ft.TextButton("Contact", icon=ft.icons.MAIL),
                ft.TextButton("GitHub", icon=ft.icons.CODE),
                ft.TextButton("Check Updates", icon=ft.icons.UPDATE),
            ])
        ], horizontal_alignment=ft.CrossAxisAlignment.CENTER, spacing=10)

if __name__ == "__main__":
    ft.app(target=WSLManager)

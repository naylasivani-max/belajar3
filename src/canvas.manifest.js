export const manifest = {
  screens: {
    scr_bllm2v: { name: "Beranda", route: "/", position: { "x": 160, "y": 2200 } },
    scr_speq4u: { name: "Dashboard", route: "/dashboard", position: { "x": 1560, "y": 2200 } },
    scr_egne40: { name: "Reminder", route: "/reminder", position: { "x": 2960, "y": 2200 } },
    scr_02q0wm: { name: "Kalkulator", route: "/kalkulator", position: { "x": 4360, "y": 2200 } },
    scr_r1ewpt: { name: "Diskon", route: "/diskon", position: { "x": 5760, "y": 2200 } },
    scr_jcg9zu: { name: "Edukasi", route: "/edukasi", position: { "x": 7160, "y": 2200 } },
    scr_yvl2lj: { name: "Komunitas", route: "/komunitas", position: { "x": 8560, "y": 2200 } },
    scr_kj6lrh: { name: "Profil", route: "/profil", position: { "x": 9960, "y": 2200 } },
    scr_uxztkx: { name: "Login / Daftar", route: "/auth", position: { "x": 160, "y": 220 } }
  },
  sections: {
    sec_66emwk: { name: "Authentication", x: 0, y: 0, width: 1520, height: 1180 },
    sec_pxhmhi: { name: "Main App", x: 0, y: 1980, width: 11320, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_66emwk", children: [
    { kind: "screen", id: "scr_uxztkx" }]
  },
  { kind: "section", id: "sec_pxhmhi", children: [
    { kind: "screen", id: "scr_bllm2v" },
    { kind: "screen", id: "scr_speq4u" },
    { kind: "screen", id: "scr_egne40" },
    { kind: "screen", id: "scr_02q0wm" },
    { kind: "screen", id: "scr_r1ewpt" },
    { kind: "screen", id: "scr_jcg9zu" },
    { kind: "screen", id: "scr_yvl2lj" },
    { kind: "screen", id: "scr_kj6lrh" }]
  }]

};
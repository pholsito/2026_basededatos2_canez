const PIN = "1234";

document.addEventListener("DOMContentLoaded", () => {
    const selSemana = document.getElementById("select-semana");
    if(selSemana){
        for (let i = 1; i <= 16; i++) {
            let opt = document.createElement("option");
            opt.value = i;
            opt.innerText = "Semana " + i;
            selSemana.appendChild(opt);
        }
    }
    renderSemanas();
});

function login() {
    const p = prompt("SISTEMA BLOQUEADO - PIN:");
    if (p === PIN) document.getElementById("admin").style.display = "block";
}

function cerrar() { document.getElementById("admin").style.display = "none"; }

async function renderSemanas() {
    const cont = document.getElementById("misProyectos");
    if(!cont) return;
    cont.innerHTML = "<p style='color:#00f3ff'>Accediendo a la base de datos...</p>";

    try {
        const res = await fetch('datos.json');
        const bd = await res.json();
        cont.innerHTML = "";

        for (let i = 1; i <= 16; i++) {
            const data = bd[i] || { info: "Módulo pendiente de carga de datos.", tareas: {} };
            const div = document.createElement("div");
            div.className = "semana-card";
            
            let tHTML = "";
            // Esto permite que si pones 1, 3 o 10 tareas en el JSON, todas aparezcan
            Object.keys(data.tareas).forEach(key => {
                const t = data.tareas[key];
                tHTML += `
                    <div style="background:rgba(0,0,0,0.4); padding:12px; border-radius:8px; border:1px solid rgba(0,243,255,0.1);">
                        <small style="color:#00f3ff; font-weight:bold;">TASK_${key}</small>
                        <p style="font-size:12px; margin:5px 0; color:#fff;">${t.titulo}</p>
                        ${t.enlace ? `<a href="${t.enlace}" target="_blank" style="color:#00f3ff; font-size:11px; text-decoration:none; border-bottom:1px solid;">LINK_START</a>` : ""}
                    </div>`;
            });

            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:20px;">
                    <div style="flex:1; min-width:250px;">
                        <h4 style="color:#00f3ff; margin-bottom:10px;">SEMANA_${i.toString().padStart(2, '0')}</h4>
                        <p style="font-size:14px; color:#cbd5e1; line-height:1.6;">${data.info}</p>
                    </div>
                    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap:10px; flex:1.5;">
                        ${tHTML}
                    </div>
                </div>`;
            cont.appendChild(div);
        }
    } catch (e) {
        cont.innerHTML = "<p style='color:orange;'>⚠️ Error de enlace: Sube 'datos.json' a tu repositorio.</p>";
    }
}
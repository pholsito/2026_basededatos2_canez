const PIN = "1234";

// DATOS INTEGRADOS DIRECTAMENTE (Sustituyen al archivo datos.json)
const bdSemanas = {
    "Semana 1": {
        "info": "Introducción a la base de datos y conceptos fundamentales.",
        "tareas": {
            "1": { "titulo": "Informe Técnico", "enlace": "https://pdf.ac/QONm7fAQ0" },
            "2": { "titulo": "Tipo de Arquitectura de base de datos", "enlace": "https://pdf.ac/jMfm6OxFcq" }
        }
    },
    "Semana 2": {
        "info": "Gestores de base de datos y modelado de datos.",
        "tareas": {
            "1": { "titulo": "Diagrama de Entidad Relacion", "enlace": "https://pdf.ac/ofEHoVEu" },
            "2": { "titulo": "Manual de Instalación de SQL Server 2025 Developer Edition", "enlace": "https://pdf.ac/SnbDbYHOV" }
        }
    },
    "Semana 3": {
        "info": "Diseño de arquitectura de base de datos.",
        "tareas": {
            "1": { "titulo": "Diseño de arquitectura de base de datos", "enlace": "https://canva.link/xgfegwk4o2uuq37" }
        }
    }
    // Puedes seguir agregando más semanas aquí siguiendo el mismo formato
};

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

function renderSemanas() {
    const cont = document.getElementById("misProyectos");
    if(!cont) return;
    
    cont.innerHTML = ""; // Limpiamos el contenedor

    for (let i = 1; i <= 16; i++) {
        // Buscamos en nuestra variable interna
        const keySemana = `Semana ${i}`;
        const data = bdSemanas[keySemana] || { info: "Módulo pendiente de carga de datos.", tareas: {} };
        
        const div = document.createElement("div");
        div.className = "semana-card";
        div.style.marginBottom = "30px";
        
        let tHTML = "";
        
        if (data.tareas && Object.keys(data.tareas).length > 0) {
            Object.keys(data.tareas).forEach(key => {
                const t = data.tareas[key];
                tHTML += `
                    <div style="background:rgba(0,0,0,0.4); padding:12px; border-radius:8px; border:1px solid rgba(0,243,255,0.1);">
                        <small style="color:#00f3ff; font-weight:bold;">TASK_${key}</small>
                        <p style="font-size:12px; margin:5px 0; color:#fff; font-family: 'Poppins', sans-serif;">${t.titulo}</p>
                        ${t.enlace && t.enlace !== "#" 
                            ? `<a href="${t.enlace}" target="_blank" style="color:#00f3ff; font-size:11px; text-decoration:none; border-bottom:1px solid;">LINK_START</a>` 
                            : `<span style="color:#666; font-size:11px;">PENDING...</span>`}
                    </div>`;
            });
        } else {
            tHTML = "<p style='color:#666; font-size:12px;'>No hay tareas registradas.</p>";
        }

        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:20px; background: rgba(255,255,255,0.03); padding: 20px; border-radius: 15px;">
                <div style="flex:1; min-width:250px;">
                    <h4 style="color:#00f3ff; margin-bottom:10px; font-weight:900;">SEMANA_${i.toString().padStart(2, '0')}</h4>
                    <p style="font-size:14px; color:#cbd5e1; line-height:1.6;">${data.info}</p>
                </div>
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:15px; flex:1.5;">
                    ${tHTML}
                </div>
            </div>`;
        cont.appendChild(div);
    }
}

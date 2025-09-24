# TP04 Azure DevOps Pipelines

## Resumen
Configuré CI en **Azure DevOps** para una app con **Frontend (React/CRA)** y **Backend (Go)** usando un **agente Self-Hosted en macOS**. El pipeline compila ambos y publica los artefactos **frontend-build** y **back-build**. En mi Mac **ARM64**, el agente se ejecuta en **x64 mediante Rosetta** (no logré el paquete ARM nativo desde el modal de macOS).

---

## Pasos realizados

1) **Creación del proyecto en ADO**  
   Azure DevOps → **New project** → *TP4-Pipelines* (privado, Git).

2) **Creación del pool de agentes**  
   **Organization Settings → Pipelines → Agent pools → New pool** → **SelfHosted**.

3) **Descarga del agente macOS (x64) y primer intento**  
   Desde el pool **SelfHosted** → **New agent** (macOS x64).  
   - `./bin/installdependencies.sh` devolvió “Unknown OS version” → **lo ignoré** (es para Linux).  
   - macOS bloqueó `libhostfxr.dylib` → **Privacidad y seguridad → Permitir siempre**.

4) **.NET instalado pero error de arquitectura**  
   `dotnet --version` → 9.x instalado, pero el agente seguía fallando por mezcla **x64 vs ARM64**.

5) **Solución definitiva: Rosetta + shell x86_64**  
   Instalé Rosetta y ejecuté el agente x64 traducido:
   ```bash
   sudo softwareupdate --install-rosetta --agree-to-license
   cd ~/Desktop/pipeline4/vsts-agent-osx-x64-4.261.0
   xattr -r -d com.apple.quarantine .
   chmod +x ./config.sh ./bin/Agent.Listener ./svc.sh
   arch -x86_64 ./config.sh

6) **Configuración del Token personal**  

7) **Servicio del agente y verificación**  
`./svc.sh start`
`./svc.sh status`

8) **Permisos del pool para la pipeline**
La run quedaba en Waiting hasta que agregué el Build Service:
SelfHosted → Security → Add → [TP4-Pipelines] Build Service (… ) → Role: Service Account.
9) 


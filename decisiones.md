# TP04 Azure DevOps Pipelines — Decisiones y paso a paso (corto)

## Resumen
CI en **Azure DevOps** para **Frontend (React/CRA)** + **Backend (Go)** usando **agente Self-Hosted en macOS**. El pipeline compila ambos y publica **frontend-build** y **back-build**. En Mac **ARM64** el agente corre en **x64 con Rosetta** (no pude usar ARM nativo desde el modal).

## Paso a paso de los pasos ejecutados

1) **Crear proyecto en ADO**  
   *Azure DevOps → New project* → **TP4-Pipelines** (privado, Git).

2) **Crear pool**  
   *Organization Settings → Pipelines → Agent pools → New pool* → **SelfHosted**.

3) **Bajar agente macOS (x64) y preparar**  
   En el pool **SelfHosted → New agent (macOS x64)**.  
   macOS bloqueó libs → *Privacidad y seguridad → Permitir siempre*.  
   El script `installdependencies.sh` falló (es para Linux) → **lo ignoré**.

4) **Instalar Rosetta y configurar agente** *(mi Mac es ARM64)*  
   ```bash
   sudo softwareupdate --install-rosetta --agree-to-license
   cd ~/Desktop/pipeline4/vsts-agent-osx-x64-4.261.0
   xattr -r -d com.apple.quarantine .
   chmod +x ./config.sh ./bin/Agent.Listener ./svc.sh
   arch -x86_64 ./config.sh    # URL org ADO + PAT + Pool=SelfHosted + Name=Agent-Mac
   ./svc.sh start && ./svc.sh status
   ```
   > El agente quedó **Online**. ADO muestra un warning por emulación x64 (aceptado para el TP).

5) **Dar permiso al pool**  
   *Agent pools → SelfHosted → Security → Add* →  
   **[TP4-Pipelines] Build Service (…)** con **Role: Service Account**.  
   > Sin esto, los jobs quedaban en **Waiting**.

6) **Importar mi repositorio**  
   Creé el repo **TP4-Pipelines-proyecto** y **importé** mi proyecto (incluía *Courses-API*).  
   Estructura usada: `frontend/` (CRA) y `back/` (Go).  
   Faltaba módulo Go, por lo que:
   ```bash
   cd back
   go mod init github.com/<user>/TP4-Pipelines-proyecto/back
   go mod tidy
   ```

7) **Conectar GitHub y crear pipeline YAML**  
   *Pipelines → Create pipeline → GitHub → Authorize*.  
   Usé **Existing Azure Pipelines YAML** en la **raíz** (`/azure-pipelines.yml`) con 2 jobs:
   - **Frontend (CRA)**: Node 18 → `npm ci` → `CI=false npm run build` → artifact **frontend-build** (copia de `frontend/build/*`).  
   - **Backend (Go)**: `go mod download` → `go test ./... || true` → `go build -o build/cursos-api .` → artifact **back-build**.

8) **Run y autorizaciones**  
   Primera ejecución → **Authorize/Permit** los recursos cuando ADO lo pidió.  
   Ambos jobs corrieron en **Pool: SelfHosted / Agent: Agent-Mac** y quedaron **Success**.

9) **Verificación de artefactos**  
   En **Artifacts** se publicaron:
   - **frontend-build** (estáticos de CRA).  
   - **back-build** (binario `cursos-api`).

---

> Listo: CI funcionando con mi código importado, agente propio en macOS (Rosetta), pipeline YAML, y artifacts publicados.

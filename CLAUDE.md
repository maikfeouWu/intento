# Panel Organizador — TicketU

Proyecto universitario (Universidad de Valparaíso, Equipo 1). Microservicio de
gestión de eventos dentro de una arquitectura de microservicios.

**Este repo es personal de Joaquín.** Es una copia independiente del repo del
equipo, no un fork. Nada que esté acá se sube al repo del equipo salvo que
Joaquín lo pida explícitamente.

---

## Reglas de este repo

1. **NO agregar `Co-Authored-By: Claude` ni ningún trailer de Claude a los commits.**
   Los commits van firmados sólo por Joaquín. Esto vale para todo el repo, siempre,
   sin excepción. (En los repos de CanalCero sí se usa el trailer — acá no.)
2. Idioma: código y commits en inglés, documentación y conversación en español.
3. Formato de commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`).
4. Este proyecto **no tiene nada que ver con CanalCero ni con Ozzy**. No traer
   contexto, convenciones ni herramientas de allá (Filament, Lando, Forge, Obsidian).

## Remotes

| Remote | Apunta a | Uso |
|---|---|---|
| `origin` | `Joaquin-Martinez-Aravena/panel-organizador` (privado) | Donde se trabaja. Push libre. |
| `equipo` | `marybaxmann/Equipo-1---Panel-Organizador` (público) | Sólo lectura por defecto: `git fetch equipo` para traer cambios de los compañeros. **Nunca pushear sin que Joaquín lo pida.** |

Joaquín tiene permiso de `write` en el repo del equipo, así que un push accidental
sí entraría. De ahí la regla.

## Flujo de trabajo — LEER ANTES DE TOCAR GIT

Este es un trabajo evaluado de la universidad. La autoría tiene que ser de Joaquín,
sin ambigüedad. El flujo es de una sola dirección:

```
  acá se desarrolla  →  Joaquín revisa a mano  →  Joaquín commitea y mergea al equipo
      (Claude)              (sin Claude)                    (sin Claude)
```

**Reglas que no se negocian:**

1. Claude trabaja **sólo** contra `origin` (el repo privado). Nunca contra `equipo`.
2. Claude **nunca** ejecuta `git push equipo`, `gh pr create -R marybaxmann/...`,
   `gh issue close -R marybaxmann/...` ni ninguna escritura sobre el repo del equipo.
   Lectura sí (`git fetch equipo`, `gh issue view -R ...`).
3. El traspaso al repo del equipo lo hace **Joaquín a mano**, después de revisar el
   código. No se automatiza, no se scriptea, no se propone automatizarlo.
4. Ningún commit lleva `Co-Authored-By: Claude` ni `Claude-Session`, en ningún repo
   de este proyecto. Ya está cubierto por la regla 1 de arriba, y vale doble acá:
   que Claude figure como coautor en una entrega universitaria es un problema real.

Si una tarea parece necesitar escribir en `equipo`, la respuesta es preparar el
cambio en `origin` y decirle a Joaquín qué tiene que hacer él.

---

## Estado del proyecto

**Stack: Confirmado Node.js (Express + Zod) + MongoDB (Mongoose).** La propuesta original de Python + FastAPI fue descartada por el equipo.

**Nuevo Flujo de Trabajo (Claude vs AGY):**
- **AGY (Antigravity):** Actúa como PROGRAMADOR (Coder). Se encarga de escribir el código y montar la arquitectura.
- **Claude:** Actúa como PLANIFICADOR y REVISOR (Reviewer). Evalúa la arquitectura, revisa el código de AGY, y dicta los siguientes pasos a implementar.

### Historias asignadas a Joaquín (todas compartidas con un compañero)

| Issue | Historia | Sprint | Entrega |
|---|---|---|---|
| #6 | HU-06 — Verificación de autorización del organizador | 1 | 01/10/2026 |
| #1 | HU-01 — Crear un evento | 1 | 01/10/2026 |
| #5 | HU-05 — Ver mis eventos (vista administrativa) | 1 | 01/10/2026 |
| #2 | HU-02 — Editar un evento | 2 | 22/10/2026 |
| #4 | HU-04 — Publicar un evento | 2 | 22/10/2026 |
| #3 | HU-03 — Eliminar un evento | 3 | 05/11/2026 |

Los issues viven en el repo del equipo: `gh issue view N -R marybaxmann/Equipo-1---Panel-Organizador`

### Estado de los contratos de integración

`docs/` tiene 6 contratos. **Sólo uno es implementable hoy:**

- ✅ **`CONTRATO_PANEL_AUTH.md`** — completo. `GET /internal/validar-sesion`,
  se reenvía la cookie `jwt` sin tocarla, devuelve `usuario.id_usuario` y
  `usuario.rol`. Errores 401/403/500/503 definidos. Política fail-secure.
- ⛔ **Catálogo, Entradas, Notificaciones, Check-in, Promociones** — los cinco van
  por broker y **el nombre del tópico está `PENDIENTE DE ACUERDO`** en todos.

Consecuencia: HU-01, HU-05 y HU-06 (todo el Sprint 1) sólo dependen de Auth y se
pueden implementar sin esperar a nadie. HU-02, HU-04 y HU-03 tienen criterios de
aceptación que exigen notificar al Catálogo — están bloqueadas hasta que se
acuerde el tópico.

### Reglas de dominio que salen de las HU

- Un evento nace en estado **Borrador**. Estados: Borrador, Publicado, Finalizado, Cancelado.
- Sólo un evento en Borrador puede pasar a Publicado.
- Antes de publicar hay que validar que tenga nombre, fecha y ubicación.
- Un evento en Borrador **no** debe ser visible en el Catálogo.
- Toda operación valida **propiedad** (el evento es del organizador), no sólo rol.
- El JWT no se decodifica localmente. Se reenvía a Auth y se usa lo que Auth devuelve.
- Si Auth no responde: fail-secure, cortar la operación y responder 503.

# Índice de documentación — Panel Organizador (TicketU)

Punto de entrada de toda la documentación del microservicio. Si no sabés dónde
va un documento nuevo o dónde está uno viejo, empezá por acá.

> **Nota sobre la organización:** los archivos que ya existían en el repositorio
> del equipo **no se movieron de lugar**. Reorganizarlos haría que cada archivo
> apareciera como borrado + creado al llevar el trabajo al repo del equipo, y
> ensuciaría el historial compartido sin aportar nada. La estructura se ordena
> sumando carpetas nuevas, no moviendo las existentes.

---

## 1. Estructura

```
docs/
├── README.md                       ← este índice
├── sprints.md                      ← planificación de HU por sprint
├── adr/                            ← decisiones técnicas (NUEVO)
│   ├── README.md                   ← qué es un ADR y cómo se escribe acá
│   └── 0001-stack-del-panel-organizador.md
├── diagrams/                       ← diagramas de secuencia (Mermaid)
│   ├── hu01-crear-evento.md
│   ├── hu02-editar-evento.md
│   ├── hu03-eliminar-evento.md
│   ├── hu04-publicar-evento.md
│   ├── hu05-ver-mis-eventos.md
│   └── hu07-notificar-cambios-estado.md
└── CONTRATO_PANEL_*.md             ← contratos de integración con otros equipos
```

### Dónde va cada cosa de aquí en adelante

| Tipo de documento | Ubicación | Convención de nombre |
|---|---|---|
| Decisión técnica | `docs/adr/` | `NNNN-titulo-en-kebab-case.md`, numeración correlativa |
| Contrato con otro equipo | `docs/` | `CONTRATO_PANEL_<EQUIPO>.md` (mayúsculas — ya establecido) |
| Diagrama de secuencia | `docs/diagrams/` | `huNN-titulo-en-kebab-case.md` |
| Planificación | `docs/sprints.md` | archivo único, se actualiza |

---

## 2. Decisiones (ADR)

| # | Título | Estado | Bloquea a |
|---|---|---|---|
| [0001](adr/0001-stack-del-panel-organizador.md) | Stack del Panel Organizador | **Propuesta** | Todas las HU |
| 0002 | Motor de base de datos | *No escrito* | HU-01, HU-05 |
| 0003 | Aislamiento de la publicación al broker | *No escrito* | HU-02, HU-03, HU-04, HU-07 |

Ver [`adr/README.md`](adr/README.md) para el formato.

---

## 3. Contratos de integración

Seis contratos. **Sólo uno está cerrado y es implementable hoy.**

| Contrato | Rol de Panel | Mecanismo | Estado | HU que dependen |
|---|---|---|---|---|
| [AUTH](CONTRATO_PANEL_AUTH.md) | Consumidor | REST síncrono | ✅ **Completo** | HU-01…HU-06 |
| [CATALOGO](CONTRATO_PANEL_CATALOGO.md) | Proveedor | Broker | ⛔ Tópico sin acordar | HU-02, HU-04, HU-07 |
| [ENTRADAS](CONTRATO_PANEL_ENTRADAS.md) | Proveedor | Broker + consulta | ⛔ Tópico sin acordar | HU-03 |
| [NOTIFICACIONES](CONTRATO_PANEL_NOTIFICACIONES.md) | Proveedor | Broker | ⛔ Tópico sin acordar | HU-03, HU-07 |
| [CHECKIN](CONTRATO_PANEL_CHECKIN.md) | Proveedor | Broker | ⛔ Tópico sin acordar | HU-04 |
| [PROMOCIONES](CONTRATO_PANEL_PROMOCIONES.md) | Proveedor | Broker o consulta | ⛔ Ni siquiera el mecanismo | — |

**Lo único que Panel consume es Auth.** En los otros cinco Panel es el proveedor:
es quien tiene que emitir los mensajes.

### El bloqueo, en una línea

Los cinco contratos de broker dicen `Nombre exacto del evento/tópico: PENDIENTE DE
ACUERDO`. Hasta que eso se acuerde, los criterios de aceptación que exigen
"notificar al microservicio de Catálogo" no se pueden cumplir ni probar.

---

## 4. Orden de trabajo

### Estado de las historias

| HU | Título | Sprint | Entrega | Depende de | ¿Desbloqueada? |
|---|---|---|---|---|---|
| HU-06 | Verificación de autorización | 1 | 01/10/2026 | Contrato Auth | ✅ Sí |
| HU-01 | Crear un evento | 1 | 01/10/2026 | HU-06 | ✅ Sí |
| HU-05 | Ver mis eventos | 1 | 01/10/2026 | HU-06, HU-01 | ✅ Sí |
| HU-02 | Editar un evento | 2 | 22/10/2026 | HU-01 + tópico Catálogo | ⛔ Parcial |
| HU-04 | Publicar un evento | 2 | 22/10/2026 | HU-01 + tópico Catálogo | ⛔ Parcial |
| HU-07 | Notificar cambios de estado | 2 | 22/10/2026 | Tópicos de los 5 contratos | ⛔ No |
| HU-03 | Eliminar un evento | 3 | 05/11/2026 | HU-01 + tópicos Catálogo/Entradas/Notif. | ⛔ Parcial |

"Parcial" significa que la lógica de dominio y la persistencia se pueden escribir
y probar; lo único que no se puede cerrar es el paso de notificación.

### Secuencia recomendada

1. **Cerrar ADR-0001** (stack). Todo lo demás espera acá.
2. **HU-06 primero.** Es la dependencia de las otras cinco: toda operación valida
   sesión contra Auth antes de ejecutar nada. Su contrato es el único completo.
3. **HU-01** sobre la base de HU-06.
4. **HU-05** sobre la base de HU-01.
5. **En paralelo, y desde ya:** perseguir el acuerdo de los nombres de tópico. No
   es trabajo de código y es lo que traba el Sprint 2 entero.
6. **Sprint 2 y 3** con la publicación al broker detrás de una interfaz propia,
   para que el tópico sea configuración y no código.

### Hitos

| Milestone | Fecha | Contenido |
|---|---|---|
| Avance 1 | 01/10/2026 | HU-06, HU-01, HU-05 |
| Avance 2 | 22/10/2026 | HU-02, HU-04, HU-07 |
| Avance 3 | 05/11/2026 | HU-03, pruebas de integración, validación de contratos |
| Avance 4 | 18/11/2026 | TASK-01 a TASK-04 (integración y pruebas) |
| Entrega final | 25/11/2026 | TASK-05 a TASK-10 |

---

## 5. Reglas de dominio

Extraídas de los criterios de aceptación. Son transversales a todas las HU.

**Ciclo de vida**
- Un evento nace en **Borrador**.
- Estados: `Borrador`, `Publicado`, `Finalizado`, `Cancelado`.
- Sólo un evento en `Borrador` puede pasar a `Publicado`.
- Antes de publicar hay que validar nombre, fecha y ubicación presentes.
- Un evento en `Borrador` **no** debe ser visible en el Catálogo público.

**Autorización**
- El JWT **no se decodifica localmente**. Se reenvía la cookie original a Auth y
  se usa el `id_usuario` y `rol` que Auth devuelve.
- Se valida **propiedad**, no sólo rol: el organizador sólo opera sobre eventos
  que le pertenecen.
- Si Auth no responde o falla: **fail-secure** — se corta la operación y se
  responde `503`. Nunca se asume autorización.
- El token completo no se registra en logs.

**Integración**
- Panel es la fuente de verdad del ciclo de vida del evento. Ningún otro servicio
  lo modifica.
- Las notificaciones salientes van por broker, no por REST directo.

---

## 6. Referencias

- Repo del equipo: https://github.com/marybaxmann/Equipo-1---Panel-Organizador
- Issues (viven en el repo del equipo):
  `gh issue view <N> -R marybaxmann/Equipo-1---Panel-Organizador`

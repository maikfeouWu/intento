# Registro de decisiones de arquitectura (ADR)

Un ADR documenta **una** decisión técnica con consecuencias: por qué se tomó, qué
alternativas se descartaron y qué pasa si hay que revertirla. Sirve para que en
noviembre nadie tenga que reconstruir de memoria por qué algo se hizo así.

## Convención

- Nombre: `NNNN-titulo-en-kebab-case.md`, numeración correlativa desde `0001`.
- Un ADR = una decisión. Si son dos decisiones, son dos ADR.
- **Un ADR no se edita ni se borra una vez aceptado.** Si la decisión cambia, se
  escribe uno nuevo que la reemplaza y se marca el viejo como `Reemplazado por ADR-NNNN`.

## Estados

| Estado | Significado |
|---|---|
| `Propuesta` | Escrito, sin acordar con el equipo. |
| `Aceptado` | El equipo lo acordó. Es vinculante. |
| `Rechazado` | Se evaluó y se descartó. Se conserva: el descarte también es información. |
| `Reemplazado por ADR-NNNN` | Vigente en su momento, superado por otra decisión. |

## Estructura

Contexto → Opciones consideradas → Decisión → Lo que NO decide → Consecuencias →
Cómo se revierte.

La sección "lo que NO decide" es la que más se olvida y la que más problemas
evita: deja explícito qué sigue abierto, para que no se dé por resuelto por omisión.

## Índice

| # | Título | Estado |
|---|---|---|
| [0001](0001-stack-del-panel-organizador.md) | Stack del Panel Organizador | Propuesta |

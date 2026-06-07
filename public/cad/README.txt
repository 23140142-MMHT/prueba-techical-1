Pon aquí tu modelo 3D del robot exportado de tu CAD.

  Nombre esperado:  robot.glb
  Ruta final:       public/cad/robot.glb

Formato: glTF binario (.glb). Si tu CAD exporta .gltf + texturas, también sirve,
pero .glb (un solo archivo) es lo más cómodo.

IMPORTANTE: nombra los componentes en tu CAD antes de exportar (ej. "shooter_flywheel",
"swerve_module_FL"). Esos nombres se usan para resaltar cada subsistema desde
content/cad/cad-config.ts.

Para ver los nombres reales que quedaron dentro del .glb:
  1) En content/cad/cad-config.ts pon  DEBUG_LOG_MESH_NAMES = true
  2) Abre la página /cad y revisa la consola del navegador (tecla F12)
  3) Usa esos nombres para ajustar las "keywords" de cada pestaña
  4) Vuelve a poner DEBUG_LOG_MESH_NAMES = false

## Entrega del proyecto final
---

**Objetivos generales**

- Contaras con Mongo como sistema de persistencia principal
- Tendras definido todos los enpoints para poder trabajar con productos y carritos.

**Objetivos especificos**

- Profesionalizar las consultas de productos con filtros, paginacion y ordenamientos.
- Profesionalizar la gestion de carrito para implementar los ultimos conceptos vistos.

**Formato**
    
- Link al repositorio de Github, sin la carpeta de node_modules

**Sugerencias**
    
- Permitir comentarios en el archivo
- La logica del negocio que ya tienes hecha no deberia cambiar, solo si persistencia.
- Los nuevos endpoints deben seguir la misma estructura y logica que hemos seguido.

---

## **Se debe entregar**

Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:

- Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
        
    - limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10. 
        
    - page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1.
        
    - query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general.
    
    - sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento.

- El método GET deberá devolver un objeto con el siguiente formato:
    
```js
{
    status:success/error
    payload: Resultado de los productos solicitados
    totalPages: Total de páginas
    prevPage: Página anterior
    nextPage: Página siguiente
    page: Página actual
    hasPrevPage: Indicador para saber si la página previa existe
    hasNextPage: Indicador para saber si la página siguiente existe.
    prevLink: Link directo a la página previa (null si hasPrevPage=false)
    nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}
```

- Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.

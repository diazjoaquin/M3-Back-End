PROMISES:

Una promesa representa el eventual resultado de una operación asintrónica.

Las promesas son objetos que representan y gestionan el lifecycle de una respuesta futura.

Dentro suyo tendremos:

status: en que estado está la operación. --> En un primer momento siempre va estar "pendiente". 
Además fullfilled y rejected.

information: Si la promesa se resolvió, vamos a obtener un "value", y si es rechazado vamos a obtener una "reason".

.then: Método de la promesa que me permite definir el plan de acción / ¿Que hacer?
Definimos un error handler, y un success handler dentro del then. Primero el success, y luego el error handler.

.then me retorna una promesa.

.catch es otro método de promesas pero que solo.
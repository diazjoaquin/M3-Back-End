'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
    constructor(executor){
        if (typeof executor !== "function") throw TypeError("Executor must be a function.");
        
        this._state = "pending";
        this._value = undefined;
        this._handlerGroups = [];

        const callHandlers = (value) => {
            while (this._handlerGroups.length > 0){
                const { successCb, errorCb, downstreamPromise } = this._handlerGroups.shift(); 

                if (this._state === "fulfilled"){
                    if (!successCb){
                        downstreamPromise._internalResolve(value);
                    } else {
                        try {
                            const result = successCb(value);
                            if (result instanceof $Promise){
                                result.then(
                                    (value) => downstreamPromise._internalResolve(value),
                                    (err) => downstreamPromise._internalReject(err));
                            } else {
                                downstreamPromise._internalResolve(result);
                            }    
                        } catch (error) {
                            downstreamPromise._internalReject(error);
                        }
                    }
                }

                if (this._state === "rejected"){
                    if (!errorCb){
                        downstreamPromise._internalReject(value);
                    } else {
                        try {
                            const result = errorCb(value);
                            if (result instanceof $Promise){
                                result.then(
                                    (value) => downstreamPromise._internalResolve(value),
                                    (err) => downstreamPromise._internalReject(err))
                            } else {
                                downstreamPromise._internalResolve(result);
                            }
                        } catch (error) {
                            downstreamPromise._internalReject(error);
                        }
                    }
                }
            }
        }
        

        this._internalResolve = (value) => {
            if (this._state !== "pending") return;
            this._state = "fulfilled";
            this._value = value;
            callHandlers(this._value)
        };
    
        this._internalReject = (reason) => {
            if (this._state !== "pending") return;
            this._state = "rejected";
            this._value = reason;
            callHandlers(this._value)
        };
        
        const resolve = (value) => {
            this._internalResolve(value);
        }
        const reject = (reason) => {
            this._internalReject(reason);
        }
        
        executor(resolve, reject);

        this.then = (successHandler, errorHandler) => {
            const downstreamPromise = new $Promise (() => {});
            const _handlerGroup = {
                successCb: typeof successHandler === "function" ? successHandler : false,
                errorCb: typeof errorHandler === "function" ? errorHandler : false,
                downstreamPromise,
            };

            this._handlerGroups.push(_handlerGroup);
            this._state !== "pending" && callHandlers(this._value);
            return downstreamPromise;
        }

        this.catch = (errorHandler) => {
           return this.then(null, errorHandler);
        }
    }

    static resolve (value) {
        if (value instanceof $Promise) return value;
        const newPromise = new $Promise (() => {});
        newPromise._internalResolve(value);
        return newPromise;
    }

    static all (arr) {
        if (!Array.isArray(arr)) throw TypeError ("arr must be an array")
    }
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

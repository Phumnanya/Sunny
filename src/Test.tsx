"use client"
import { useEffect, useState } from "react"
import createModule from '../src/wasm_output.js'

export default function WasmTest() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Initialize the WebAssembly module
    createModule().then((Module) => {
      // Use cwrap to bind the C function to a JS variable
      // Arguments: (C_function_name, return_type, [argument_types])
      const c_add = Module.cwrap('add', 'number', ['number', 'number']);
      
      // Call the C function!
      const calcResult = c_add(5, 7);
      setResult(calcResult);
    });
  }, []);

  return (
    <div className="p-4 bg-slate-800 text-white rounded-lg m-4">
      <h3 className="text-xl font-bold">Wasm Test Stage</h3>
      <p>
        Calculated via C binary: 5 + 7 = 
        <span className="text-green-400 font-mono ml-2 text-lg">
          {result !== null ? result : 'Loading Wasm...'}
        </span>
      </p>
    </div>
  );
}
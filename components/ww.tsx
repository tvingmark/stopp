import React from "react";

import * as Comlink from "comlink";
import { WorkerApi } from "../workers/comlink.worker";

const WW = () => {
  // for standard
  const [latestMessage, setLatestMessage] = React.useState("");
  const workerRef = React.useRef<Worker>();

  // for comlink
  const [comlinkMessage, setComlinkMessage] = React.useState("");
  const comlinkWorkerRef = React.useRef<Worker>();
  const comlinkWorkerApiRef = React.useRef<Comlink.Remote<WorkerApi>>();

  React.useEffect(() => {
    // Standard worker new Worker(new URL("../workers/standard.worker", import.meta.url))
    workerRef.current = new Worker(new URL("../workers/standard.worker", import.meta.url))
    workerRef.current.onmessage = (evt) =>
      setLatestMessage(`WebWorker Response => ${evt.data}`);

    // Comlink worker
    comlinkWorkerRef.current = new Worker(new URL("../workers/comlink.worker", import.meta.url))
    comlinkWorkerApiRef.current = Comlink.wrap<WorkerApi>(
      comlinkWorkerRef.current
    );
    return () => {
      workerRef.current?.terminate();
      comlinkWorkerRef.current?.terminate();
    };
  }, []);

  const handleWork = React.useCallback(async () => {
    workerRef.current?.postMessage(100000);
  }, []);

  const handleComlinkWork = async () => {
    console.log("COMLINK");
    const msg = await comlinkWorkerApiRef.current?.getName();
    setComlinkMessage(`Comlink response => ${msg}`);
  };

  return (
    <div>
      <h1>Hello Next.js, TypeScript, Web Worker and Comlink👋</h1>
      <div>
        <h2>Let's use Standard Web worker!</h2>
        <button onClick={handleWork}>Calculate PI by standard worker</button>
        <p>Result: {latestMessage}</p>
      </div>
      <div>
        <h2>
          Let's use <em>Comlink</em> Web worker!
        </h2>
        <button onClick={handleComlinkWork}>
          fetch random word by Comlink
        </button>
        <p>Result: {comlinkMessage}</p>
      </div>
    </div>
  );
};

export default WW;
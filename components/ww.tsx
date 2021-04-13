import React from "react";

import * as Comlink from "comlink";
import { WorkerApi } from "../workers/comlink.worker";

const WW = () => {
  // for standard
  const [latestMessage, setLatestMessage] = React.useState("");
  const workerRef = React.useRef<Worker>();

  // for comlink
  const [comlinkMessage, setComlinkMessage] = React.useState("");
  const [windBikes, setWindBikes] = React.useState(0);
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

    const msg = comlinkWorkerApiRef.current?.getName();
    setComlinkMessage(`Number of Hopp => ${msg}`);
    const msg1 = comlinkWorkerApiRef.current?.getWind();
    setComlinkMessage(`Number of Wind => ${msg1}`);    

    return () => {
      workerRef.current?.terminate();
      comlinkWorkerRef.current?.terminate();
    };
  }, []);

  const handleWork = React.useCallback(async () => {
    workerRef.current?.postMessage(1000000);
    workerRef.current?.postMessage(1000000);
    workerRef.current?.postMessage(1000000);
  }, []);

  const handleComlinkWork = async () => {
    console.log("HOPP COMLINK");
    const msg = await comlinkWorkerApiRef.current?.getName();
    setComlinkMessage(`Comlink response => ${msg}`);
  };
  const handleWindWork = async () => {
    console.log("Work COMLINK");
    const msg = await comlinkWorkerApiRef.current?.getWind();
    setWindBikes(msg);
  };  

  return (
    <div>
        <button onClick={handleWork}>Calculate PI by standard worker</button>
        <p>Result: {latestMessage}</p>
      <div>
        <button className="bg-gradient-to-l" onClick={handleComlinkWork}>
          fetch random word by Comlink
        </button>
        <p>Result: {comlinkMessage}</p>
      </div>
      <div>
        <button className="bg-gradient-to-l" onClick={handleWindWork}>
          fetch random word by Comlink
        </button>
        <p>Result: {windBikes}</p>
      </div>
    </div>
  );
};

export default WW;